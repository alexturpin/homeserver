#!/usr/bin/env zx
import "log-timestamp"
import { CLOUDFLARE_API_TOKEN, ZONE_ID, RECORD_ID } from "./config.mjs"

const dns_records_endpoint = `https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records/${RECORD_ID}`

const last_ip_file = "last_ip"
await $`touch ${last_ip_file}`

const last_ip = await fs.readFile(last_ip_file, "utf-8")

const res = await fetch("https://api.ipify.org/")
const new_ip = await res.text()

if (new_ip !== last_ip) {
  console.log("New IP detected", new_ip)

  await fs.writeFile(last_ip_file, new_ip)

  const res = await fetch(dns_records_endpoint, {
    method: "PATCH",
    withCredentials: true,
    credentials: "include",
    headers: {
      Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: new_ip,
    }),
  })

  const data = await res.json()

  if (data.success) {
    console.log("Updated IP successfully")
  } else {
    console.error("Error updating IP", data.errors)
  }
}
