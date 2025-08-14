// support/screenshot-helper.js
class ScreenshotHelper {
    constructor(page) {
        this.page = page;
        this.screenshotCounter = 0;
    }

    async takeScreenshot(name, options = {}) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `${name}-${timestamp}.png`;
        const fullPath = `reports/screenshots/${filename}`;
        const defaultOptions = {
            path: fullPath,
            fullPage: true,
            ...options
        };
        await this.page.screenshot(defaultOptions);
        console.log(`📸 Screenshot: ${filename}`);
        return filename;
    }

    async takeScreenshotOnError(stepName, error) {
        const filename = await this.takeScreenshot(`ERROR-${stepName}`);
        console.error(`❌ Error en step "${stepName}": ${error.message}`);
        return filename;
    }

    async takeScreenshotOfElement(selector, name) {
        const element = this.page.locator(selector);
        const timestamp = [
            now.getFullYear(),
            (now.getMonth() + 1).toString().padStart(2, '0'),
            now.getDate().toString().padStart(2, '0'),
            now.getHours().toString().padStart(2, '0'),
            now.getMinutes().toString().padStart(2, '0'),
            now.getSeconds().toString().padStart(2, '0')
        ].join('-');
        const filename = `element-${name}-${timestamp}.png`;
        await element.screenshot({
            path: `reports/screenshots/${filename}`
        });

        return filename;
    }
}

export default ScreenshotHelper;