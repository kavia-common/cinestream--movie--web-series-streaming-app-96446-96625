#!/bin/bash
cd /home/kavia/workspace/code-generation/cinestream--movie--web-series-streaming-app-96446-96625/Frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

