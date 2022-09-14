//**Used in builder.ts */
// Address of a grid router
export const ENV_GRID_ROUTER_ADDRESS: string = process.env.ROUTER_ADDR; // =routerURL, URL of a Selenium router

// If browsers (not WebDrivers) are installed to non-default location
export const ENV_CHROME_BINARIES_PATH: string = process.env.BINARY_CHROME;
export const ENV_EDGE_BINARIES_PATH: string = process.env.BINARY_EDGE;
export const ENV_FIREFOX_BINARIES_PATH: string = process.env.BINARY_FIREFOX;
// Safari can't be installed anywhere else but where it always is, i.e. Safari is special, as usual

export const ENV_BINARIES: string = process.env.BINARIES; // =custom, used if custom binaries are used
export const ENV_LOCATION: string = process.env.LOCATION; // =remote, used if tests should be run on remote runner
export const ENV_UI: string = process.env.UI; // =headless, used if browsers should be run in headless mode

export const ENV_MOBILE_SIZE: { width: number; height: number } = { width: 425, height: 812 };
export const ENV_DESKTOP_SIZE: { width: number; height: number } = { width: 1440, height: 900 };

/** Used in tests */
const TESTING_SITE: string = "";
export const ENV_ADDRESS: string = process.env.ENVIRO + TESTING_SITE; // =https://*, preceding part of the address

export const ENV_TIMEOUT: number = +process.env.TIMEOUT || 1000 * 60; // in ms
export const ENV_BROWSERDRIVER: string = process.env.WEBDRIVER;
export const ENV_TIMETOLIVE: number = +process.env.TIMETOLIVE || 1000 * 30; // in ms
