 @login-heroku
 Feature: Funcionalidad  de login
 Como usuario del sistema
 Quiero poder iniciar sesión en sel sitio
 Para acceder a las funcionalidaes protegidas

 Background: 
 Given que el usuario esté en la página de login

@login-exitoso
 Scenario Outline: Login exitoso con credenciales válidas
  When el usuario ingresa el nombre de usuario "<nombre_usuario>"
  And  el usuario ingresa la contraseña "<contraseña>"
  And  el usuario hace clic en el botón de login
  Then debería ver un mensaje de bienvenida "<mensaje>"
    Examples:
      | nombre_usuario | contraseña           | mensaje                        |
      | tomsmith       | SuperSecretPassword! | You logged into a secure area! |

  @login-fallido
  Scenario Outline: Login fallido
    When el usuario ingresa el nombre de usuario "<nombre_usuario>"
    And el usuario ingresa la contraseña "<contraseña>"
    And el usuario hace clic en el botón de login
    Then debería ver un mensaje de error "<mensaje>"

    Examples:
      | nombre_usuario | contraseña           | mensaje                        |
      | incorrecto     | SuperSecretPassword! | Your username is invalid!      |
      | tomsmith       | incorrecta           | Your password is invalid!      |
      | tomsmith       |                      | Your password is invalid!      |
      |                | SuperSecretPassword! | Your username is invalid!      |
      |                |                      | Your username is invalid!      |