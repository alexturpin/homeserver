#!/usr/bin/env zx
import { CLOUDFLARE_API_TOKEN, ZONE_ID } from "./config.mjs"

const dns_records_endpoint = `https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records`

const res = await fetch(dns_records_endpoint, {
  method: "GET",
  withCredentials: true,
  credentials: "include",
  headers: {
    Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
    "Content-Type": "application/json",
  },
})

const data = await res.json()

console.log(data)