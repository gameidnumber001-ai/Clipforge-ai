# ClipForge AI — link-first MVP UI (v0.2)

## Product flow selected
- Sources: YouTube, Facebook, TikTok (link recognition only in this prototype)
- Output: 3–5 clips per source video
- Captions: English
- Default format: 9:16 vertical
- User workflow: paste link → AI analysis → review/download clips

## What works in this build
- Responsive landing page and Studio UI
- Link input and basic platform URL recognition
- Clip count selector (3, 4, 5), English caption setting, aspect-ratio selector
- Optional local video preview

## Not implemented yet
- Fetching/importing media from platform URLs
- Platform API/OAuth permissions and source ownership checks
- Transcription, AI highlight ranking, clip segmentation
- Face tracking, subtitle burn-in, FFmpeg rendering, cloud jobs, MP4 download
- Accounts, database, storage, rate limits and billing

The interface deliberately does not pretend a link has been processed. Platform URLs are not universally downloadable. Production support must use official/authorized platform access or a video file uploaded by a rights-holder. Do not bypass login, DRM, access controls, or platform restrictions.

## Run
Open `index.html` in a modern browser or deploy as a static site. The current build is a frontend prototype, not a live AI video service.

## Next engineering milestone
Build a backend job pipeline: authorized source ingestion/upload → media metadata → speech transcription with timestamps → AI ranking of 3–5 candidate segments → FFmpeg 9:16 rendering with English subtitles → secure downloadable outputs. Keep all API keys server-side.
