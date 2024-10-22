# Alex's home server

My home server docker config + some scripts.

- HTPC setup with Plex inspired by [sebgl/htpc-download-box](https://github.com/sebgl/htpc-download-box)
- Home Assistant with Mosquitto as an MQTT broker for home automation
- A custom dynamic DNS setup using the CloudFlare DNS records API

## Docker

- Restart: `docker-compose restart [container]`
- Logs: `docker-compose logs -f [container]` or `docker-compose logs --tail 100 [container]`
- Update all images: `docker-compose pull`
  - update a single image: `docker-compose pull homeassistant`
- Let compose update all containers as necessary: `docker-compose up -d`
  - update a single container: `docker-compose up -d homeassistant`

## Size

- Disk info: `df -H /media/alex/Media`
- Directory disk usage: `du -sh /media/alex/Media/frigate`

## Todo

- Ombi (https://ombi.io/)

## Ports

<table>
  <tr><th>Service</th><th>Port</th></tr>
  <tr><td>homeassistant</td><td>8443</td></tr>
  <tr><td>zwavejs2mqtt web interface</td><td>8091</td></tr>
  <tr><td>zwavejs2mqtt websocket server</td><td>3000</td></tr>
  <tr><td>mosquitto MQTT broker</td><td>1883</td></tr>
  <tr><td>mosquitto MQTT broker websocket server</td><td>9001</td></tr>
  <tr><td>wyze-bridge web UI</td><td>5001</td></tr>
  <tr><td>frigate web UI</td><td>5000</td></tr>
  <tr><td>frigate RTMP</td><td>1935</td></tr>
</table>

## DDNS setup

You'll need Node.js and the [`zx`](https://github.com/google/zx) package installed globally:

```
npm i -g zx
```

Create a `config.mjs` module that exports the right values for `CLOUDFLARE_API_TOKEN`, `ZONE_ID`, `RECORD_ID`

Add a crontab entry to run `ddns.mjs` through zx, for example every 10 minutes, changing the current working directory (for the last_ip file) and setting up a separate log file.

```
*/10 * * * * cd ~/src/homeserver/ && ~/src/homeserver/ddns.mjs >> ~/src/homeserver/ddns.log
```

# Local IP

```
hostname -I
```

Needs to be updated in frigate config.
