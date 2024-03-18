import nodemailer from 'nodemailer';

const emailRecovery = async (data) => {
    var transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        secureConnection: false,
        tls: {
            //ciphers:'SSLv3'
            rejectUnauthorized: false,
        },
        requireTLS: true,
        debug: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    transport.verify(function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log("Server is ready to take our messages");
        }
    });

    const { email, nombre, token } = data;

    //Structure email
    const mailOptions = {
        from: 'recovery@productospaf.com.co',
        to: email,
        subject: 'Recuperación de contraseña productosPAF',
        text: 'Recupera tu cuenta en productospaf.com',
        html: `
            <p>Hola ${nombre}.</p>
            <p>Bienvenido al sistema para recuperación de tu contraseña.</p>
            <p>Tu cuenta ya esta lista, para cambiar tu contraseña solamente debes 
                cambiar la contraseña en el siguiente enlace <a href="https://productospaf.com.co/#/auth/changePassword/${token}">Cambiar Contraseña</a>
            </p>
        `
    };

    //Send email
    return transport.sendMail(mailOptions).then(() => {
        console.log('Email sent successfully');
    }).catch((err) => {
        console.log('Fallo el envío del mensaje');
        console.error(err);
    });
}
// EMAIL_HOST=productospaf.com.co
// EMAIL_PORT=465
// EMAIL_USER=recovery@productospaf.com.co
// EMAIL_PASS=productospaf12345.
const emailReportFailure = async (data) => {
    var transport = nodemailer.createTransport({
        host: 'productospaf.com.co',
        port: 2079,
        secure: true,
        secureConnection: false,
        tls: {
            //ciphers:'SSLv3'
            rejectUnauthorized: false,
        },
        requireTLS: true,
        debug: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    transport.verify(function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log("Server is ready to take our messages");
        }
    });

    const { emailEnvio, descripcion } = data;

    console.log(emailEnvio, '--', descripcion)

    //Structure email
    const mailOptions = {
        from: 'recovery@productospaf.com.co',
        to: 'manuel.ramirez1209@gmail.com',
        subject: 'Reporte de fallo en la plataforma',
        text: 'Hola hay un reporte de daño en la plataforma',
        html: `
            <p>Hola Administrador</p>
            <p>Bienvenido al sistema de reporte de fallos en productos paf</p>
            <p>Tu cuenta ya esta lista, para cambiar tu contraseña solamente debes El usuario con correo ${emailEnvio} reporto lo siguiente. </p>
            <p>${descripcion}</p>
        `
    };

    //Send email
    return transport.sendMail(mailOptions).then(() => {
        console.log('Email sent successfully');
    }).catch((err) => {
        console.log('Falló el envío del mensaje');
        console.error(err);
    });
}

const sendEmailProduct = async (to, userName, emailUser, info = []) => {

    try {

        const transporter = nodemailer.createTransport({
            host: '72.167.224.32',
            port: 465,
            secure: true,
            secureConnection: false, // Usar SSL
            auth: {
                user: process.env.EMAIL_SEND_PDF,
                pass: process.env.EMAIL_PASS_PDF
            },
            requireTLS: true,
            tls: {
                // Configurar para ignorar la verificación del certificado SSL
                rejectUnauthorized: false,
            },
        });

        transporter.verify(function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log("Server is ready to take our messages");
            }
        });

        // Generar botones para los enlaces recibidos
        const buttonsHTML = info.map(info => `<a class="claseBoton" href="${info['url']}">${info['name']}</a>`).join('');

        const toMessage = `${to}`
        const userNameMessage = `${userName}`
        const email = `${emailUser}`

        const mailOptions = {
            from: 'producto@productospaf.com.co',
            to: toMessage,
            subject: 'Infográfias de los productos cotizados PAF',
            html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            
                <style>
                    p, a, h1, h2, h3, h4, h5, h6 {font-family: 'Roboto', sans-serif !important;}
                    h1{ font-size: 30px !important;}
                    h2{ font-size: 25px !important;}
                    h3{ font-size: 18px !important;}
                    h4{ font-size: 16px !important;}
                    p, a{font-size: 15px !important;}
            
                    .claseBoton{
                        width: 12%;
                        background-color: #f3db3a;
                        border: 2px solid #e5cc26;
                        color: black; 
                        padding: 16px 32px;
                        text-align: center;
                        text-decoration: none;
                        font-weight: bold;
                        display: inline-block;
                        font-size: 16px;
                        margin: 4px 2px;
                        transition-duration: 0.4s;
                        cursor: pointer;
                    }
                    .claseBoton:hover{
                        background-color: #fcae3b;
                        border: 2px solid #e1982b;
                        color: #ffffff;
                    }
                    .imag{
                        width: 20px;
                        height: 20px;
                    }
                    .contA{
                        margin: 0px 5px 0 5px;
                    }
                    .afooter{
                        color: #ffffff !important; 
                        text-decoration: none;
                        font-size: 13px !important;
                    }
                </style>
            </head>
            <body>
                <div style="width: 100%; background-color: #F5F5F5;">
                    <div style="padding: 20px 10px 20px 10px;">
                        <!-- Imagen inicial -->
                        <div style="background-color: #3794c4; padding: 10px 0px 10px 0px; width: 100%; text-align: center;">
                            <img src="https://res.cloudinary.com/denrlu9gn/image/upload/v1709304723/logo_blanco_2_cjb1it.png" alt="" style=" height: 100px;">
                        </div>
                        <!-- Imagen inicial -->
            
                        <!-- Contenido principal -->
                        <div style="background-color: #ffffff; padding: 20px 0px 5px 0px; width: 100%; text-align: center;">
                            <h1 style="color: #616161">Infográfias de los productos cotizados</h1>
                            <p style="color: #757575"> En Purificación y Análisis de Fluidos estamos comprometidos con la innovación científica y tecnológica, 
                                buscando siempre mejorar la calidad de vida de los colombianos, por eso constantemente diseñamos y creamos soluciones adaptadas 
                                a la medida de nuestros clientes, ofreciendo no solo nuestra experiencia sino el respaldo que nos ha caracterizado en estos 40 años 
                                en los que hemos dejado huella. A continuación encontrará información de interés de nuestros productos y servicios.
                            </p>
            
                            <!-- Gracias -->
                            <p>Gracias por su tiempo.</p>
                            <p style="margin-bottom: 50px;"><i>Atentamente:</i><br>PURIFICACIÓN Y ANÁLISIS DE FLUIDOS S.A.S</p>
                            <p style="margin-bottom: 50px;">Contacto<br><i>${userNameMessage}</i><br>${email}<br></p>
    
                            <!-- Botones generados dinámicamente -->
                            ${buttonsHTML}
                        </div>
                        <!-- Contenido principal -->
            
                        <!-- Footer -->
                        <div style="background-color: #3794c4; color: #ffffff; padding: 5px 0px 0px 0px; width: 100%; text-align: center;">
                            <!-- Redes sociales -->
                            <a href="https://www.facebook.com/pafltda" class="contA"><img src="https://res.cloudinary.com/denrlu9gn/image/upload/v1709304678/ic_facebook_zsi82u.png" class="imag" /></a>
                            <a href="https://www.instagram.com/paf.sas/" class="contA"><img src="https://res.cloudinary.com/denrlu9gn/image/upload/v1709304678/ic_instagram_lepahe.png" class="imag" /></a>
                            <a href="https://wa.me/3183776315" class="contA"><img src="https://res.cloudinary.com/denrlu9gn/image/upload/v1709304678/ic_whatsapp_tnoztu.png" class="imag" /></a>
                            <a href="mailto:alexandra_sandoval@paf.com.co" class="contA"><img src="https://res.cloudinary.com/denrlu9gn/image/upload/v1709304678/ic_email_rkdijz.png" class="imag" /></a>
                            <!-- Redes sociales -->
            
                            <h4>Soporte</h4>
                            <p style="font-size: 13px; padding: 0px 20px 0px 20px;">
                                Comunícate con nosotros por los siguientes medios:<br>
                                Correo: <a class="afooter" href="mailto:alexandra_sandoval@paf.com.co">contacto@paf.com.co</a><br>
                                Whatsapp: <a class="afooter" href="https://wa.me/573224294332">+57 318 3776315</a><br>
                            </p>
                            <p style="background-color: #00629d; padding: 10px 0px 10px 0px; font-size: 12px !important;">
                                © 2024 Todos los derechos reservados, Purificación y Análisis de Fluidos SAS.
                            </p>
                        </div>
                        <!-- Footer -->
            
            
            
                    </div>
                </div>
            </body>
            </html>
            `
        };

        await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.error('Error al enviar el correo electrónico:', error);
                return false;
            } else {
                console.log('Correo electrónico enviado:', info.response);
                return true;
            }
        });

    } catch (error) {
        console.log(errro);
        return false;
    }
}

export {
    emailRecovery,
    emailReportFailure,
    sendEmailProduct
}