<script lang="ts">
  import { fly } from "svelte/transition";
  import { quadOut } from "svelte/easing";
  import BackArrow from "../../icons/BackArrow.svelte";
  import Song from "./Song.svelte";
  import PlayShuffle from "../PlayShuffle.svelte";
  import AlbumArt from "../AlbumArt.svelte";
  import PlayableList from "../PlayableList.svelte";

  export let album: Album;
  export let close: () => void;
</script>

<style>
  .selected-album {
    position: fixed;
    top: 50px;
    left: 0px;
    background-color: white;
    height: calc(100vh - 110px);
    width: 100%;
    overflow-y: scroll;
  }

  .header {
    display: flex;
    justify-content: left;
    align-items: center;
    height: 70px;
    background: darkgrey;
  }

  .back-button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70px;
    width: 60px;
    cursor: pointer;
  }

  .info {
    max-width: calc(100% - 120px);
    max-height: 70px;
  }

  .title {
    font-size: 1.3em;
  }

  .art {
    height: 50px;
    width: 50px;
    margin-left: auto;
    margin-right: 10px;
    background: grey;
    border-radius: 5px;
  }
</style>

<div
  class="selected-album"
  in:fly={{ x: -window.innerWidth, duration: 300, opacity: 1, easing: quadOut }}
  out:fly={{ x: -window.innerWidth, duration: 300, opacity: 1, easing: quadOut }}
>
  <div class="header">
    <div on:click={close} class="back-button">
      <BackArrow />
    </div>
    <div class="info">
      <div class="title no-overflow-text">{album.title}</div>
      <div class="artist no-overflow-text">{album.artist}</div>
    </div>
    <div class="art">
      <AlbumArt songId={album.songs[0].id} />
    </div>
  </div>
  <PlayShuffle songs={album.songs} />
  <PlayableList songs={album.songs} let:onClick={playSong}>
    {#each album.songs as { id, trackNumber, title } (id)}
      <Song {trackNumber} {title} onClick={() => playSong(id)} />
    {/each}
  </PlayableList>
</div>
