# Alex's home server

My home server docker config + some scripts.

- HTPC setup with Plex inspired by [sebgl/htpc-download-box](https://github.com/sebgl/htpc-download-box)
- Home Assistant with Mosquitto as an MQTT broker for home automation
- A custom dynamic DNS setup using the CloudFlare DNS records API

## Ports

<table>
  <tr><th>Service</th><th>Port</th></tr>
  <tr><td>homeassistant</td><td>8443</td></tr>
  <tr><td>zwavejs2mqtt web interface</td><td>8091</td></tr>
  <tr><td>zwavejs2mqtt websocket server</td><td>3000</td></tr>
  <tr><td>mosquitto MQTT broker</td><td>1883</td></tr>
  <tr><td>mosquitto MQTT broker websocket server</td><td>9001</td></tr>
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
