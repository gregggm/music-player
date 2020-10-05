import { writable } from "svelte/store";
import { v4 as uuid } from "uuid";

export const playlists = writable<Playlists>({});

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
