#!/usr/bin/env node
'use strict';
const fs = require('fs');
const execp = require('./lib/execp');
const path = require('path');

const distDir = '../.expandoo-desktop-build';

Promise.resolve()
    .then(() => {
        const dest = path.join(__dirname, '..', 'build');
        return execp(`rm ${dest} && ln -s ${path.join(__dirname, '..', distDir)} ${dest}`)
    })
    .then(() => {
        const dest = path.join(__dirname, '..', 'dist');
        return execp(`rm ${dest} && ln -s ${path.join(__dirname, '..', distDir, 'dist')} ${dest}`)
    })
    .then(() => {
        console.log('\x1b[35m ... symlinked for easy access ...');
        process.exit(0);
    })
