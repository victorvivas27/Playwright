const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

// Background
Given('Que el usuario se encuentre registrado', async function () {

    await this.clienteEcommercePage.navigate(this.parameters.baseUrl);
});

// Login
When('Ingreso a la página de login', async function () {

    await this.clienteEcommercePage.clickLogin();

    await this.clienteEcommercePage.verificarPaginaLogin();
});

When('Inicio sesión con email {string} y contraseña {string}', async function (email, password) {

    await this.clienteEcommercePage.fillEmail(email);

    await this.clienteEcommercePage.fillPassword(password);

    await this.clienteEcommercePage.clickIniciarSesion();

    expect(await this.clienteEcommercePage.getMensajeBienvenida()).toBeTruthy();
});

// Agregar producto
When('Agrego el producto al carrito verifico que se suma al carrito', async function () {

    await this.clienteEcommercePage.clickAgregarProducto();

    const contador = await this.clienteEcommercePage.getContadorCarrito();

    expect(contador).not.toBe('');
});

// Acceder al carrito
When('Accedo al carrito Verifico que {string} esté en el carrito', async function (producto) {

    await this.clienteEcommercePage.clickVerCarrito();

    const productoVisible = await this.page.locator(`text=${producto}`);

    await expect(productoVisible).toBeVisible();
});

// Confirmar compra
Then('Confirmo la compra y veo el mensaje {string} de confirmación y el total coincide', async function (mensajeEsperado) {
  // Captura el total en pantalla
  const totalPantalla = await this.page
    .locator('div.flex.justify-between.text-xl.font-bold.text-gray-900 span')
    .nth(1)
    .textContent();

  const totalPantallaLimpio = totalPantalla.trim().replace('$', '');

  // Dispara el diálogo de confirmación
  this.page.once('dialog', async (dialog) => {
    const mensaje = dialog.message();

    // Validamos que contenga el mensaje completo
    expect(mensaje).toContain(mensajeEsperado);

    // Extraemos el total del mensaje
    const regex = /Total: \$?([\d.]+)/;
    const match = mensaje.match(regex);

    if (!match) {
      throw new Error(`No se encontró el total en el mensaje: ${mensaje}`);
    }

    const totalDelMensaje = match[1];

    // Validamos que coincidan los totales
    expect(totalDelMensaje).toBe(totalPantallaLimpio);

    await dialog.accept();
  });

  // Click en botón de compra (esto dispara el diálogo)
  await this.clienteEcommercePage.clickBotonComprar();
});



When('Intento iniciar sesión con email {string} y contraseña {string}', async function (email, password) {

    await this.clienteEcommercePage.fillEmail(email);

    await this.clienteEcommercePage.fillPassword(password);

    await this.clienteEcommercePage.clickIniciarSesion();
});


Then('Veo el mensaje de error {string}', async function (mensajeEsperado) {

    const mensaje = await this.clienteEcommercePage.getMensajeError();

    expect(mensaje).toContain(mensajeEsperado);
});

Then('Verifico que sige en "Login"', async function () {
    await this.clienteEcommercePage.verificarPaginaLogin();
});





