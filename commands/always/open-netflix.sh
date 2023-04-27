#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title Open Netflix
# @raycast.mode compact

# Optional parameters:
# @raycast.icon 🤖

# Documentation:
# @raycast.author Eunjae Lee

open raycast://extensions/raycast/system/set-volume-to-75
osascript -e 'tell application "System Events" to set brightness to 1.0'
open "https://netflix.com"
open raycast://script-commands/wifi-living-room