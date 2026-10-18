/**
 * Fetch YouTube transcripts with the hosted YouTube Transcript Scraper on Apify.
 * Usage: APIFY_TOKEN=... node transcripts.mjs <youtube-url> [<youtube-url> ...]
 */
import { ApifyClient } from 'apify-client';

const ACTOR = 'muhammad_noman_riaz/youtube-video-transcript-super-scraper';
const urls = process.argv.slice(2).length ? process.argv.slice(2) : ['https://youtu.be/dQw4w9WgXcQ'];

const client = new ApifyClient({ token: process.env.APIFY_TOKEN });
const run = await client.actor(ACTOR).call({ startUrls: urls.map(url => ({ url })), language: 'default' });
const { items } = await client.dataset(run.defaultDatasetId).listItems();
for (const video of items) {
    console.log(`${video.title} (${video.transcriptLanguage}, ${video.transcript.length} segments)`);
    console.log(video.transcript_only_text.slice(0, 300), '\n');
}
