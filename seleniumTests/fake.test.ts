import { WebDriver } from "selenium-webdriver";
import { GetDriver } from "@utilities/builder";
import { ENV_ADDRESS, ENV_BROWSERDRIVER, ENV_TIMEOUT, ENV_TIMETOLIVE } from "@utilities/defaultEnvs";

/**
 * Testing template
 */

jest.setTimeout(ENV_TIMEOUT);

describe(`${ENV_BROWSERDRIVER} tests`.toUpperCase(), () => {
    const rootURL: string = ENV_ADDRESS; //Required -> addresses; // Starting URL
    const ttl: number = ENV_TIMETOLIVE; // in ms

    let driver: WebDriver;

    beforeAll(async () => {
        driver = GetDriver(ENV_BROWSERDRIVER);
        await driver.get(rootURL);
    }, ttl);

    afterAll(async () => {
        await driver.quit();
    }, ttl);
});
