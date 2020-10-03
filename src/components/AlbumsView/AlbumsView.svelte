<script lang="ts">
  import { albums } from "../../stores/albums";
  import AlbumArt from "../AlbumArt.svelte";
  import SelectedAlbum from "./SelectedAlbum.svelte";

  let selectedAlbum: Album | null = null;

  const selectAlbum = (album: Album) => {
    selectedAlbum = album;
  };
  const closeAlbum = () => {
    selectedAlbum = null;
  };
</script>

<style>
  .albums-view {
    position: relative;
    padding: 20px;
    display: grid;
    grid-gap: 20px;
    gap: 20px;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }

  .album {
    cursor: pointer;
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
  }

  .art {
    width: 150px;
    height: 150px;
    background: grey;
    border-radius: 5px;
  }

  .title {
    width: 150px;
    font-size: 1.1em;
    padding-top: 5px;
  }

  .artist {
    width: 150px;
    font-size: 1em;
    color: grey;
  }
</style>

<div class="albums-view">
  {#each $albums as album}
    <div class="album" on:click={() => selectAlbum(album)}>
      <div class="art">
        <AlbumArt songId={album.songs[0].id} />
      </div><span class="title no-overflow-text">{album.title}</span><span class="artist
          no-overflow-text">{album.artist}</span>
    </div>
  {/each}
  {#if selectedAlbum}
    <SelectedAlbum album={selectedAlbum} close={closeAlbum} />
  {/if}
</div>
