<script>
  import MenuBar from "./components/MenuBar.svelte";
  import Library from "./components/Library.svelte";
  import NowPlaying from "./components/NowPlaying.svelte";
  import Audio from "./components/Audio.svelte";
  import Search from "./components/Search.svelte";
  import Welcome from "./components/Welcome.svelte";
  import { songs as songsStore } from "./stores/songs";
  import { playlists as playlistsStore } from "./stores/playlists";
  import { search } from "./stores/search";
  import { loadingLibrary } from "./stores/loadingLibrary";
  import { loadLibrary, storeSongs } from "./services/database";
  import loadAudioFile from "./services/loadAudioFile";

  const addExampleSong = (data) => {
    if (data.length === 0) {
      return fetch("/Sister.mp3")
        .then((response) => response.blob())
        .then((blob) => loadAudioFile([blob]))
        .then((file) => {
          file = file
            .filter((file) => file.status === "fulfilled")
            .map((file) => file.value);
          return storeSongs(file).then(() => loadLibrary());
        });
    }

    return data;
  };

  loadLibrary()
    .then(addExampleSong)
    .then((data) => {
      const songs = data.filter((x) => x.type === "song");
      const formattedSongs = songs.map(
        ({ _id, title, album, artist, trackNumber }) => ({
          id: _id,
          title,
          album,
          artist,
          trackNumber,
        })
      );
      songsStore.set(formattedSongs);

      const playlists = data.filter((x) => x.type === "playlist");
      const formattedPlaylists = playlists.reduce((accumulator, playlist) => {
        accumulator[playlist._id] = {
          id: playlist._id,
          title: playlist.title,
          songs: playlist.songs,
        };
        return accumulator;
      }, {});
      playlistsStore.set(formattedPlaylists);

      loadingLibrary.set(false);
    });
</script>

<style>
  :global(*) {
    box-sizing: border-box;
  }

  :global(body) {
    padding: 0;
  }

  :global(button) {
    border: none;
    outline: none;
    padding: 0;
    margin: 0;
    background-color: #efefef;
    font-size: 13px;
  }

  :global(.no-overflow-text) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .app-container {
    display: grid;
    grid-template-rows: calc(100vh - 60px) 60px;
    grid-template-areas:
      "main"
      "menubar";
    height: 100vh;
    width: 100%;
  }
</style>

<div class="app-container">
  <Welcome />
  {#if $search.active}
    <Search />
  {/if}
  <Library />
  <NowPlaying />
  <MenuBar />
  <Audio />
</div>
