#!/usr/bin/env bash

export GH_TOKEN=''
peerio-desktop-release --nosign \
                       --tag dev \
                       --repository PeerioTechnologies/peerio-desktop \
                       --overrides PeerioTechnologies/expandoo-desktop \
                       --platforms win,mac \
                       --destination ./test-build
