import { writable } from "svelte/store";

export const loadingLibrary = writable<boolean>(true);