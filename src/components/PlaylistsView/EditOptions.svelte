<script lang="ts">
  import { onDestroy } from "svelte";
  import Add from "../../icons/Add.svelte";
  import Delete from "../../icons/Delete.svelte";
  import { deletePlaylist } from "../../stores/playlists";
  import { setAddToPlaylist } from "../../stores/search";

  onDestroy(() => setAddToPlaylist(false));

  export let playlist: Playlist;
  export let close: () => void;

  const onDeleteClick = () => {
    deletePlaylist(playlist);
    close();
  };
  const onAddSongsClick = () => {
    setAddToPlaylist(true);
  };
</script>

<style>
  div {
    height: 60px;
    display: flex;
    align-items: centre;
    justify-content: space-evenly;
    padding: 10px 0;
    margin-top: 5px;
  }

  button {
    width: 42%;
    border-radius: 10px;
    transition: background-color 0.2s;
  }

  button:active {
    background-color: darkgray;
  }

  .delete-playlist {
    color: #ff4c40;
  }
</style>

<div>
  <button class="delete-playlist" on:click={onDeleteClick}><Delete /></button>
  <button class="add-songs" on:click={onAddSongsClick}><Add /></button>
</div>
