@login-practica
Feature: Funcionalidad de Login
    Como usuario del sistema
    Quiero poder iniciar sesión en el sitio
    Para acceder a las funcionalidades protegidas

    Background:
        Given que el usuario está en la página de login

    Scenario: Login exitoso con credenciales válidas
        When el usuario ingresa el nombre de usuario "tomsmith"
        And el usuario ingresa la contraseña "SuperSecretPassword!"
        And el usuario hace clic en el botón de login
        Then debería ver el mensaje "You logged into a secure area!"

    Scenario: Login fallido con credenciales inválidas
        When ingresa usuario "pepito" y clave "pepito" y presiona el botón "Login"
        Then debe permanecer en la página de login
        And debe ver mensaje de error de credenciales inválidas

    Scenario: Login fallido con alguna credencial vacia
        When ingresa usuario "pepito2" y clave "" y presiona el botón "Login"
        Then debe permanecer en la página de login
        And debe ver mensaje de error de credenciales inválidas



