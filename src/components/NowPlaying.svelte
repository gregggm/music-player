<script lang="ts">
  import { spring } from "svelte/motion";
  import { fade, fly } from "svelte/transition";
  import DownArrow from "../icons/DownArrow.svelte";
  import Next from "../icons/Next.svelte";
  import Pause from "../icons/Pause.svelte";
  import Play from "../icons/Play.svelte";
  import Prev from "../icons/Prev.svelte";
  import { player, play, pause, playNext, playPrev } from "../stores/player";
  import AlbumArt from "./AlbumArt.svelte";

  const togglePlaying = () => {
    if ($player.isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const springOptions = { damping: 0.4, stiffness: 0.05 };
  const height = spring<number>(70, springOptions);
  const artAnimation = spring({ size: 50, px: 10, py: 10 }, springOptions);
  const songInfoAnimation = spring({ px: 70, py: 10 }, springOptions);
  const playPauseAnimation = spring(
    { size: 40, px: 15, py: 15 },
    springOptions
  );

  let expanded = false;

  const close = () => {
    expanded = false;
    height.set(70);
    artAnimation.set({ size: 50, px: 10, py: 10 });
    songInfoAnimation.set({
      py: 10,
      px: 70,
    });
    playPauseAnimation.set({
      size: 40,
      py: 15,
      px: 15,
    });
  };

  const open = () => {
    if (expanded) return;

    expanded = true;
    const maxWidth = window.innerHeight / 2;
    const width =
      maxWidth > window.innerWidth * 0.9 ? window.innerWidth * 0.9 : maxWidth;
    const leftMargin = window.innerWidth / 2 - width / 2;

    height.set(window.innerHeight - 70);
    songInfoAnimation.set({
      py: width + 70,
      px: window.innerWidth / 2 - width / 2,
    });
    artAnimation.set({
      size: width,
      px: leftMargin,
      py: 50,
    });
    playPauseAnimation.set({
      size: 60,
      py: 25,
      px: window.innerWidth / 2 - 30,
    });
  };
</script>

<style>
  .now-playing {
    z-index: 10;
    position: absolute;
    width: 100%;
    height: 70px;
    bottom: 60px;
    backdrop-filter: saturate(300%) blur(50px);
    background-color: rgba(240, 240, 240, 0.7);
  }

  .art {
    object-fit: cover;
    position: absolute;
    background: grey;
    border-radius: 5px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  }

  .close {
    width: 100%;
    height: 50px;
    background: none;
    font-size: 2em;
    text-align: center;
  }

  .song-info {
    position: absolute;
    height: 50px;
    width: calc(100vw * 0.9 - 80px);
    max-width: calc(100vh / 2);
  }
  .title {
    font-size: 1.2em;
  }
  .artist {
    color: grey;
  }

  .media-control {
    position: absolute;
    height: 50px;
    width: 50px;
  }
  .prev {
    bottom: 30px;
    left: calc(100vw / 2 - 120px);
  }
  .next {
    bottom: 30px;
    right: calc(100vw / 2 - 120px);
  }
</style>

<div class="now-playing" on:click={open} style="height: {$height}px">
  <div
    class="song-info"
    style="left: {$songInfoAnimation.px}px; top: {$songInfoAnimation.py}px"
  >
    <div class="title no-overflow-text">{$player.current?.title ?? ''}</div>
    <div class="artist no-overflow-text">{$player.current?.artist ?? ''}</div>
  </div>

  <div
    class="art"
    style="height: {$artAnimation.size}px; width: {$artAnimation.size}px; left: {$artAnimation.px}px; top: {$artAnimation.py}px"
  >
    <AlbumArt songId={$player.current?.id} />
  </div>

  <div
    class="media-control"
    on:click|stopPropagation={togglePlaying}
    style="right: {$playPauseAnimation.px}px; bottom: {$playPauseAnimation.py}px; width: {$playPauseAnimation.size}px; height: {$playPauseAnimation.size}px;"
  >
    {#if $player.isPlaying}
      <Pause />
    {:else}
      <Play />
    {/if}
  </div>

  {#if expanded}
    <div in:fade out:fade class="close" on:click|stopPropagation={close}>
      <DownArrow />
    </div>
    <div
      class="media-control prev"
      in:fly={{ x: 80, y: 15, duration: 500, opacity: 0 }}
      out:fly={{ x: 80, y: 15, duration: 500, opacity: 0 }}
      on:click={playPrev}
    >
      <Prev />
    </div>
    <div
      class="media-control next"
      in:fly={{ x: 20, y: 15, duration: 500, opacity: 0 }}
      out:fly={{ x: 20, y: 15, duration: 500, opacity: 0 }}
      on:click={playNext}
    >
      <Next />
    </div>
  {/if}
</div>
