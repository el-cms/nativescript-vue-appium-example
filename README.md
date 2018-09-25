# Nativescript-vue + Appium: configuration example

> An example of Appium integration in a Nativescript-vue project, based
on the work of [@SvetoslavTsenov](https://github.com/SvetoslavTsenov) on
his [PR](https://github.com/nativescript-vue/nativescript-vue-ui-tests/pull/7)
on [nativescript-vue-ui-tests](https://github.com/nativescript-vue/nativescript-vue-ui-tests).

**NOTE**: This has not been tested on iOS, so feel free to complete the
guide with your feedback. Also, it's possible (probable) that I get some
things wrong in my understanding of the whole thing.

## Pre-requisites

Your system should be configured to run nativescript apps in an Android emulator. But if you're here,
that's probably already good.

## Environment

I successfully managed to have this running with:

- `node` 8.11.3
- `tns` 4.2.4
- `nativescript-vue` 2.0.0
- `appium` 1.9.1 (installed globally): `npm install -g appium`
- `nativescript-dev-appium` 4.0.8: `npm install -D nativescript-dev-appium`

## Configuration files:

```txt
e2e
├── config
│   ├── appium.capabilities.json  // Appium targets configurations (devices)
│   └── mocha.opts                // Mocha configuration
├── resources                     // Empty folder, I guess it should contain files used during tests
├── sample.tests.js               // The actual tests
└── setup.js                      // Additional testing configuration
```

### `appium.capabilities.json`
It's a file you'll have to edit to fit your current setup. There are 3 sections
in it for now:
```json
{
  // This is a configuration section, you have to reference it when you 
  // run the suites: it tells Appium how the target is configured
  "android19": {
    "platformName": "Android",
    // This is important, it's the android version (not the API version)
    "platformVersion": "4.4",
    // This is the name of the virtual device, adapt it
    "deviceName": "Nexus_5X_API_19_x86",
    "noReset": false,
    // You should change this value to match the one in package.json
    // and app.gradle
    "appPackage": "org.nativescript.application",
    // I guess this is the main activity to open when launching the app
    "appActivity": "com.tns.NativeScriptActivity",
    // path to the apk to test. Leave it blank and appium will select
    // the first it finds.
    "app": ""
  },
  "ios-simulator103iPhone6": {
    "platformName": "iOS",
    "platformVersion": "10.3",
    "deviceName": "iPhone Simulator",
    "bundleId": "org.nativescript.application",
    "app": ""
  },
  "sim.iPhone8.iOS11.3": {
    "platformName": "iOS",
    "platformVersion": "11.3",
    "deviceName": "iPhone 8",
    "appiumVersion": "1.8.1",
    "bundleId": "org.nativescript.application",
    "noReset": true,
    "fullReset": false,
    "app": ""
  }
}
```

### `setup.js`
This file contains two additional hooks to launch and stop Appium when
the test suite is launched. I had to use them, but it may be unnecessary
for some of you (feedback on this would be great)

### Npm scripts
A few scripts are created in `package.json` to launch the suites:

- `build.android`: shortcut for `tns build android --bundle`
- `build.ios`: shortcut for `tns build ios --bundle`
- `e2e`: This one fails when launched alone, but is used as a shortcut
  in the last two.
- `e2e.<variants>`: Runs the tests on a freshly built apk

If you look at the `e2e` scripts, you'll notice they use the different
configuration sections declared in `appium.capabilities.json`

If you have several devices to test your app, you may create one new
script per configuration, or do something clever with parameters...

## Usage

```bash
# Install dependencies
npm install

# Build an apk for production
tns build <platform> --bundle
# Or, with the shortcuts in package.json:
npm run build.<platform>

# Test the built file
# Your emulator/device should be accessible/running.
# Variant can be "android" and "ios" in ths example
npm run e2e.<variant>

# Build, watch for changes and run the application
tns run <platform> --bundle
```
