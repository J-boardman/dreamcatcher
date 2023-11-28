import type { UseChatHelpers } from "ai/svelte/dist";
import { getContext } from "svelte";

export function getChatContext(){
    return getContext('chat') as UseChatHelpers
}