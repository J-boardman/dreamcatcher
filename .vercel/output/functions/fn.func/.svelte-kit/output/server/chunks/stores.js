import { w as writable } from "./index4.js";
const logo = {
  sources: {
    avif: "/_app/immutable/assets/logo.a162fd7b.avif 1x, /_app/immutable/assets/logo.dd78e8fd.avif 2x",
    webp: "/_app/immutable/assets/logo.a405edec.webp 1x, /_app/immutable/assets/logo.ca986fc2.webp 2x",
    png: "/_app/immutable/assets/logo.f06947d9.png 1x, /_app/immutable/assets/logo.1f5eba2f.png 2x"
  },
  img: {
    src: "/_app/immutable/assets/logo.1f5eba2f.png",
    w: 510,
    h: 494
  }
};
let pageTitle = writable("");
let headerImage = writable({ src: `${logo}`, rounded: false });
let profileTitle = writable("");
let state = writable();
const journal = writable();
let newsFeedStories = writable([]);
let fetching = writable(false);
export {
  profileTitle as a,
  fetching as f,
  headerImage as h,
  journal as j,
  logo as l,
  newsFeedStories as n,
  pageTitle as p,
  state as s
};
