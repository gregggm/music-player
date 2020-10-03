import { writable } from "svelte/store";

export const player = writable<Player>({
  current: null,
  history: [],
  queue: [],
  isPlaying: false,
});

export const playSongs = (songs: Song[], history: Song[] = []) => {
  player.set({
    current: songs[0],
    queue: songs.slice(1),
    history,
    isPlaying: true,
  });
};

export const play = () => {
  player.update((prevState) => ({
    ...prevState,
    isPlaying: true,
  }));
};

export const pause = () => {
  player.update((prevState) => ({
    ...prevState,
    isPlaying: false,
  }));
};

export const playNext = () => {
  player.update((prevState) => {
    if (!prevState.current) return prevState;

    return {
      current: prevState.queue[0],
      history: [prevState.current, ...prevState.history],
      queue: prevState.queue.slice(1),
      isPlaying: prevState.isPlaying,
    };
  });
};

export const playPrev = () => {
  player.update((prevState) => {
    if (!prevState.history[0]) return prevState;

    return {
      current: prevState.history[0],
      history: prevState.history.slice(1),
      queue: prevState.current
        ? [prevState.current, ...prevState.queue]
        : prevState.queue,
      isPlaying: prevState.isPlaying,
    };
  });
};
