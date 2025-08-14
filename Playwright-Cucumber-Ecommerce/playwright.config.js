// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Leer variables de entorno del archivo.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
 /* Ejecutar pruebas en archivos en paralelo */
  fullyParallel: true,
  /* La compilación en CI falla si accidentalmente dejaste test.only en el código fuente. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Optar por no realizar pruebas paralelas en CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reportero a utilizar. Ver https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Configuración compartida para todos los proyectos a continuación. Consulte https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* URL base para utilizar en acciones como `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',
    
    screenshot: 'on',
    video: 'on',
    /* Recopilar trazas al reintentar la prueba fallida. Consulte https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configurar proyectos para los principales navegadores */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Probar en vistas móviles. */

   /*  {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    }, */

    /* Prueba contra navegadores de marca. */
    
   /*  {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    }, */
  ],

  /* Ejecute su servidor de desarrollo local antes de iniciar las pruebas */
  /* webServer: {
    command: 'npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  }, */
});
