<script>
  import AddSongs from "./AddSongs.svelte";
  import { setActive as setSeachActive } from "../stores/search";
</script>

<style>
  div {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    z-index: 100;
  }
</style>

<div>
  <button on:click={() => setSeachActive(false)}>Home</button>
  <button on:click={() => setSeachActive(true)}>Search</button>
  <AddSongs />
</div>
