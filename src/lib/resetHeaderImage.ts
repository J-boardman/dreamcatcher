import { headerImage } from "./stores";
import logo from "$lib/assets/logo.png"

export default function resetHeaderImage() {
    headerImage.set({ src: logo, rounded: false })
}