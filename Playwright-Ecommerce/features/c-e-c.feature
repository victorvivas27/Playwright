@Cliente-Existente-Compra

Feature: Cliente existente realiza una compra
  Como usuario registrado
  Quiero iniciar sesión y comprar un producto

  Background:
    Given Que el usuario se encuentre registrado

  Scenario Outline: Un cliente inicia sesión y compra un producto
    When Ingreso a la página de login
    And Inicio sesión con email "<email>" y contraseña "<password>"
    And Agrego el producto al carrito verifico que se suma al carrito
    And Accedo al carrito Verifico que "<producto>" esté en el carrito
    Then Confirmo la compra y veo el mensaje "<mensaje>" de confirmación y el total coincide

 Examples:
      | email             | password | producto           | mensaje                                    |
      | admin@example.com | admin123 | Mens Cotton Jacket | Thank you for your purchase! Total: $55.99 |

 

  Scenario Outline: Un cliente coloca email invalido
    When Ingreso a la página de login
    And Intento iniciar sesión con email "<email>" y contraseña "<password>"
    Then Veo el mensaje de error "<mensaje>"

    Examples:
      | email            | password | mensaje                   |
      | victor@gmail.com | admin123 | Invalid email or password |

  Scenario Outline: Un cliente deja campos vacios
    When Ingreso a la página de login
    And Intento iniciar sesión con email "<email>" y contraseña "<password>"
    Then Verifico que sige en "Login"

    Examples:
      | email | password |
      |       |          |