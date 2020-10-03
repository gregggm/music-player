<script lang="ts">
  import AlbumArt from "../AlbumArt.svelte";

  export let song: Song;
  export let onClick: () => void = () => {};
</script>

<style>
  .song {
    width: 100%;
    height: 60px;
    padding: 5px 0;
    display: flex;
    justify-content: left;
    align-items: center;
  }

  .art {
    height: 45px;
    width: 45px;
    background: grey;
    border-radius: 5px;
    margin: 0 20px;
  }

  .info {
    width: calc(100vw - 100px);
  }

  .title {
    font-size: 1.2em;
  }

  .album {
    color: grey;
  }
</style>

<div class="song" on:click={onClick}>
  <div class="art">
    <AlbumArt songId={song.id} />
  </div>
  <div class="info">
    <div class="title no-overflow-text">{song.title}</div>
    <div class="album no-overflow-text">{song.artist}</div>
  </div>
</div>
