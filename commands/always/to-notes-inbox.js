#!/usr/bin/env node

// @raycast.title Quick Draft
//
// @raycast.mode compact
// @raycast.icon 🗓
// @raycast.schemaVersion 1

const { runAppleScript, readClipboard } = require("../../lib");

runAppleScript(`
tell application "Notes"
    make new note at folder "Inbox" with properties {body:the clipboard}
    tell folder "Inbox"
        show note 1
    end tell
end tell
`);
