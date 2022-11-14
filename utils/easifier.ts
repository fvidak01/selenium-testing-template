import fetch from "node-fetch";

import { WebDriver, WebElement } from "selenium-webdriver";
import GetElBy from "@getElBy";

/**
 * Implicit wait
 * @param ms how long delay lasts in ms
 * @returns void Promise
 */
export function Delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Creates ordered number string from a number
 * @param n 1, 2, 3, 4...
 * @returns 1st, 2nd, 3rd, 4th...
 */
export function nOrderStringify(n: number): string {
    if (n % 100 === 11 || n % 100 === 12 || n % 100 === 13) return `${n}th`;
    switch (n % 10) {
        case 1:
            return `${n}st`;
        case 2:
            return `${n}nd`;
        case 3:
            return `${n}rd`;
        default:
            return `${n}th`;
    }
}

/**
 * Fetches status
 * @param URL which we fetch
 * @returns response status
 */
export async function FetchStatus(URL: string): Promise<number> {
    return await fetch(URL).then((response) => response.status);
}

/**
 * Fetches the URL
 * @param URL which we fetch
 * @returns response URL
 */
export async function FetchURL(URL: string): Promise<string> {
    return await fetch(URL).then((response) => response.url);
}

/**
 * Checks if button is enabled, disabled or not found
 * @param driver
 * @param ttl in ms
 * @param buttonID ID of a button upon test
 * @returns true if enabled, false if disabled, null if not found
 */
export async function IsButtonEnabled(driver: WebDriver, ttl: number, buttonID: string): Promise<boolean> {
    try {
        const button: WebElement = await GetElBy.ID(driver, ttl, buttonID);
        if (await button.isEnabled()) return true;
        else return false;
    } catch {
        return null;
    }
}

/**
 * Moves a cursor from origin element by x,y pixels
 * @param driver
 * @param originElement element where cursor is at beginning
 * @param x pixels to move to horizontally
 * @param y pixel to move vertically
 * @returns void
 */
export async function MoveCursor(
    driver: WebDriver,
    originElement: WebElement,
    x: number,
    y: number
): Promise<void> {
    await driver
        .actions({ bridge: true })
        .move({
            duration: 100,
            origin: originElement,
            x: x,
            y: y,
        })
        .perform();
    return new Promise((resolve) => setTimeout(resolve));
}
