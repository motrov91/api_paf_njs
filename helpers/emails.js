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
        const buttonsHTML = info.map(info => `<a href="${info['url']}" class="btn claseBoton">${info['name']}</a>`).join('');

        const toMessage = `${to}`
        const userNameMessage = `${userName}`
        const email = `${emailUser}`

        const mailOptions = {
            from: 'producto@productospaf.com.co',
            to: toMessage,
            subject: 'Infográfias de los productos cotizados PAF',
            html: `
            <!DOCTYPE html>

<html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
<title></title>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--><!--[if !mso]><!-->
<link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100;200;300;400;500;600;700;800;900" rel="stylesheet" type="text/css"/><!--<![endif]-->
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
    <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;" width="100%">
    <tbody>
    <tr>
    <td>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #0591d0;" width="100%">
    <tbody>
    <tr>
    <td>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; background-color: #0591d0; width: 760px; margin: 0 auto;" width="760">
    <tbody>
    <tr>
    <td class="column column-1" style="font-weight: 400; text-align: left; mso-table-lspace: 0pt; mso-table-rspace: 0pt; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
    <table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tr>
    <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
    <div align="center" class="alignment" style="line-height:10px">
    <div style="max-width: 190px;"><img height="auto" src="images/LogoGestion.png" style="display: block; height: auto; border: 0; width: 100%;" width="190"/></div>
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
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tbody>
    <tr>
    <td>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 760px; margin: 0 auto;" width="760">
    <tbody>
    <tr>
    <td class="column column-1" style="font-weight: 400; text-align: left; mso-table-lspace: 0pt; mso-table-rspace: 0pt; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
    <table border="0" cellpadding="10" cellspacing="0" class="text_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
    <tr>
    <td class="pad">
    <div style="font-family: Arial, sans-serif">
    <div class="" style="font-size: 12px; font-family: 'Roboto Slab', Arial, 'Helvetica Neue', Helvetica, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #555555; line-height: 1.2;">
    <p style="margin: 0; font-size: 16px; text-align: center; mso-line-height-alt: 19.2px;"><em><strong>Infografías de los productos cotizados</strong></em></p>
    </div>
    </div>
    </td>
    </tr>
    </table>
    <table border="0" cellpadding="0" cellspacing="0" class="text_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
    <tr>
    <td class="pad">
    <div style="font-family: Tahoma, Verdana, sans-serif">
    <div class="" style="font-size: 12px; font-family: Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #555555; line-height: 1.2;">
    <p style="margin: 0; mso-line-height-alt: 14.399999999999999px; letter-spacing: 2px;"><span style="font-size:14px;">En Purificación y Análisis de Fluidos estamos comprometidos con la innovación científica y tecnológica, buscando siempre mejorar la calidad de vida de los colombianos, por eso constantemente diseñamos y creamos soluciones adaptadas a la medida de nuestros clientes, ofreciendo no solo nuestra experiencia sino el respaldo que nos ha caracterizado en estos 40 años en los que hemos dejado huella. A continuación encontrará información de interés de nuestros productos y servicios. A continuación presentamos una lista de los productos que nuestros asesores seleccionaron especialmente para usted.</span></p>
    </div>
    </div>
    </td>
    </tr>
    </table><!--[if mso]><style>#list-r1c0m2 ul{ margin: 0 !important; padding: 0 !important; } #list-r1c0m2 ul li{ mso-special-format: bullet; }#list-r1c0m2 .levelOne li { margin-top: 0 !important; } #list-r1c0m2 .levelOne { margin-left: -20px !important; }#list-r1c0m2 .levelTwo li { margin-top: 0 !important; } #list-r1c0m2 .levelTwo { margin-left: 10px !important; }#list-r1c0m2 .levelThree li { margin-top: 0 !important; } #list-r1c0m2 .levelThree { margin-left: 40px !important; }</style><![endif]-->
    <table border="0" cellpadding="10" cellspacing="0" class="list_block block-3" id="list-r1c0m2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
    <tr>
    <td class="pad">
    <div class="levelOne" style="margin-left: 0;">
    <ul class="leftList" start="1" style="margin-top: 0; margin-bottom: 0; padding: 0; padding-left: 20px; font-weight: 400; text-align: left; color: #101112; direction: ltr; font-family: Arial,Helvetica,sans-serif; font-size: 16px; letter-spacing: 0; line-height: 120%; mso-line-height-alt: 19.2px; list-style-type: disc;">
    <li style="margin-bottom: 0; text-align: left;">This is an unordered list</li>
    </ul>
    </div>
    </td>
    </tr>
    </table>
    <table border="0" cellpadding="0" cellspacing="0" class="text_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
    <tr>
    <td class="pad">
    <div style="font-family: Tahoma, Verdana, sans-serif">
    <div class="" style="font-size: 12px; font-family: Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #555555; line-height: 1.2;">
    <p style="margin: 0; mso-line-height-alt: 14.399999999999999px; letter-spacing: 2px;"> </p>
    <p style="margin: 0; mso-line-height-alt: 14.399999999999999px; letter-spacing: 2px;">Gracias por su tiempo.</p>
    <p style="margin: 0; mso-line-height-alt: 14.399999999999999px; letter-spacing: 2px;"><em>Atentamente:</em><br/>PURIFICACIÓN Y ANÁLISIS DE FLUIDOS S.A.S</p>
    <p style="margin: 0; mso-line-height-alt: 14.399999999999999px; letter-spacing: 2px;"><span style="font-size:14px;"> </span></p>
    </div>
    </div>
    </td>
    </tr>
    </table>
    <table border="0" cellpadding="0" cellspacing="0" class="text_block block-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
    <tr>
    <td class="pad">
    <div style="font-family: Tahoma, Verdana, sans-serif">
    <div class="" style="font-size: 12px; font-family: Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #888888; line-height: 1.2;">
    <p style="margin: 0; text-align: left; mso-line-height-alt: 14.399999999999999px; letter-spacing: 2px;"><span style="font-size:14px;">SOPORTE</span></p>
    </div>
    </div>
    </td>
    </tr>
    </table>
    <table border="0" cellpadding="0" cellspacing="0" class="text_block block-6" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
    <tr>
    <td class="pad">
    <div style="font-family: Tahoma, Verdana, sans-serif">
    <div class="" style="font-size: 12px; font-family: Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #888888; line-height: 1.2;">
    <p style="margin: 0; font-size: 12px; text-align: left; mso-line-height-alt: 14.399999999999999px; letter-spacing: 2px;">Comunícate con nosotros por los siguientes medios:</p>
    <p style="margin: 0; mso-line-height-alt: 14.399999999999999px; letter-spacing: 2px;"> </p>
    <p style="margin: 0; mso-line-height-alt: 14.399999999999999px; letter-spacing: 2px;">Correo: <a href="mailto:alexandra_sandoval@paf.com.co" rel="noopener" style="text-decoration: underline; color: #7747FF;" target="_blank">contacto@paf.com.co</a><br/>Whatsapp: <a href="https://wa.me/573224294332" rel="noopener" style="text-decoration: underline; color: #7747FF;" target="_blank">+57 318 3776315</a></p>
    <p style="margin: 0; mso-line-height-alt: 14.399999999999999px; letter-spacing: 2px;"> </p>
    <p style="margin: 0; mso-line-height-alt: 14.399999999999999px; letter-spacing: 2px;"> </p>
    <p style="margin: 0; text-align: center; mso-line-height-alt: 14.399999999999999px; letter-spacing: 2px;">© 2024 Todos los derechos reservados, Purificación y Análisis de Fluidos SAS.</p>
    <p style="margin: 0; mso-line-height-alt: 14.399999999999999px; letter-spacing: 2px;"> </p>
    </div>
    </div>
    </td>
    </tr>
    </table>
    <table border="0" cellpadding="10" cellspacing="0" class="social_block block-7" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tr>
    <td class="pad">
    <div align="center" class="alignment">
    <table border="0" cellpadding="0" cellspacing="0" class="social-table" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;" width="108px">
    <tr>
    <td style="padding:0 2px 0 2px;"><a href="https://www.facebook.com/pafltda" target="_blank"><img alt="Facebook" height="auto" src="images/facebook2x.png" style="display: block; height: auto; border: 0;" title="facebook" width="32"/></a></td>
    <td style="padding:0 2px 0 2px;"><a href="https://www.instagram.com/paf.sas/" target="_blank"><img alt="Instagram" height="auto" src="images/instagram2x.png" style="display: block; height: auto; border: 0;" title="instagram" width="32"/></a></td>
    <td style="padding:0 2px 0 2px;"><a href="https://wa.me/3183776315" target="_blank"><img alt="WhatsApp" height="auto" src="images/whatsapp2x.png" style="display: block; height: auto; border: 0;" title="WhatsApp" width="32"/></a></td>
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
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;" width="100%">
    <tbody>
    <tr>
    <td>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 760px; margin: 0 auto;" width="760">
    <tbody>
    <tr>
    <td class="column column-1" style="font-weight: 400; text-align: left; mso-table-lspace: 0pt; mso-table-rspace: 0pt; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
    <table border="0" cellpadding="0" cellspacing="0" class="icons_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: center;" width="100%">
    <tr>
    <td class="pad" style="vertical-align: middle; color: #1e0e4b; font-family: 'Inter', sans-serif; font-size: 15px; padding-bottom: 5px; padding-top: 5px; text-align: center;">
    <table cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tr>
    <td class="alignment" style="vertical-align: middle; text-align: center;"><!--[if vml]><table align="center" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
    <!--[if !vml]><!-->
    <table cellpadding="0" cellspacing="0" class="icons-inner" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block; margin-right: -4px; padding-left: 0px; padding-right: 0px;"><!--<![endif]-->
    <tr>
    <td style="vertical-align: middle; text-align: center; padding-top: 5px; padding-bottom: 5px; padding-left: 5px; padding-right: 6px;"><a href="http://designedwithbeefree.com/" style="text-decoration: none;" target="_blank"><img align="center" alt="Beefree Logo" class="icon" height="auto" src="images/Beefree-logo.png" style="display: block; height: auto; margin: 0 auto; border: 0;" width="34"/></a></td>
    <td style="font-family: 'Inter', sans-serif; font-size: 15px; font-weight: undefined; color: #1e0e4b; vertical-align: middle; letter-spacing: undefined; text-align: center;"><a href="http://designedwithbeefree.com/" style="color: #1e0e4b; text-decoration: none;" target="_blank">Designed with Beefree</a></td>
    </tr>
    </table>
    </td>
    </tr>
    </table>
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