#!/bin/bash
cd /home/kavia/workspace/code-generation/meme-creator-studio-312364-312373/meme_generator_backend
npm run lint
LINT_EXIT_CODE=$?
if [ $LINT_EXIT_CODE -ne 0 ]; then
  exit 1
fi

