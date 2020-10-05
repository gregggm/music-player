<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { playSongs } from "../stores/player";
  import { search, setActive, setText } from "../stores/search";
  import { songs } from "../stores/songs";
  import Song from "./SongsView/Song.svelte";

  let inputElement: HTMLInputElement;

  $: filteredSongs = $search.text
    ? $songs.filter(
        (song) =>
          song.title.toLowerCase().includes($search.text) ||
          song.artist.toLowerCase().includes($search.text)
      )
    : [];

  onMount(() => {
    inputElement.focus();
  });
</script>

<style>
  .search {
    position: absolute;
    z-index: 20;
    background-color: white;
    width: 100%;
    height: calc(100vh - 60px);
    overflow: scroll;
  }

  .search-bar {
    width: 100%;
    height: 70px;
    background: #efefef;
    display: grid;
    grid-template-columns: 1fr 60px;
    padding: 10px;
  }

  input {
    outline: none;
    border: none;
    background-color: lightgrey;
    border-radius: 20px;
    display: inline-block;
    font-size: 1.2em;
    padding-left: 10px;
    margin: 0;
  }

  button {
    padding-left: 10px;
  }
</style>

<div class="search" transition:fade={{ duration: 100, delay: 0 }}>
  <div class="search-bar">
    <input
      bind:this={inputElement}
      on:input={(e) => setText(e.target.value)}
      value={$search.text}
      placeholder="Search library"
    />
    <button
      on:click={() => {
        if (!$search.text) {
          return setActive(false);
        }
        setText('');
        inputElement.focus();
      }}
    >Clear</button>
  </div>
  {#each filteredSongs as song}
    <Song
      {song}
      onClick={() => {
        playSongs([song]);
        setText('');
        setActive(false);
      }}
    />
  {/each}
</div>
