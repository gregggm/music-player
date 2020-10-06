<script lang="ts">
  import { onDestroy } from "svelte";

  import {
    playlists,
    selectedPlaylist,
    createNewPlaylist,
    selectPlaylist,
  } from "../../stores/playlists";
  import SelectedPlaylist from "./SelectedPlaylist.svelte";

  $: playlist = $selectedPlaylist;
  $: playlistsArray = Object.values($playlists);

  onDestroy(() => selectPlaylist(null));

  const onNewPlaylistClick = async () => {
    const playlist = await createNewPlaylist();
    selectPlaylist(playlist);
  };
</script>

<style>
  .playlists-view {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 15px;
    padding-bottom: 70px;
  }

  .new-playlist {
    width: 100%;
    height: 40px;
    border-radius: 10px;
    margin-bottom: 15px;
    padding: 0;
  }

  .playlist {
    width: 100%;
    height: 45px;
    padding: 5px 0;
    display: flex;
    justify-content: left;
    align-items: center;
    font-size: 1.2em;
    cursor: pointer;
  }
</style>

<div class="playlists-view">
  <button class="new-playlist" on:click={onNewPlaylistClick}>New Playlist</button>
  {#each playlistsArray as playlist (playlist.id)}
    <div class="playlist" on:click={() => selectPlaylist(playlist)}>
      {playlist.title}
    </div>
  {/each}
  {#if playlist}
    <SelectedPlaylist {playlist} close={() => selectPlaylist(null)} />
  {/if}
</div>
