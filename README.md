# expandoo-desktop

This repository consists of **overrides** -- files that will overwrite
equivalent files in the peerio-destkop project.


## TODO

* Links (config-base.js)
* Publisher name (json-overrides.json)
* All icons must be valid (examples: https://github.com/PeerioTechnologies/peerio-desktop/tree/master/icons)
* Adjust src/styles/vars/_colors.scss for Expandoo color theme


## Releasing

### Building a test release without publishing

(Requires [desktop-release-builder](https://github.com/PeerioTechnologies/desktop-release-builder) installed and configured)

```
peerio-desktop-release --nosign \
                       --repository PeerioTechnologies/peerio-desktop \
                       --overrides PeerioTechnologies/expandoo-desktop \
                       --destination ~/expandoo-test
```

### Building and publishing a release


See [release instruction](https://github.com/PeerioTechnologies/desktop-release-builder) for setup details.

Example command:

```
peerio-desktop-release --shared ~/Shared \
                       --repository PeerioTechnologies/peerio-desktop \
                       --overrides PeerioTechnologies/expandoo-desktop \
                       --publish
```
