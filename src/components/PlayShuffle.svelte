<script lang="ts">
  import PlayHollow from "../icons/PlayHollow.svelte";
  import Shuffle from "../icons/Shuffle.svelte";
  import { playSongs } from "../stores/player";

  export let songs: Song[];

  const shuffle = () => {
    const shuffledSongs = [...songs];
    // eslint-disable-next-line no-plusplus
    for (let i = shuffledSongs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledSongs[i], shuffledSongs[j]] = [
        shuffledSongs[j],
        shuffledSongs[i],
      ];
    }
    playSongs(shuffledSongs);
  };
</script>

<style>
  div {
    height: 60px;
    display: flex;
    align-items: centre;
    justify-content: space-evenly;
    padding: 10px 0;
    margin-top: 5px;
  }

  button {
    width: 42%;
    border-radius: 10px;
    transition: background-color 0.2s;
  }

  button:active {
    background-color: darkgray;
  }
</style>

<div>
  <button class="play" on:click={() => playSongs(songs)}><PlayHollow /></button>
  <button class="shuffle" on:click={shuffle}><Shuffle /></button>
</div>
