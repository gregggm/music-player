import { writable } from "svelte/store";

export const search = writable<Search>({ active: false, text: "", addToPlaylist: false });

export const setActive = (active: boolean) => {
  search.update((prevState) => ({ ...prevState, active, addToPlaylist: false }));
};

export const setText = (text: string) => {
  search.update((prevState) => ({ ...prevState, text: text.toLowerCase() }));
};

export const setAddToPlaylist = (addToPlaylist: boolean) => {
  search.update((prevState) => ({ ...prevState, active: addToPlaylist, addToPlaylist }));
};
