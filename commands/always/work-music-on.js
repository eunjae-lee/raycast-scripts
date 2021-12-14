#!/usr/bin/env node

// @raycast.title Play Work Music
// @raycast.mode compact
// @raycast.icon 🎹
// @raycast.schemaVersion 1

const { runAppleScript } = require("../../lib");

runAppleScript(`
  on is_running(appName)
    tell application "System Events" to (name of processes) contains appName
  end is_running

  if not is_running("Dark Noise") then
    tell application "Dark Noise"
      launch
      delay 3
    end tell
  end if

  tell application "System Events"
    tell process "Dark Noise"
      click menu item "Play" of menu "Controls" of menu bar 1
    end tell
  end tell

  tell application "Music"
    set song repeat to all
    set shuffle enabled to true
    play the playlist named "Yun Seok Cheol (For Work)"
  end tell

  set volume output volume 30 --100%
`);
