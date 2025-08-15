// support/world.js
import { setDefaultTimeout, setWorldConstructor, World } from "@cucumber/cucumber";
import { chromium, firefox, webkit } from "@playwright/test";
import dotenv from 'dotenv';
dotenv.config();

// Ajusta a lo que realmente necesitas (60s recomendado)
setDefaultTimeout(60000);

class PlaywrightWorld extends World {
    constructor(options) {
        super(options);

        // Props de Playwright
        this.browser = null;
        this.context = null;
        this.page = null;

        // Datos/herramientas auxiliares por escenario
        this.testData = {};

        // Config leída de env o de worldParameters en la config de Cucumber
        this.browserName = process.env.BROWSER || 'chromium'; // 'chromium' | 'firefox' | 'webkit'
        this.headless = process.env.HEADLESS !== 'false';      // true por defecto; set HEADLESS=false para ver UI
        this.baseURL = process.env.BASE_URL || options.parameters.baseUrl || 'http://localhost:3000';

        // Slomo opcional (ms)
        this.slowMo = process.env.SLOW_MO ? parseInt(process.env.SLOW_MO, 10) : 0;

        console.log('[World] Browser:', this.browserName, '| Headless:', this.headless, '| baseURL:', this.baseURL);
    }

    async init() {
        const browsers = { chromium, firefox, webkit };
        const browserType = browsers[this.browserName];
        if (!browserType) throw new Error(`Browser no soportado: ${this.browserName}`);

        this.browser = await browserType.launch({
            headless: this.headless,
            slowMo: this.slowMo
        });

        this.context = await this.browser.newContext({
            baseURL: this.baseURL,
            viewport: { width: 1280, height: 720 },
            // Graba video por escenario (se guarda cuando cierras la page)
            recordVideo: { dir: 'reports/videos/', size: { width: 1280, height: 720 } }
        });

        this.page = await this.context.newPage();

        // Alinea con setDefaultTimeout de Cucumber
        this.page.setDefaultTimeout(60000);
        this.page.setDefaultNavigationTimeout(60000);
    }

    async cleanup() {
        await this.page?.close();
        await this.context?.close();
        await this.browser?.close();
    }
}

setWorldConstructor(PlaywrightWorld);
export default PlaywrightWorld;