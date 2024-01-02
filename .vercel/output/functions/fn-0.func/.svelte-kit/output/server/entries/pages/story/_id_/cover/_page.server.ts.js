import { f as getStoryImage } from "../../../../../chunks/stories.js";
async function load({ params, url }) {
  const imageUrl = await getStoryImage(Number(params.id));
  return {
    id: params.id,
    imageUrl: imageUrl[0].image
  };
}
export {
  load
};
