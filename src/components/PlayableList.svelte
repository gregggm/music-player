<script lang="ts">
  import { playSongs } from "../stores/player";

  export let songs: Song[];

  const onClick = (id: string) => {
    const selectedSongIndex = songs.findIndex((song) => song.id === id);

    playSongs(
      songs.slice(selectedSongIndex),
      songs.slice(0, selectedSongIndex).reverse()
    );
  };
</script>

<slot {onClick} />
