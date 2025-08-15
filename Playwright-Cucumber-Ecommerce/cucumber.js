
const cucumberConfig = {
    // Especifica la ruta a tus archivos de features.
    paths: ['features/**/*.feature'],

    // Le dice a Cucumber dónde encontrar tus definiciones de pasos y archivos de soporte.
    require: [
        // Tus pasos de Gherkin
        'step_definitions/**/*.js',
        // Archivos de hooks (Before, After)
        'support/**/*.js'
    ],

    // Define el formato de la salida en la consola y para los reportes.
    format: [
        '@cucumber/pretty-formatter',
        'progress-bar', // Muestra una barra de progreso cucudurante la ejecución
        'json:reports/cucumber-report.json' // Genera un reporte JSON
    ],
    dryRun: false,
    publishQuiet: true,

    // Permite pasar parámetros a tu World personalizado.
    worldParameters: {
        baseUrl: 'https://ecommerce-js-test.vercel.app/'
    }
};

export default cucumberConfig;
