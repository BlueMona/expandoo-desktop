# expandoo-desktop

This repository consists of **overrides** -- files that will overwrite
equivalent files in the peerio-destkop project.


## TODO

* Publisher name (json-overrides.json)
* All icons must be valid (examples: https://github.com/PeerioTechnologies/peerio-desktop/tree/master/icons)
* Adjust src/styles/vars/_colors.scss for Expandoo color theme


## Releasing

### Building a test release without publishing

```
npm install
./scripts/test-build.sh
```

Build results will be in `test-build` directory.
### Building and publishing a release


See [release instruction](https://github.com/PeerioTechnologies/desktop-release-builder) for setup details.

Example command:

```
./scripts/deploy.sh
```
