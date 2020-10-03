import jsmediatags from "jsmediatags";
import { v4 as uuid } from "uuid";

const encodeArt = (picture) => {
  if (!picture) {
    return null;
  }
  let base64String = "";
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < picture.data.length; i++) {
    base64String += String.fromCharCode(picture.data[i]);
  }
  return window.btoa(base64String);
};

const readFile = (file) =>
  new Promise((resolve, reject) => {
    jsmediatags.read(file, {
      onSuccess(tag) {
        const {
          tags: {
            album = "Untitled",
            artist = "Untitled",
            title = "Untitled",
            track = "1",
            picture,
          },
        } = tag;
        const trackNumber = parseInt(track.split("/")[0], 10);

        resolve({
          album,
          artist,
          title,
          trackNumber,
          audio: file,
          id: uuid(),
          art: encodeArt(picture),
        });
      },
      onError(error) {
        reject(error);
      },
    });
  });

export default (files) =>
  Promise.allSettled([...files].map((file) => readFile(file)));
