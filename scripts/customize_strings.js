#!/usr/bin/env node
'use strict';
const fs = require('fs');
const _ = require('lodash');
const path = require('path');

const distDir = require('./lib/config').buildDir;
const fsOpts = { encoding: 'utf8' };
const destinationJSONFiles = [
    path.join(distDir, 'package.json'),
    path.join(distDir, 'app/package.json')
];
const regexFiles = [
    path.join(distDir, 'src/index.html')
];
const sourceFile = JSON.parse(fs.readFileSync('./package.json', fsOpts));

destinationJSONFiles.forEach((filePath) => {
    const modified = JSON.parse(fs.readFileSync(filePath, fsOpts));

    ['name', 'version', 'description', 'repository.url', 'bugs.url', 'homepage', 'build'].forEach((objectPath) => {
        if(_.get(modified, objectPath)) {
            _.set(modified, objectPath, _.get(sourceFile, objectPath))
        }
    });

    fs.writeFileSync(filePath, JSON.stringify(modified, null, 2), fsOpts);
});

regexFiles.forEach((filePath) => {
    let modified = fs.readFileSync(filePath, fsOpts);
    modified = modified.replace(/Peerio/, 'Expandoo');
    fs.writeFileSync(filePath, modified, fsOpts);
});
