Feature: Funcionalidad de registro y compra
    Como cliente quiero registrarme
    Comprar un producto

    Background:
        Given Usuario se registra y realiza una compra completa

    @registro @registro-valido @positivo
    Scenario Outline: Registro y compra de un producto
        When Usuario ingresa a la pagina de '<ruta>'
        And Usuario ingresa '<fullName>' '<email>' '<password>' y '<confirm_password>'
        And Usuario crea una cuenta
        And Cliente selecciona un producto 'Mens Cotton Jacket' y agrega el producto al carrito
        And Cliente accede al carrito de compra
        And Cliente completa la compra
        Then debería ver un mensaje '<mensaje>' de confirmación de compra

        Examples:
            | ruta     | fullName  | email                | password | confirm_password | mensaje                      |
            | Register | Mi Nombre | minombre@example.com | mio12345 | mio12345         | Thank you for your purchase! |


     @registro  @registro-invalido @negativo
    Scenario Outline: Registro invalido
        When Usuario ingresa a la pagina de '<ruta>'
        And Usuario ingresa '<fullName>' '<email>' '<password>' y '<confirm_password>'
        And Usuario crea una cuenta
        Then debería ver un mensaje de error '<mensaje>'

        Examples:
            | ruta     | fullName  | email                | password | confirm_password | mensaje                                |
            | Register | Mi Nombre | minombre@example.com | mio12  | mio12         | Password must be at least 6 characters long |

    @registro  @registro-invalido @negativo
    Scenario Outline: Registro campo requerido
        When Usuario ingresa a la pagina de 'Register'
        And Usuario ingresa '' '' '' y ''
        And Usuario crea una cuenta
        Then Debería ver un mensaje de campo requerido 'Please fill out this field.'