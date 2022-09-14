import { Builder, ThenableWebDriver, WebDriver } from "selenium-webdriver";
import { Options as chromeOptions } from "selenium-webdriver/chrome";
import { Options as firefoxOptions } from "selenium-webdriver/firefox";
import {
    ENV_BINARIES,
    ENV_CHROME_BINARIES_PATH,
    ENV_DESKTOP_SIZE,
    ENV_EDGE_BINARIES_PATH,
    ENV_FIREFOX_BINARIES_PATH,
    ENV_GRID_ROUTER_ADDRESS,
    ENV_LOCATION,
    ENV_MOBILE_SIZE,
    ENV_UI,
} from "@utilities/defaultEnvs";

// @ts-ignore
const edge = require("selenium-webdriver/edge");
const WIDTH_MOBILE: number = ENV_MOBILE_SIZE.width;
const HEIGHT_MOBILE: number = ENV_MOBILE_SIZE.height;
const WIDTH_DESKTOP: number = ENV_DESKTOP_SIZE.width;
const HEIGHT_DESKTOP: number = ENV_DESKTOP_SIZE.height;

/**
 * Sets WebDriver options and creates WebDriver instance
 * @param browserDriver string representing which WebDriver it should create (currently available: chrome, firefox, MicrosoftEdge, safari)
 * @param size empty as default, "desktop" for WIDTH_DESKTOP width, "mobile" for WIDTH_MOBILE
 * @returns WebDriver instance or throws error if creating new instance fails
 */
export function GetDriver(
    browserDriver: string,
    size: string = "",
    UI: string = ENV_UI,
    binaries: string = ENV_BINARIES,
    location: string = ENV_LOCATION
): WebDriver {
    try {
        switch (browserDriver) {
            case "MicrosoftEdge":
                return BuildEdgeDriver(size, UI, binaries, location);
            case "chrome":
                return BuildChromeDriver(size, UI, binaries, location);
            case "safari":
                return BuildSafariDriver(size);
            case "firefox":
                return BuildFirefoxDriver(size, UI, binaries, location);
            default:
                return undefined;
        }
    } catch {
        return null;
    }
}

/**
 * Sets Safari WebDriver size and build it. Its binaries and headlessness can't be set so it's always default and with GUI
 * @param size empty as default, "desktop" for WIDTH_DESKTOP width, "mobile" for WIDTH_MOBILE
 * @returns built Safari WebDriver instance
 */
function BuildSafariDriver(
    size: string
    // location: string
): WebDriver {
    const safariDriver: WebDriver = new Builder().forBrowser("safari").build();

    if (size === "mobile")
        safariDriver.manage().window().setRect({ width: WIDTH_MOBILE, height: HEIGHT_MOBILE });
    else if (size === "desktop")
        safariDriver.manage().window().setRect({ width: WIDTH_DESKTOP, height: HEIGHT_DESKTOP });

    return safariDriver;
}

/**
 * Sets Chrome WebDriver options and builds it
 * @param size empty as default, "desktop" for WIDTH_DESKTOP width, "mobile" for WIDTH_MOBILE
 * @returns built Chrome WebDriver instance
 */
function BuildChromeDriver(size: string, UI: string, binaries: string, location: string): ThenableWebDriver {
    const chromeSettings = new chromeOptions();
    // On Windows, chromedriver prints whole console log to powershell terminal, this only prints fatal errors.
    // Couldn't find a way to disable it completely with JS bindings.
    chromeSettings.addArguments("--log-level=3");

    if (UI === "headless") chromeSettings.headless();

    if (binaries === "custom") chromeSettings.setChromeBinaryPath(ENV_CHROME_BINARIES_PATH);

    if (size === "mobile") chromeSettings.windowSize({ width: WIDTH_MOBILE, height: HEIGHT_MOBILE });
    else if (size === "desktop") chromeSettings.windowSize({ width: WIDTH_DESKTOP, height: HEIGHT_DESKTOP });

    if (location === "remote")
        return new Builder()
            .forBrowser("chrome")
            .setChromeOptions(chromeSettings)
            .usingServer(ENV_GRID_ROUTER_ADDRESS)
            .build();
    else return new Builder().forBrowser("chrome").setChromeOptions(chromeSettings).build();
}

/**
 * Sets Microsoft Edge WebDriver options and builds it
 * @param size empty as default, "desktop" for WIDTH_DESKTOP width, "mobile" for WIDTH_MOBILE
 * @returns built Microsoft Edge WebDriver instance
 */
function BuildEdgeDriver(size: string, UI: string, binaries: string, location: string): ThenableWebDriver {
    const edgeSettings = new edge.Options();
    // On Windows, edgedriver prints whole console log to powershell terminal, this only prints fatal errors.
    // Couldn't find a way to disable it completely with JS bindings.
    edgeSettings.addArguments("--log-level=3");

    if (UI === "headless") edgeSettings.headless();

    if (binaries === "custom") edgeSettings.setBinaryPath(ENV_EDGE_BINARIES_PATH);

    if (size === "mobile") edgeSettings.windowSize({ width: WIDTH_MOBILE, height: HEIGHT_MOBILE });
    else if (size === "desktop") edgeSettings.windowSize({ width: WIDTH_DESKTOP, height: HEIGHT_DESKTOP });

    if (location === "remote")
        return new Builder()
            .forBrowser("MicrosoftEdge")
            .setEdgeOptions(edgeSettings)
            .usingServer(ENV_GRID_ROUTER_ADDRESS)
            .build();
    else return new Builder().forBrowser("MicrosoftEdge").setEdgeOptions(edgeSettings).build();
}

/**
 * Sets Firefox WebDriver options and builds it
 * @param size empty as default, "desktop" for WIDTH_DESKTOP width, "mobile" for WIDTH_MOBILE
 * @returns built Firefox WebDriver instance
 */
function BuildFirefoxDriver(size: string, UI: string, binaries: string, location: string): WebDriver {
    const firefoxSettings: firefoxOptions = SetFirefoxSettings(size, UI, binaries);
    let firefoxDriver: WebDriver;

    if (location === "remote")
        firefoxDriver = new Builder()
            .forBrowser("firefox")
            .setFirefoxOptions(firefoxSettings)
            .usingServer(ENV_GRID_ROUTER_ADDRESS)
            .build();
    else firefoxDriver = new Builder().forBrowser("firefox").setFirefoxOptions(firefoxSettings).build();

    if (UI !== "headless" && size === "mobile")
        firefoxDriver.manage().window().setRect({ width: WIDTH_MOBILE, height: HEIGHT_MOBILE });
    else if (UI !== "headless" && size === "desktop")
        firefoxDriver.manage().window().setRect({ width: WIDTH_DESKTOP, height: HEIGHT_DESKTOP });

    return firefoxDriver;
}

/**
 * Sets Firefox WebDriver options
 * @param size empty as default, "desktop" for WIDTH_DESKTOP width, "mobile" for WIDTH_MOBILE
 * @returns set Firefox webdriver options
 */
function SetFirefoxSettings(size: string, UI: string, binaries: string): firefoxOptions {
    let firefoxSettings: firefoxOptions;

    if (binaries === "custom") {
        if (UI === "headless") {
            if (size === "mobile") {
                // custom binaries & headless mode & mobile size
                firefoxSettings = new firefoxOptions()
                    .setBinary(ENV_FIREFOX_BINARIES_PATH)
                    .windowSize({ width: WIDTH_MOBILE, height: HEIGHT_MOBILE })
                    .headless();
            } else if (size === "desktop") {
                // custom binaries & headless mode & desktop size
                firefoxSettings = new firefoxOptions()
                    .setBinary(ENV_FIREFOX_BINARIES_PATH)
                    .windowSize({ width: WIDTH_DESKTOP, height: HEIGHT_DESKTOP })
                    .headless();
            } else {
                // custom binaries & headless mode & default size
                firefoxSettings = new firefoxOptions().setBinary(ENV_FIREFOX_BINARIES_PATH).headless();
            }
        } else {
            // custom binaries & GUI mode
            firefoxSettings = new firefoxOptions().setBinary(ENV_FIREFOX_BINARIES_PATH);
        }
    } else {
        if (UI === "headless") {
            if (size === "mobile") {
                // default binaries & headless mode & mobile size
                firefoxSettings = new firefoxOptions()
                    .windowSize({ width: WIDTH_MOBILE, height: HEIGHT_MOBILE })
                    .headless();
            } else if (size === "desktop") {
                // default binaries & headless mode & desktop size
                firefoxSettings = new firefoxOptions()
                    .windowSize({ width: WIDTH_DESKTOP, height: HEIGHT_DESKTOP })
                    .headless();
            } else {
                // default binaries & headless mode & default size
                firefoxSettings = new firefoxOptions().headless();
            }
        } else {
            // default binaries & GUI mode
            firefoxSettings = new firefoxOptions();
        }
    }

    return firefoxSettings;
}
