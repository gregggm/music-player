<script lang="ts">
  import { playlists, createNewPlaylist } from "../../stores/playlists";
  import SelectedPlaylist from "./SelectedPlaylist.svelte";

  let selectedPlaylist: Playlist | null = null;

  $: playlistsArray = Object.values($playlists);

  const selectPlaylist = (playlist: Playlist) => {
    selectedPlaylist = playlist;
  };

  const closePlaylist = () => {
    selectedPlaylist = null;
  };

  const onNewPlaylistClick = () => {
    const playlist = createNewPlaylist();
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
  {#if selectedPlaylist}
    <SelectedPlaylist playlist={selectedPlaylist} close={closePlaylist} />
  {/if}
</div>
