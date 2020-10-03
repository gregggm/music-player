<script lang="ts">
  import AlbumsView from "./AlbumsView/AlbumsView.svelte";
  import PlaylistsView from "./PlaylistsView/PlaylistsView.svelte";
  import SongsView from "./SongsView/SongsView.svelte";
  import ViewContainer from "./ViewContainer.svelte";
  import { songs } from "../stores/songs";

  type ActiveView = "songs" | "albums" | "playlists";

  let activeView: ActiveView = "songs";
</script>

<style>
  .library-container {
    position: relative;
    display: grid;
    overflow: scroll;
    grid-template-rows: 50px 1fr;
    grid-template-areas: "library-menu" "library";
  }

  .library-menu {
    position: sticky;
    top: 0;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    z-index: 1;
    backdrop-filter: saturate(180%) blur(20px);
    background-color: rgba(239,239,239,0.8);
  }

  button {
    background: none;
  }

  .active {
    border-bottom: 2px solid black;
  }

  .library {
    padding-bottom: 70px;
    display: flex;
    flex-direction: column;
  }

  h1 {
    width: 100%;
    text-align: center;
    margin-top: 100px;
  }
</style>

<div class="library-container">
  <div class="library-menu">
    <button
      class:active={activeView === 'songs'}
      on:click={() => (activeView = 'songs')}
    >Songs</button>
    <button
      class:active={activeView === 'albums'}
      on:click={() => (activeView = 'albums')}
    >Albums</button>
    <button
      class:active={activeView === 'playlists'}
      on:click={() => (activeView = 'playlists')}
    >Playlists</button>
  </div>
  <div class="library">
    {#if $songs.length === 0}
      <h1>Loading library...</h1>
    {:else}
      <ViewContainer active={activeView === 'songs'}>
        <SongsView />
      </ViewContainer>
      <ViewContainer active={activeView === 'albums'}>
        <AlbumsView />
      </ViewContainer>
      <ViewContainer active={activeView === 'playlists'}>
        <PlaylistsView />
      </ViewContainer>
    {/if}
  </div>
</div>
