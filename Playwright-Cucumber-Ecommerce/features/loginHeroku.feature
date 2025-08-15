Feature: Funcionalidad de compra login
  Como cliente registrado
  Quiero iniciar sesión
  Comprar un producto
  Background:
    Given Cliente existente realiza una compra completa
  @login-compra @positivo
  Scenario Outline: Iniciar sesión y completar una compra
    When Cliente ingresa a la pagina de '<ruta>'
    And Cliente ingresa su correo '<email>' y contraseña '<password>'
    And Cliente inicia sesión
    And Cliente selecciona un producto '<producto>' y agrega el producto al carrito
    And Cliente accede al carrito de compra
    And Cliente completa la compra
    Then debería ver un mensaje '<mensaje>' de confirmación de compra

    Examples:
      | ruta  | email             | password | producto                   | mensaje                      |
      | Login | admin@example.com | admin123 | White Gold Plated Princess | Thank you for your purchase! |

  @login-filtro-orden-compra @positivo
  Scenario Outline: Iniciar sesión  filtrar,Ordenar y comprar
    When Cliente ingresa a la pagina de '<ruta>'
    And Cliente ingresa su correo '<email>' y contraseña '<password>'
    And Cliente inicia sesión
    And Cliente filtra los productos por 'Jewelery'
    And Cliente ordena los productos por 'Price: Low to High'
    And Cliente selecciona un producto '<producto>' y agrega el producto al carrito
    And Cliente accede al carrito de compra
    And Cliente completa la compra
    Then debería ver un mensaje '<mensaje>' de confirmación de compra

    Examples:
      | ruta  | email             | password | producto                   | mensaje                      |
      | Login | admin@example.com | admin123 | White Gold Plated Princess | Thank you for your purchase! |

  @login-invalido @negativo
  Scenario Outline: Iniciar sesión con credenciales inválidas
    When Cliente ingresa a la pagina de '<ruta>'
    And Cliente ingresa su correo '<email>' y contraseña '<password>'
    And Cliente inicia sesión
    Then debería ver un mensaje de error '<mensaje>'

    Examples:
      | ruta  | email              | password  | mensaje                   |
      | Login | victor@example.com | wrongpass | Invalid email or password |


  @login-campos-vacios @negativo
  Scenario Outline: Iniciar sesión con campos vacios
    When Cliente ingresa a la pagina de '<ruta>'
    And Cliente ingresa su correo '<email>' y contraseña '<password>'
    And Cliente inicia sesión
    Then debería ver el mensaje requerido '<mensaje>'

    Examples:
      | ruta  | email | password | mensaje                    |
      | Login |       |          | Please fill out this field |

  @eliminar-producto-carrito @negativo
  Scenario Outline: Eliminar producto del carrito
    When Cliente ingresa a la pagina de '<ruta>'
    And Cliente ingresa su correo '<email>' y contraseña '<password>'
    And Cliente inicia sesión
    And Cliente selecciona un producto '<producto>' y agrega el producto al carrito
    And Cliente accede al carrito de compra
    And Cliente elimina el producto del carrito
    Then Deberia ver el mensaje de carrito vacio '<mensaje>'

    Examples:
      | ruta  | email             | password | producto                   | mensaje            |
      | Login | admin@example.com | admin123 | White Gold Plated Princess | Your cart is empty |