# Getting started

## PREREQUISITES

-   have browsers you want to test on installed
-   have `npm` installed

> Installing `nvm` <https://github.com/nvm-sh/nvm> first and then using it to install desired `npm` version is easier and more reliable than just installing `npm`.  Plus, more useful in case you end up needing to use more than one `npm` version, which is quite likely to happen. `nvm` installation is on the link above (at the moment of writting it's literally copy and paste to console).

<br>

> You install desired `npm` version with

```bash
nvm install *version*
```

> where \*version\* is version you want to install. F.e. 20 will install the latest node v20 while 20.2.1 will install that version specifically. This repository has `.nvmrc` file so you can just use **nvm install** to install expected version. For more `nvm` information, check its GitHub repository.

-   have browser webdrivers in `$PATH` for browsers you want to test

> How to add something to `PATH` is different on different OSes. Google how and either move webdriver(s) to some directory already in `PATH` or create new directory where you'll put webdriver(s) and add that directory to `PATH`.

**WebDrivers:**

-   Chrome: <https://googlechromelabs.github.io/chrome-for-testing>
-   Firefox: <https://github.com/mozilla/geckodriver/releases>
-   Safari: in Terminal: safaridriver --enable
-   Edge: <https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver>

> Pay close attention to the version. Edge and Chrome WebDrivers' versions must be the same as Edge/Chrome browser that is installed.
> <br>
> For additional info: <https://www.selenium.dev/downloads/>

<br>

> Test if webdrivers work properly. Open new console or tab and write webdriver's name, f.e. *chromedriver* if you are going to use Chrome. If it says it doesn't exist, OS doesn't see it in `PATH`. Doublecheck if directory where webdrivers are is in `PATH`. Check if webdriver can be run from a directory where you put it. Move webdriver to different directory that is in `PATH`.
> Restart console completely and try running it again.  
> If all fails, contact someone who might know their way around `PATH` stuff and/or webdrivers. Nerds who use Linux in Profico are a good bet.

### MacOS troubleshooting

When you run specific driver for the first time, MacOS will block it and suggest to delete it. Don't.

-   Go to (Privacy &) Security settings and scroll down.
-   Above FileVault section, you'll have an option to Allow or Disallow blocked driver. Allow it.
-   Try to start it again and you should get different pop-up now. Click on Open or whichever version of OK text is used. Don't press Cancel.
-   You should be fine now to run tests on MacOS without it blocking you.

<br>

### Using Selenium WebDriver 4 Javascript bindings

> <https://www.npmjs.com/package/selenium-webdriver>

### Selenium WebDriverJS bindings documentation

> <https://www.selenium.dev/selenium/docs/api/javascript/index.html>

<br>

## SETTING IT UP

### Setting from this template repository

```bash
npm install
```

### Setting as a new project (skip 3rd and 4th add if you don't care about linter and formater)

This is a minimum setup if you just want jest, selenium-webdriver and typescript to work (with linters and formaters if you want).
Don't follow this is you already set it up from template repository.

```bash
npm init
npm install jest selenium-webdriver typescript ts-jest node-fetch@2.6.7
npm install @types/jest @types/selenium-webdriver @types/node-fetch cross-env
npm install eslint eslint-config-prettier eslint-plugin-unused-imports prettier
npm install @typescript-eslint/eslint-plugin @typescript-eslint/parser
npx jest --init
```

> when asked if you want to use Typescript, choose NO  
> add-> `preset: "ts-jest",` <-to module.exports in jest.config.js

```bash
tsc --init
```

Create eslint and prettier config files as you want. Or just copy them from somewhere. Same for ignore files. I made a template, use it.

<br>

<br>

### HOW TO RUN TESTS

#### Required envs

-   ENVIRO

> modifies testsite URL

-   WEBDRIVER

> determines on which WebDriver to run tests

#### Optional envs

-   LOCATION

    -   defaults to nothing, which runs tests locally
    -   `remote` uses link in defaultEnvs.ts, requires setting up

-   BINARIES

    -   defaults to nothing, which looks for default install location for used OS (ProgramFiles(and x86) for Windows or Applications for MacOS)
    -   `custom` uses path in defaultEnvs.ts, requires setting up

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

#### Windows10 Powershell: dev, chrome, headless, default binaries, local, 3 instances

```PowerShell
npm run ch3dev partOfANameOfTest(s)(suites)
```

<br>

#### MacOS zsh: production, Microsoft Edge, local, headless, default binaries, 3 instances

```zsh
npm run meh3 partOfANameOfTest(s)(suites)
```

<br>

Safari is special:

-   can't headless
-   always installed to default location
-   haven't even tried to find remote runner so you'll have to add that case to builder.ts yourself
-   WebDriver must not get out of focus so WebDrivers have to be run one by one

so for Safari it's:

```zsh
sfgdev partOfANameOfTest(s)(suites)
```

<br>

> FOR MORE DETAILS ON RUNNING JEST AND THOSE TESTS: <https://jestjs.io/docs/cli>, `package.json` and `defaultEnvs.ts`

<br>
