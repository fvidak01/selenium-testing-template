import { By, until, WebDriver, WebElement } from "selenium-webdriver";

export default {
    Class,
    TestID,
};

/**
 * Waits until element is located on page by data-testid and returns all, if found
 * @param driver
 * @param ttl time-to-live, in ms
 * @param testid data-testid by which element(s) can be found
 * @returns array of WebElements with testid, or null if not found
 */
async function TestID(driver: WebDriver, ttl: number, testid: string): Promise<WebElement[]> {
    try {
        const _el: WebElement[] = await driver.wait(
            until.elementsLocated(By.css(`*[data-testid="${testid}"]`)),
            ttl
        );
        return _el;
    } catch {
        return null;
    }
}

/**
 * Waits until element is located on page by class and returns all, if found
 * @param driver
 * @param ttl time-to-live, in ms
 * @param testid class by which element(s) can be found
 * @returns array of WebElements with class, or null if not found
 */
async function Class(driver: WebDriver, ttl: number, className: string): Promise<WebElement[]> {
    try {
        const _el: WebElement[] = await driver.wait(until.elementsLocated(By.className(className)), ttl);
        return _el;
    } catch {
        return null;
    }
}
