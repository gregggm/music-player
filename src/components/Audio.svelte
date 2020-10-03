<script>
  import { player, playNext } from "../stores/player";
  import { loadAudio } from "../services/database";

  let audioElement;

  $: if (audioElement) {
    if ($player.isPlaying) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
  }

  let playingSongId;

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
