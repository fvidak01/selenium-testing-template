import { By, until, WebDriver, WebElement } from "selenium-webdriver";

export default {
    ID,
    Class,
    XPath,
    Css,
};

/**
 * Waits until element is located on page by ID and returns first found, if found
 * @param driver
 * @param ttl time-to-live, in ms
 * @param id element ID by which element can be found
 * @returns first WebElement located by ID or null if not located
 */
async function ID(driver: WebDriver, ttl: number, id: string): Promise<WebElement> {
    try {
        const _el: WebElement = await driver.wait(until.elementLocated(By.id(id)), ttl);
        return _el;
    } catch {
        return null;
    }
}

/**
 * Waits until element is located on page by xpath and returns first found, if found
 * @param driver
 * @param ttl time-to-live, in ms
 * @param xpath xpath by which element can be found
 * @returns first WebElement located by xpath or null if not located
 */
async function XPath(driver: WebDriver, ttl: number, xpath: string): Promise<WebElement> {
    try {
        const _el: WebElement = await driver.wait(until.elementLocated(By.xpath(xpath)), ttl);
        return _el;
    } catch {
        return null;
    }
}

/**
 * Waits until element is located on page by class and returns first found, if found
 * @param driver
 * @param ttl time-to-live, in ms
 * @param className class by which element can be found
 * @returns first WebElement located by class or null if not located
 */
async function Class(driver: WebDriver, ttl: number, className: string): Promise<WebElement> {
    try {
        const _el: WebElement = await driver.wait(until.elementLocated(By.className(className)), ttl);
        return _el;
    } catch {
        return null;
    }
}

/**
 * Waits until element is located on page by CSS and returns first found, if found
 * @param driver
 * @param ttl time-to-live, in ms
 * @param cssOrTag CSS or html tag (e.g. a or div or p) by which element can be found
 * @returns first WebElement located by cssOrTag or null if not located
 */
async function Css(driver: WebDriver, ttl: number, cssOrTag: string): Promise<WebElement> {
    try {
        const _el: WebElement = await driver.wait(until.elementLocated(By.css(cssOrTag)), ttl);
        return _el;
    } catch {
        return null;
    }
}
