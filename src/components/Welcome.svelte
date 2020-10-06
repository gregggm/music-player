<script lang="ts">
  import { onMount } from "svelte";
  import { backIn, backOut } from "svelte/easing";
  import { fade, scale } from "svelte/transition";
  import Music from "../icons/Music.svelte";
  import { loadingLibrary } from "../stores/loadingLibrary";

  let delayTimout = true;
  let iconVisible = false;

  onMount(() => {
    iconVisible = true;
  });

  setTimeout(() => {
    delayTimout = false;
  }, 1500);
</script>

<style>
  .welcome {
    z-index: 1000;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
  }

  .icon {
    width: 5em;
    height: 5em;
  }
</style>

{#if delayTimout || $loadingLibrary}
  <div class="welcome" out:fade={{ delay: 500 }}>
    {#if iconVisible}
      <div
        class="icon"
        in:scale={{ easing: backOut, duration: 500 }}
        out:scale={{ easing: backIn, duration: 500 }}
      >
        <Music />
      </div>
    {/if}
  </div>
{/if}
