#!/usr/bin/env node
'use strict';
const fs = require('fs');
const _ = require('lodash');
const semver = require('semver');
const execp = require('./lib/execp');
var argv = require('yargs').argv;

const distDir = require('./lib/config').buildDir;
const fsOpts = { encoding: 'utf8' };
const pkgFile = './package.json';
const pkgObj = JSON.parse(fs.readFileSync(pkgFile, fsOpts));
const expandooVersion = pkgObj.version;
const peerioVersion = JSON.parse(fs.readFileSync(`${distDir}/package.json`, fsOpts)).version;

let releaseType = 'patch';

if (argv.prerelease) {
    console.log('prerelease!')
    releaseType = 'prerelease';
}

// calculate version number
if (semver.gt(peerioVersion, expandooVersion)) {
    pkgObj.version = peerioVersion;
    console.log(`\x1b[35m ... using peerio-desktop version ${pkgObj.version} ...`);

} else {
    pkgObj.version = semver.inc(expandooVersion, releaseType, 'rc');
    console.log(`\x1b[35m ... bumping expandoo-desktop version to ${pkgObj.version} ...`);
}

// set windows build version
pkgObj.build.win.version = pkgObj.version;

// update version in top package.json
fs.writeFileSync(pkgFile, JSON.stringify(pkgObj, null, 2), fsOpts);


Promise.resolve()
    .then(() => {
        return execp(`git add ${pkgFile}`)
    })
    .then(() => {
        return execp(`git commit -m "chore(release): release ${pkgObj.version}"`)
    })
    .then(() => {
        return execp(`git tag v${pkgObj.version} -m "release ${pkgObj.version}"`)
    })
    .then(() => {
        process.exit(0);
    })
    .catch(err => {
        console.log('error', err);
        process.exit(1);
    })
