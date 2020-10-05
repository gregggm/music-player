import { writable } from "svelte/store";
import { v4 as uuid } from "uuid";

const tempPlaylist: Playlists = {
  temp: {
    id: "temp",
    title: "Test",
    songs: [
      {
        id: "1",
        title: "Test song",
        album: "jhah",
        artist: "sdg",
        trackNumber: 1,
      },
    ],
  },
};

export const playlists = writable<Playlists>(tempPlaylist);

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
