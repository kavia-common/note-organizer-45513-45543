#!/bin/bash
cd /home/kavia/workspace/code-generation/note-organizer-45513-45543/frontend_notes_app
npm run lint 
$ESLINT_EXIT_CODE
npm run build
BUILD_EXIT_CODE=$?
if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
  exit 1
fi

