import nodemailer from 'nodemailer';

const emailRecovery = async (data) => {
    var transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        secureConnection: false,
        tls:{
            //ciphers:'SSLv3'
            rejectUnauthorized: false,
        },
        requireTLS:true,
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
    const mailOptions= {
        from:'recovery@productospaf.com.co',
        to: email,
        subject: 'Recuperación de contraseña productosPAF',
        text: 'Recupera tu cuenta en productospaf.com',
        html:`
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
        tls:{
            //ciphers:'SSLv3'
            rejectUnauthorized: false,
        },
        requireTLS:true,
        debug: true,
        auth: {
            user: 'recovery@productospaf.com.co',
            pass: 'productospaf12345.'
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

    console.log(emailEnvio, '--', descripcion )

    //Structure email
    const mailOptions= {
        from:'recovery@productospaf.com.co',
        to: 'manuel.ramirez1209@gmail.com',
        subject: 'Reporte de fallo en la plataforma',
        text: 'Hola hay un reporte de daño en la plataforma',
        html:`
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


export {
    emailRecovery,
    emailReportFailure
}