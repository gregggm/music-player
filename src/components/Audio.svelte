<script>
  import { player, playNext } from "../stores/player";
  import { loadAudio } from "../services/database";

  let audioElement;
  let playingSongId;

  $: if ($player.isPlaying) {
    audioElement?.play();
  } else {
    audioElement?.pause();
  }

  $: if (playingSongId !== $player.current?.id) {
    playingSongId = $player.current?.id;
    if (playingSongId) {
      console.log($player.current);
      loadAudio(playingSongId).then((blob) => {
        audioElement.src = URL.createObjectURL(blob);
      });
    }
  }

  $: if (!$player.current && audioElement) {
    audioElement.src = "";
  }
</script>

<audio hidden controls on:ended={playNext} bind:this={audioElement}>
  <track kind="captions" />
</audio>
