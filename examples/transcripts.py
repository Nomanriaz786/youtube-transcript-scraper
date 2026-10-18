"""Fetch YouTube transcripts in bulk with the hosted YouTube Transcript Scraper on Apify.

Usage: APIFY_TOKEN=... python transcripts.py <youtube-url> [<youtube-url> ...]
"""
import os
import sys

from apify_client import ApifyClient

ACTOR = "muhammad_noman_riaz/youtube-video-transcript-super-scraper"


def main(urls):
    client = ApifyClient(os.environ["APIFY_TOKEN"])
    run = client.actor(ACTOR).call(run_input={"startUrls": [{"url": u} for u in urls], "language": "default"})
    for video in client.dataset(run["defaultDatasetId"]).iterate_items():
        print(f"{video['title']} ({video['transcriptLanguage']}, {len(video['transcript'])} segments)")
        print(video["transcript_only_text"][:300], "\n")


if __name__ == "__main__":
    main(sys.argv[1:] or ["https://www.youtube.com/watch?v=qp0HIF3SfI4"])
