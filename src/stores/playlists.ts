import { writable, derived } from "svelte/store";
import { v4 as uuid } from "uuid";
import { updatePlaylist as updatePlaylistDB, storePlaylist as storePlaylistDB, deletePlaylist as deletePlaylistDB } from '../services/database';

export const playlists = writable<Playlists>({});
export const selectedPlaylistId = writable<string | null>(null);
export const selectedPlaylist = derived([playlists, selectedPlaylistId], ([$playlists, $selectedPlaylistId]) => {
  if (!$selectedPlaylistId) return null;
  return $playlists[$selectedPlaylistId] || null;
});

export const selectPlaylist = (playlist: Playlist | null) => {
  if (playlist) {
    selectedPlaylistId.set(playlist.id);
  } else {
    selectedPlaylistId.set(null);
  }
}

export const createNewPlaylist: () => Promise<Playlist> = () => {
  const id = uuid();
  const playlist = { id, title: "Untitled playlist", songs: [] };

  return storePlaylistDB(playlist).then(() => {
    playlists.update((prevState) => {
      return {
        ...prevState,
        [id]: playlist,
      };
    });

    return playlist;
  });
};

export const updatePlaylist = (playlist: Playlist) => {
  if (playlist.title === "") {
    playlist.title = "Untitled playlist";
  }
  updatePlaylistDB(playlist).then(() => {
    playlists.update((prevState) => ({ ...prevState, [playlist.id]: playlist }));
  });
};

export const deletePlaylist = (playlist: Playlist) => {
  deletePlaylistDB(playlist).then(() => {
    playlists.update((prevState) => {
      delete prevState[playlist.id];
      return prevState;
    });
  })
};
