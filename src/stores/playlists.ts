import { writable, derived } from "svelte/store";
import { v4 as uuid } from "uuid";

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

export const createNewPlaylist: () => Playlist = () => {
  const id = uuid();
  const playlist = { id, title: "Untitled playlist", songs: [] };
  playlists.update((prevState) => {
    return {
      ...prevState,
      [id]: playlist,
    };
  });

  return playlist;
};

export const updatePlaylist = (playlist: Playlist) => {
  if (playlist.title === "") {
    playlist.title = "Untitled playlist";
  }
  playlists.update((prevState) => ({ ...prevState, [playlist.id]: playlist }));
};

export const deletePlaylist = (playlist: Playlist) => {
  playlists.update((prevState) => {
    delete prevState[playlist.id];
    return prevState;
  });
};
