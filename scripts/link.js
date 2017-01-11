#!/usr/bin/env node
'use strict';
const fs = require('fs');
const execp = require('./lib/execp');
const path = require('path');

const distDir = require('./lib/config').buildDir;

Promise.resolve()
    .then(() => {
        console.log()
        const dest = path.join(__dirname, '..', 'build');
        return execp(`rm -f ${dest} && ln -s ${distDir} ${dest}`)
    })
    .then(() => {
        const dest = path.join(__dirname, '..', 'dist');
        return execp(`rm -f ${dest} && ln -s ${path.join(distDir, 'dist')} ${dest}`)
    })
    .then(() => {
        console.log('\x1b[35m ... symlinked for easy access ...');
        process.exit(0);
    })

