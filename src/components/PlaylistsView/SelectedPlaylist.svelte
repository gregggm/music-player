<script lang="ts">
  import { fly } from "svelte/transition";
  import { quadOut } from "svelte/easing";
  import BackArrow from "../../icons/BackArrow.svelte";
  import PlayShuffle from "../PlayShuffle.svelte";
  import PlayableList from "../PlayableList.svelte";
  import Edit from "../../icons/Edit.svelte";
  import SongItem from "../SongsView/Song.svelte";
  import { updatePlaylist } from "../../stores/playlists";
  import Tick from "../../icons/Tick.svelte";
  import Add from "../../icons/Add.svelte";
  import Delete from "../../icons/Delete.svelte";

  export let playlist: Playlist;
  export let close: () => void;
  let editMode = false;
  console.log(playlist);

  const onEditButtonClick = () => {
    editMode = !editMode;
  };

  const onTitleFocus = (
    e: FocusEvent & { target: EventTarget & HTMLInputElement }
  ) => {
    if (e.target.value === "Untitled playlist") {
      e.target.value = "";
    }
  };

  const updateTitle = (title: string) => {
    playlist = { ...playlist, title };
    updatePlaylist(playlist);
  };
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
    padding-bottom: 70px;
  }

  .header {
    display: flex;
    justify-content: left;
    align-items: center;
    height: 60px;
    background: #dddddd;
  }

  .back-button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    width: 60px;
    cursor: pointer;
  }

  .info {
    width: calc(100% - 120px);
    max-height: 60px;
  }

  .title {
    font-size: 1.5em;
  }

  .edit {
    margin-left: auto;
    margin-right: 5px;
    width: 60px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .edit-title {
    font-size: 1.5em;
    background: none;
    border: none;
    outline: none;
    margin: 0;
    padding: 0;
    height: 40px;
    width: 100%;
  }

  .options {
    margin-top: 5px;
    height: 60px;
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
      {#if editMode}
        <input
          type="text"
          class="edit-title"
          value={playlist.title}
          on:change={(e) => updateTitle(e.target.value)}
          on:focus={onTitleFocus}
        />
      {:else}
        <div class="title no-overflow-text">{playlist.title}</div>
      {/if}
    </div>
    <div class="edit" on:click={onEditButtonClick}>
      {#if editMode}
        <Tick />
      {:else}
        <Edit />
      {/if}
    </div>
  </div>
  <div class="options">
    {#if editMode}
      <Add />
      <Delete />
    {:else}
      <PlayShuffle songs={playlist.songs} />
    {/if}
  </div>
  <PlayableList songs={playlist.songs} let:onClick={playSong}>
    {#each playlist.songs as song (song.id)}
      <SongItem {song} onClick={() => playSong(song.id)} />
    {/each}
  </PlayableList>
</div>