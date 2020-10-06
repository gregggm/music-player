/* eslint-disable import/prefer-default-export */
import PouchDB from "pouchdb-browser";

const db = new PouchDB("music-player");

export const storeSongs = (songs) => {
  const formattedSongs = songs.map(
    ({ id, album, artist, title, trackNumber, audio, art }) => {
      const doc = {
        type: "song",
        _id: id,
        album,
        artist,
        title,
        trackNumber,
        _attachments: {
          audio: {
            content_type: "audio/mpeg",
            data: audio,
          },
        },
      };
      if (art) {
        doc._attachments.art = {
          content_type: "image/jpeg",
          data: art,
        };
      }
      return doc;
    }
  );

  return db.bulkDocs(formattedSongs);
};

export const storePlaylist = (playlist) =>
  db
    .put({
      type: "playlist",
      _id: playlist.id,
      title: playlist.title,
      songs: playlist.songs,
    })
    .catch(console.error);

export const updatePlaylist = (playlist) =>
  db
    .get(playlist.id)
    .then((doc) => {
      db.put({
        type: "playlist",
        _rev: doc._rev,
        _id: playlist.id,
        title: playlist.title,
        songs: playlist.songs,
      });
    })
    .catch(console.error);

export const deletePlaylist = (playlist) =>
  db
    .get(playlist.id)
    .then((doc) => db.remove(doc))
    .catch(console.error);

export const loadAudio = (id) => {
  return db.getAttachment(id, "audio");
};

const artCache = {};
export const loadArt = (id) => {
  if (artCache[id]) {
    return Promise.resolve(artCache[id]);
  }

  return db.get(id, { attachments: true }).then((doc) => {
    const image = doc?._attachments?.art?.data;
    if (image) {
      const url = `data:image/jpeg;base64,${image}`;
      artCache[id] = url;
      return url;
    }
    artCache[id] = null;
    return Promise.reject(`No artwork exists for: ${id}`);
  });
};

export const loadLibrary = () =>
  db
    .allDocs({ include_docs: true })
    .then(({ rows }) => rows.map((row) => row.doc));
