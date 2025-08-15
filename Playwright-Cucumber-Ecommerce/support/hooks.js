
//const LoginPage = require('../step_definitions/pom/LoginPage.js');
// const LoginPage = require('../step_definitions/pom/loginPage');
// const SecurePage = require('../step_definitions/pom/securePage');

import { After, AfterStep, Before } from "@cucumber/cucumber";
import path from "path";
import fs from "fs";


// Eliminar todos los videos anteriores
const videoDir = 'reports/videos';

if (fs.existsSync(videoDir)) {
    fs.readdirSync(videoDir).forEach(file => {
        if (file.endsWith('.webm')) {
            fs.unlinkSync(path.join(videoDir, file));
        }
    });
}

Before(async function () {
    // 'this' es una instancia de tu CustomWorld
    await this.init();
    
    //this.loginPage = new LoginPage(this.page);

    const screenshotDir = 'reports/screenshots';
    if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir, { recursive: true });
    }
    // Instanciamos los Page Objects para cada escenario, pasándoles la nueva página
    // this.loginPage = new LoginPage(this.page);
    // this.securePage = new SecurePage(this.page);
});

AfterStep(async function (scenario) {
    if (this.page) {
        //Si desean screenshots en cada paso
        /*
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const scenarioName = scenario.pickle.name.replace(/[^a-zA-Z0-9]/g, '_');
        const filename = `step-${scenarioName}-${timestamp}.png`;

        await this.page.screenshot({
            path: `reports/screenshots/${filename}`,
            fullPage: true
        });
        */
    }
});

After(async function (scenario) {
    //Solo toma screenshoot cuando falla
    //if (scenario.result.status === Status.FAILED) {
    // page.screenshot() sin 'path' devuelve la imagen como un buffer
    const screenshot = await this.page.screenshot({ fullPage: true });

    // Adjunta la imagen al reporte de Cucumber.
    // Esto es lo que permite que cucumber-html-reporter la muestre.
    this.attach(screenshot, 'image/png');
    //}

    //Grabando video.
    const videoPath = await this.page.video()?.path();

    await this.cleanup();

    if (videoPath) {
        const scenarioName = scenario.pickle.name.replace(/[^a-zA-Z0-9]/g, '_');
        const now = new Date();
        const timestamp = [
            now.getFullYear(),
            (now.getMonth() + 1).toString().padStart(2, '0'),
            now.getDate().toString().padStart(2, '0'),
            now.getHours().toString().padStart(2, '0'),
            now.getMinutes().toString().padStart(2, '0'),
            now.getSeconds().toString().padStart(2, '0')
        ].join('-');
        const newVideoPath = `reports/videos/${scenarioName}-${timestamp}.webm`;

        // Renombrar video con nombre descriptivo
        if (fs.existsSync(videoPath)) {
            fs.renameSync(videoPath, newVideoPath);
            console.log(`🎥 Video guardado: ${newVideoPath}`);

            // Adjuntar video al reporte (si el reporter lo soporta)
            const videoBuffer = fs.readFileSync(newVideoPath);
            this.attach(videoBuffer, 'video/webm');
        }
    }
});