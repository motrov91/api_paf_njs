import nodemailer from 'nodemailer';

export class EmailService{

    transporter = nodemailer.createTransport( {
        service: 'gmail',
        auth: {
            user: 'contactoproductospaf@gmail.com',
            pass: 'adzupmmesbzoobvb'
        },
      });

      async sendEmail(){
        try {

            const sentInformation = await this.transporter.sendMail( {
              to: 'manuel.ramirez1209@gmail.com',
              subject: 'test correo',
              html: `<p>texto de prueba</p>`,
              attachments: attachements,
            });
      
            console.log( sentInformation );
      
            return true;
          } catch ( error ) {
            return false;
          }
      }
}