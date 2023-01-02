#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title Wifi: Office
# @raycast.mode compact

# Optional parameters:
# @raycast.icon 📶

source ../../.env
m wifi connect mingpaul "${WIFI_OFFICE_PASSWORD}"
