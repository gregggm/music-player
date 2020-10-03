<script>
  import AddSongs from "./AddSongs.svelte";
  import { setActive as setSeachActive } from "../stores/search";
import Home from "../icons/Home.svelte";
import Search from "../icons/Search.svelte";
</script>

<style>
  div {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    z-index: 100;
  }

  button {
    background: none;
  }
</style>

<div>
  <button on:click={() => setSeachActive(false)}><Home /></button>
  <button on:click={() => setSeachActive(true)}><Search /></button>
  <AddSongs />
</div>
