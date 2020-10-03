<script lang="ts">
  export let trackNumber: number;
  export let title: string;
  export let onClick: () => void = () => {};
</script>

<style>
  .song {
    width: 100%;
    height: 40px;
    padding: 5px 0;
    display: flex;
    justify-content: left;
    align-items: center;
  }

  .track-number {
    font-size: 0.8em;
    color: grey;
    width: 45px;
    text-align: center;
  }

  .title {
    font-size: 1.2em;
  }
</style>

<div class="song" on:click={onClick}>
  <span class="track-number">{trackNumber}</span>
  <div class="title">{title}</div>
</div>
