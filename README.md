# Alex's home server

My home server docker config + some scripts.

- HTPC setup inspired by [sebgl/htpc-download-box](https://github.com/sebgl/htpc-download-box)
  - Sonarr
  - Radarr
  - Jackett
  - Deluge
  - OpenVPN
  - Plex
- Home Assistant for home automation
- A custom dynamic DNS setup using the CloudFlare DNS records API

## DDNS setup

You'll need Node.js and the [`zx`](https://github.com/google/zx) package installed globally:

```
npm i -g zx
```

Create a `config.mjs` module that exports the right values for `CLOUDFLARE_API_TOKEN`, `ZONE_ID`, `RECORD_ID` 

Add a crontab entry to run `ddns.mjs` through zx, for example every 10 minutes:

```
*/10 * * * * ~/src/homeserver/ddns.mjs
```
