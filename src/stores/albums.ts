import { derived } from "svelte/store";
import { songs } from "./songs";

export const albums = derived(songs, ($songs) => {
  const albums: { [title: string]: Album } = {};

  for (const song of $songs) {
    const isMatchingAlbum = albums[song.album] !== undefined;

    if (isMatchingAlbum) {
      albums[song.album].songs.push(song);
    } else {
      albums[song.album] = {
        title: song.album,
        artist: song.artist,
        artId: song.id,
        songs: [song],
      };
    }
  }

  for (const album in albums) {
    albums[album].songs.sort((song1, song2) =>
      song1.trackNumber > song2.trackNumber ? 1 : -1
    );
  }

  return Object.values(albums);
});
