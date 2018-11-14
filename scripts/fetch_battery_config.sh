#!/usr/bin/env bash

mkdir -p src/config
curl -o src/config/battery.config.js https://s3.amazonaws.com/ksr-config/battery/latest/battery.config.js

# Add 'eslint-disable' line to top of battery config
echo "/* eslint-disable */
$(cat src/config/battery.config.js)" > src/config/battery.config.js
