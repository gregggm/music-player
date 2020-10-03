<script>
  import loadAudioFile from "../services/loadAudioFile";
  import { storeSongs } from "../services/database";
  import { songs } from "../stores/songs";

  const handleInput = async (e) => {
    const { files: rawFiles } = e.currentTarget;

    const response = await loadAudioFile(rawFiles);
    const files = response
      .filter((file) => file.status === "fulfilled")
      .map((file) => file.value);

    console.log(files);

    await storeSongs(files).then(console.log).catch(console.error);

    songs.update((songs) => [
      ...songs,
      ...files.map(({ artist, id, title, trackNumber, album }) => ({
        artist,
        id,
        title,
        trackNumber,
        album,
      })),
    ]);
  };
</script>

<style>
  input {
    display: none;
  }

  label {
    font-size: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #efefef;
  }
</style>

<label for="song-input">
  Add Songs <input id="song-input" type="file" multiple accept="audio/mp3" on:change={handleInput} />
</label>
