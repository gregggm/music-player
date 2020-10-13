<script>
  import { player, playNext } from "../stores/player";
  import { loadAudio } from "../services/database";
  import { onMount } from "svelte";
  import { spring } from "svelte/motion";

  let audioElement;
  const audioContext = new AudioContext();
  let source;
  let rms = spring(0, { damping: 0.4, stiffness: 0.05 });
  

  onMount(() => {
    source = audioContext.createMediaElementSource(audioElement);
    source.connect(audioContext.destination);
  });

  function visualise() {
    const analyzer = Meyda.createMeydaAnalyzer({
      audioContext: audioContext,
      source: source,
      bufferSize: 512,
      featureExtractors: ["rms", "amplitudeSpectrum", "energy"],
      callback: (features) => {
        console.log(features);
        $rms = features.rms * 2000;
        // levelRangeElement.value = features.rms;
      },
    });
    analyzer.start();
  }

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
      loadAudio(playingSongId)
        .then((blob) => {
          audioElement.src = URL.createObjectURL(blob);
        })
        .then(() => {
          visualise();
        });
    }
  }

  $: if (!$player.current && audioElement) {
    audioElement.src = "";
  }
</script>

<style>
  div {
    position: absolute;
    z-index: 2000;
    width: 1px;
    bottom: -0;
    height: 500px;
    background-color: #333;
  }
</style>

<div style="height: {$rms}px"></div>

<audio hidden controls on:ended={playNext} bind:this={audioElement}>
  <track kind="captions" />
</audio>
