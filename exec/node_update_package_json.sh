#!/bin/sh

cd ..
npm install npm-check-updates
node_modules\.bin\ncu.cmd -u
npm uninstall npm-check-updates
