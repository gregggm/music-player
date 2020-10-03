<script lang="ts">
  import { loadArt } from "../services/database";
  import noArt from "../../public/noArt";

  export let songId: string | undefined;
</script>

<style>
    .art {
        width: 100%;
        height: 100%;
        border-radius: 3px;
    }

    .loading {
        background-color: grey;
    }
</style>

{#await loadArt(songId)}
  <img class="art loading" alt="" />
{:then src}
  <img {src} class="art" alt="" />
{:catch}
  <img src={noArt} class="art" alt="" />
{/await}
