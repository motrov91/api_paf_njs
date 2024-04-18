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
            host: '162.240.171.222',
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
        const buttonsHTML = info.map(info => `<li style="margin-bottom: 0; text-align: left;"><a href="${info['url']}">${info['name']}</a></li>`).join('');
        

        const toMessage = `${to}`
        const userNameMessage = `${userName}`
        const email = `${emailUser}`

        const mailOptions = {
            from: 'producto@productospaf.com.co',
            to: toMessage,
            subject: 'Infográfias de los productos cotizados PAF',
            html: `
            <!DOCTYPE html>
            <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">

            <head>
                <title></title>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0"><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--><!--[if !mso]><!-->
                <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100;200;300;400;500;600;700;800;900" rel="stylesheet" type="text/css">
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;200;300;400;500;600;700;800;900" rel="stylesheet" type="text/css"><!--<![endif]-->
                <style>
                    * {
                        box-sizing: border-box;
                    }

                    body {
                        margin: 0;
                        padding: 0;
                    }

                    a[x-apple-data-detectors] {
                        color: inherit !important;
                        text-decoration: inherit !important;
                    }

                    #MessageViewBody a {
                        color: inherit;
                        text-decoration: none;
                    }

                    p {
                        line-height: inherit
                    }

                    .desktop_hide,
                    .desktop_hide table {
                        mso-hide: all;
                        display: none;
                        max-height: 0px;
                        overflow: hidden;
                    }

                    .image_block img+div {
                        display: none;
                    }

                    @media (max-width:780px) {

                        .desktop_hide table.icons-inner,
                        .social_block.desktop_hide .social-table {
                            display: inline-block !important;
                        }

                        .icons-inner {
                            text-align: center;
                        }

                        .icons-inner td {
                            margin: 0 auto;
                        }

                        .mobile_hide {
                            display: none;
                        }

                        .row-content {
                            width: 100% !important;
                        }

                        .stack .column {
                            width: 100%;
                            display: block;
                        }

                        .mobile_hide {
                            min-height: 0;
                            max-height: 0;
                            max-width: 0;
                            overflow: hidden;
                            font-size: 0px;
                        }

                        .desktop_hide,
                        .desktop_hide table {
                            display: table !important;
                            max-height: none !important;
                        }
                    }
                </style>
            </head>

            <body style="background-color: #ffffff; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
                <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;">
                    <tbody>
                        <tr>
                            <td>
                                <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #0591d0;">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; background-color: #0591d0; width: 760px; margin: 0 auto;" width="760">
                                                    <tbody>
                                                        <tr>
                                                            <td class="column column-1" width="100%" style="font-weight: 400; text-align: left; mso-table-lspace: 0pt; mso-table-rspace: 0pt; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                                <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                    <tr>
                                                                        <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
                                                                            <div class="alignment" align="center" style="line-height:10px">
                                                                                <div style="max-width: 190px;"><img src="https://3385ff23f7.imgdist.com/pub/bfra/fv91kkvi/9c5/ypl/tyu/LogoGestion.png" style="display: block; height: auto; border: 0; width: 100%;" width="190" height="auto"></div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 760px; margin: 0 auto;" width="760">
                                                    <tbody>
                                                        <tr>
                                                            <td class="column column-1" width="100%" style="font-weight: 400; text-align: left; mso-table-lspace: 0pt; mso-table-rspace: 0pt; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                                <table class="text_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                                    <tr>
                                                                        <td class="pad">
                                                                            <div style="font-family: Arial, sans-serif">
                                                                                <div class style="font-size: 12px; font-family: 'Roboto Slab', Arial, 'Helvetica Neue', Helvetica, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #555555; line-height: 1.2;">
                                                                                    <p style="margin: 0; font-size: 16px; text-align: center; mso-line-height-alt: 19.2px;"><em><strong>Conoce las soluciones que tenemos para ti.</strong></em></p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table class="text_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                                    <tr>
                                                                        <td class="pad">
                                                                            <div style="font-family: Tahoma, Verdana, sans-serif">
                                                                                <div class style="font-size: 12px; font-family: Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #555555; line-height: 1.2;">
                                                                                    <p style="margin: 0; mso-line-height-alt: 14.399999999999999px; letter-spacing: 2px;"><span style="font-size:14px;">En Purificación y Análisis de Fluidos estamos comprometidos con la innovación científica y tecnológica, buscando siempre mejorar la calidad de vida de los colombianos, por eso constantemente diseñamos y creamos soluciones adaptadas a la medida de nuestros clientes, ofreciendo no solo nuestra experiencia sino el respaldo que nos ha caracterizado en estos 40 años en los que hemos dejado huella. A continuación encontrará información de interés de nuestros productos y servicios.</span></p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table><!--[if mso]><style>#list-r1c0m2 ul{ margin: 0 !important; padding: 0 !important; } #list-r1c0m2 ul li{ mso-special-format: bullet; }#list-r1c0m2 .levelOne li { margin-top: 0 !important; } #list-r1c0m2 .levelOne { margin-left: -20px !important; }#list-r1c0m2 .levelTwo li { margin-top: 0 !important; } #list-r1c0m2 .levelTwo { margin-left: 10px !important; }#list-r1c0m2 .levelThree li { margin-top: 0 !important; } #list-r1c0m2 .levelThree { margin-left: 40px !important; }</style><![endif]-->
                                                                <table class="list_block block-3" id="list-r1c0m2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                                    <tr>
                                                                        <td class="pad">
                                                                            <div class="levelOne" style="margin-left: 0;">
                                                                                <ul class="leftList" start="1" style="margin-top: 0; margin-bottom: 0; padding: 0; padding-left: 20px; font-weight: 400; text-align: left; color: #101112; direction: ltr; font-family: Arial,Helvetica,sans-serif; font-size: 16px; letter-spacing: 0; line-height: 120%; mso-line-height-alt: 19.2px; list-style-type: disc;">
                                                                                    ${buttonsHTML}
                                                                                </ul>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table class="text_block block-4" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                                    <tr>
                                                                        <td class="pad">
                                                                            <div style="font-family: Tahoma, Verdana, sans-serif">
                                                                                <div class style="font-size: 12px; font-family: Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #555555; line-height: 1.2;">
                                                                                    <p style="margin: 0; font-size: 14px; mso-line-height-alt: 14.399999999999999px; letter-spacing: 2px;">&nbsp;</p>
                                                                                    <p style="margin: 0; font-size: 14px; mso-line-height-alt: 16.8px; letter-spacing: 2px;"><span style="font-size:14px;">Gracias por su tiempo.</span></p>
                                                                                    <p style="margin: 0; font-size: 14px; mso-line-height-alt: 14.399999999999999px; letter-spacing: 2px;">&nbsp;</p>
                                                                                    <p style="margin: 0; font-size: 14px; mso-line-height-alt: 16.8px; letter-spacing: 2px;"><span style="font-size:14px;"><em>Atentamente:</em></span></p>
                                                                                    <p style="margin: 0; font-size: 14px; mso-line-height-alt: 14.399999999999999px; letter-spacing: 2px;">&nbsp;</p>
                                                                                    <p style="margin: 0; font-size: 14px; mso-line-height-alt: 16.8px; letter-spacing: 2px;"><span style="font-size:14px;">${userName}</span></p>
                                                                                    <p style="margin: 0; font-size: 14px; mso-line-height-alt: 16.8px; letter-spacing: 2px;"><span style="font-size:14px;">${emailUser}</span><br><span style="font-size:14px;">PURIFICACIÓN Y ANÁLISIS DE FLUIDOS S.A.S</span></p>
                                                                                    <p style="margin: 0; font-size: 14px; mso-line-height-alt: 16.8px; letter-spacing: 2px;"><span style="font-size:14px;">&nbsp;</span></p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table class="text_block block-5" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                                    <tr>
                                                                        <td class="pad">
                                                                            <div style="font-family: Tahoma, Verdana, sans-serif">
                                                                                <div class style="font-size: 12px; font-family: Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #888888; line-height: 1.2;">
                                                                                    <p style="margin: 0; text-align: left; mso-line-height-alt: 14.399999999999999px; letter-spacing: 2px;"><span style="font-size:14px;">SOPORTE</span></p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table class="text_block block-6" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                                    <tr>
                                                                        <td class="pad">
                                                                            <div style="font-family: Tahoma, Verdana, sans-serif">
                                                                                <div class style="font-size: 12px; font-family: Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #888888; line-height: 1.2;">
                                                                                    <p style="margin: 0; font-size: 14px; text-align: left; mso-line-height-alt: 16.8px; letter-spacing: 2px;"><span style="font-size:14px;">Comunícate con nosotros por los siguientes medios:</span></p>
                                                                                    <p style="margin: 0; font-size: 14px; mso-line-height-alt: 14.399999999999999px; letter-spacing: 2px;">&nbsp;</p>
                                                                                    <p style="margin: 0; font-size: 14px; mso-line-height-alt: 16.8px; letter-spacing: 2px;"><span style="font-size:14px;">Correo: <a href="mailto:alexandra_sandoval@paf.com.co" target="_blank" style="text-decoration: underline; color: #7747FF;" rel="noopener">contacto@paf.com.co</a></span><br><span style="font-size:14px;">Whatsapp: <a href="https://wa.me/573224294332" target="_blank" style="text-decoration: underline; color: #7747FF;" rel="noopener">+57 318 3776315</a></span></p>
                                                                                    <p style="margin: 0; font-size: 14px; mso-line-height-alt: 14.399999999999999px; letter-spacing: 2px;">&nbsp;</p>
                                                                                    <p style="margin: 0; font-size: 14px; mso-line-height-alt: 14.399999999999999px; letter-spacing: 2px;">&nbsp;</p>
                                                                                    <p style="margin: 0; text-align: center; font-size: 14px; mso-line-height-alt: 16.8px; letter-spacing: 2px;"><span style="font-size:14px;">© 2024 Todos los derechos reservados, Purificación y Análisis de Fluidos SAS.</span></p>
                                                                                    <p style="margin: 0; font-size: 14px; mso-line-height-alt: 14.399999999999999px; letter-spacing: 2px;">&nbsp;</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table class="social_block block-7" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                    <tr>
                                                                        <td class="pad">
                                                                            <div class="alignment" align="center">
                                                                                <table class="social-table" width="108px" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;">
                                                                                    <tr>
                                                                                        <td style="padding:0 2px 0 2px;"><a href="https://www.facebook.com/pafltda" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-dark-gray/facebook@2x.png" width="32" height="auto" alt="Facebook" title="facebook" style="display: block; height: auto; border: 0;"></a></td>
                                                                                        <td style="padding:0 2px 0 2px;"><a href="https://www.instagram.com/paf.sas/" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-dark-gray/instagram@2x.png" width="32" height="auto" alt="Instagram" title="instagram" style="display: block; height: auto; border: 0;"></a></td>
                                                                                    </tr>
                                                                                </table>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table><!-- End -->
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