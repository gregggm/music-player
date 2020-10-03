import { writable } from "svelte/store";

export const search = writable<Search>({ active: false, text: "" });

export const setActive = (active: boolean) => {
  search.update((prevState) => ({ ...prevState, active }));
};

export const setText = (text: string) => {
  search.update((prevState) => ({ ...prevState, text: text.toLowerCase() }));
};
