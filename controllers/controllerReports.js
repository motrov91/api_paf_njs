import { emailReportFailure } from '../helpers/emails.js';


const reportProblem = async (req, res) => {

    const { email, description } = req.body;

     //Función creada en el helper email y recibe como parametros [nombre, email, token]
     emailReportFailure({
        emailEnvio: email,
        descripcion: description,
    })
    
    res.json({msg: "Tu reporte se ha enviado con éxito"})
}

const deleteAccount = async (req, res) => {
    console.log(req.body)
    res.json({msg: "Tu solicitud se ha enviado con éxito"})
}




export {
    reportProblem,
    deleteAccount
}   