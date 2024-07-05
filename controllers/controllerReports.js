import { emailReportFailure } from '../helpers/emails.js';
import { Session } from '../models/index_model.js';

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
    res.json({msg: "Tu solicitud se ha enviado con éxito"})
}

const sessionsApp = async (req, res) => { 
    const sessions = await Session.findAll({
        order: [
            ['id', 'DESC'],
        ]
    });  
    console.log('SESSIONS', sessions.length)
    return res.status(200).json({sessions});
}




export {
    reportProblem,
    deleteAccount,
    sessionsApp
}   