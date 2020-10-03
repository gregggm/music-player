type Song = {
  id: string;
  title: string;
  album: string;
  artist: string;
  trackNumber: number;
};

type Album = {
  title: string;
  artist: string;
  artId: string;
  songs: Song[];
};

type Player = {
  current: Song | null;
  history: Song[];
  queue: Song[];
  isPlaying: boolean;
};

type Search = {
  active: boolean;
  text: string;
};
