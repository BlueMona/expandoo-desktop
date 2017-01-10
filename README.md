# expandoo-desktop

This repository consists of **overrides** -- files that will overwrite equivalent files in the peerio-destkop project. 

For most releases, you will want to run `npm run release` to bump the version, then `npm run dist` to build the application -- and, once tested, `npm run publish`.

Please note that changes made to the files inlcuded in `overrides/` will not automatically propagate from peerio-desktop in any way. So, for example, if you made a change to `src/config.js` in peerio-desktop, and this change needs to be made in `expandoo-desktop`, the latter will need to be changed manually. 

## One (ok, 2) stop shop: `npm run release`

Pulls peerio-destkop, makes necessary modifications from local overrides, bumps version number.

Follow this by `npm run publish` if you're sure everything is right.

## Smaller steps

### `npm run bump`

Sets the top-level version number to `max($PEERIO_DESKTOP_VESION, $EXPANDOO_DESKTOP_VERSION + 1 patch)`

So, if peerio-desktop's latest release is 1.3.4, and peerio-expandoo's latest release is also 1.3.4, the resulting bump will be to 1.3.5. This allows for expandoo-specific changes to bump the version by a patch number.

Note that the top-level release number set here will propagate down to the final Expandoo build. (See below)

### `npm run pull`

Pulls the latest tag of `peerio-desktop` and installs its dependencies.

### `npm run dist`

1. `customize:files`: performs an rsync between `overrides/` and `build`
2. `customize:string`: overwrites the following field
    - in `build/package.json` and `build/app/package.json`
        - `name`, `description`, `repository.url`, `bugs.url`, `homepage`
        - `version` (**important** -- overwrites peerio-desktop version number)
        - all of `build`
    - in `build/src/index.html` 
3. `app:dist`: runs peerio-desktop's `npm run dist` on the result


### `npm start`

Steps 1-2 above, and `app:start` runs peerio-desktop's `npm start` on the result.

### `npm run publish`

Publishes the tag. 
