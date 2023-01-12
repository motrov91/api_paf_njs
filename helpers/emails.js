import nodemailer from 'nodemailer';

const emailRecovery = async (data) => {
    var transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secureConnection: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const { email, nombre, token } = data;

    console.log('PASA');
    console.log('email', email);


    //Send email
    await transport.sendMail({
        from:'productospaf.com.co',
        to: email,
        subject: 'Recuperación de contraseña productosPAF',
        text: 'Recupera tu cuenta en productospaf.com',
        html:`
            <p>Hola ${nombre}.</p>
            <p>Bienvenido al sistema para recuperación de tu contraseña.</p>
            <p>Tu cuenta ya esta lista, para cambiar tu contraseña solamente debes 
                cambiar la contraseña en el siguiente enlace <a href="http://localhost:53750/#/auth/changePassword/${token}">Cambiar Contraseña</a>
            </p>
        `
    });

    console.log('pasa el envio del mensaje')
}

export {
    emailRecovery
}