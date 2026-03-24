import { prefetchEmojiData } from './emoji/emoji-data.js';
import { emojiManifests } from './emoji/emoji-manifests.js';

/** Warm cache so the picker opens without waiting on first JSON fetch/parse. */
prefetchEmojiData();

export const manifests = [...emojiManifests];