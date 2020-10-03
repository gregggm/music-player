<script lang="ts">
  import PlayShuffle from "../PlayShuffle.svelte";
  import Song from "./Song.svelte";
  import { songs } from "../../stores/songs";
  import PlayableList from "../PlayableList.svelte";
</script>

<div>
  <PlayShuffle songs={$songs} />
  <PlayableList songs={$songs} let:onClick={playSong}>
    {#each $songs as song (song.id)}
      <Song {song} onClick={() => playSong(song.id)} />
    {/each}
  </PlayableList>
</div>
