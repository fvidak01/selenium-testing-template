# Getting started

Go to the bottom if you want to run tests without setting up anything, just having access to Kubernetes cluster on [Openshift](#openshift).

## DON'T OVERLOOK THIS

-   have browsers you want to test on installed
-   have browser webdrivers in `$PATH` for browsers you want to test
-   I'm using node v16.17.0, not sure how will it work on v17. Tried it once, broke everything. Stick to v16 if you don't care about changes in v17.

**WebDrivers:**

-   Chrome: <https://sites.google.com/chromium.org/driver/>
-   Firefox: <https://github.com/mozilla/geckodriver/releases>
-   Safari: in Terminal: safaridriver --enable
-   Edge: <https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/>

> Pay close attention to the version. Edge and Chrome WebDrivers' versions must be the same as Edge/Chrome browser that is installed.
> For additional info: <https://www.selenium.dev/downloads/>

<br>

### Using Selenium WebDriver 4 Javascript bindings

> <https://www.npmjs.com/package/selenium-webdriver>

### Selenium WebDriverJS bindings documentation

> <https://www.selenium.dev/selenium/docs/api/javascript/index.html>

<br>

### NEW PROJECT (skip 3rd and 4th add if you don't care about linter and formater)

```bash
yarn init
yarn add jest selenium-webdriver typescript ts-jest node-fetch
yarn add @types/jest @types/selenium-webdriver @types/node-fetch cross-env
yarn add eslint eslint-config-prettier eslint-plugin-unused-imports prettier
yarn add @typescript-eslint/eslint-plugin @typescript-eslint/parser
npx jest --init
```

> when asked if you want to use Typescript, choose NO  
> add-> `preset: "ts-jest",` <-to module.exports in jest.config.js

```bash
tsc --init
```

Create eslint and prettier config files as you want. Or just copy them from somewhere. Same for ignore files. I made a template, use it.

<br>

### SETTING FROM THIS REPOSITORY

```bash
yarn
```

<br>

### HOW TO RUN TESTS

#### Required envs

-   ENVIRO

> modifies testsite URL, add site URL as `TESTING_SITE` value in `defaultEnvs.ts`

-   WEBDRIVER

> determines on which WebDriver to run tests

#### Optional envs

-   LOCATION

    -   defaults to nothing, which runs tests locally
    -   `remote` uses link in builder.ts, requires setting up

-   BINARIES

    -   defaults to nothing, which looks for default install location for used OS (ProgramFiles(and x86) for Windows or Applications for MacOS)
    -   `custom` uses path in builder.ts, requires setting up

-   UI

    -   defaults to nothing, which runs WebDriver in GUI mode
    -   `headless` runs browsers that have the capability (i.e. not Safari) to run in headless mode

-   TIMETOLIVE

    -   defaults to 30000ms
    -   accepts number in milliseconds

-   TIMEOUT
    -   defaults to 60000ms
    -   accepts number in milliseconds

> CHECK `package.json -> scripts` and `utils/defaultEnvs.ts` FOR MORE DETAILS

<br>

### Examples

#### Windows10 Powershell: production, chrome, headless, default binaries, local

In `.jest/setEnvVars.js` add

```javascript
process.env.ENVIRO = "https://";
process.env.WEBDRIVER = "chrome";
process.env.UI = "headless";
```

```PowerShell
yarn jest partOfANameOfTest(s)(suites)
```

<br>

#### MacOS zsh: dev, Microsoft Edge, local, headless, default binaries

```zsh
ENVIRO=https://dev. WEBDRIVER=MicrosoftEdge UI=headless yarn jest
```

<br>

Safari is special:

-   can't headless
-   always installed to default location
-   haven't even tried to find remote runner so you'll have to add that case to builder.ts yourself
-   WebDriver must not get out of focus so WebDrivers have to be run one by one

so for Safari it's:

```zsh
ENVIRO=http://dev. WEBDRIVER=safari yarn jest --maxWorkers=1 partOfANameOfTest(s)(suites)
```

<br>

> FOR MORE DETAILS ON RUNNING JEST AND THOSE TESTS: <https://jestjs.io/docs/cli>, `package.json` and `defaultEnvs.ts`

<br>

#### <a name="openshift"></a> Running test on Grid 4 deployed on OpenShift cluster

-   You don't need browsers nor WebDrivers set up on your PC.
-   Have repo cloned and set up.
-   Have Grid running on accessible (to you) URL. Don't host it publicly.
-   Tests on connected nodes can run on any site, not just from domain you set up for the router.
-   Add Grid URL to REMOTE_ADDR, either in `setEnvVars.js`, `package.json` or directly in terminal, same for following envs.
-   Set LOCATION="remote".
-   Set ENVIRO to whichever instance you want to test. `package.json` has examples.
-   Set WEBDRIVER to whichever node you deployed.
-   Set UI="headless".
-   Add --maxWorkers=`number` flag when running tests. `number` indicated number of worker nodes you set up. Less than maximum if you want more stable tests (claim is unproven (but tested), in theory it _might_ be like that). Testing says that when they start failing do to setup, just a few will fail and not pull down your whole testrun.

```zsh
yarn jest --maxWorkers=4 partOfANameOfTest(s)(suites)
```
