import { a as getContext } from "./lifecycle.js";
import { h as headerImage, l as logo, p as pageTitle } from "./stores.js";
const getChatContext = () => getContext("chat");
const randomID = () => Math.random().toString(36).substring(2, 9);
const resetHeaderImage = () => headerImage.set({ src: logo, rounded: false });
const isFollowingFeed = (url) => url.searchParams.get("filter") == "following";
function resetHeader() {
  pageTitle.set("Dreamcatcher");
  resetHeaderImage();
}
export {
  randomID as a,
  resetHeader as b,
  getChatContext as g,
  isFollowingFeed as i,
  resetHeaderImage as r
};
