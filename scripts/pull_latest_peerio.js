#!/usr/bin/env node
'use strict';

const fs = require('fs');
const execp = require('./lib/execp');

const distDir = require('./lib/config').buildDir;
const repo = 'git@github.com:peeriotechnologies/peerio-desktop.git';
const semverRegEx = /(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(-(0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(\.(0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*)?(\+[0-9a-zA-Z-]+(\.[0-9a-zA-Z-]+)*)?/;

let commit, tag;



Promise.resolve()
    .then(() => {
        if (!fs.existsSync(`${distDir}`)) {
            console.log('\x1b[35m ... creating directory ...');
            return execp(`mkdir ${distDir}`);
        }
        return Promise.resolve();
    })
    .then(() => {
        if (!fs.existsSync(`${distDir}/.git`)) {
            console.log('\x1b[35m ... cloning ...');
            return execp(`git clone ${repo} ${distDir}`);
        }
        return Promise.resolve();
    })
    .then(() => {
        return execp(`git fetch --all --tags --prune`);
        //return execp(`cd ${distDir} && git clean -d -x -f`)
    })
    .then(() => {
        return execp(`git ls-remote --tags ${repo}`);
    })
    .then(tagList => {
        const tags = tagList.split(/\s/);
        commit = tags[tags.length - 3];
        tag = tags[tags.length -2].match(semverRegEx)[0]; // 2.3.1-rc2

        console.log('\x1b[35m ... resetting working dir changes ...');
        return execp(`cd ${distDir} && git reset --hard`)
    })
    .then(output => {
        console.log(output)
        console.log(`\x1b[35m ... checking out v${tag} ...`);
        return execp(`cd ${distDir} && git checkout ${commit}`)
    })
    .then(() => {
        console.log('\x1b[35m ... installing dependencies ...');
        return execp(`cd ${distDir} && npm install`)
    })
    .catch(err => {
        console.error('pull_latest_peerio ERROR: ', err);
        process.exit(1)
    })

