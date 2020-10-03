import { writable } from "svelte/store";

export const songs = writable<Song[]>([]);

export const addSongs = (newSongs: Song[]) => {
  songs.update((prevState) => [...prevState, ...newSongs]);
};
