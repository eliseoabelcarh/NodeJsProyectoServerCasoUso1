# Server with Node Js 

## Tests with Mocha

-express
-mocha
-nyc
-axios

## SERVICIOS DISPONIBLES:

### MODELO DE ENVIO PARA SENDGRID
```
         //reemplace variables de entorno creando un archivo .env
        //Apikey se obtiene registrándose en la página de Sendgrid/Twilio

        const config = {
            apiKey: process.env.SENDGRID_API_KEY,
            service: 'sendgrid' 
        }
        const email = {
            from: 'eliseoabelcarh3@gmail.com', // debe ser el mismo email registrado en sendgrid
            to: 'eliseoabelcarh1@gmail.com',
            subject: 'Hi!!',
            html: '<strong>Esto es un mensaje</strong>'
        }
        const arrayConPathDeArchivos = ['./test/assets/ejemplo.pdf']
        const esperado = true
        const sender = await crearEmailSender(config)

        const respuesta1 = await sender.sendEmail(email.from, email.to, email.subject, email.html, arrayConPathDeArchivos)
        assert.deepStrictEqual(respuesta1, esperado)
```
#### IMPORTANTE:
 
        *** ApiKey y el email (remitente), deben coincidir con la cuenta registrada en Sendgrid
