import pdf from 'pdfkit';
import imageToBase from 'image-to-base64';
import { PdfProduct, Product, Category } from '../models/index_model.js';

import {fileURLToPath} from 'url';
import path from 'path';

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config( process.env.CLOUDINARY_URL )


async function LocalPDF(data) {

    console.log('DATOS ENTRANTES: ',data.id, data.name)
    const { id, name } = data;


    let markets = [];

    if ( data.market1 !== null ) {
        markets.push(data.market1)
    }
    if ( data.market2 !== null ) {
        markets.push(data.market2)
    }
    if ( data.market3 !== null ) {
        markets.push(data.market3)
    }
    if ( data.market4 !== null ) {
        markets.push(data.market4)
    }
    if ( data.market5 !== null ) {
        markets.push(data.market5)
    }
    if ( data.market6 !== null ) {
        markets.push(data.market6)
    }
    if ( data.market7 !== null ) {
        markets.push(data.market7)
    }
    if ( data.market8 !== null ) {
        markets.push(data.market8)
    }
    if ( data.market9 !== null ) {
        markets.push(data.market9)
    }
    if ( data.market10 !== null ) {
        markets.push(data.market10)
    }
    if ( data.market11 !== null ) {
        markets.push(data.market11)
    }
    if ( data.market12 !== null ) {
        markets.push(data.market12)
    }

    let imgProduct;

    if(data.img){
        imgProduct = await new Promise(function(resolve,reject){
        imageToBase(data.img) // you can also to use url
        .then(
            (response) => {resolve(response);}
        )
        .catch(
            (error) => {
                    resolve(false);
                    console.log(error); 
                }
            ) 
        });
    }else{
        imgProduct = await new Promise(function(resolve,reject){
        imageToBase('https://www.paf.com.co/wp-content/uploads/2022/03/Logo-paf-5-e1648091227458.png') // you can also to use url
        .then(
            (response) => {resolve(response);}
        )
        .catch(
            (error) => {
                    resolve(false);
                    console.log(error); 
                }
            ) 
        });
    }

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const logoAcueducto = path.join(__dirname, '../assets/logos/', 'acueductos.png' );
    const logoAlimentos = path.join(__dirname, '../assets/logos/', 'alimentos.png' );
    const logoClinico = path.join(__dirname, '../assets/logos/', 'clinico.png' );
    const logoEducacion = path.join(__dirname, '../assets/logos/', 'educacion.png' );
    const logoGobierno = path.join(__dirname, '../assets/logos/', 'gobierno.png' );
    const logoIndustriales = path.join(__dirname, '../assets/logos/', 'industriales.png' );
    const logoInvestigacion = path.join(__dirname, '../assets/logos/', 'investigacion.png' );
    const logoQuimica = path.join(__dirname, '../assets/logos/', 'quimica.png' );
    const logoTratamientoAguas = path.join(__dirname, '../assets/logos/', 'tratamientoAguas.png' );
    const logoFarmaceutica = path.join(__dirname, '../assets/logos/', 'farmaceutica.png' );
    const logoCannabis = path.join(__dirname, '../assets/logos/', 'cannabis.png' );
    const pathImage1 = path.join( __dirname, '../assets/', 'numeroUno.png' ); 
    const pathImage2 = path.join( __dirname, '../assets/', 'numeroDos.png' ); 
    const pathImage3 = path.join( __dirname, '../assets/', 'numeroTres.png' ); 
    const pathImage4 = path.join( __dirname, '../assets/', 'numeroCuatro.png' ); 
    const pathImage5 = path.join( __dirname, '../assets/', 'numeroCinco.png' ); 
    const ventaja1 = path.join( __dirname, '../assets/', 'ventaja1.png' ); 
    const ventaja2 = path.join( __dirname, '../assets/', 'ventaja2.png' ); 
    const ventaja3 = path.join( __dirname, '../assets/', 'ventaja3.png' ); 
    const ventaja4 = path.join( __dirname, '../assets/', 'ventaja4.png' ); 
    const ventaja5 = path.join( __dirname, '../assets/', 'ventaja5.png' );
    const pathImage6 = path.join( __dirname, '../assets/', 'icon_video.png' ); 
    const logo = path.join( __dirname, '../assets/', 'logo.png' );   
    const footerPDF = path.join(__dirname, '../assets/footer.png'); 
    const headerPDF = path.join(__dirname, '../assets/header.png'); 

    //Crea el pdf y se asignamos un tamaño y una información general
    const doc = new pdf({ 
        info:{
            Title: 'Productos PAF',
            Author: 'Purificación y Análisis de Fluidos SAS'
        },
        // size: 'A4',
        size: [595, 920],
        margins: { top: 0, bottom: 0, left: 0, right:0 }
    });

    //Medidas de la hota
    const fullDocH = 595;
    const cuadrado = [291, 140]

    /* PFD PARA 1 PRODUCTO */

    if( markets.length === 1){

        doc
            .image(headerPDF, 0, 0, {width: 600})

        if(data.name.length > 25){
            doc
            .fillColor('#163461')
            .fontSize(15)
            .text(
                data.name, 
                60, 50,
                { 
                    width: 200,
                    align: 'center'
                }, 
            )
            .moveDown();
            
        }else{
            doc
            .fillColor('#163461')
            .fontSize(25)
            .text(
                data.name, 
                60, 50,
                { 
                    width: 200,
                    align: 'center'
                }, 
            ).moveDown();
        }
        

        doc
            .image('data:image/jpeg;base64,'+imgProduct , 60, 100, {width: 200})
            .moveDown();

        doc.lineJoin('test')
            .rect(fullDocH / 1.8, 60, cuadrado[0], cuadrado[1])
            .fill('#016db4')
            .moveDown();

            doc
            .fontSize(16)
            .fillColor('#ffffff')
            .text(data.market1, 380,65, {width: 220})
            .moveDown();

        doc
            .fontSize(11)
            .fillColor('#ffffff')
            .font('Helvetica-Oblique')
            .text(data.description_market1, 380, 105, {width:200})
            .moveDown();
        
        

        switch(data.market1){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoAcueducto, 305, 105, { width:50 })
                .moveDown();
                break;
            case "PROCESOS INDUSTRIALES":
                doc.image(logoIndustriales, 305, 105, { width:50 })
                .moveDown();
                break;
            case "ACUEDUCTOS":
                doc.image(logoAcueducto, 305, 105, { width:50 })
                .moveDown();
                break;
            case "EDUCACIÓN":
                doc.image(logoEducacion, 305, 105, { width:50 })
                .moveDown();
                break;
            case "ALIMENTOS":
                doc.image(logoAlimentos, 305, 105, { width:50 })
                .moveDown();
                break;
            case "GOBIERNO":
                doc.image(logoGobierno, 305, 105, { width:50 })
                .moveDown();
                break;
            case "INVESTIGACIÓN":
                doc.image(logoInvestigacion, 305, 105, { width:50 })
                .moveDown();
                break;
            case "CLINICO Y HOSPITALARIO":
                doc.image(logoClinico, 305, 105, { width:50 })
                .moveDown();
                break;
            case "TRATAMIENTO DE AGUA INDUSTRIAL":
                doc.image(logoTratamientoAguas, 305, 105, { width:50 })
                .moveDown();
                break;
            case "FARMACÉUTICA":
                doc.image(logoClinico, 305, 105, { width:50 })
                .moveDown();
                break;
            case "CANNABIS":
                doc.image(logoQuimica, 305, 105, { width:50 })
                .moveDown();
                break;
        }

        doc.lineJoin('miter')
        .rect(0, 320, fullDocH, 60).fill('#2e6ca7');

        doc
            .fillColor('#fff')
            .fontSize(30)
            .text('Características', 190,338)
            .moveDown();
        //* ---------------------------------------------
        doc.lineJoin('miter')
            .rect(125, 400, 170, 170).fill('#2e6ca7');

        doc.circle(210, 435, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc
            .fontSize(10)
            .text(data.feature1,
            135, 465,  
            {
                width:150,
                align: 'center'
                
            })

        doc.image(pathImage1, 195, 420, {width: 30})
        //* ---------------------------------------------
        doc.lineJoin('miter')
            .rect(300, 400, 170, 170).fill('#25acb1');

        doc.circle(385, 435, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc
            .fontSize(10)
            .text(data.feature2,
            310, 465,  
            {
                width:150,
                align: 'center'
                
            })
        doc.image(pathImage2, 370, 420, {width: 30})
        //* ---------------------------------------------
        doc.lineJoin('miter')
            .rect(300, 575, 170, 170).fill('#90caf9');

        doc.circle(385, 610, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc
            .fontSize(10)
            .text(data.feature3,
            310, 640,  
            {
                width:150,
                align: 'center'
                
            })

        doc.image(pathImage4, 370, 595, {width: 30})
        //* ---------------------------------------------
        doc.lineJoin('miter')
            .rect(125, 575, 170, 170).fill('#f8c901');

        doc.circle(210, 610, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc
            .fontSize(10)
            .text(data.feature4,
            138, 640,  
            {
                width:150,
                align: 'center'
                
            })

        doc.image(pathImage3, 195, 595, {width: 30})
        //* ---------------------------------------------
        doc.lineJoin('miter')
            .rect(99, 750, 402, 80).fill('#ff6510');

        doc.circle(140, 790, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc.image(pathImage5, 125, 775, {width: 30})

        doc
            .fontSize(11)
            .text(data.feature5,
            170, 760,  
            {
                width:300,
                align: 'center'    
            })

        doc
            .image(footerPDF, 0, 830, {width: 600})

        //* Ventajas comerciales 

        doc.addPage({
            size: [595, 920],
        })
            .moveDown()

        doc.lineJoin('FondoAzulClaro')
            .roundedRect(50,0, 500, 500, 30 )
            .fillAndStroke('#EDF4F7', '#D5E8F4')

         doc.lineJoin('fondoazul')
            .rect(0, 0, fullDocH, 60).fill('#2e6ca7');

        doc
            .fillColor('#fff')
            .fontSize(30)
            .text('Ventajas competitivas', 170,18)
            .moveDown();

        if(data.adventage1 != null){

            doc.lineJoin('fondoGris')
            .roundedRect(70, 80, 450, 70, 3 )
            .fill('#E2E8EA')

            doc.circle(100, 113, 25)
                .lineWidth(3)
                .fillOpacity(0.95)
                .fillAndStroke("#2e6ca7", "#fff")
                .moveDown();

            doc.image(ventaja1, 88, 100, {width: 25})

            doc
                .fontSize(11)
                .fillColor('#163461')
                .text(data.adventage1,
                140, 90,  
                {
                    width:350,
                    align: 'center'    
                })
        }

        if(data.adventage2 != null){

            doc.lineJoin('fondoGris')
            .roundedRect(70, 160, 450, 70, 3 )
            .fill('#E2E8EA')

            doc.circle(100, 195, 25)
                .lineWidth(3)
                .fillOpacity(0.95)
                .fillAndStroke("#fbc02d", "#fff")
                .moveDown();

            doc.image(ventaja2, 88, 183, {width: 30})

            doc
                .fontSize(11)
                .fillColor('#163461')
                .text(data.adventage2,
                140, 170,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(data.adventage3 != null){

            doc.lineJoin('fondoGris')
            .roundedRect(70, 240, 450, 70, 3 )
            .fill('#E2E8EA')

            doc.circle(100, 275, 25)
                .lineWidth(3)
                .fillOpacity(0.95)
                .fillAndStroke("#ff9f0f", "#fff")
                .moveDown();

            doc.image(ventaja3, 88, 263, {width: 30})

            doc
                .fontSize(11)
                .fillColor('#163461')
                .text(data.adventage3,
                140, 250,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(data.adventage4 != null){

            doc.lineJoin('fondoGris')
                .roundedRect(70, 320, 450, 70, 3 )
                .fill('#E2E8EA')

            doc.circle(100, 355, 25)
                .lineWidth(3)
                .fillOpacity(0.95)
                .fillAndStroke("#24abb1", "#fff")
                .moveDown();

            doc.image(ventaja4, 88, 343, {width: 30})

            doc
                .fontSize(11)
                .fillColor('#163461')
                .text(data.adventage4,
                140, 330,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(data.adventage5 != null){

            doc.lineJoin('fondoGris')
            .roundedRect(70, 400, 450, 70, 3 )
            .fill('#E2E8EA')

            doc.circle(100, 440, 25)
                .lineWidth(3)
                .fillOpacity(0.95)
                .fillAndStroke("#ff6510", "#fff")
                .moveDown();

            doc.image(ventaja5, 84, 426, {width: 30})


            doc
                .fontSize(11)
                .fillColor('#163461')
                .text(data.adventage5,
                140, 410,  
                {
                    width:350,
                    align: 'center'    
                })

        }

    } 
    /* PDF PARA UN PRODUCTO DE DOS (2) MERCADOS */
    else if( markets.length === 2 ){ 
        doc
            .image(headerPDF, 0, 0, {width: 330})

        if(data.name.length > 25){
            doc
            .fillColor('#163461')
            .fontSize(15)
            .text(
                data.name, 
                60, 50,
                { 
                    width: 200,
                    align: 'center'
                }, 
            )
            .moveDown();
            
        }else{
            doc
            .fillColor('#163461')
            .fontSize(25)
            .text(
                data.name, 
                60, 50,
                { 
                    width: 200,
                    align: 'center'
                }, 
            ).moveDown();
        }

        doc
            .image('data:image/jpeg;base64,'+imgProduct , 40, 110, { fit: [250, 200], align:'center', valign:'center'})
            .moveDown();

        doc.lineJoin('test')
        .rect(fullDocH / 1.8, 0, cuadrado[0], 150)
        .fill('#016db4')
        .moveDown();

        doc
            .fontSize(16)
            .fillColor('#ffffff')
            .text(data.market1, 370, 10, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#ffffff')
            .font('Helvetica-Oblique')
            .text(data.description_market1, 370, 50, {width: 210})
            .moveDown();

        switch(data.market1){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoAcueducto, 305, 50, { width:50 })
                .moveDown();
                break;
            case "PROCESOS INDUSTRIALES":
                doc.image(logoIndustriales, 305, 50, { width:50 })
                .moveDown();
                break;
            case "ACUEDUCTOS":
                doc.image(logoAcueducto, 305, 50, { width:50 })
                .moveDown();
                break;
            case "EDUCACIÓN":
                doc.image(logoEducacion, 305, 50, { width:50 })
                .moveDown();
                break;
            case "ALIMENTOS":
                doc.image(logoAlimentos, 305, 50, { width:50 })
                .moveDown();
                break;
            case "GOBIERNO":
                doc.image(logoGobierno, 305, 50, { width:50 })
                .moveDown();
                break;
            case "INVESTIGACIÓN":
                doc.image(logoInvestigacion, 305, 50, { width:50 })
                .moveDown();
                break;
            case "CLINICO Y HOSPITALARIO":
                doc.image(logoClinico, 305, 50, { width:50 })
                .moveDown();
                break;
            case "TRATAMIENTO DE AGUA INDUSTRIAL":
                doc.image(logoTratamientoAguas, 305, 50, { width:50 })
                .moveDown();
                break;
            case "FARMACÉUTICA":
                doc.image(logoClinico, 305, 50, { width:50 })
                .moveDown();
                break;
            case "CANNABIS":
                doc.image(logoQuimica, 305, 50, { width:50 })
                .moveDown();
                break;
        }


        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 150, cuadrado[0], 150).fill('#ecc101');

        switch(data.market2){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoAcueducto, 305, 200, { width:50 })
                .moveDown();
                break;
            case "PROCESOS INDUSTRIALES":
                doc.image(logoIndustriales, 305, 200, { width:50 })
                .moveDown();
                break;
            case "ACUEDUCTOS":
                doc.image(logoAcueducto, 305, 200, { width:50 })
                .moveDown();
                break;
            case "EDUCACIÓN":
                doc.image(logoEducacion, 305, 200, { width:50 })
                .moveDown();
                break;
            case "ALIMENTOS":
                doc.image(logoAlimentos, 305, 200, { width:50 })
                .moveDown();
                break;
            case "GOBIERNO":
                doc.image(logoGobierno, 305, 200, { width:50 })
                .moveDown();
                break;
            case "INVESTIGACIÓN":
                doc.image(logoInvestigacion, 305, 200, { width:50 })
                .moveDown();
                break;
            case "CLINICO Y HOSPITALARIO":
                doc.image(logoClinico, 305, 200, { width:50 })
                .moveDown();
                break;
            case "TRATAMIENTO DE AGUA INDUSTRIAL":
                doc.image(logoTratamientoAguas, 305, 200, { width:50 })
                .moveDown();
                break;
            case "FARMACÉUTICA":
                doc.image(logoClinico, 305, 200, { width:50 })
                .moveDown();
                break;
            case "CANNABIS":
                doc.image(logoQuimica, 305, 200, { width:50 })
                .moveDown();
                break;
        }


        doc
            .fontSize(16)
            .fillColor('#285258')
            .text(data.market2, 370, 180, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#285258')
            .font('Helvetica-Oblique')
            .text(data.description_market2, 370, 210, {width: 210})
            .moveDown();

        //* -------------------- CARACTERISTICAS -------------------------

        doc.lineJoin('miter')
        .rect(0, 320, fullDocH, 60).fill('#2e6ca7');

        doc
            .fillColor('#fff')
            .fontSize(30)
            .text('Características', 190,338)
            .moveDown();
        //* ---------------------------------------------
        doc.lineJoin('miter')
            .rect(125, 400, 170, 170).fill('#2e6ca7');

        doc.circle(210, 435, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc
            .fontSize(10)
            .text(data.feature1,
            135, 465,  
            {
                width:150,
                align: 'center'
                
            })

        doc.image(pathImage1, 195, 420, {width: 30})
        //* ---------------------------------------------
        doc.lineJoin('miter')
            .rect(300, 400, 170, 170).fill('#25acb1');

        doc.circle(385, 435, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc
            .fontSize(10)
            .text(data.feature2,
            310, 465,  
            {
                width:150,
                align: 'center'
                
            })
        doc.image(pathImage2, 370, 420, {width: 30})
        //* ---------------------------------------------
        doc.lineJoin('miter')
            .rect(300, 575, 170, 170).fill('#ff9f0f');

        doc.circle(385, 610, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc
            .fontSize(10)
            .text(data.feature3,
            310, 640,  
            {
                width:150,
                align: 'center'
                
            })

        doc.image(pathImage4, 370, 595, {width: 30})
        //* ---------------------------------------------
        doc.lineJoin('miter')
            .rect(125, 575, 170, 170).fill('#fbc02d');

        doc.circle(210, 610, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc
            .fontSize(10)
            .text(data.feature4,
            138, 640,  
            {
                width:150,
                align: 'center'
                
            })

        doc.image(pathImage3, 195, 595, {width: 30})
        //* ---------------------------------------------
        doc.lineJoin('miter')
            .rect(99, 750, 402, 80).fill('#ff6510');

        doc.circle(140, 790, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc.image(pathImage5, 125, 775, {width: 30})

        doc
            .fontSize(11)
            .text(data.feature5,
            170, 760,  
            {
                width:300,
                align: 'center'    
            })

        doc
            .image(footerPDF, 0, 830, {width: 600})

        doc.addPage({
            size: [595, 920],
        })
            .moveDown()

        doc.lineJoin('FondoAzulClaro')
            .roundedRect(50,0, 500, 500, 30 )
            .fillAndStroke('#EDF4F7', '#D5E8F4')

        doc.lineJoin('VentajasCompetitivas')
            .rect(0, 0, fullDocH, 60).fill('#2e6ca7');

        doc
            .fillColor('#fff')
            .fontSize(30)
            .text('Ventajas competitivas', 170,18)
            .moveDown();

        if(data.adventage1 != null){

            doc.lineJoin('fondoGris')
            .roundedRect(70, 80, 450, 70, 3 )
            .fill('#E2E8EA')

            doc.circle(100, 113, 25)
                .lineWidth(3)
                .fillOpacity(0.95)
                .fillAndStroke("#2e6ca7", "#fff")
                .moveDown();

            doc.image(ventaja1, 88, 100, {width: 25})

            doc
                .fontSize(11)
                .fillColor('#163461')
                .text(data.adventage1,
                140, 90,  
                {
                    width:350,
                    align: 'center'    
                })
        }

        if(data.adventage2 != null){

            doc.lineJoin('fondoGris')
            .roundedRect(70, 160, 450, 70, 3 )
            .fill('#E2E8EA')

            doc.circle(100, 195, 25)
                .lineWidth(3)
                .fillOpacity(0.95)
                .fillAndStroke("#fbc02d", "#fff")
                .moveDown();

            doc.image(ventaja2, 88, 183, {width: 30})

            doc
                .fontSize(11)
                .fillColor('#163461')
                .text(data.adventage2,
                140, 170,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(data.adventage3 != null){

            doc.lineJoin('fondoGris')
            .roundedRect(70, 240, 450, 70, 3 )
            .fill('#E2E8EA')

            doc.circle(100, 275, 25)
                .lineWidth(3)
                .fillOpacity(0.95)
                .fillAndStroke("#ff9f0f", "#fff")
                .moveDown();

            doc.image(ventaja3, 88, 263, {width: 30})

            doc
                .fontSize(11)
                .fillColor('#163461')
                .text(data.adventage3,
                140, 250,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(data.adventage4 != null){

            doc.lineJoin('fondoGris')
                .roundedRect(70, 320, 450, 70, 3 )
                .fill('#E2E8EA')

            doc.circle(100, 355, 25)
                .lineWidth(3)
                .fillOpacity(0.95)
                .fillAndStroke("#24abb1", "#fff")
                .moveDown();

            doc.image(ventaja4, 88, 343, {width: 30})

            doc
                .fontSize(11)
                .fillColor('#163461')
                .text(data.adventage4,
                140, 330,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(data.adventage5 != null){

            doc.lineJoin('fondoGris')
            .roundedRect(70, 400, 450, 70, 3 )
            .fill('#E2E8EA')

            doc.circle(100, 440, 25)
                .lineWidth(3)
                .fillOpacity(0.95)
                .fillAndStroke("#ff6510", "#fff")
                .moveDown();

            doc.image(ventaja5, 84, 426, {width: 30})


            doc
                .fontSize(11)
                .fillColor('#163461')
                .text(data.adventage5,
                140, 410,  
                {
                    width:350,
                    align: 'center'    
                })

        }

    } else if( markets.length === 3 ){
        doc
            .image(headerPDF, 0, 0, {width: 330})

        if(data.name.length > 25){
            doc
            .fillColor('#163461')
            .fontSize(15)
            .text(
                data.name, 
                60, 50,
                { 
                    width: 200,
                    align: 'center'
                }, 
            )
            .moveDown();
            
        }else{
            doc
            .fillColor('#163461')
            .fontSize(25)
            .text(
                data.name, 
                60, 50,
                { 
                    width: 200,
                    align: 'center'
                }, 
            ).moveDown();
        }

        doc
            .image('data:image/jpeg;base64,'+imgProduct , 60, 140, {width: 200})
            .moveDown();

        doc.lineJoin('Producto 1')
        .rect(fullDocH / 1.8, 0, cuadrado[0], 120)
        .fill('#016db4')
        .moveDown();

        doc
            .fontSize(18)
            .fillColor('#ffffff')
            .text(data.market1, 370, 10, {width: 230})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#ffffff')
            .font('Helvetica-Oblique')
            .text(data.description_market1, 370, 50, {width: 210})
            .moveDown();

        switch(data.market1){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoAcueducto, 305, 38, { width:50 })
                .moveDown();
                break;
            case "PROCESOS INDUSTRIALES":
                doc.image(logoIndustriales, 305, 38, { width:50 })
                .moveDown();
                break;
            case "ACUEDUCTOS":
                doc.image(logoAcueducto, 305, 38, { width:50 })
                .moveDown();
                break;
            case "EDUCACIÓN":
                doc.image(logoEducacion, 305, 38, { width:50 })
                .moveDown();
                break;
            case "ALIMENTOS":
                doc.image(logoAlimentos, 305, 38, { width:50 })
                .moveDown();
                break;
            case "GOBIERNO":
                doc.image(logoGobierno, 305, 38, { width:50 })
                .moveDown();
                break;
            case "INVESTIGACIÓN":
                doc.image(logoInvestigacion, 305, 38, { width:50 })
                .moveDown();
                break;
            case "CLINICO Y HOSPITALARIO":
                doc.image(logoClinico, 305, 38, { width:50 })
                .moveDown();
                break;
            case "TRATAMIENTO DE AGUA INDUSTRIAL":
                doc.image(logoTratamientoAguas, 305, 38, { width:50 })
                .moveDown();
                break;
            case "FARMACÉUTICA":
                doc.image(logoFarmaceutica, 305, 38, { width:50 })
                .moveDown();
                break;
            case "CANNABIS":
                doc.image(logoCannabis, 305, 38, { width:50 })
                .moveDown();
                break;
        }


        doc.lineJoin('producto 2')
            .rect(fullDocH / 1.8, 120, cuadrado[0], 120).fill('#ecc101');

        switch(data.market2){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoAcueducto, 305, 155, { width:50 })
                .moveDown();
                break;
            case "PROCESOS INDUSTRIALES":
                doc.image(logoIndustriales, 305, 155, { width:50 })
                .moveDown();
                break;
            case "ACUEDUCTOS":
                doc.image(logoAcueducto, 305, 155, { width:50 })
                .moveDown();
                break;
            case "EDUCACIÓN":
                doc.image(logoEducacion, 305, 155, { width:50 })
                .moveDown();
                break;
            case "ALIMENTOS":
                doc.image(logoAlimentos, 305, 155, { width:50 })
                .moveDown();
                break;
            case "GOBIERNO":
                doc.image(logoGobierno, 305, 155, { width:50 })
                .moveDown();
                break;
            case "INVESTIGACIÓN":
                doc.image(logoInvestigacion, 305, 155, { width:50 })
                .moveDown();
                break;
            case "CLINICO Y HOSPITALARIO":
                doc.image(logoClinico, 305, 155, { width:50 })
                .moveDown();
                break;
            case "TRATAMIENTO DE AGUA INDUSTRIAL":
                doc.image(logoTratamientoAguas, 305, 155, { width:50 })
                .moveDown();
                break;
            case "FARMACÉUTICA":
                doc.image(logoFarmaceutica, 305, 155, { width:50 })
                .moveDown();
                break;
            case "CANNABIS":
                doc.image(logoCannabis, 305, 155, { width:50 })
                .moveDown();
                break;
        }


        doc
            .fontSize(16)
            .fillColor('#285258')
            .text(data.market2, 370, 130, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#285258')
            .font('Helvetica-Oblique')
            .text(data.description_market2, 370, 170, {width: 210})
            .moveDown();

        doc.lineJoin('producto 3')
            .rect(fullDocH / 1.8, 240, cuadrado[0], 120).fill('#25acb1');

        switch(data.market3){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoAcueducto, 305, 278, { width:50 })
                .moveDown();
                break;
            case "PROCESOS INDUSTRIALES":
                doc.image(logoIndustriales, 305, 278, { width:50 })
                .moveDown();
                break;
            case "ACUEDUCTOS":
                doc.image(logoAcueducto, 305, 278, { width:50 })
                .moveDown();
                break;
            case "EDUCACIÓN":
                doc.image(logoEducacion, 305, 278, { width:50 })
                .moveDown();
                break;
            case "ALIMENTOS":
                doc.image(logoAlimentos, 305, 278, { width:50 })
                .moveDown();
                break;
            case "GOBIERNO":
                doc.image(logoGobierno, 305, 278, { width:50 })
                .moveDown();
                break;
            case "INVESTIGACIÓN":
                doc.image(logoInvestigacion, 305, 278, { width:50 })
                .moveDown();
                break;
            case "CLINICO Y HOSPITALARIO":
                doc.image(logoClinico, 305, 278, { width:50 })
                .moveDown();
                break;
            case "TRATAMIENTO DE AGUA INDUSTRIAL":
                doc.image(logoTratamientoAguas, 305, 278, { width:50 })
                .moveDown();
                break;
            case "FARMACÉUTICA":
                doc.image(logoFarmaceutica, 305, 278, { width:50 })
                .moveDown();
                break;
            case "CANNABIS":
                doc.image(logoCannabis, 305, 278, { width:50 })
                .moveDown();
                break;
        }

        doc
            .fontSize(16)
            .fillColor('#ffffff')
            .text(data.market3, 370, 250, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#ffffff')
            .font('Helvetica-Oblique')
            .text(data.description_market3, 370, 290, {width: 210})
            .moveDown();

        //* -------------------- CARACTERISTICAS -------------------------

        doc.lineJoin('miter')
        .rect(0, 365, fullDocH, 45).fill('#2e6ca7');

        doc
            .fillColor('#fff')
            .fontSize(30)
            .text('Características', 190,374)
            .moveDown();
        //* ---------------------------------------------
        doc.lineJoin('miter')
            .rect(125, 415, 170, 170).fill('#2e6ca7');

        doc.circle(210, 450, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc
            .fontSize(10)
            .text(data.feature1,
            135, 480,  
            {
                width:150,
                align: 'center'
                
            })

        doc.image(pathImage1, 195, 435, {width: 30})
        //* ---------------------------------------------
        doc.lineJoin('miter')
            .rect(300, 415, 170, 170).fill('#25acb1');

        doc.circle(385, 450, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc
            .fontSize(10)
            .text(data.feature2,
            310, 480,  
            {
                width:150,
                align: 'center'
                
            })
        doc.image(pathImage2, 370, 435, {width: 30})
        //* ---------------------------------------------
        doc.lineJoin('miter')
            .rect(300, 590, 170, 170).fill('#ff9f0f');

        doc.circle(385, 625, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc
            .fontSize(10)
            .text(data.feature3,
            310, 655,  
            {
                width:150,
                align: 'center'
                
            })

        doc.image(pathImage4, 370, 610, {width: 30})
        //* ---------------------------------------------
        doc.lineJoin('miter')
            .rect(125, 590, 170, 170).fill('#fbc02d');

        doc.circle(210, 625, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc
            .fontSize(10)
            .text(data.feature4,
            138, 655,  
            {
                width:150,
                align: 'center'
                
            })

        doc.image(pathImage3, 195, 610, {width: 30})
        //* ---------------------------------------------
        doc.lineJoin('miter')
            .rect(99, 770, 402, 80).fill('#ff6510');

        doc.circle(140, 800, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc.image(pathImage5, 125, 785, {width: 30})

        doc
            .fontSize(11)
            .text(data.feature5,
            170, 780,  
            {
                width:300,
                align: 'center'    
            })
        
        doc
            .image(footerPDF, 0, 830, {width: 600})

        doc.addPage({
            size: [595, 920],
        })
            .moveDown()

        doc.lineJoin('FondoAzulClaro')
            .roundedRect(50,0, 500, 500, 30 )
            .fillAndStroke('#EDF4F7', '#D5E8F4')

        doc.lineJoin('VentajasCompetitivas')
            .rect(0, 0, fullDocH, 60).fill('#2e6ca7');

        doc
            .fillColor('#fff')
            .fontSize(30)
            .text('Ventajas competitivas', 170,18)
            .moveDown();

        if(data.adventage1 != null){

            doc.lineJoin('fondoGris')
            .roundedRect(70, 80, 450, 70, 3 )
            .fill('#E2E8EA')

            doc.circle(100, 113, 25)
                .lineWidth(3)
                .fillOpacity(0.95)
                .fillAndStroke("#2e6ca7", "#fff")
                .moveDown();

            doc.image(ventaja1, 88, 100, {width: 25})

            doc
                .fontSize(11)
                .fillColor('#163461')
                .text(data.adventage1,
                140, 90,  
                {
                    width:350,
                    align: 'center'    
                })
        }

        if(data.adventage2 != null){

            doc.lineJoin('fondoGris')
            .roundedRect(70, 160, 450, 70, 3 )
            .fill('#E2E8EA')

            doc.circle(100, 195, 25)
                .lineWidth(3)
                .fillOpacity(0.95)
                .fillAndStroke("#fbc02d", "#fff")
                .moveDown();

            doc.image(ventaja2, 88, 183, {width: 30})

            doc
                .fontSize(11)
                .fillColor('#163461')
                .text(data.adventage2,
                140, 170,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(data.adventage3 != null){

            doc.lineJoin('fondoGris')
            .roundedRect(70, 240, 450, 70, 3 )
            .fill('#E2E8EA')

            doc.circle(100, 275, 25)
                .lineWidth(3)
                .fillOpacity(0.95)
                .fillAndStroke("#ff9f0f", "#fff")
                .moveDown();

            doc.image(ventaja3, 88, 263, {width: 30})

            doc
                .fontSize(11)
                .fillColor('#163461')
                .text(data.adventage3,
                140, 250,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(data.adventage4 != null){

            doc.lineJoin('fondoGris')
                .roundedRect(70, 320, 450, 70, 3 )
                .fill('#E2E8EA')

            doc.circle(100, 355, 25)
                .lineWidth(3)
                .fillOpacity(0.95)
                .fillAndStroke("#24abb1", "#fff")
                .moveDown();

            doc.image(ventaja4, 88, 343, {width: 30})

            doc
                .fontSize(11)
                .fillColor('#163461')
                .text(data.adventage4,
                140, 330,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(data.adventage5 != null){

            doc.lineJoin('fondoGris')
            .roundedRect(70, 400, 450, 70, 3 )
            .fill('#E2E8EA')

            doc.circle(100, 440, 25)
                .lineWidth(3)
                .fillOpacity(0.95)
                .fillAndStroke("#ff6510", "#fff")
                .moveDown();

            doc.image(ventaja5, 84, 426, {width: 30})


            doc
                .fontSize(11)
                .fillColor('#163461')
                .text(data.adventage5,
                140, 410,  
                {
                    width:350,
                    align: 'center'    
                })

        }


        
    } else if( markets.length === 4 ){
        doc
            .image(headerPDF, 0, 0, {width: 330})

        if(data.name.length > 25){
            doc
            .fillColor('#163461')
            .fontSize(15)
            .text(
                data.name, 
                60, 50,
                { 
                    width: 200,
                    align: 'center'
                }, 
            )
            .moveDown();
            
        }else{
            doc
            .fillColor('#163461')
            .fontSize(25)
            .text(
                data.name, 
                60, 50,
                { 
                    width: 200,
                    align: 'center'
                }, 
            ).moveDown();
        }

        doc
            .image('data:image/jpeg;base64,'+imgProduct , 60, 310, {width: 200})
            .moveDown();

        doc.lineJoin('test')
            .rect(fullDocH / 1.8, 0, cuadrado[0], cuadrado[1])
            .fill('#016db4')
            .moveDown();

        doc
            .fontSize(16)
            .fillColor('#ffffff')
            .text(data.market1, 370, 10, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#ffffff')
            .font('Helvetica-Oblique')
            .text(data.description_market1, 370, 60, {width: 210})
            .moveDown();

        switch(data.market1){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoAcueducto, 305, 38, { width:50 })
                .moveDown();
                break;
            case "PROCESOS INDUSTRIALES":
                doc.image(logoIndustriales, 305, 38, { width:50 })
                .moveDown();
                break;
            case "ACUEDUCTOS":
                doc.image(logoAcueducto, 305, 38, { width:50 })
                .moveDown();
                break;
            case "EDUCACIÓN":
                doc.image(logoEducacion, 305, 38, { width:50 })
                .moveDown();
                break;
            case "ALIMENTOS":
                doc.image(logoAlimentos, 305, 38, { width:50 })
                .moveDown();
                break;
            case "GOBIERNO":
                doc.image(logoGobierno, 305, 38, { width:50 })
                .moveDown();
                break;
            case "INVESTIGACIÓN":
                doc.image(logoInvestigacion, 305, 38, { width:50 })
                .moveDown();
                break;
            case "CLINICO Y HOSPITALARIO":
                doc.image(logoClinico, 305, 38, { width:50 })
                .moveDown();
                break;
            case "TRATAMIENTO DE AGUA INDUSTRIAL":
                doc.image(logoTratamientoAguas, 305, 38, { width:50 })
                .moveDown();
                break;
            case "FARMACÉUTICA":
                doc.image(logoFarmaceutica, 305, 38, { width:50 })
                .moveDown();
                break;
            case "CANNABIS":
                doc.image(logoCannabis, 305, 38, { width:50 })
                .moveDown();
                break;
        }

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 210, cuadrado[0], cuadrado[1]).fill('#ecc101');

        switch(data.market2){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoAcueducto, 305, 254, { width:50 })
                .moveDown();
                break;
            case "PROCESOS INDUSTRIALES":
                doc.image(logoIndustriales, 305, 254, { width:50 })
                .moveDown();
                break;
            case "ACUEDUCTOS":
                doc.image(logoAcueducto, 305, 254, { width:50 })
                .moveDown();
                break;
            case "EDUCACIÓN":
                doc.image(logoEducacion, 305, 254, { width:50 })
                .moveDown();
                break;
            case "ALIMENTOS":
                doc.image(logoAlimentos, 305, 254, { width:50 })
                .moveDown();
                break;
            case "GOBIERNO":
                doc.image(logoGobierno, 305, 254, { width:50 })
                .moveDown();
                break;
            case "INVESTIGACIÓN":
                doc.image(logoInvestigacion, 305, 254, { width:50 })
                .moveDown();
                break;
            case "CLINICO Y HOSPITALARIO":
                doc.image(logoClinico, 305, 254, { width:50 })
                .moveDown();
                break;
            case "TRATAMIENTO DE AGUA INDUSTRIAL":
                doc.image(logoTratamientoAguas, 305, 254, { width:50 })
                .moveDown();
                break;
            case "FARMACÉUTICA":
                doc.image(logoFarmaceutica, 305, 254, { width:50 })
                .moveDown();
                break;
            case "CANNABIS":
                doc.image(logoCannabis, 305, 254, { width:50 })
                .moveDown();
                break;
        }

        doc
            .fontSize(16)
            .fillColor('#285258')
            .text(data.market2, 370, 220, {width: 210})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#285258')
            .font('Helvetica-Oblique')
            .text(data.description_market2, 370, 260, {width: 210})
            .moveDown();

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 420, cuadrado[0], cuadrado[1]).fill('#25acb1');

        switch(data.market3){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoAcueducto, 305, 38, { width:50 })
                .moveDown();
                break;
            case "PROCESOS INDUSTRIALES":
                doc.image(logoIndustriales, 305, 38, { width:50 })
                .moveDown();
                break;
            case "ACUEDUCTOS":
                doc.image(logoAcueducto, 305, 38, { width:50 })
                .moveDown();
                break;
            case "EDUCACIÓN":
                doc.image(logoEducacion, 305, 38, { width:50 })
                .moveDown();
                break;
            case "ALIMENTOS":
                doc.image(logoAlimentos, 305, 38, { width:50 })
                .moveDown();
                break;
            case "GOBIERNO":
                doc.image(logoGobierno, 305, 38, { width:50 })
                .moveDown();
                break;
            case "INVESTIGACIÓN":
                doc.image(logoInvestigacion, 305, 470, { width:50 })
                .moveDown();
                break;
            case "CLINICO Y HOSPITALARIO":
                doc.image(logoClinico, 305, 38, { width:50 })
                .moveDown();
                break;
            case "TRATAMIENTO DE AGUA INDUSTRIAL":
                doc.image(logoTratamientoAguas, 305, 468, { width:50 })
                .moveDown();
                break;
            case "FARMACÉUTICA":
                doc.image(logoFarmaceutica, 305, 38, { width:50 })
                .moveDown();
                break;
            case "CANNABIS":
                doc.image(logoCannabis, 305, 38, { width:50 })
                .moveDown();
                break;
        }

        doc
            .fontSize(16)
            .fillColor('#fff')
            .text(data.market3, 370, 430, {width: 200})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#fff')
            .font('Helvetica-Oblique')
            .text(data.description_market3, 370, 470, {width: 210})
            .moveDown();

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 630, cuadrado[0], cuadrado[1]).fill('#ff9f0f');

        switch(data.market4){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoAcueducto, 305, 38, { width:50 })
                .moveDown();
                break;
            case "PROCESOS INDUSTRIALES":
                doc.image(logoIndustriales, 305, 680, { width:50 })
                .moveDown();
                break;
            case "ACUEDUCTOS":
                doc.image(logoAcueducto, 305, 38, { width:50 })
                .moveDown();
                break;
            case "EDUCACIÓN":
                doc.image(logoEducacion, 305, 38, { width:50 })
                .moveDown();
                break;
            case "ALIMENTOS":
                doc.image(logoAlimentos, 305, 38, { width:50 })
                .moveDown();
                break;
            case "GOBIERNO":
                doc.image(logoGobierno, 305, 38, { width:50 })
                .moveDown();
                break;
            case "INVESTIGACIÓN":
                doc.image(logoInvestigacion, 305, 38, { width:50 })
                .moveDown();
                break;
            case "CLINICO Y HOSPITALARIO":
                doc.image(logoClinico, 305, 38, { width:50 })
                .moveDown();
                break;
            case "TRATAMIENTO DE AGUA INDUSTRIAL":
                doc.image(logoTratamientoAguas, 305, 738, { width:50 })
                .moveDown();
                break;
            case "FARMACÉUTICA":
                doc.image(logoFarmaceutica, 305, 678, { width:50 })
                .moveDown();
                break;
            case "CANNABIS":
                doc.image(logoCannabis, 305, 38, { width:50 })
                .moveDown();
                break;
        }

        doc
            .fontSize(16)
            .fillColor('#fff')
            .text(data.market4, 370, 650, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#fff')
            .font('Helvetica-Oblique')
            .text(data.description_market4, 370, 690, {width: 210})
            .moveDown();

        doc
            .fillColor('#016cb2')
            .fontSize(12)
            .text('www.paf.com.co', fullDocH/5.5, 790)
            .link(100, 100, 160, 27, 'https://www.paf.com.co/')
        
        doc
            .image(footerPDF, 0, 830, {width: 600})

    //------------------------------ NEW PAGE ------------------------------------------

        doc.addPage({
            size: [595, 920],
        })
            .moveDown()  

        doc.lineJoin('miter')
            .rect(0, 0, fullDocH, 60).fill('#2e6ca7');

        doc
            .fillColor('#fff')
            .fontSize(30)
            .text('Características', 190,18)
            .moveDown();

        doc.lineJoin('miter')
            .rect(99, 100, 200, 200).fill('#2e6ca7');

        doc.circle(200, 150, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc
            .fontSize(11)
            .text(`${data.feature1}`,
            125, 190,  
            {
                width:150,
                align: 'center'
                
            })

        doc.image(pathImage1, 185, 135, {width: 30})

        doc.lineJoin('miter')
            .rect(301, 100, 200, 200).fill('#fbc02d');

        doc.circle(400, 150, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc.image(pathImage2, 385, 135, {width: 30})

        doc
            .fontSize(11)
            .text(`${data.feature2}`,
            325, 190,  
            {
                width:150,
                align: 'center'
                
            })


        doc.lineJoin('miter')
            .rect(99, 302, 200, 200).fill('#ff9f0f');

        doc.circle(200, 350, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();
        
        doc.image(pathImage3, 185, 335, {width: 30})

        doc
            .fontSize(11)
            .text(`${data.feature3}`,
            125, 390,  
            {
                width:150,
                align: 'center'
                
            })

        doc.lineJoin('miter')
            .rect(301, 302, 200, 200).fill('#24abb1');

        doc.circle(400, 350, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc.image(pathImage4, 385, 335, {width: 30})

        doc
            .fontSize(11)
            .text(`${data.feature4}`,
            330, 390,  
            {
                width:150,
                align: 'center'
                
            })

        doc.lineJoin('miter')
            .rect(99, 504, 402, 80).fill('#ff6510');

        doc.circle(140, 542, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc.image(pathImage5, 125, 526, {width: 30})

        doc
            .fontSize(11)
            .text(`${data.feature5}`,
            170, 520,  
            {
                width:300,
                align: 'center'    
            })

    //------------------------------ NEW PAGE ------------------------------------------

        doc.addPage({
            size: [595, 920],
        })
            .moveDown()

        doc
            .fillColor('#fff')
            .fontSize(30)
            .text('Ventajas competitivas', 170,18)
            .moveDown();

        doc.lineJoin('FondoAzulClaro')
            .roundedRect(50,0, 500, 500, 30 )
            .fillAndStroke('#EDF4F7', '#D5E8F4')

        doc.lineJoin('VentajasCompetitivas')
            .rect(0, 0, fullDocH, 60).fill('#2e6ca7');

        doc
            .fillColor('#fff')
            .fontSize(30)
            .text('Ventajas competitivas', 170,18)
            .moveDown();

        if(data.adventage1 != null){

            doc.lineJoin('fondoGris')
            .roundedRect(70, 80, 450, 70, 3 )
            .fill('#E2E8EA')

            doc.circle(100, 113, 25)
                .lineWidth(3)
                .fillOpacity(0.95)
                .fillAndStroke("#2e6ca7", "#fff")
                .moveDown();

            doc.image(ventaja1, 88, 100, {width: 25})

            doc
                .fontSize(11)
                .fillColor('#163461')
                .text(data.adventage1,
                140, 90,  
                {
                    width:350,
                    align: 'center'    
                })
        }

        if(data.adventage2 != null){

            doc.lineJoin('fondoGris')
            .roundedRect(70, 160, 450, 70, 3 )
            .fill('#E2E8EA')

            doc.circle(100, 195, 25)
                .lineWidth(3)
                .fillOpacity(0.95)
                .fillAndStroke("#fbc02d", "#fff")
                .moveDown();

            doc.image(ventaja2, 88, 183, {width: 30})

            doc
                .fontSize(11)
                .fillColor('#163461')
                .text(data.adventage2,
                140, 170,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(data.adventage3 != null){

            doc.lineJoin('fondoGris')
            .roundedRect(70, 240, 450, 70, 3 )
            .fill('#E2E8EA')

            doc.circle(100, 275, 25)
                .lineWidth(3)
                .fillOpacity(0.95)
                .fillAndStroke("#ff9f0f", "#fff")
                .moveDown();

            doc.image(ventaja3, 88, 263, {width: 30})

            doc
                .fontSize(11)
                .fillColor('#163461')
                .text(data.adventage3,
                140, 250,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(data.adventage4 != null){

            doc.lineJoin('fondoGris')
                .roundedRect(70, 320, 450, 70, 3 )
                .fill('#E2E8EA')

            doc.circle(100, 355, 25)
                .lineWidth(3)
                .fillOpacity(0.95)
                .fillAndStroke("#24abb1", "#fff")
                .moveDown();

            doc.image(ventaja4, 88, 343, {width: 30})

            doc
                .fontSize(11)
                .fillColor('#163461')
                .text(data.adventage4,
                140, 330,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(data.adventage5 != null){

            doc.lineJoin('fondoGris')
            .roundedRect(70, 400, 450, 70, 3 )
            .fill('#E2E8EA')

            doc.circle(100, 440, 25)
                .lineWidth(3)
                .fillOpacity(0.95)
                .fillAndStroke("#ff6510", "#fff")
                .moveDown();

            doc.image(ventaja5, 84, 426, {width: 30})


            doc
                .fontSize(11)
                .fillColor('#163461')
                .text(data.adventage5,
                140, 410,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        

        doc
            .image(logo, 200, 700, {width: 200})

    } else if( markets.length === 5 ){
        doc
        .image(headerPDF, 0, 0, {width: 330})

        if(data.name.length > 25){
            doc
            .fillColor('#163461')
            .fontSize(15)
            .text(
                data.name, 
                60, 50,
                { 
                    width: 200,
                    align: 'center'
                }, 
            )
            .moveDown();
            
        }else{
            doc
            .fillColor('#163461')
            .fontSize(25)
            .text(
                data.name, 
                60, 50,
                { 
                    width: 200,
                    align: 'center'
                }, 
            ).moveDown();
        }

        doc
            .image('data:image/jpeg;base64,'+imgProduct , 60, 310, {width: 200})
            .moveDown();

        doc.lineJoin('test')
            .rect(fullDocH / 1.8, 0, cuadrado[0], cuadrado[1]) 
            .fill('#016db4') 
            .moveDown();

        doc
            .fontSize(16)
            .fillColor('#ffffff')
            .text(data.market1, 370, 10, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#ffffff')
            .font('Helvetica-Oblique')
            .text(data.description_market1, 370, 50, {width: 210})
            .moveDown();

        switch(data.market1){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoAcueducto, 305, 38, { width:50 })
                .moveDown();
                break;
            case "PROCESOS INDUSTRIALES":
                doc.image(logoIndustriales, 305, 38, { width:50 })
                .moveDown();
                break;
            case "ACUEDUCTOS":
                doc.image(logoAcueducto, 305, 38, { width:50 })
                .moveDown();
                break;
            case "EDUCACIÓN":
                doc.image(logoEducacion, 305, 38, { width:50 })
                .moveDown();
                break;
            case "ALIMENTOS":
                doc.image(logoAlimentos, 305, 38, { width:50 })
                .moveDown();
                break;
            case "GOBIERNO":
                doc.image(logoGobierno, 305, 38, { width:50 })
                .moveDown();
                break;
            case "INVESTIGACIÓN":
                doc.image(logoInvestigacion, 305, 38, { width:50 })
                .moveDown();
                break;
            case "CLINICO Y HOSPITALARIO":
                doc.image(logoClinico, 305, 38, { width:50 })
                .moveDown();
                break;
            case "TRATAMIENTO DE AGUA INDUSTRIAL":
                doc.image(logoTratamientoAguas, 305, 38, { width:50 })
                .moveDown();
                break;
            case "FARMACÉUTICA":
                doc.image(logoFarmaceutica, 305, 38, { width:50 })
                .moveDown();
                break;
            case "CANNABIS":
                doc.image(logoCannabis, 305, 38, { width:50 })
                .moveDown();
                break;
        }

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 180, cuadrado[0], cuadrado[1]).fill('#ecc101');

        switch(data.market2){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoAcueducto, 305, 230, { width:50 })
                .moveDown();
                break;
            case "PROCESOS INDUSTRIALES":
                doc.image(logoIndustriales, 305, 230, { width:50 })
                .moveDown();
                break;
            case "ACUEDUCTOS":
                doc.image(logoAcueducto, 305, 230, { width:50 })
                .moveDown();
                break;
            case "EDUCACIÓN":
                doc.image(logoEducacion, 305, 230, { width:50 })
                .moveDown();
                break;
            case "ALIMENTOS":
                doc.image(logoAlimentos, 305, 230, { width:50 })
                .moveDown();
                break;
            case "GOBIERNO":
                doc.image(logoGobierno, 305, 230, { width:50 })
                .moveDown();
                break;
            case "INVESTIGACIÓN":
                doc.image(logoInvestigacion, 305, 230, { width:50 })
                .moveDown();
                break;
            case "CLINICO Y HOSPITALARIO":
                doc.image(logoClinico, 305, 230, { width:50 })
                .moveDown();
                break;
            case "TRATAMIENTO DE AGUA INDUSTRIAL":
                doc.image(logoTratamientoAguas, 305, 230, { width:50 })
                .moveDown();
                break;
            case "FARMACÉUTICA":
                doc.image(logoFarmaceutica, 305, 230, { width:50 })
                .moveDown();
                break;
            case "CANNABIS":
                doc.image(logoCannabis, 305, 230, { width:50 })
                .moveDown();
                break;
        }

        doc
            .fontSize(16)
            .fillColor('#285258')
            .text(data.market2, 370, 190, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#285258')
            .font('Helvetica-Oblique')
            .text(data.description_market2, 370, 230, {width: 210})
            .moveDown();

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 360, cuadrado[0], cuadrado[1]).fill('#25acb1');

        switch(data.market3){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoAcueducto, 305, 405, { width:50 })
                .moveDown();
                break;
            case "PROCESOS INDUSTRIALES":
                doc.image(logoIndustriales, 305, 405, { width:50 })
                .moveDown();
                break;
            case "ACUEDUCTOS":
                doc.image(logoAcueducto, 305, 405, { width:50 })
                .moveDown();
                break;
            case "EDUCACIÓN":
                doc.image(logoEducacion, 305, 405, { width:50 })
                .moveDown();
                break;
            case "ALIMENTOS":
                doc.image(logoAlimentos, 305, 405, { width:50 })
                .moveDown();
                break;
            case "GOBIERNO":
                doc.image(logoGobierno, 305, 405, { width:50 })
                .moveDown();
                break;
            case "INVESTIGACIÓN":
                doc.image(logoInvestigacion, 305, 405, { width:50 })
                .moveDown();
                break;
            case "CLINICO Y HOSPITALARIO":
                doc.image(logoClinico, 305, 405, { width:50 })
                .moveDown();
                break;
            case "TRATAMIENTO DE AGUA INDUSTRIAL":
                doc.image(logoTratamientoAguas, 305, 405, { width:50 })
                .moveDown();
                break;
            case "FARMACÉUTICA":
                doc.image(logoFarmaceutica, 305, 405, { width:50 })
                .moveDown();
                break;
            case "CANNABIS":
                doc.image(logoCannabis, 305, 405, { width:50 })
                .moveDown();
                break;
        }

        doc
            .fontSize(16)
            .fillColor('#fff')
            .text(data.market3, 370, 370, {width: 200})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#fff')
            .font('Helvetica-Oblique')
            .text(data.description_market3, 370, 410, {width: 210})
            .moveDown();

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 540, cuadrado[0], cuadrado[1]).fill('#ff9f0f');

        switch(data.market4){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoAcueducto, 305, 580, { width:50 })
                .moveDown();
                break;
            case "PROCESOS INDUSTRIALES":
                doc.image(logoIndustriales, 305, 580, { width:50 })
                .moveDown();
                break;
            case "ACUEDUCTOS":
                doc.image(logoAcueducto, 305, 580, { width:50 })
                .moveDown();
                break;
            case "EDUCACIÓN":
                doc.image(logoEducacion, 305, 580, { width:50 })
                .moveDown();
                break;
            case "ALIMENTOS":
                doc.image(logoAlimentos, 305, 580, { width:50 })
                .moveDown();
                break;
            case "GOBIERNO":
                doc.image(logoGobierno, 305, 580, { width:50 })
                .moveDown();
                break;
            case "INVESTIGACIÓN":
                doc.image(logoInvestigacion, 305, 580, { width:50 })
                .moveDown();
                break;
            case "CLINICO Y HOSPITALARIO":
                doc.image(logoClinico, 305, 580, { width:50 })
                .moveDown();
                break;
            case "TRATAMIENTO DE AGUA INDUSTRIAL":
                doc.image(logoTratamientoAguas, 305, 580, { width:50 })
                .moveDown();
                break;
            case "FARMACÉUTICA":
                doc.image(logoFarmaceutica, 305, 580, { width:50 })
                .moveDown();
                break;
            case "CANNABIS":
                doc.image(logoCannabis, 305, 580, { width:50 })
                .moveDown();
                break;
        }

        doc
            .fontSize(16)
            .fillColor('#fff')
            .text(data.market4, 370, 550, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#fff')
            .font('Helvetica-Oblique')
            .text(data.description_market4, 370, 590, {width: 210} )
            .moveDown();

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 700, cuadrado[0], 170).fill('#ecc101');

        switch(data.market5){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoAcueducto, 305, 350, { width:50 })
                .moveDown();
                break;
            case "PROCESOS INDUSTRIALES":
                doc.image(logoIndustriales, 305, 775, { width:50 })
                .moveDown();
                break;
            case "ACUEDUCTOS":
                doc.image(logoAcueducto, 305, 775, { width:50 })
                .moveDown();
                break;
            case "EDUCACIÓN":
                doc.image(logoEducacion, 305, 775, { width:50 })
                .moveDown();
                break;
            case "ALIMENTOS":
                doc.image(logoAlimentos, 305, 775, { width:50 })
                .moveDown();
                break;
            case "GOBIERNO":
                doc.image(logoGobierno, 305, 775, { width:50 })
                .moveDown();
                break;
            case "INVESTIGACIÓN":
                doc.image(logoInvestigacion, 305, 775, { width:50 })
                .moveDown();
                break;
            case "CLINICO Y HOSPITALARIO":
                doc.image(logoClinico, 305, 775, { width:50 })
                .moveDown();
                break;
            case "TRATAMIENTO DE AGUA INDUSTRIAL":
                doc.image(logoTratamientoAguas, 305, 770, { width:50 })
                .moveDown();
                break;
            case "FARMACÉUTICA":
                doc.image(logoFarmaceutica, 305, 770, { width:50 })
                .moveDown();
                break;
            case "CANNABIS":
                doc.image(logoCannabis, 305, 770, { width:50 })
                .moveDown();
                break;
        }

        doc
            .fontSize(16)
            .fillColor('#fff')
            .text(data.market5, 370, 720, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#fff')
            .font('Helvetica-Oblique')
            .text(data.description_market5, 370, 760, {width: 210})
            .moveDown();

        doc
            .image(footerPDF, 0, 830, {width: 600})

    //------------------------------ NEW PAGE ------------------------------------------

        doc.addPage({
            size: [595, 920],
        })
            .moveDown()  

        doc.lineJoin('miter')
            .rect(0, 0, fullDocH, 60).fill('#2e6ca7');

        doc
            .fillColor('#fff')
            .fontSize(30)
            .text('Características', 190,18)
            .moveDown();

        doc.lineJoin('miter')
            .rect(99, 100, 200, 200).fill('#2e6ca7');

        doc.circle(200, 150, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc
            .fontSize(11)
            .text(`${data.feature1}`,
            125, 190,  
            {
                width:150,
                align: 'center'
                
            })

        doc.image(pathImage1, 185, 135, {width: 30})

        doc.lineJoin('miter')
            .rect(301, 100, 200, 200).fill('#fbc02d');

        doc.circle(400, 150, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc.image(pathImage2, 385, 135, {width: 30})

        doc
            .fontSize(11)
            .text(`${data.feature2}`,
            325, 190,  
            {
                width:150,
                align: 'center'
                
            })


        doc.lineJoin('miter')
            .rect(99, 302, 200, 200).fill('#ff9f0f');

        doc.circle(200, 350, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();
        
        doc.image(pathImage3, 185, 335, {width: 30})

        doc
            .fontSize(11)
            .text(`${data.feature3}`,
            125, 390,  
            {
                width:150,
                align: 'center'
                
            })

        doc.lineJoin('miter')
            .rect(301, 302, 200, 200).fill('#24abb1');

        doc.circle(400, 350, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc.image(pathImage4, 385, 335, {width: 30})

        doc
            .fontSize(11)
            .text(`${data.feature4}`,
            330, 390,  
            {
                width:150,
                align: 'center'
                
            })

        doc.lineJoin('miter')
            .rect(99, 504, 402, 80).fill('#ff6510');

        doc.circle(140, 542, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc.image(pathImage5, 125, 526, {width: 30})

        doc
            .fontSize(11)
            .text(`${data.feature5}`,
            170, 520,  
            {
                width:300,
                align: 'center'    
            })

    //------------------------------ NEW PAGE ------------------------------------------

        doc.addPage({
            size: [595, 920],
        })
            .moveDown()


        doc.lineJoin('FondoAzulClaro')
            .roundedRect(50,0, 500, 500, 30 )
            .fillAndStroke('#EDF4F7', '#D5E8F4')

        doc.lineJoin('VentajasCompetitivas')
            .rect(0, 0, fullDocH, 60).fill('#2e6ca7');

        doc
            .fillColor('#fff')
            .fontSize(30)
            .text('Ventajas competitivas', 170,18)
            .moveDown();


        if(data.adventage1 != null){

            doc.lineJoin('fondoGris')
            .roundedRect(70, 80, 450, 70, 3 )
            .fill('#E2E8EA')

            doc.circle(100, 113, 25)
                .lineWidth(3)
                .fillOpacity(0.95)
                .fillAndStroke("#2e6ca7", "#fff")
                .moveDown();

            doc.image(ventaja1, 88, 100, {width: 25})

            doc
                .fontSize(11)
                .fillColor('#163461')
                .text(data.adventage1,
                140, 90,  
                {
                    width:350,
                    align: 'center'    
                })
        }

        if(data.adventage2 != null){

            doc.lineJoin('fondoGris')
            .roundedRect(70, 160, 450, 70, 3 )
            .fill('#E2E8EA')

            doc.circle(100, 195, 25)
                .lineWidth(3)
                .fillOpacity(0.95)
                .fillAndStroke("#fbc02d", "#fff")
                .moveDown();

            doc.image(ventaja2, 88, 183, {width: 30})

            doc
                .fontSize(11)
                .fillColor('#163461')
                .text(data.adventage2,
                140, 170,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(data.adventage3 != null){

            doc.lineJoin('fondoGris')
            .roundedRect(70, 240, 450, 70, 3 )
            .fill('#E2E8EA')

            doc.circle(100, 275, 25)
                .lineWidth(3)
                .fillOpacity(0.95)
                .fillAndStroke("#ff9f0f", "#fff")
                .moveDown();

            doc.image(ventaja3, 88, 263, {width: 30})

            doc
                .fontSize(11)
                .fillColor('#163461')
                .text(data.adventage3,
                140, 250,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(data.adventage4 != null){

            doc.lineJoin('fondoGris')
                .roundedRect(70, 320, 450, 70, 3 )
                .fill('#E2E8EA')

            doc.circle(100, 355, 25)
                .lineWidth(3)
                .fillOpacity(0.95)
                .fillAndStroke("#24abb1", "#fff")
                .moveDown();

            doc.image(ventaja4, 88, 343, {width: 30})

            doc
                .fontSize(11)
                .fillColor('#163461')
                .text(data.adventage4,
                140, 330,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(data.adventage5 != null){

            doc.lineJoin('fondoGris')
            .roundedRect(70, 400, 450, 70, 3 )
            .fill('#E2E8EA')

            doc.circle(100, 440, 25)
                .lineWidth(3)
                .fillOpacity(0.95)
                .fillAndStroke("#ff6510", "#fff")
                .moveDown();

            doc.image(ventaja5, 84, 426, {width: 30})


            doc
                .fontSize(11)
                .fillColor('#163461')
                .text(data.adventage5,
                140, 410,  
                {
                    width:350,
                    align: 'center'    
                })

        }


        doc
            .image(logo, 200, 700, {width: 200})
    } else if( markets.length === 6 ){

        doc
        .image(headerPDF, 0, 0, {width: 330})

        if(data.name.length > 25){
            doc
            .fillColor('#163461')
            .fontSize(15)
            .text(
                data.name, 
                60, 50,
                { 
                    width: 200,
                    align: 'center'
                }, 
            )
            .moveDown();
            
        }else{
            doc
            .fillColor('#163461')
            .fontSize(25)
            .text(
                data.name, 
                60, 50,
                { 
                    width: 200,
                    align: 'center'
                }, 
            ).moveDown();
        }


        doc
            .image('data:image/jpeg;base64,'+imgProduct , 60, 310, {width: 200})
            .moveDown();

        doc.lineJoin('producto uno')
            .rect(fullDocH / 1.8, 0, cuadrado[0], cuadrado[1])
            .fill('#016db4')
            .moveDown();

        doc
            .fontSize(16)
            .fillColor('#ffffff')
            .text(data.market1, 370, 10, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#ffffff')
            .font('Helvetica-Oblique')
            .text(data.description_market1, 370, 50, {width: 210})
            .moveDown();

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 130, cuadrado[0], cuadrado[1]).fill('#ecc101');

        switch(data.market1){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoAcueducto, 305, 38, { width:50 })
                .moveDown();
                break;
            case "PROCESOS INDUSTRIALES":
                doc.image(logoIndustriales, 305, 38, { width:50 })
                .moveDown();
                break;
            case "ACUEDUCTOS":
                doc.image(logoAcueducto, 305, 38, { width:50 })
                .moveDown();
                break;
            case "EDUCACIÓN":
                doc.image(logoEducacion, 305, 38, { width:50 })
                .moveDown();
                break;
            case "ALIMENTOS":
                doc.image(logoAlimentos, 305, 38, { width:50 })
                .moveDown();
                break;
            case "GOBIERNO":
                doc.image(logoGobierno, 305, 38, { width:50 })
                .moveDown();
                break;
            case "INVESTIGACIÓN":
                doc.image(logoInvestigacion, 305, 38, { width:50 })
                .moveDown();
                break;
            case "CLINICO Y HOSPITALARIO":
                doc.image(logoClinico, 305, 38, { width:50 })
                .moveDown();
                break;
            case "TRATAMIENTO DE AGUA INDUSTRIAL":
                doc.image(logoTratamientoAguas, 305, 38, { width:50 })
                .moveDown();
                break;
            case "FARMACÉUTICA":
                doc.image(logoFarmaceutica, 305, 38, { width:50 })
                .moveDown();
                break;
            case "CANNABIS":
                doc.image(logoCannabis, 305, 38, { width:50 })
                .moveDown();
                break;
        }


        doc
            .fontSize(16)
            .fillColor('#285258')
            .text(data.market2, 370, 140, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#285258')
            .font('Helvetica-Oblique')
            .text(data.description_market2, 370, 180, {width: 210})
            .moveDown();

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 270, cuadrado[0], cuadrado[1]).fill('#25acb1');

        switch(data.market2){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoAcueducto, 305, 178, { width:50 })
                .moveDown();
                break;
            case "PROCESOS INDUSTRIALES":
                doc.image(logoIndustriales, 305, 178, { width:50 })
                .moveDown();
                break;
            case "ACUEDUCTOS":
                doc.image(logoAcueducto, 305, 178, { width:50 })
                .moveDown();
                break;
            case "EDUCACIÓN":
                doc.image(logoEducacion, 305, 178, { width:50 })
                .moveDown();
                break;
            case "ALIMENTOS":
                doc.image(logoAlimentos, 305, 178, { width:50 })
                .moveDown();
                break;
            case "GOBIERNO":
                doc.image(logoGobierno, 305, 178, { width:50 })
                .moveDown();
                break;
            case "INVESTIGACIÓN":
                doc.image(logoInvestigacion, 305, 178, { width:50 })
                .moveDown();
                break;
            case "CLINICO Y HOSPITALARIO":
                doc.image(logoClinico, 305, 178, { width:50 })
                .moveDown();
                break;
            case "TRATAMIENTO DE AGUA INDUSTRIAL":
                doc.image(logoTratamientoAguas, 305, 178, { width:50 })
                .moveDown();
                break;
            case "FARMACÉUTICA":
                doc.image(logoFarmaceutica, 305, 178, { width:50 })
                .moveDown();
                break;
            case "CANNABIS":
                doc.image(logoCannabis, 305, 178, { width:50 })
                .moveDown();
                break;
        }

        doc
            .fontSize(16)
            .fillColor('#fff')
            .text(data.market3, 370, 280, {width: 200})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#fff')
            .font('Helvetica-Oblique')
            .text(data.description_market3, 370, 320, {width: 210})
            .moveDown();

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 410, cuadrado[0], cuadrado[1]).fill('#ff9f0f');

        switch(data.market3){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoAcueducto, 305, 310, { width:50 })
                .moveDown();
                break;
            case "PROCESOS INDUSTRIALES":
                doc.image(logoIndustriales, 305, 310, { width:50 })
                .moveDown();
                break;
            case "ACUEDUCTOS":
                doc.image(logoAcueducto, 305, 310, { width:50 })
                .moveDown();
                break;
            case "EDUCACIÓN":
                doc.image(logoEducacion, 305, 310, { width:50 })
                .moveDown();
                break;
            case "ALIMENTOS":
                doc.image(logoAlimentos, 305, 310, { width:50 })
                .moveDown();
                break;
            case "GOBIERNO":
                doc.image(logoGobierno, 305, 310, { width:50 })
                .moveDown();
                break;
            case "INVESTIGACIÓN":
                doc.image(logoInvestigacion, 305, 310, { width:50 })
                .moveDown();
                break;
            case "CLINICO Y HOSPITALARIO":
                doc.image(logoClinico, 305, 310, { width:50 })
                .moveDown();
                break;
            case "TRATAMIENTO DE AGUA INDUSTRIAL":
                doc.image(logoTratamientoAguas, 305, 310, { width:50 })
                .moveDown();
                break;
            case "FARMACÉUTICA":
                doc.image(logoFarmaceutica, 305, 310, { width:50 })
                .moveDown();
                break;
            case "CANNABIS":
                doc.image(logoCannabis, 305, 310, { width:50 })
                .moveDown();
                break;
        }

        doc
            .fontSize(16)
            .fillColor('#fff')
            .text(data.market4, 370, 425, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#fff')
            .font('Helvetica-Oblique')
            .text(data.description_market4, 370, 460, {width: 210} )
            .moveDown();


        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 550, cuadrado[0], cuadrado[1]).fill('#ecc101');

        doc
            .fontSize(16)
            .fillColor('#fff')
            .text(data.market5, 370, 560, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#fff')
            .font('Helvetica-Oblique')
            .text(data.description_market5, 370, 600, {width: 210})
            .moveDown();

        switch(data.market4){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoAcueducto, 305, 458, { width:50 })
                .moveDown();
                break;
            case "PROCESOS INDUSTRIALES":
                doc.image(logoIndustriales, 305, 458, { width:50 })
                .moveDown();
                break;
            case "ACUEDUCTOS":
                doc.image(logoAcueducto, 305, 458, { width:50 })
                .moveDown();
                break;
            case "EDUCACIÓN":
                doc.image(logoEducacion, 305, 458, { width:50 })
                .moveDown();
                break;
            case "ALIMENTOS":
                doc.image(logoAlimentos, 305, 458, { width:50 })
                .moveDown();
                break;
            case "GOBIERNO":
                doc.image(logoGobierno, 305, 458, { width:50 })
                .moveDown();
                break;
            case "INVESTIGACIÓN":
                doc.image(logoInvestigacion, 305, 458, { width:50 })
                .moveDown();
                break;
            case "CLINICO Y HOSPITALARIO":
                doc.image(logoClinico, 305, 458, { width:50 })
                .moveDown();
                break;
            case "TRATAMIENTO DE AGUA INDUSTRIAL":
                doc.image(logoTratamientoAguas, 305, 458, { width:50 })
                .moveDown();
                break;
            case "FARMACÉUTICA":
                doc.image(logoFarmaceutica, 305, 458, { width:50 })
                .moveDown();
                break;
            case "CANNABIS":
                doc.image(logoCannabis, 305, 458, { width:50 })
                .moveDown();
                break;
        }

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 690, cuadrado[0], cuadrado[1]).fill('#25acb1');

        doc
            .fontSize(16)
            .fillColor('#fff')
            .text(data.market6, 370, 700, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#fff')
            .font('Helvetica-Oblique')
            .text(data.description_market6, 370, 740, {width: 210})
            .moveDown();
        
        switch(data.market5){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoAcueducto, 305, 595, { width:50 })
                .moveDown();
                break;
            case "PROCESOS INDUSTRIALES":
                doc.image(logoIndustriales, 305, 595, { width:50 })
                .moveDown();
                break;
            case "ACUEDUCTOS":
                doc.image(logoAcueducto, 305, 595, { width:50 })
                .moveDown();
                break;
            case "EDUCACIÓN":
                doc.image(logoEducacion, 305, 638, { width:50 })
                .moveDown();
                break;
            case "ALIMENTOS":
                doc.image(logoAlimentos, 305, 595, { width:50 })
                .moveDown();
                break;
            case "GOBIERNO":
                doc.image(logoGobierno, 305, 595, { width:50 })
                .moveDown();
                break;
            case "INVESTIGACIÓN":
                doc.image(logoInvestigacion, 305, 595, { width:50 })
                .moveDown();
                break;
            case "CLINICO Y HOSPITALARIO":
                doc.image(logoClinico, 305, 595, { width:50 })
                .moveDown();
                break;
            case "TRATAMIENTO DE AGUA INDUSTRIAL":
                doc.image(logoTratamientoAguas, 305, 595, { width:50 })
                .moveDown();
                break;
            case "FARMACÉUTICA":
                doc.image(logoFarmaceutica, 305, 595, { width:50 })
                .moveDown();
                break;
            case "CANNABIS":
                doc.image(logoCannabis, 305, 38, { width:50 })
                .moveDown();
                break;
        }

        switch(data.market6){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoAcueducto, 305, 730, { width:50 })
                .moveDown();
                break;
            case "PROCESOS INDUSTRIALES":
                doc.image(logoIndustriales, 305, 730, { width:50 })
                .moveDown();
                break;
            case "ACUEDUCTOS":
                doc.image(logoAcueducto, 305, 730, { width:50 })
                .moveDown();
                break;
            case "EDUCACIÓN":
                doc.image(logoEducacion, 305, 730, { width:50 })
                .moveDown();
                break;
            case "ALIMENTOS":
                doc.image(logoAlimentos, 305, 730, { width:50 })
                .moveDown();
                break;
            case "GOBIERNO":
                doc.image(logoGobierno, 305, 730, { width:50 })
                .moveDown();
                break;
            case "INVESTIGACIÓN":
                doc.image(logoInvestigacion, 305, 730, { width:50 })
                .moveDown();
                break;
            case "CLINICO Y HOSPITALARIO":
                doc.image(logoClinico, 305, 730, { width:50 })
                .moveDown();
                break;
            case "TRATAMIENTO DE AGUA INDUSTRIAL":
                doc.image(logoTratamientoAguas, 305, 730, { width:50 })
                .moveDown();
                break;
            case "FARMACÉUTICA":
                doc.image(logoFarmaceutica, 305, 730, { width:50 })
                .moveDown();
                break;
            case "CANNABIS":
                doc.image(logoCannabis, 305, 730, { width:50 })
                .moveDown();
                break;
        }

        doc
            .image(footerPDF, 0, 830, {width: 600})

    //------------------------------ NEW PAGE ------------------------------------------

        doc.addPage({
            size: [595, 920],
        })
            .moveDown()  

        doc.lineJoin('miter')
            .rect(0, 0, fullDocH, 60).fill('#2e6ca7');

        doc
            .fillColor('#fff')
            .fontSize(30)
            .text('Características', 190,18)
            .moveDown();

        doc.lineJoin('miter')
            .rect(99, 100, 200, 200).fill('#2e6ca7');

        doc.circle(200, 150, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc
            .fontSize(11)
            .text(`${data.feature1}`,
            125, 190,  
            {
                width:150,
                align: 'center'
                
            })

        doc.image(pathImage1, 185, 135, {width: 30})

        doc.lineJoin('miter')
            .rect(301, 100, 200, 200).fill('#fbc02d');

        doc.circle(400, 150, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc.image(pathImage2, 385, 135, {width: 30})

        doc
            .fontSize(11)
            .text(`${data.feature2}`,
            325, 190,  
            {
                width:150,
                align: 'center'
                
            })


        doc.lineJoin('miter')
            .rect(99, 302, 200, 200).fill('#ff9f0f');

        doc.circle(200, 350, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();
        
        doc.image(pathImage3, 185, 335, {width: 30})

        doc
            .fontSize(11)
            .text(`${data.feature3}`,
            125, 390,  
            {
                width:150,
                align: 'center'
                
            })

        doc.lineJoin('miter')
            .rect(301, 302, 200, 200).fill('#24abb1');

        doc.circle(400, 350, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc.image(pathImage4, 385, 335, {width: 30})

        doc
            .fontSize(11)
            .text(`${data.feature4}`,
            330, 390,  
            {
                width:150,
                align: 'center'
                
            })

        doc.lineJoin('miter')
            .rect(99, 504, 402, 80).fill('#ff6510');

        doc.circle(140, 542, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc.image(pathImage5, 125, 526, {width: 30})

        doc
            .fontSize(11)
            .text(`${data.feature5}`,
            170, 520,  
            {
                width:300,
                align: 'center'    
            })

    //------------------------------ NEW PAGE ------------------------------------------

        doc.addPage({
            size: [595, 920],
        })
            .moveDown()

        doc.lineJoin('FondoAzulClaro')
            .roundedRect(50,0, 500, 500, 30 )
            .fillAndStroke('#EDF4F7', '#D5E8F4')

        doc.lineJoin('VentajasCompetitivas')
            .rect(0, 0, fullDocH, 60).fill('#2e6ca7');

        doc
            .fillColor('#fff')
            .fontSize(30)
            .text('Ventajas competitivas', 170,18)
            .moveDown();

        if(data.adventage1 != null){

            doc.lineJoin('fondoGris')
            .roundedRect(70, 80, 450, 70, 3 )
            .fill('#E2E8EA')

            doc.circle(100, 113, 25)
                .lineWidth(3)
                .fillOpacity(0.95)
                .fillAndStroke("#2e6ca7", "#fff")
                .moveDown();

            doc.image(ventaja1, 88, 100, {width: 25})

            doc
                .fontSize(11)
                .fillColor('#163461')
                .text(data.adventage1,
                140, 90,  
                {
                    width:350,
                    align: 'center'    
                })
        }

        if(data.adventage2 != null){

            doc.lineJoin('fondoGris')
            .roundedRect(70, 160, 450, 70, 3 )
            .fill('#E2E8EA')

            doc.circle(100, 195, 25)
                .lineWidth(3)
                .fillOpacity(0.95)
                .fillAndStroke("#fbc02d", "#fff")
                .moveDown();

            doc.image(ventaja2, 88, 183, {width: 30})

            doc
                .fontSize(11)
                .fillColor('#163461')
                .text(data.adventage2,
                140, 170,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(data.adventage3 != null){

            doc.lineJoin('fondoGris')
            .roundedRect(70, 240, 450, 70, 3 )
            .fill('#E2E8EA')

            doc.circle(100, 275, 25)
                .lineWidth(3)
                .fillOpacity(0.95)
                .fillAndStroke("#ff9f0f", "#fff")
                .moveDown();

            doc.image(ventaja3, 88, 263, {width: 30})

            doc
                .fontSize(11)
                .fillColor('#163461')
                .text(data.adventage3,
                140, 250,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(data.adventage4 != null){

            doc.lineJoin('fondoGris')
                .roundedRect(70, 320, 450, 70, 3 )
                .fill('#E2E8EA')

            doc.circle(100, 355, 25)
                .lineWidth(3)
                .fillOpacity(0.95)
                .fillAndStroke("#24abb1", "#fff")
                .moveDown();

            doc.image(ventaja4, 88, 343, {width: 30})

            doc
                .fontSize(11)
                .fillColor('#163461')
                .text(data.adventage4,
                140, 330,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(data.adventage5 != null){

            doc.lineJoin('fondoGris')
            .roundedRect(70, 400, 450, 70, 3 )
            .fill('#E2E8EA')

            doc.circle(100, 440, 25)
                .lineWidth(3)
                .fillOpacity(0.95)
                .fillAndStroke("#ff6510", "#fff")
                .moveDown();

            doc.image(ventaja5, 84, 426, {width: 30})


            doc
                .fontSize(11)
                .fillColor('#163461')
                .text(data.adventage5,
                140, 410,  
                {
                    width:350,
                    align: 'center'    
                })

        }


        doc
            .image(logo, 200, 700, {width: 200})

    } else if( markets.length === 7 ){

        doc
            .image(headerPDF, 0, 0, {width: 330})

       if(data.name.length > 25){
            doc
            .fillColor('#163461')
            .fontSize(15)
            .text(
                data.name, 
                60, 50,
                { 
                    width: 200,
                    align: 'center'
                }, 
            )
            .moveDown();
            
        }else{
            doc
            .fillColor('#163461')
            .fontSize(25)
            .text(
                data.name, 
                60, 50,
                { 
                    width: 200,
                    align: 'center'
                }, 
            ).moveDown();
        }

        doc
            .image('data:image/jpeg;base64,'+imgProduct , 60, 310, {width: 200})
            .moveDown();

        doc.lineJoin('producto uno')
            .rect(fullDocH / 1.8, 0, cuadrado[0], cuadrado[1])
            .fill('#016db4')
            .moveDown();

        doc
            .fontSize(16)
            .fillColor('#ffffff')
            .text(data.market1, 370, 10, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#ffffff')
            .font('Helvetica-Oblique')
            .text(data.description_market1, 370, 50, {width: 210})
            .moveDown();

        switch(data.market1){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoAcueducto, 305, 38, { width:50 })
                .moveDown();
                break;
            case "PROCESOS INDUSTRIALES":
                doc.image(logoIndustriales, 305, 38, { width:50 })
                .moveDown();
                break;
            case "ACUEDUCTOS":
                doc.image(logoAcueducto, 305, 38, { width:50 })
                .moveDown();
                break;
            case "EDUCACIÓN":
                doc.image(logoEducacion, 305, 38, { width:50 })
                .moveDown();
                break;
            case "ALIMENTOS":
                doc.image(logoAlimentos, 305, 38, { width:50 })
                .moveDown();
                break;
            case "GOBIERNO":
                doc.image(logoGobierno, 305, 38, { width:50 })
                .moveDown();
                break;
            case "INVESTIGACIÓN":
                doc.image(logoInvestigacion, 305, 38, { width:50 })
                .moveDown();
                break;
            case "CLINICO Y HOSPITALARIO":
                doc.image(logoClinico, 305, 38, { width:50 })
                .moveDown();
                break;
            case "TRATAMIENTO DE AGUA INDUSTRIAL":
                doc.image(logoTratamientoAguas, 305, 38, { width:50 })
                .moveDown();
                break;
            case "FARMACÉUTICA":
                doc.image(logoFarmaceutica, 305, 38, { width:50 })
                .moveDown();
                break;
            case "CANNABIS":
                doc.image(logoCannabis, 305, 38, { width:50 })
                .moveDown();
                break;
        }

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 130, cuadrado[0], cuadrado[1]).fill('#ecc101');

        switch(data.market2){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoAcueducto, 305, 178, { width:50 })
                .moveDown();
                break;
            case "PROCESOS INDUSTRIALES":
                doc.image(logoIndustriales, 305, 178, { width:50 })
                .moveDown();
                break;
            case "ACUEDUCTOS":
                doc.image(logoAcueducto, 305, 178, { width:50 })
                .moveDown();
                break;
            case "EDUCACIÓN":
                doc.image(logoEducacion, 305, 178, { width:50 })
                .moveDown();
                break;
            case "ALIMENTOS":
                doc.image(logoAlimentos, 305, 178, { width:50 })
                .moveDown();
                break;
            case "GOBIERNO":
                doc.image(logoGobierno, 305, 178, { width:50 })
                .moveDown();
                break;
            case "INVESTIGACIÓN":
                doc.image(logoInvestigacion, 305, 178, { width:50 })
                .moveDown();
                break;
            case "CLINICO Y HOSPITALARIO":
                doc.image(logoClinico, 305, 178, { width:50 })
                .moveDown();
                break;
            case "TRATAMIENTO DE AGUA INDUSTRIAL":
                doc.image(logoTratamientoAguas, 305, 178, { width:50 })
                .moveDown();
                break;
            case "FARMACÉUTICA":
                doc.image(logoFarmaceutica, 305, 178, { width:50 })
                .moveDown();
                break;
            case "CANNABIS":
                doc.image(logoCannabis, 305, 178, { width:50 })
                .moveDown();
                break;
        }

        doc
            .fontSize(16)
            .fillColor('#285258')
            .text(data.market2, 370, 150, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#285258')
            .font('Helvetica-Oblique')
            .text(data.description_market2, 370, 190, {width: 210})
            .moveDown();

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 270, cuadrado[0], cuadrado[1]).fill('#25acb1');

        switch(data.market3){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoAcueducto, 305, 318, { width:50 })
                .moveDown();
                break;
            case "PROCESOS INDUSTRIALES":
                doc.image(logoIndustriales, 305, 318, { width:50 })
                .moveDown();
                break;
            case "ACUEDUCTOS":
                doc.image(logoAcueducto, 305, 318, { width:50 })
                .moveDown();
                break;
            case "EDUCACIÓN":
                doc.image(logoEducacion, 305, 318, { width:50 })
                .moveDown();
                break;
            case "ALIMENTOS":
                doc.image(logoAlimentos, 305, 318, { width:50 })
                .moveDown();
                break;
            case "GOBIERNO":
                doc.image(logoGobierno, 305, 318, { width:50 })
                .moveDown();
                break;
            case "INVESTIGACIÓN":
                doc.image(logoInvestigacion, 305, 318, { width:50 })
                .moveDown();
                break;
            case "CLINICO Y HOSPITALARIO":
                doc.image(logoClinico, 305, 318, { width:50 })
                .moveDown();
                break;
            case "TRATAMIENTO DE AGUA INDUSTRIAL":
                doc.image(logoTratamientoAguas, 305, 318, { width:50 })
                .moveDown();
                break;
            case "FARMACÉUTICA":
                doc.image(logoFarmaceutica, 305, 318, { width:50 })
                .moveDown();
                break;
            case "CANNABIS":
                doc.image(logoCannabis, 305, 318, { width:50 })
                .moveDown();
                break;
        }

        doc
            .fontSize(16)
            .fillColor('#fff')
            .text(data.market3, 370, 290, {width: 200})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#fff')
            .font('Helvetica-Oblique')
            .text(data.description_market3, 370, 330, {width: 210})
            .moveDown();

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 410, cuadrado[0], cuadrado[1]).fill('#ff9f0f');

        switch(data.market4){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoAcueducto, 305, 458, { width:50 })
                .moveDown();
                break;
            case "PROCESOS INDUSTRIALES":
                doc.image(logoIndustriales, 305, 458, { width:50 })
                .moveDown();
                break;
            case "ACUEDUCTOS":
                doc.image(logoAcueducto, 305, 458, { width:50 })
                .moveDown();
                break;
            case "EDUCACIÓN":
                doc.image(logoEducacion, 305, 458, { width:50 })
                .moveDown();
                break;
            case "ALIMENTOS":
                doc.image(logoAlimentos, 305, 458, { width:50 })
                .moveDown();
                break;
            case "GOBIERNO":
                doc.image(logoGobierno, 305, 458, { width:50 })
                .moveDown();
                break;
            case "INVESTIGACIÓN":
                doc.image(logoInvestigacion, 305, 458, { width:50 })
                .moveDown();
                break;
            case "CLINICO Y HOSPITALARIO":
                doc.image(logoClinico, 305, 458, { width:50 })
                .moveDown();
                break;
            case "TRATAMIENTO DE AGUA INDUSTRIAL":
                doc.image(logoTratamientoAguas, 305, 458, { width:50 })
                .moveDown();
                break;
            case "FARMACÉUTICA":
                doc.image(logoFarmaceutica, 305, 458, { width:50 })
                .moveDown();
                break;
            case "CANNABIS":
                doc.image(logoCannabis, 305, 458, { width:50 })
                .moveDown();
                break;
        }

        doc
            .fontSize(16)
            .fillColor('#fff')
            .text(data.market4, 370, 430, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#fff')
            .font('Helvetica-Oblique')
            .text(data.description_market4, 370, 470, {width: 210} )
            .moveDown();


        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 550, cuadrado[0], cuadrado[1]).fill('#ecc101');

        doc
            .fontSize(16)
            .fillColor('#fff')
            .text(data.market5, 370, 570, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#fff')
            .font('Helvetica-Oblique')
            .text(data.description_market5, 370, 610, {width: 210})
            .moveDown();

        switch(data.market5){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoAcueducto, 305, 598, { width:50 })
                .moveDown();
                break;
            case "PROCESOS INDUSTRIALES":
                doc.image(logoIndustriales, 305, 598, { width:50 })
                .moveDown();
                break;
            case "ACUEDUCTOS":
                doc.image(logoAcueducto, 305, 598, { width:50 })
                .moveDown();
                break;
            case "EDUCACIÓN":
                doc.image(logoEducacion, 305, 598, { width:50 })
                .moveDown();
                break;
            case "ALIMENTOS":
                doc.image(logoAlimentos, 305, 598, { width:50 })
                .moveDown();
                break;
            case "GOBIERNO":
                doc.image(logoGobierno, 305, 598, { width:50 })
                .moveDown();
                break;
            case "INVESTIGACIÓN":
                doc.image(logoInvestigacion, 305, 598, { width:50 })
                .moveDown();
                break;
            case "CLINICO Y HOSPITALARIO":
                doc.image(logoClinico, 305, 598, { width:50 })
                .moveDown();
                break;
            case "TRATAMIENTO DE AGUA INDUSTRIAL":
                doc.image(logoTratamientoAguas, 305, 598, { width:50 })
                .moveDown();
                break;
            case "FARMACÉUTICA":
                doc.image(logoFarmaceutica, 305, 598, { width:50 })
                .moveDown();
                break;
            case "CANNABIS":
                doc.image(logoCannabis, 305, 598, { width:50 })
                .moveDown();
                break;
        }

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 690, cuadrado[0], 300).fill('#25acb1');

        doc
            .fontSize(16)
            .fillColor('#fff')
            .text(data.market6, 370, 710, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#fff')
            .font('Helvetica-Oblique')
            .text(data.description_market6, 370, 730, {width: 210})
            .moveDown();
        
        switch(data.market6){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoAcueducto, 305, 738, { width:50 })
                .moveDown();
                break;
            case "PROCESOS INDUSTRIALES":
                doc.image(logoIndustriales, 305, 738, { width:50 })
                .moveDown();
                break;
            case "ACUEDUCTOS":
                doc.image(logoAcueducto, 305, 738, { width:50 })
                .moveDown();
                break;
            case "EDUCACIÓN":
                doc.image(logoEducacion, 305, 738, { width:50 })
                .moveDown();
                break;
            case "ALIMENTOS":
                doc.image(logoAlimentos, 305, 738, { width:50 })
                .moveDown();
                break;
            case "GOBIERNO":
                doc.image(logoGobierno, 305, 738, { width:50 })
                .moveDown();
                break;
            case "INVESTIGACIÓN":
                doc.image(logoInvestigacion, 305, 738, { width:50 })
                .moveDown();
                break;
            case "CLINICO Y HOSPITALARIO":
                doc.image(logoClinico, 305, 738, { width:50 })
                .moveDown();
                break;
            case "TRATAMIENTO DE AGUA INDUSTRIAL":
                doc.image(logoTratamientoAguas, 305, 738, { width:50 })
                .moveDown();
                break;
            case "FARMACÉUTICA":
                doc.image(logoFarmaceutica, 305, 738, { width:50 })
                .moveDown();
                break;
            case "CANNABIS":
                doc.image(logoCannabis, 305, 738, { width:50 })
                .moveDown();
                break;
        }

        doc
            .image(footerPDF, 0, 830, {width: 600})

    //------------------------------ NEW PAGE ------------------------------------------

        doc.addPage({
            size: [595, 920],
        })
            .moveDown()  

        doc.lineJoin('miter')
            .rect(0, 160, fullDocH, 60).fill('#2e6ca7');

        doc
            .fillColor('#fff')
            .fontSize(30)
            .text('Características', 190,178)
            .moveDown();

         doc.lineJoin('producto uno')
            .rect(fullDocH / 1.8, 0, cuadrado[0], cuadrado[1])
            .fill('#016db4')
            .moveDown();

        doc
            .fontSize(16)
            .fillColor('#ffffff')
            .text(data.market7, 370, 10, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#ffffff')
            .font('Helvetica-Oblique')
            .text(data.description_market7, 370, 60, {width: 210})
            .moveDown();

        switch(data.market7){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoAcueducto, 305, 38, { width:50 })
                .moveDown();
                break;
            case "PROCESOS INDUSTRIALES":
                doc.image(logoIndustriales, 305, 38, { width:50 })
                .moveDown();
                break;
            case "ACUEDUCTOS":
                doc.image(logoAcueducto, 305, 38, { width:50 })
                .moveDown();
                break;
            case "EDUCACIÓN":
                doc.image(logoEducacion, 305, 38, { width:50 })
                .moveDown();
                break;
            case "ALIMENTOS":
                doc.image(logoAlimentos, 305, 38, { width:50 })
                .moveDown();
                break;
            case "GOBIERNO":
                doc.image(logoGobierno, 305, 38, { width:50 })
                .moveDown();
                break;
            case "INVESTIGACIÓN":
                doc.image(logoInvestigacion, 305, 38, { width:50 })
                .moveDown();
                break;
            case "CLINICO Y HOSPITALARIO":
                doc.image(logoClinico, 305, 38, { width:50 })
                .moveDown();
                break;
            case "TRATAMIENTO DE AGUA INDUSTRIAL":
                doc.image(logoTratamientoAguas, 305, 38, { width:50 })
                .moveDown();
                break;
            case "FARMACÉUTICA":
                doc.image(logoFarmaceutica, 305, 38, { width:50 })
                .moveDown();
                break;
            case "CANNABIS":
                doc.image(logoCannabis, 305, 38, { width:50 })
                .moveDown();
                break;
        }


        doc.lineJoin('miter')
            .rect(99, 250, 200, 200).fill('#2e6ca7');

        doc.circle(200, 300, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc
            .fontSize(11)
            .text(`${data.feature1}`,
            125, 330,  
            {
                width:150,
                align: 'center'
                
            })

        doc.image(pathImage1, 185, 285, {width: 30})

        doc.lineJoin('miter')
            .rect(301, 250, 200, 200).fill('#fbc02d');

        doc.circle(400, 300, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc.image(pathImage2, 385, 285, {width: 30})

        doc
            .fontSize(11)
            .text(`${data.feature2}`,
            325, 340,  
            {
                width:150,
                align: 'center'
                
            })


        doc.lineJoin('miter')
            .rect(99, 452, 200, 200).fill('#ff9f0f');

        doc.circle(200, 500, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();
        
        doc.image(pathImage3, 185, 485, {width: 30})

        doc
            .fontSize(11)
            .text(`${data.feature3}`,
            125, 540,  
            {
                width:150,
                align: 'center'
                
            })

        doc.lineJoin('miter')
            .rect(301, 452, 200, 200).fill('#24abb1');

        doc.circle(400, 500, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc.image(pathImage4, 385, 485, {width: 30})

        doc
            .fontSize(11)
            .text(`${data.feature4}`,
            330, 540,  
            {
                width:150,
                align: 'center'
                
            })

        doc.lineJoin('miter')
            .rect(99, 654, 402, 80).fill('#ff6510');

        doc.circle(140, 692, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc.image(pathImage5, 125, 676, {width: 30})

        doc
            .fontSize(11)
            .text(`${data.feature5}`,
            170, 670,  
            {
                width:300,
                align: 'center'    
            })


    //------------------------------ NEW PAGE ------------------------------------------

        doc.addPage({
            size: [595, 920],
        })
            .moveDown()

        doc.lineJoin('FondoAzulClaro')
            .roundedRect(50,0, 500, 500, 30 )
            .fillAndStroke('#EDF4F7', '#D5E8F4')

        doc.lineJoin('VentajasCompetitivas')
            .rect(0, 0, fullDocH, 60).fill('#2e6ca7');

        doc
            .fillColor('#fff')
            .fontSize(30)
            .text('Ventajas competitivas', 170,18)
            .moveDown();

        if(data.adventage1 != null){

            doc.lineJoin('fondoGris')
            .roundedRect(70, 80, 450, 70, 3 )
            .fill('#E2E8EA')

            doc.circle(100, 113, 25)
                .lineWidth(3)
                .fillOpacity(0.95)
                .fillAndStroke("#2e6ca7", "#fff")
                .moveDown();

            doc.image(ventaja1, 88, 100, {width: 25})

            doc
                .fontSize(11)
                .fillColor('#163461')
                .text(data.adventage1,
                140, 90,  
                {
                    width:350,
                    align: 'center'    
                })
        }

        if(data.adventage2 != null){

            doc.lineJoin('fondoGris')
            .roundedRect(70, 160, 450, 70, 3 )
            .fill('#E2E8EA')

            doc.circle(100, 195, 25)
                .lineWidth(3)
                .fillOpacity(0.95)
                .fillAndStroke("#fbc02d", "#fff")
                .moveDown();

            doc.image(ventaja2, 88, 183, {width: 30})

            doc
                .fontSize(11)
                .fillColor('#163461')
                .text(data.adventage2,
                140, 170,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(data.adventage3 != null){

            doc.lineJoin('fondoGris')
            .roundedRect(70, 240, 450, 70, 3 )
            .fill('#E2E8EA')

            doc.circle(100, 275, 25)
                .lineWidth(3)
                .fillOpacity(0.95)
                .fillAndStroke("#ff9f0f", "#fff")
                .moveDown();

            doc.image(ventaja3, 88, 263, {width: 30})

            doc
                .fontSize(11)
                .fillColor('#163461')
                .text(data.adventage3,
                140, 250,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(data.adventage4 != null){

            doc.lineJoin('fondoGris')
                .roundedRect(70, 320, 450, 70, 3 )
                .fill('#E2E8EA')

            doc.circle(100, 355, 25)
                .lineWidth(3)
                .fillOpacity(0.95)
                .fillAndStroke("#24abb1", "#fff")
                .moveDown();

            doc.image(ventaja4, 88, 343, {width: 30})

            doc
                .fontSize(11)
                .fillColor('#163461')
                .text(data.adventage4,
                140, 330,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(data.adventage5 != null){

            doc.lineJoin('fondoGris')
            .roundedRect(70, 400, 450, 70, 3 )
            .fill('#E2E8EA')

            doc.circle(100, 440, 25)
                .lineWidth(3)
                .fillOpacity(0.95)
                .fillAndStroke("#ff6510", "#fff")
                .moveDown();

            doc.image(ventaja5, 84, 426, {width: 30})


            doc
                .fontSize(11)
                .fillColor('#163461')
                .text(data.adventage5,
                140, 410,  
                {
                    width:350,
                    align: 'center'    
                })

        }


    } else if( markets.length === 8 ){

        doc
            .image(headerPDF, 0, 0, {width: 330})

        if(data.name.length > 25){
            doc
            .fillColor('#163461')
            .fontSize(15)
            .text(
                data.name, 
                60, 50,
                { 
                    width: 200,
                    align: 'center'
                }, 
            )
            .moveDown();
            
        }else{
            doc
            .fillColor('#163461')
            .fontSize(25)
            .text(
                data.name, 
                60, 50,
                { 
                    width: 200,
                    align: 'center'
                }, 
            ).moveDown();
        }

        doc
            .image('data:image/jpeg;base64,'+imgProduct , 60, 310, {width: 200})
            .moveDown();

        doc.lineJoin('producto uno')
            .rect(fullDocH / 1.8, 0, cuadrado[0], cuadrado[1])
            .fill('#016db4')
            .moveDown();

        doc
            .fontSize(16)
            .fillColor('#ffffff')
            .text(data.market1, 370, 10, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#ffffff')
            .font('Helvetica-Oblique')
            .text(data.description_market1, 370, 45, {width: 210})
            .moveDown();

        switch(data.market1){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoAcueducto, 305, 38, { width:50 })
                .moveDown();
                break;
            case "PROCESOS INDUSTRIALES":
                doc.image(logoIndustriales, 305, 38, { width:50 })
                .moveDown();
                break;
            case "ACUEDUCTOS":
                doc.image(logoAcueducto, 305, 38, { width:50 })
                .moveDown();
                break;
            case "EDUCACIÓN":
                doc.image(logoEducacion, 305, 38, { width:50 })
                .moveDown();
                break;
            case "ALIMENTOS":
                doc.image(logoAlimentos, 305, 38, { width:50 })
                .moveDown();
                break;
            case "GOBIERNO":
                doc.image(logoGobierno, 305, 38, { width:50 })
                .moveDown();
                break;
            case "INVESTIGACIÓN":
                doc.image(logoInvestigacion, 305, 38, { width:50 })
                .moveDown();
                break;
            case "CLINICO Y HOSPITALARIO":
                doc.image(logoClinico, 305, 38, { width:50 })
                .moveDown();
                break;
            case "TRATAMIENTO DE AGUA INDUSTRIAL":
                doc.image(logoTratamientoAguas, 305, 38, { width:50 })
                .moveDown();
                break;
            case "FARMACÉUTICA":
                doc.image(logoFarmaceutica, 305, 38, { width:50 })
                .moveDown();
                break;
            case "CANNABIS":
                doc.image(logoCannabis, 305, 38, { width:50 })
                .moveDown();
                break;
        }

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 130, cuadrado[0], cuadrado[1]).fill('#ecc101');

        switch(data.market2){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoAcueducto, 305, 178, { width:50 })
                .moveDown();
                break;
            case "PROCESOS INDUSTRIALES":
                doc.image(logoIndustriales, 305, 178, { width:50 })
                .moveDown();
                break;
            case "ACUEDUCTOS":
                doc.image(logoAcueducto, 305, 178, { width:50 })
                .moveDown();
                break;
            case "EDUCACIÓN":
                doc.image(logoEducacion, 305, 178, { width:50 })
                .moveDown();
                break;
            case "ALIMENTOS":
                doc.image(logoAlimentos, 305, 178, { width:50 })
                .moveDown();
                break;
            case "GOBIERNO":
                doc.image(logoGobierno, 305, 178, { width:50 })
                .moveDown();
                break;
            case "INVESTIGACIÓN":
                doc.image(logoInvestigacion, 305, 178, { width:50 })
                .moveDown();
                break;
            case "CLINICO Y HOSPITALARIO":
                doc.image(logoClinico, 305, 178, { width:50 })
                .moveDown();
                break;
            case "TRATAMIENTO DE AGUA INDUSTRIAL":
                doc.image(logoTratamientoAguas, 305, 178, { width:50 })
                .moveDown();
                break;
            case "FARMACÉUTICA":
                doc.image(logoFarmaceutica, 305, 178, { width:50 })
                .moveDown();
                break;
            case "CANNABIS":
                doc.image(logoCannabis, 305, 178, { width:50 })
                .moveDown();
                break;
        }

        doc
            .fontSize(16)
            .fillColor('#285258')
            .text(data.market2, 370, 150, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#285258')
            .font('Helvetica-Oblique')
            .text(data.description_market2, 370, 185, {width: 210})
            .moveDown();

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 270, cuadrado[0], cuadrado[1]).fill('#25acb1');

        switch(data.market3){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoAcueducto, 305, 318, { width:50 })
                .moveDown();
                break;
            case "PROCESOS INDUSTRIALES":
                doc.image(logoIndustriales, 305, 318, { width:50 })
                .moveDown();
                break;
            case "ACUEDUCTOS":
                doc.image(logoAcueducto, 305, 318, { width:50 })
                .moveDown();
                break;
            case "EDUCACIÓN":
                doc.image(logoEducacion, 305, 318, { width:50 })
                .moveDown();
                break;
            case "ALIMENTOS":
                doc.image(logoAlimentos, 305, 318, { width:50 })
                .moveDown();
                break;
            case "GOBIERNO":
                doc.image(logoGobierno, 305, 318, { width:50 })
                .moveDown();
                break;
            case "INVESTIGACIÓN":
                doc.image(logoInvestigacion, 305, 318, { width:50 })
                .moveDown();
                break;
            case "CLINICO Y HOSPITALARIO":
                doc.image(logoClinico, 305, 318, { width:50 })
                .moveDown();
                break;
            case "TRATAMIENTO DE AGUA INDUSTRIAL":
                doc.image(logoTratamientoAguas, 305, 318, { width:50 })
                .moveDown();
                break;
            case "FARMACÉUTICA":
                doc.image(logoFarmaceutica, 305, 318, { width:50 })
                .moveDown();
                break;
            case "CANNABIS":
                doc.image(logoCannabis, 305, 318, { width:50 })
                .moveDown();
                break;
        }

        doc
            .fontSize(16)
            .fillColor('#fff')
            .text(data.market3, 370, 290, {width: 200})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#fff')
            .font('Helvetica-Oblique')
            .text(data.description_market3, 370, 325, {width: 210})
            .moveDown();

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 410, cuadrado[0], cuadrado[1]).fill('#ff9f0f');

        switch(data.market4){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoAcueducto, 305, 458, { width:50 })
                .moveDown();
                break;
            case "PROCESOS INDUSTRIALES":
                doc.image(logoIndustriales, 305, 458, { width:50 })
                .moveDown();
                break;
            case "ACUEDUCTOS":
                doc.image(logoAcueducto, 305, 458, { width:50 })
                .moveDown();
                break;
            case "EDUCACIÓN":
                doc.image(logoEducacion, 305, 458, { width:50 })
                .moveDown();
                break;
            case "ALIMENTOS":
                doc.image(logoAlimentos, 305, 458, { width:50 })
                .moveDown();
                break;
            case "GOBIERNO":
                doc.image(logoGobierno, 305, 458, { width:50 })
                .moveDown();
                break;
            case "INVESTIGACIÓN":
                doc.image(logoInvestigacion, 305, 458, { width:50 })
                .moveDown();
                break;
            case "CLINICO Y HOSPITALARIO":
                doc.image(logoClinico, 305, 458, { width:50 })
                .moveDown();
                break;
            case "TRATAMIENTO DE AGUA INDUSTRIAL":
                doc.image(logoTratamientoAguas, 305, 458, { width:50 })
                .moveDown();
                break;
            case "FARMACÉUTICA":
                doc.image(logoFarmaceutica, 305, 458, { width:50 })
                .moveDown();
                break;
            case "CANNABIS":
                doc.image(logoCannabis, 305, 458, { width:50 })
                .moveDown();
                break;
        }

        doc
            .fontSize(16)
            .fillColor('#fff')
            .text(data.market4, 370, 430, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#fff')
            .font('Helvetica-Oblique')
            .text(data.description_market4, 370, 460, {width: 210} )
            .moveDown();


        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 550, cuadrado[0], cuadrado[1]).fill('#ecc101');

        doc
            .fontSize(16)
            .fillColor('#fff')
            .text(data.market5, 370, 570, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#fff')
            .font('Helvetica-Oblique')
            .text(data.description_market5, 370, 605, {width: 210})
            .moveDown();

        switch(data.market5){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoAcueducto, 305, 598, { width:50 })
                .moveDown();
                break;
            case "PROCESOS INDUSTRIALES":
                doc.image(logoIndustriales, 305, 598, { width:50 })
                .moveDown();
                break;
            case "ACUEDUCTOS":
                doc.image(logoAcueducto, 305, 598, { width:50 })
                .moveDown();
                break;
            case "EDUCACIÓN":
                doc.image(logoEducacion, 305, 598, { width:50 })
                .moveDown();
                break;
            case "ALIMENTOS":
                doc.image(logoAlimentos, 305, 598, { width:50 })
                .moveDown();
                break;
            case "GOBIERNO":
                doc.image(logoGobierno, 305, 598, { width:50 })
                .moveDown();
                break;
            case "INVESTIGACIÓN":
                doc.image(logoInvestigacion, 305, 598, { width:50 })
                .moveDown();
                break;
            case "CLINICO Y HOSPITALARIO":
                doc.image(logoClinico, 305, 598, { width:50 })
                .moveDown();
                break;
            case "TRATAMIENTO DE AGUA INDUSTRIAL":
                doc.image(logoTratamientoAguas, 305, 598, { width:50 })
                .moveDown();
                break;
            case "FARMACÉUTICA":
                doc.image(logoFarmaceutica, 305, 598, { width:50 })
                .moveDown();
                break;
            case "CANNABIS":
                doc.image(logoCannabis, 305, 598, { width:50 })
                .moveDown();
                break;
        }

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 690, cuadrado[0], 300).fill('#25acb1');

        doc
            .fontSize(16)
            .fillColor('#fff')
            .text(data.market6, 370, 710, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#fff')
            .font('Helvetica-Oblique')
            .text(data.description_market6, 370, 745, {width: 210})
            .moveDown();
        
        switch(data.market6){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoAcueducto, 305, 738, { width:50 })
                .moveDown();
                break;
            case "PROCESOS INDUSTRIALES":
                doc.image(logoIndustriales, 305, 738, { width:50 })
                .moveDown();
                break;
            case "ACUEDUCTOS":
                doc.image(logoAcueducto, 305, 738, { width:50 })
                .moveDown();
                break;
            case "EDUCACIÓN":
                doc.image(logoEducacion, 305, 738, { width:50 })
                .moveDown();
                break;
            case "ALIMENTOS":
                doc.image(logoAlimentos, 305, 738, { width:50 })
                .moveDown();
                break;
            case "GOBIERNO":
                doc.image(logoGobierno, 305, 738, { width:50 })
                .moveDown();
                break;
            case "INVESTIGACIÓN":
                doc.image(logoInvestigacion, 305, 738, { width:50 })
                .moveDown();
                break;
            case "CLINICO Y HOSPITALARIO":
                doc.image(logoClinico, 305, 738, { width:50 })
                .moveDown();
                break;
            case "TRATAMIENTO DE AGUA INDUSTRIAL":
                doc.image(logoTratamientoAguas, 305, 738, { width:50 })
                .moveDown();
                break;
            case "FARMACÉUTICA":
                doc.image(logoFarmaceutica, 305, 738, { width:50 })
                .moveDown();
                break;
            case "CANNABIS":
                doc.image(logoCannabis, 305, 738, { width:50 })
                .moveDown();
                break;
        }

        doc
            .fillColor('#016cb2')
            .fontSize(12)
            .text('www.paf.com.co', fullDocH/5.5, 790)
            .link(100, 100, 160, 27, 'https://www.paf.com.co/')

    //------------------------------ NEW PAGE ------------------------------------------

        doc.addPage({
            size: [595, 920],
        })
            .moveDown()  

        doc.lineJoin('miter')
            .rect(0, 280, fullDocH, 60).fill('#2e6ca7');

        doc
            .fillColor('#fff')
            .fontSize(30)
            .text('Características', 190,298)
            .moveDown();

         doc.lineJoin('producto uno')
            .rect(fullDocH / 1.8, 0, cuadrado[0], cuadrado[1])
            .fill('#016db4')
            .moveDown();

        doc
            .fontSize(16)
            .fillColor('#ffffff')
            .text(data.market7, 370, 10, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#ffffff')
            .font('Helvetica-Oblique')
            .text(data.description_market7, 370, 50, {width: 210})
            .moveDown();

        switch(data.market7){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoAcueducto, 305, 38, { width:50 })
                .moveDown();
                break;
            case "PROCESOS INDUSTRIALES":
                doc.image(logoIndustriales, 305, 38, { width:50 })
                .moveDown();
                break;
            case "ACUEDUCTOS":
                doc.image(logoAcueducto, 305, 38, { width:50 })
                .moveDown();
                break;
            case "EDUCACIÓN":
                doc.image(logoEducacion, 305, 38, { width:50 })
                .moveDown();
                break;
            case "ALIMENTOS":
                doc.image(logoAlimentos, 305, 38, { width:50 })
                .moveDown();
                break;
            case "GOBIERNO":
                doc.image(logoGobierno, 305, 38, { width:50 })
                .moveDown();
                break;
            case "INVESTIGACIÓN":
                doc.image(logoInvestigacion, 305, 38, { width:50 })
                .moveDown();
                break;
            case "CLINICO Y HOSPITALARIO":
                doc.image(logoClinico, 305, 38, { width:50 })
                .moveDown();
                break;
            case "TRATAMIENTO DE AGUA INDUSTRIAL":
                doc.image(logoTratamientoAguas, 305, 38, { width:50 })
                .moveDown();
                break;
            case "FARMACÉUTICA":
                doc.image(logoFarmaceutica, 305, 38, { width:50 })
                .moveDown();
                break;
            case "CANNABIS":
                doc.image(logoCannabis, 305, 38, { width:50 })
                .moveDown();
                break;
        }

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 130, cuadrado[0], cuadrado[1]).fill('#ecc101');

        switch(data.market8){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoAcueducto, 305, 178, { width:50 })
                .moveDown();
                break;
            case "PROCESOS INDUSTRIALES":
                doc.image(logoIndustriales, 305, 178, { width:50 })
                .moveDown();
                break;
            case "ACUEDUCTOS":
                doc.image(logoAcueducto, 305, 178, { width:50 })
                .moveDown();
                break;
            case "EDUCACIÓN":
                doc.image(logoEducacion, 305, 178, { width:50 })
                .moveDown();
                break;
            case "ALIMENTOS":
                doc.image(logoAlimentos, 305, 178, { width:50 })
                .moveDown();
                break;
            case "GOBIERNO":
                doc.image(logoGobierno, 305, 178, { width:50 })
                .moveDown();
                break;
            case "INVESTIGACIÓN":
                doc.image(logoInvestigacion, 305, 178, { width:50 })
                .moveDown();
                break;
            case "CLINICO Y HOSPITALARIO":
                doc.image(logoClinico, 305, 178, { width:50 })
                .moveDown();
                break;
            case "TRATAMIENTO DE AGUA INDUSTRIAL":
                doc.image(logoTratamientoAguas, 305, 178, { width:50 })
                .moveDown();
                break;
            case "FARMACÉUTICA":
                doc.image(logoFarmaceutica, 305, 178, { width:50 })
                .moveDown();
                break;
            case "CANNABIS":
                doc.image(logoCannabis, 305, 178, { width:50 })
                .moveDown();
                break;
        }

        doc
            .fontSize(16)
            .fillColor('#285258')
            .text(data.market8, 370, 145, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#285258')
            .font('Helvetica-Oblique')
            .text(data.description_market8, 370, 180, {width: 210})
            .moveDown();


        doc.lineJoin('miter')
            .rect(99, 350, 200, 200).fill('#2e6ca7');

        doc.circle(200, 400, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc
            .fontSize(11)
            .text(`${data.feature1}`,
            125, 440,  
            {
                width:150,
                align: 'center'
                
            })

        doc.image(pathImage1, 185, 385, {width: 30})

        doc.lineJoin('miter')
            .rect(301, 350, 200, 200).fill('#fbc02d');

        doc.circle(400, 400, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc.image(pathImage2, 385, 385, {width: 30})

        doc
            .fontSize(11)
            .text(`${data.feature2}`,
            325, 440,  
            {
                width:150,
                align: 'center'
                
            })


        doc.lineJoin('miter')
            .rect(99, 552, 200, 200).fill('#ff9f0f');

        doc.circle(200, 600, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();
        
        doc.image(pathImage3, 185, 585, {width: 30})

        doc
            .fontSize(11)
            .text(`${data.feature3}`,
            125, 640,  
            {
                width:150,
                align: 'center'
                
            })

        doc.lineJoin('miter')
            .rect(301, 552, 200, 200).fill('#24abb1');

        doc.circle(400, 600, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc.image(pathImage4, 385, 585, {width: 30})

        doc
            .fontSize(11)
            .text(`${data.feature4}`,
            330, 640,  
            {
                width:150,
                align: 'center'
                
            })

        doc.lineJoin('miter')
            .rect(99, 754, 402, 80).fill('#ff6510');

        doc.circle(140, 792, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc.image(pathImage5, 125, 776, {width: 30})

        doc
            .fontSize(11)
            .text(`${data.feature5}`,
            170, 770,  
            {
                width:300,
                align: 'center'    
            })

    //------------------------------ NEW PAGE ------------------------------------------

        doc.addPage({
            size: [595, 920],
        })
            .moveDown()


        doc.lineJoin('FondoAzulClaro')
            .roundedRect(50,0, 500, 500, 30 )
            .fillAndStroke('#EDF4F7', '#D5E8F4')

        doc.lineJoin('VentajasCompetitivas')
            .rect(0, 0, fullDocH, 60).fill('#2e6ca7');

        doc
            .fillColor('#fff')
            .fontSize(30)
            .text('Ventajas competitivas', 170, 15, {width:300})
            .moveDown();

        if(data.adventage1 != null){

            doc.lineJoin('fondoGris')
            .roundedRect(70, 80, 450, 70, 3 )
            .fill('#E2E8EA')

            doc.circle(100, 113, 25)
                .lineWidth(3)
                .fillOpacity(0.95)
                .fillAndStroke("#2e6ca7", "#fff")
                .moveDown();

            doc.image(ventaja1, 88, 100, {width: 25})

            doc
                .fontSize(11)
                .fillColor('#163461')
                .text(data.adventage1,
                140, 90,  
                {
                    width:350,
                    align: 'center'    
                })
        }

        if(data.adventage2 != null){

            doc.lineJoin('fondoGris')
            .roundedRect(70, 160, 450, 70, 3 )
            .fill('#E2E8EA')

            doc.circle(100, 195, 25)
                .lineWidth(3)
                .fillOpacity(0.95)
                .fillAndStroke("#fbc02d", "#fff")
                .moveDown();

            doc.image(ventaja2, 88, 183, {width: 30})

            doc
                .fontSize(11)
                .fillColor('#163461')
                .text(data.adventage2,
                140, 170,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(data.adventage3 != null){

            doc.lineJoin('fondoGris')
            .roundedRect(70, 240, 450, 70, 3 )
            .fill('#E2E8EA')

            doc.circle(100, 275, 25)
                .lineWidth(3)
                .fillOpacity(0.95)
                .fillAndStroke("#ff9f0f", "#fff")
                .moveDown();

            doc.image(ventaja3, 88, 263, {width: 30})

            doc
                .fontSize(11)
                .fillColor('#163461')
                .text(data.adventage3,
                140, 250,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(data.adventage4 != null){

            doc.lineJoin('fondoGris')
                .roundedRect(70, 320, 450, 70, 3 )
                .fill('#E2E8EA')

            doc.circle(100, 355, 25)
                .lineWidth(3)
                .fillOpacity(0.95)
                .fillAndStroke("#24abb1", "#fff")
                .moveDown();

            doc.image(ventaja4, 88, 343, {width: 30})

            doc
                .fontSize(11)
                .fillColor('#163461')
                .text(data.adventage4,
                140, 330,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(data.adventage5 != null){

            doc.lineJoin('fondoGris')
            .roundedRect(70, 400, 450, 70, 3 )
            .fill('#E2E8EA')

            doc.circle(100, 440, 25)
                .lineWidth(3)
                .fillOpacity(0.95)
                .fillAndStroke("#ff6510", "#fff")
                .moveDown();

            doc.image(ventaja5, 84, 426, {width: 30})


            doc
                .fontSize(11)
                .fillColor('#163461')
                .text(data.adventage5,
                140, 410,  
                {
                    width:350,
                    align: 'center'    
                })

        }

    } else if( markets.length === 9 ){

        doc
            .image(headerPDF, 0, 0, {width: 330})

        doc
            .fillColor('#163461')
            .fontSize(25)
            .text(
                data.name, 
                { width: 200 }, 
                200, 0
            )
            .moveDown();

        doc
            .image('data:image/jpeg;base64,'+imgProduct , 60, 310, {width: 200})
            .moveDown();

        doc.lineJoin('producto uno')
            .rect(fullDocH / 1.8, 0, cuadrado[0], cuadrado[1])
            .fill('#016db4')
            .moveDown();

        doc
            .fontSize(16)
            .fillColor('#ffffff')
            .text(data.market1, 370, 10, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#ffffff')
            .font('Helvetica-Oblique')
            .text(data.description_market1, 370, 40, {width: 210})
            .moveDown();

        switch(data.market1){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoAcueducto, 305, 38, { width:50 })
                .moveDown();
                break;
            case "PROCESOS INDUSTRIALES":
                doc.image(logoIndustriales, 305, 38, { width:50 })
                .moveDown();
                break;
            case "ACUEDUCTOS":
                doc.image(logoAcueducto, 305, 38, { width:50 })
                .moveDown();
                break;
            case "EDUCACIÓN":
                doc.image(logoEducacion, 305, 38, { width:50 })
                .moveDown();
                break;
            case "ALIMENTOS":
                doc.image(logoAlimentos, 305, 38, { width:50 })
                .moveDown();
                break;
            case "GOBIERNO":
                doc.image(logoGobierno, 305, 38, { width:50 })
                .moveDown();
                break;
            case "INVESTIGACIÓN":
                doc.image(logoInvestigacion, 305, 38, { width:50 })
                .moveDown();
                break;
            case "CLINICO Y HOSPITALARIO":
                doc.image(logoClinico, 305, 38, { width:50 })
                .moveDown();
                break;
            case "TRATAMIENTO DE AGUA INDUSTRIAL":
                doc.image(logoTratamientoAguas, 305, 38, { width:50 })
                .moveDown();
                break;
            case "FARMACÉUTICA":
                doc.image(logoFarmaceutica, 305, 38, { width:50 })
                .moveDown();
                break;
            case "CANNABIS":
                doc.image(logoCannabis, 305, 38, { width:50 })
                .moveDown();
                break;
        }

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 130, cuadrado[0], cuadrado[1]).fill('#ecc101');

        switch(data.market2){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoAcueducto, 305, 178, { width:50 })
                .moveDown();
                break;
            case "PROCESOS INDUSTRIALES":
                doc.image(logoIndustriales, 305, 178, { width:50 })
                .moveDown();
                break;
            case "ACUEDUCTOS":
                doc.image(logoAcueducto, 305, 178, { width:50 })
                .moveDown();
                break;
            case "EDUCACIÓN":
                doc.image(logoEducacion, 305, 178, { width:50 })
                .moveDown();
                break;
            case "ALIMENTOS":
                doc.image(logoAlimentos, 305, 178, { width:50 })
                .moveDown();
                break;
            case "GOBIERNO":
                doc.image(logoGobierno, 305, 178, { width:50 })
                .moveDown();
                break;
            case "INVESTIGACIÓN":
                doc.image(logoInvestigacion, 305, 178, { width:50 })
                .moveDown();
                break;
            case "CLINICO Y HOSPITALARIO":
                doc.image(logoClinico, 305, 178, { width:50 })
                .moveDown();
                break;
            case "TRATAMIENTO DE AGUA INDUSTRIAL":
                doc.image(logoTratamientoAguas, 305, 178, { width:50 })
                .moveDown();
                break;
            case "FARMACÉUTICA":
                doc.image(logoFarmaceutica, 305, 178, { width:50 })
                .moveDown();
                break;
            case "CANNABIS":
                doc.image(logoCannabis, 305, 178, { width:50 })
                .moveDown();
                break;
        }

        doc
            .fontSize(16)
            .fillColor('#285258')
            .text(data.market2, 370, 150, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#285258')
            .font('Helvetica-Oblique')
            .text(data.description_market2, 370, 180, {width: 210})
            .moveDown();

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 270, cuadrado[0], cuadrado[1]).fill('#25acb1');

        switch(data.market3){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoAcueducto, 305, 318, { width:50 })
                .moveDown();
                break;
            case "PROCESOS INDUSTRIALES":
                doc.image(logoIndustriales, 305, 318, { width:50 })
                .moveDown();
                break;
            case "ACUEDUCTOS":
                doc.image(logoAcueducto, 305, 318, { width:50 })
                .moveDown();
                break;
            case "EDUCACIÓN":
                doc.image(logoEducacion, 305, 318, { width:50 })
                .moveDown();
                break;
            case "ALIMENTOS":
                doc.image(logoAlimentos, 305, 318, { width:50 })
                .moveDown();
                break;
            case "GOBIERNO":
                doc.image(logoGobierno, 305, 318, { width:50 })
                .moveDown();
                break;
            case "INVESTIGACIÓN":
                doc.image(logoInvestigacion, 305, 318, { width:50 })
                .moveDown();
                break;
            case "CLINICO Y HOSPITALARIO":
                doc.image(logoClinico, 305, 318, { width:50 })
                .moveDown();
                break;
            case "TRATAMIENTO DE AGUA INDUSTRIAL":
                doc.image(logoTratamientoAguas, 305, 318, { width:50 })
                .moveDown();
                break;
            case "FARMACÉUTICA":
                doc.image(logoFarmaceutica, 305, 318, { width:50 })
                .moveDown();
                break;
            case "CANNABIS":
                doc.image(logoCannabis, 305, 318, { width:50 })
                .moveDown();
                break;
        }

        doc
            .fontSize(16)
            .fillColor('#fff')
            .text(data.market3, 370, 290, {width: 200})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#fff')
            .font('Helvetica-Oblique')
            .text(data.description_market3, 370, 320, {width: 210})
            .moveDown();

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 410, cuadrado[0], cuadrado[1]).fill('#ff9f0f');

        switch(data.market4){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoAcueducto, 305, 458, { width:50 })
                .moveDown();
                break;
            case "PROCESOS INDUSTRIALES":
                doc.image(logoIndustriales, 305, 458, { width:50 })
                .moveDown();
                break;
            case "ACUEDUCTOS":
                doc.image(logoAcueducto, 305, 458, { width:50 })
                .moveDown();
                break;
            case "EDUCACIÓN":
                doc.image(logoEducacion, 305, 458, { width:50 })
                .moveDown();
                break;
            case "ALIMENTOS":
                doc.image(logoAlimentos, 305, 458, { width:50 })
                .moveDown();
                break;
            case "GOBIERNO":
                doc.image(logoGobierno, 305, 458, { width:50 })
                .moveDown();
                break;
            case "INVESTIGACIÓN":
                doc.image(logoInvestigacion, 305, 458, { width:50 })
                .moveDown();
                break;
            case "CLINICO Y HOSPITALARIO":
                doc.image(logoClinico, 305, 458, { width:50 })
                .moveDown();
                break;
            case "TRATAMIENTO DE AGUA INDUSTRIAL":
                doc.image(logoTratamientoAguas, 305, 458, { width:50 })
                .moveDown();
                break;
            case "FARMACÉUTICA":
                doc.image(logoFarmaceutica, 305, 458, { width:50 })
                .moveDown();
                break;
            case "CANNABIS":
                doc.image(logoCannabis, 305, 458, { width:50 })
                .moveDown();
                break;
        }

        doc
            .fontSize(16)
            .fillColor('#fff')
            .text(data.market4, 370, 430, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#fff')
            .font('Helvetica-Oblique')
            .text(data.description_market4, 370, 460, {width: 210} )
            .moveDown();


        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 550, cuadrado[0], cuadrado[1]).fill('#ecc101');

        doc
            .fontSize(16)
            .fillColor('#fff')
            .text(data.market5, 370, 570, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#fff')
            .font('Helvetica-Oblique')
            .text(data.description_market5, 370, 600, {width: 210})
            .moveDown();

        switch(data.market5){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoAcueducto, 305, 598, { width:50 })
                .moveDown();
                break;
            case "PROCESOS INDUSTRIALES":
                doc.image(logoIndustriales, 305, 598, { width:50 })
                .moveDown();
                break;
            case "ACUEDUCTOS":
                doc.image(logoAcueducto, 305, 598, { width:50 })
                .moveDown();
                break;
            case "EDUCACIÓN":
                doc.image(logoEducacion, 305, 598, { width:50 })
                .moveDown();
                break;
            case "ALIMENTOS":
                doc.image(logoAlimentos, 305, 598, { width:50 })
                .moveDown();
                break;
            case "GOBIERNO":
                doc.image(logoGobierno, 305, 598, { width:50 })
                .moveDown();
                break;
            case "INVESTIGACIÓN":
                doc.image(logoInvestigacion, 305, 598, { width:50 })
                .moveDown();
                break;
            case "CLINICO Y HOSPITALARIO":
                doc.image(logoClinico, 305, 598, { width:50 })
                .moveDown();
                break;
            case "TRATAMIENTO DE AGUA INDUSTRIAL":
                doc.image(logoTratamientoAguas, 305, 598, { width:50 })
                .moveDown();
                break;
            case "FARMACÉUTICA":
                doc.image(logoFarmaceutica, 305, 598, { width:50 })
                .moveDown();
                break;
            case "CANNABIS":
                doc.image(logoCannabis, 305, 598, { width:50 })
                .moveDown();
                break;
        }

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 690, cuadrado[0], 300).fill('#25acb1');

        doc
            .fontSize(16)
            .fillColor('#fff')
            .text(data.market6, 370, 710, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#fff')
            .font('Helvetica-Oblique')
            .text(data.description_market6, 370, 740, {width: 210})
            .moveDown();
        
        switch(data.market6){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoAcueducto, 305, 738, { width:50 })
                .moveDown();
                break;
            case "PROCESOS INDUSTRIALES":
                doc.image(logoIndustriales, 305, 738, { width:50 })
                .moveDown();
                break;
            case "ACUEDUCTOS":
                doc.image(logoAcueducto, 305, 738, { width:50 })
                .moveDown();
                break;
            case "EDUCACIÓN":
                doc.image(logoEducacion, 305, 738, { width:50 })
                .moveDown();
                break;
            case "ALIMENTOS":
                doc.image(logoAlimentos, 305, 738, { width:50 })
                .moveDown();
                break;
            case "GOBIERNO":
                doc.image(logoGobierno, 305, 738, { width:50 })
                .moveDown();
                break;
            case "INVESTIGACIÓN":
                doc.image(logoInvestigacion, 305, 738, { width:50 })
                .moveDown();
                break;
            case "CLINICO Y HOSPITALARIO":
                doc.image(logoClinico, 305, 738, { width:50 })
                .moveDown();
                break;
            case "TRATAMIENTO DE AGUA INDUSTRIAL":
                doc.image(logoTratamientoAguas, 305, 738, { width:50 })
                .moveDown();
                break;
            case "FARMACÉUTICA":
                doc.image(logoFarmaceutica, 305, 738, { width:50 })
                .moveDown();
                break;
            case "CANNABIS":
                doc.image(logoCannabis, 305, 738, { width:50 })
                .moveDown();
                break;
        }

        doc
            .fillColor('#016cb2')
            .fontSize(12)
            .text('www.paf.com.co', fullDocH/5.5, 790)
            .link(100, 100, 160, 27, 'https://www.paf.com.co/')

    //------------------------------ NEW PAGE ------------------------------------------

        doc.addPage({
            size: [595, 920],
        })
            .moveDown()  

        doc.lineJoin('miter')
            .rect(0, 290, fullDocH, 50).fill('#2e6ca7');

        doc
            .fillColor('#fff')
            .fontSize(30)
            .text('Características', 190,303)
            .moveDown();

         doc.lineJoin('producto uno')
            .rect(fullDocH / 1.8, 0, cuadrado[0], cuadrado[1])
            .fill('#016db4')
            .moveDown();

        doc
            .fontSize(16)
            .fillColor('#ffffff')
            .text(data.market7, 370, 10, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#ffffff')
            .font('Helvetica-Oblique')
            .text(data.description_market7, 370, 40, {width: 210})
            .moveDown();

        switch(data.market7){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoAcueducto, 305, 38, { width:50 })
                .moveDown();
                break;
            case "PROCESOS INDUSTRIALES":
                doc.image(logoIndustriales, 305, 38, { width:50 })
                .moveDown();
                break;
            case "ACUEDUCTOS":
                doc.image(logoAcueducto, 305, 38, { width:50 })
                .moveDown();
                break;
            case "EDUCACIÓN":
                doc.image(logoEducacion, 305, 38, { width:50 })
                .moveDown();
                break;
            case "ALIMENTOS":
                doc.image(logoAlimentos, 305, 38, { width:50 })
                .moveDown();
                break;
            case "GOBIERNO":
                doc.image(logoGobierno, 305, 38, { width:50 })
                .moveDown();
                break;
            case "INVESTIGACIÓN":
                doc.image(logoInvestigacion, 305, 38, { width:50 })
                .moveDown();
                break;
            case "CLINICO Y HOSPITALARIO":
                doc.image(logoClinico, 305, 38, { width:50 })
                .moveDown();
                break;
            case "TRATAMIENTO DE AGUA INDUSTRIAL":
                doc.image(logoTratamientoAguas, 305, 38, { width:50 })
                .moveDown();
                break;
            case "FARMACÉUTICA":
                doc.image(logoFarmaceutica, 305, 38, { width:50 })
                .moveDown();
                break;
            case "CANNABIS":
                doc.image(logoCannabis, 305, 38, { width:50 })
                .moveDown();
                break;
        }

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 140, cuadrado[0], cuadrado[1]).fill('#ecc101');

       switch(data.market8){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoAcueducto, 305, 178, { width:50 })
                .moveDown();
                break;
            case "PROCESOS INDUSTRIALES":
                doc.image(logoIndustriales, 305, 38, { width:50 })
                .moveDown();
                break;
            case "ACUEDUCTOS":
                doc.image(logoAcueducto, 305, 38, { width:50 })
                .moveDown();
                break;
            case "EDUCACIÓN":
                doc.image(logoEducacion, 305, 38, { width:50 })
                .moveDown();
                break;
            case "ALIMENTOS":
                doc.image(logoAlimentos, 305, 38, { width:50 })
                .moveDown();
                break;
            case "GOBIERNO":
                doc.image(logoGobierno, 305, 38, { width:50 })
                .moveDown();
                break;
            case "INVESTIGACIÓN":
                doc.image(logoInvestigacion, 305, 38, { width:50 })
                .moveDown();
                break;
            case "CLINICO Y HOSPITALARIO":
                doc.image(logoClinico, 305, 178, { width:50 })
                .moveDown();
                break;
            case "TRATAMIENTO DE AGUA INDUSTRIAL":
                doc.image(logoTratamientoAguas, 305, 38, { width:50 })
                .moveDown();
                break;
            case "FARMACÉUTICA":
                doc.image(logoFarmaceutica, 305, 38, { width:50 })
                .moveDown();
                break;
            case "CANNABIS":
                doc.image(logoCannabis, 305, 38, { width:50 })
                .moveDown();
                break;
        }

        doc
            .fontSize(16)
            .fillColor('#285258')
            .text(data.market8, 370, 160, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#285258')
            .font('Helvetica-Oblique')
            .text(data.description_market8, 370, 190, {width: 210})
            .moveDown();

        doc.lineJoin('miter')
            .rect(10, 0, cuadrado[0], cuadrado[1]).fill('#ff9f0f');

        switch(data.market9){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoAcueducto, 305, 178, { width:50 })
                .moveDown();
                break;
            case "PROCESOS INDUSTRIALES":
                doc.image(logoIndustriales, 305, 38, { width:50 })
                .moveDown();
                break;
            case "ACUEDUCTOS":
                doc.image(logoAcueducto, 305, 38, { width:50 })
                .moveDown();
                break;
            case "EDUCACIÓN":
                doc.image(logoEducacion, 305, 38, { width:50 })
                .moveDown();
                break;
            case "ALIMENTOS":
                doc.image(logoAlimentos, 305, 38, { width:50 })
                .moveDown();
                break;
            case "GOBIERNO":
                doc.image(logoGobierno, 305, 38, { width:50 })
                .moveDown();
                break;
            case "INVESTIGACIÓN":
                doc.image(logoInvestigacion, 305, 38, { width:50 })
                .moveDown();
                break;
            case "CLINICO Y HOSPITALARIO":
                doc.image(logoClinico, 305, 178, { width:50 })
                .moveDown();
                break;
            case "TRATAMIENTO DE AGUA INDUSTRIAL":
                doc.image(logoTratamientoAguas, 0, 38, { width:50 })
                .moveDown();
                break;
            case "FARMACÉUTICA":
                doc.image(logoFarmaceutica, 305, 38, { width:50 })
                .moveDown();
                break;
            case "CANNABIS":
                doc.image(logoCannabis, 305, 38, { width:50 })
                .moveDown();
                break;
        }

        doc
            .fontSize(16)
            .fillColor('#fff')
            .text(data.market9, 60, 10, {width: 200})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#fff')
            .font('Helvetica-Oblique')
            .text(data.description_market9, 60, 60, {width: 210})
            .moveDown();



        doc.lineJoin('miter')
            .rect(99, 350, 200, 200).fill('#2e6ca7');

        doc.circle(200, 400, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc
            .fontSize(11)
            .text(`${data.feature1}`,
            125, 440,  
            {
                width:150,
                align: 'center'
                
            })

        doc.image(pathImage1, 185, 385, {width: 30})

        doc.lineJoin('miter')
            .rect(301, 350, 200, 200).fill('#fbc02d');

        doc.circle(400, 400, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc.image(pathImage2, 385, 385, {width: 30})

        doc
            .fontSize(11)
            .text(`${data.feature2}`,
            325, 440,  
            {
                width:150,
                align: 'center'
                
            })


        doc.lineJoin('miter')
            .rect(99, 552, 200, 200).fill('#ff9f0f');

        doc.circle(200, 600, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();
        
        doc.image(pathImage3, 185, 585, {width: 30})

        doc
            .fontSize(11)
            .text(`${data.feature3}`,
            125, 640,  
            {
                width:150,
                align: 'center'
                
            })

        doc.lineJoin('miter')
            .rect(301, 552, 200, 200).fill('#24abb1');

        doc.circle(400, 600, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc.image(pathImage4, 385, 585, {width: 30})

        doc
            .fontSize(11)
            .text(`${data.feature4}`,
            330, 640,  
            {
                width:150,
                align: 'center'
                
            })

        doc.lineJoin('miter')
            .rect(99, 754, 402, 80).fill('#ff6510');

        doc.circle(140, 792, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc.image(pathImage5, 125, 776, {width: 30})

        doc
            .fontSize(11)
            .text(`${data.feature5}`,
            170, 770,  
            {
                width:300,
                align: 'center'    
            })

    //------------------------------ NEW PAGE ------------------------------------------

        doc.addPage({
            size: [595, 920],
        })
            .moveDown()

        doc.lineJoin('FondoAzulClaro')
            .roundedRect(50,0, 500, 500, 30 )
            .fillAndStroke('#EDF4F7', '#D5E8F4')

        doc.lineJoin('VentajasCompetitivas')
            .rect(0, 0, fullDocH, 60).fill('#2e6ca7');

        doc
            .fillColor('#fff')
            .fontSize(30)
            .text('Ventajas competitivas', 170, 20, {width:300})
            .moveDown();

        if(data.adventage1 != null){

            doc.lineJoin('fondoGris')
            .roundedRect(70, 80, 450, 70, 3 )
            .fill('#E2E8EA')

            doc.circle(100, 113, 25)
                .lineWidth(3)
                .fillOpacity(0.95)
                .fillAndStroke("#2e6ca7", "#fff")
                .moveDown();

            doc.image(ventaja1, 88, 100, {width: 25})

            doc
                .fontSize(11)
                .fillColor('#163461')
                .text(data.adventage1,
                140, 90,  
                {
                    width:350,
                    align: 'center'    
                })
        }

        if(data.adventage2 != null){

            doc.lineJoin('fondoGris')
            .roundedRect(70, 160, 450, 70, 3 )
            .fill('#E2E8EA')

            doc.circle(100, 195, 25)
                .lineWidth(3)
                .fillOpacity(0.95)
                .fillAndStroke("#fbc02d", "#fff")
                .moveDown();

            doc.image(ventaja2, 88, 183, {width: 30})

            doc
                .fontSize(11)
                .fillColor('#163461')
                .text(data.adventage2,
                140, 170,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(data.adventage3 != null){

            doc.lineJoin('fondoGris')
            .roundedRect(70, 240, 450, 70, 3 )
            .fill('#E2E8EA')

            doc.circle(100, 275, 25)
                .lineWidth(3)
                .fillOpacity(0.95)
                .fillAndStroke("#ff9f0f", "#fff")
                .moveDown();

            doc.image(ventaja3, 88, 263, {width: 30})

            doc
                .fontSize(11)
                .fillColor('#163461')
                .text(data.adventage3,
                140, 250,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(data.adventage4 != null){

            doc.lineJoin('fondoGris')
                .roundedRect(70, 320, 450, 70, 3 )
                .fill('#E2E8EA')

            doc.circle(100, 355, 25)
                .lineWidth(3)
                .fillOpacity(0.95)
                .fillAndStroke("#24abb1", "#fff")
                .moveDown();

            doc.image(ventaja4, 88, 343, {width: 30})

            doc
                .fontSize(11)
                .fillColor('#163461')
                .text(data.adventage4,
                140, 330,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(data.adventage5 != null){

            doc.lineJoin('fondoGris')
            .roundedRect(70, 400, 450, 70, 3 )
            .fill('#E2E8EA')

            doc.circle(100, 440, 25)
                .lineWidth(3)
                .fillOpacity(0.95)
                .fillAndStroke("#ff6510", "#fff")
                .moveDown();

            doc.image(ventaja5, 84, 426, {width: 30})


            doc
                .fontSize(11)
                .fillColor('#163461')
                .text(data.adventage5,
                140, 410,  
                {
                    width:350,
                    align: 'center'    
                })

        }

    } else if( markets.length === 10){
        doc
            .image(headerPDF, 0, 0, {width: 330})

        doc
            .fillColor('#163461')
            .fontSize(25)
            .text(
                data.name, 
                { width: 200 }, 
                200, 0
            )
            .moveDown();

        doc
            .image('data:image/jpeg;base64,'+imgProduct , 60, 310, {width: 200})
            .moveDown();

        doc.lineJoin('producto uno')
            .rect(fullDocH / 1.8, 0, cuadrado[0], cuadrado[1])
            .fill('#016db4')
            .moveDown();

        doc
            .fontSize(16)
            .fillColor('#ffffff')
            .text(data.market1, 370, 10, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#ffffff')
            .font('Helvetica-Oblique')
            .text(data.description_market1, 370, 40, {width: 210})
            .moveDown();

        switch(data.market1){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoAcueducto, 305, 38, { width:50 })
                .moveDown();
                break;
            case "PROCESOS INDUSTRIALES":
                doc.image(logoIndustriales, 305, 38, { width:50 })
                .moveDown();
                break;
            case "ACUEDUCTOS":
                doc.image(logoAcueducto, 305, 38, { width:50 })
                .moveDown();
                break;
            case "EDUCACIÓN":
                doc.image(logoEducacion, 305, 38, { width:50 })
                .moveDown();
                break;
            case "ALIMENTOS":
                doc.image(logoAlimentos, 305, 38, { width:50 })
                .moveDown();
                break;
            case "GOBIERNO":
                doc.image(logoGobierno, 305, 38, { width:50 })
                .moveDown();
                break;
            case "INVESTIGACIÓN":
                doc.image(logoInvestigacion, 305, 38, { width:50 })
                .moveDown();
                break;
            case "CLINICO Y HOSPITALARIO":
                doc.image(logoClinico, 305, 38, { width:50 })
                .moveDown();
                break;
            case "TRATAMIENTO DE AGUA INDUSTRIAL":
                doc.image(logoTratamientoAguas, 305, 38, { width:50 })
                .moveDown();
                break;
            case "FARMACÉUTICA":
                doc.image(logoFarmaceutica, 305, 38, { width:50 })
                .moveDown();
                break;
            case "CANNABIS":
                doc.image(logoCannabis, 305, 38, { width:50 })
                .moveDown();
                break;
        }

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 130, cuadrado[0], cuadrado[1]).fill('#ecc101');

        switch(data.market2){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoAcueducto, 305, 178, { width:50 })
                .moveDown();
                break;
            case "PROCESOS INDUSTRIALES":
                doc.image(logoIndustriales, 305, 178, { width:50 })
                .moveDown();
                break;
            case "ACUEDUCTOS":
                doc.image(logoAcueducto, 305, 178, { width:50 })
                .moveDown();
                break;
            case "EDUCACIÓN":
                doc.image(logoEducacion, 305, 178, { width:50 })
                .moveDown();
                break;
            case "ALIMENTOS":
                doc.image(logoAlimentos, 305, 178, { width:50 })
                .moveDown();
                break;
            case "GOBIERNO":
                doc.image(logoGobierno, 305, 178, { width:50 })
                .moveDown();
                break;
            case "INVESTIGACIÓN":
                doc.image(logoInvestigacion, 305, 178, { width:50 })
                .moveDown();
                break;
            case "CLINICO Y HOSPITALARIO":
                doc.image(logoClinico, 305, 178, { width:50 })
                .moveDown();
                break;
            case "TRATAMIENTO DE AGUA INDUSTRIAL":
                doc.image(logoTratamientoAguas, 305, 178, { width:50 })
                .moveDown();
                break;
            case "FARMACÉUTICA":
                doc.image(logoFarmaceutica, 305, 178, { width:50 })
                .moveDown();
                break;
            case "CANNABIS":
                doc.image(logoCannabis, 305, 178, { width:50 })
                .moveDown();
                break;
        }

        doc
            .fontSize(16)
            .fillColor('#285258')
            .text(data.market2, 370, 150, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#285258')
            .font('Helvetica-Oblique')
            .text(data.description_market2, 370, 180, {width: 210})
            .moveDown();

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 270, cuadrado[0], cuadrado[1]).fill('#25acb1');

        switch(data.market3){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoAcueducto, 305, 318, { width:50 })
                .moveDown();
                break;
            case "PROCESOS INDUSTRIALES":
                doc.image(logoIndustriales, 305, 318, { width:50 })
                .moveDown();
                break;
            case "ACUEDUCTOS":
                doc.image(logoAcueducto, 305, 318, { width:50 })
                .moveDown();
                break;
            case "EDUCACIÓN":
                doc.image(logoEducacion, 305, 318, { width:50 })
                .moveDown();
                break;
            case "ALIMENTOS":
                doc.image(logoAlimentos, 305, 318, { width:50 })
                .moveDown();
                break;
            case "GOBIERNO":
                doc.image(logoGobierno, 305, 318, { width:50 })
                .moveDown();
                break;
            case "INVESTIGACIÓN":
                doc.image(logoInvestigacion, 305, 318, { width:50 })
                .moveDown();
                break;
            case "CLINICO Y HOSPITALARIO":
                doc.image(logoClinico, 305, 318, { width:50 })
                .moveDown();
                break;
            case "TRATAMIENTO DE AGUA INDUSTRIAL":
                doc.image(logoTratamientoAguas, 305, 318, { width:50 })
                .moveDown();
                break;
            case "FARMACÉUTICA":
                doc.image(logoFarmaceutica, 305, 318, { width:50 })
                .moveDown();
                break;
            case "CANNABIS":
                doc.image(logoCannabis, 305, 318, { width:50 })
                .moveDown();
                break;
        }

        doc
            .fontSize(16)
            .fillColor('#fff')
            .text(data.market3, 370, 290, {width: 200})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#fff')
            .font('Helvetica-Oblique')
            .text(data.description_market3, 370, 320, {width: 210})
            .moveDown();

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 410, cuadrado[0], cuadrado[1]).fill('#ff9f0f');

        switch(data.market4){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoAcueducto, 305, 458, { width:50 })
                .moveDown();
                break;
            case "PROCESOS INDUSTRIALES":
                doc.image(logoIndustriales, 305, 458, { width:50 })
                .moveDown();
                break;
            case "ACUEDUCTOS":
                doc.image(logoAcueducto, 305, 458, { width:50 })
                .moveDown();
                break;
            case "EDUCACIÓN":
                doc.image(logoEducacion, 305, 458, { width:50 })
                .moveDown();
                break;
            case "ALIMENTOS":
                doc.image(logoAlimentos, 305, 458, { width:50 })
                .moveDown();
                break;
            case "GOBIERNO":
                doc.image(logoGobierno, 305, 458, { width:50 })
                .moveDown();
                break;
            case "INVESTIGACIÓN":
                doc.image(logoInvestigacion, 305, 458, { width:50 })
                .moveDown();
                break;
            case "CLINICO Y HOSPITALARIO":
                doc.image(logoClinico, 305, 458, { width:50 })
                .moveDown();
                break;
            case "TRATAMIENTO DE AGUA INDUSTRIAL":
                doc.image(logoTratamientoAguas, 305, 458, { width:50 })
                .moveDown();
                break;
            case "FARMACÉUTICA":
                doc.image(logoFarmaceutica, 305, 458, { width:50 })
                .moveDown();
                break;
            case "CANNABIS":
                doc.image(logoCannabis, 305, 458, { width:50 })
                .moveDown();
                break;
        }

        doc
            .fontSize(16)
            .fillColor('#fff')
            .text(data.market4, 370, 430, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#fff')
            .font('Helvetica-Oblique')
            .text(data.description_market4, 370, 460, {width: 210} )
            .moveDown();


        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 550, cuadrado[0], cuadrado[1]).fill('#ecc101');

        doc
            .fontSize(16)
            .fillColor('#fff')
            .text(data.market5, 370, 570, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#fff')
            .font('Helvetica-Oblique')
            .text(data.description_market5, 370, 600, {width: 210})
            .moveDown();

        switch(data.market5){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoAcueducto, 305, 598, { width:50 })
                .moveDown();
                break;
            case "PROCESOS INDUSTRIALES":
                doc.image(logoIndustriales, 305, 598, { width:50 })
                .moveDown();
                break;
            case "ACUEDUCTOS":
                doc.image(logoAcueducto, 305, 598, { width:50 })
                .moveDown();
                break;
            case "EDUCACIÓN":
                doc.image(logoEducacion, 305, 598, { width:50 })
                .moveDown();
                break;
            case "ALIMENTOS":
                doc.image(logoAlimentos, 305, 598, { width:50 })
                .moveDown();
                break;
            case "GOBIERNO":
                doc.image(logoGobierno, 305, 598, { width:50 })
                .moveDown();
                break;
            case "INVESTIGACIÓN":
                doc.image(logoInvestigacion, 305, 598, { width:50 })
                .moveDown();
                break;
            case "CLINICO Y HOSPITALARIO":
                doc.image(logoClinico, 305, 598, { width:50 })
                .moveDown();
                break;
            case "TRATAMIENTO DE AGUA INDUSTRIAL":
                doc.image(logoTratamientoAguas, 305, 598, { width:50 })
                .moveDown();
                break;
            case "FARMACÉUTICA":
                doc.image(logoFarmaceutica, 305, 598, { width:50 })
                .moveDown();
                break;
            case "CANNABIS":
                doc.image(logoCannabis, 305, 598, { width:50 })
                .moveDown();
                break;
        }

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 690, cuadrado[0], 300).fill('#25acb1');

        doc
            .fontSize(16)
            .fillColor('#fff')
            .text(data.market6, 370, 710, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#fff')
            .font('Helvetica-Oblique')
            .text(data.description_market6, 370, 740, {width: 210})
            .moveDown();
        
        switch(data.market6){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoAcueducto, 305, 738, { width:50 })
                .moveDown();
                break;
            case "PROCESOS INDUSTRIALES":
                doc.image(logoIndustriales, 305, 738, { width:50 })
                .moveDown();
                break;
            case "ACUEDUCTOS":
                doc.image(logoAcueducto, 305, 738, { width:50 })
                .moveDown();
                break;
            case "EDUCACIÓN":
                doc.image(logoEducacion, 305, 738, { width:50 })
                .moveDown();
                break;
            case "ALIMENTOS":
                doc.image(logoAlimentos, 305, 738, { width:50 })
                .moveDown();
                break;
            case "GOBIERNO":
                doc.image(logoGobierno, 305, 738, { width:50 })
                .moveDown();
                break;
            case "INVESTIGACIÓN":
                doc.image(logoInvestigacion, 305, 738, { width:50 })
                .moveDown();
                break;
            case "CLINICO Y HOSPITALARIO":
                doc.image(logoClinico, 305, 738, { width:50 })
                .moveDown();
                break;
            case "TRATAMIENTO DE AGUA INDUSTRIAL":
                doc.image(logoTratamientoAguas, 305, 738, { width:50 })
                .moveDown();
                break;
            case "FARMACÉUTICA":
                doc.image(logoFarmaceutica, 305, 738, { width:50 })
                .moveDown();
                break;
            case "CANNABIS":
                doc.image(logoCannabis, 305, 738, { width:50 })
                .moveDown();
                break;
        }

        doc
            .fillColor('#016cb2')
            .fontSize(12)
            .text('www.paf.com.co', fullDocH/5.5, 790)
            .link(100, 100, 160, 27, 'https://www.paf.com.co/')

    //------------------------------ NEW PAGE ------------------------------------------

        doc.addPage({
            size: [595, 920],
        })
            .moveDown()  

        doc.lineJoin('miter')
            .rect(0, 290, fullDocH, 50).fill('#2e6ca7');

        doc
            .fillColor('#fff')
            .fontSize(30)
            .text('Características', 190,303)
            .moveDown();

         doc.lineJoin('producto uno')
            .rect(fullDocH / 1.8, 0, cuadrado[0], cuadrado[1])
            .fill('#016db4')
            .moveDown();

        doc
            .fontSize(16)
            .fillColor('#ffffff')
            .text(data.market7, 370, 10, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#ffffff')
            .font('Helvetica-Oblique')
            .text(data.description_market7, 370, 40, {width: 210})
            .moveDown();

        switch(data.market7){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoAcueducto, 305, 38, { width:50 })
                .moveDown();
                break;
            case "PROCESOS INDUSTRIALES":
                doc.image(logoIndustriales, 305, 38, { width:50 })
                .moveDown();
                break;
            case "ACUEDUCTOS":
                doc.image(logoAcueducto, 305, 38, { width:50 })
                .moveDown();
                break;
            case "EDUCACIÓN":
                doc.image(logoEducacion, 305, 38, { width:50 })
                .moveDown();
                break;
            case "ALIMENTOS":
                doc.image(logoAlimentos, 305, 38, { width:50 })
                .moveDown();
                break;
            case "GOBIERNO":
                doc.image(logoGobierno, 305, 38, { width:50 })
                .moveDown();
                break;
            case "INVESTIGACIÓN":
                doc.image(logoInvestigacion, 305, 38, { width:50 })
                .moveDown();
                break;
            case "CLINICO Y HOSPITALARIO":
                doc.image(logoClinico, 305, 38, { width:50 })
                .moveDown();
                break;
            case "TRATAMIENTO DE AGUA INDUSTRIAL":
                doc.image(logoTratamientoAguas, 305, 38, { width:50 })
                .moveDown();
                break;
            case "FARMACÉUTICA":
                doc.image(logoFarmaceutica, 305, 38, { width:50 })
                .moveDown();
                break;
            case "CANNABIS":
                doc.image(logoCannabis, 305, 38, { width:50 })
                .moveDown();
                break;
        }

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 140, cuadrado[0], cuadrado[1]).fill('#ecc101');

        switch(data.market8){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoAcueducto, 305, 178, { width:50 })
                .moveDown();
                break;
            case "PROCESOS INDUSTRIALES":
                doc.image(logoIndustriales, 305, 178, { width:50 })
                .moveDown();
                break;
            case "ACUEDUCTOS":
                doc.image(logoAcueducto, 305, 178, { width:50 })
                .moveDown();
                break;
            case "EDUCACIÓN":
                doc.image(logoEducacion, 305, 178, { width:50 })
                .moveDown();
                break;
            case "ALIMENTOS":
                doc.image(logoAlimentos, 305, 178, { width:50 })
                .moveDown();
                break;
            case "GOBIERNO":
                doc.image(logoGobierno, 305, 178, { width:50 })
                .moveDown();
                break;
            case "INVESTIGACIÓN":
                doc.image(logoInvestigacion, 305, 178, { width:50 })
                .moveDown();
                break;
            case "CLINICO Y HOSPITALARIO":
                doc.image(logoClinico, 305, 178, { width:50 })
                .moveDown();
                break;
            case "TRATAMIENTO DE AGUA INDUSTRIAL":
                doc.image(logoTratamientoAguas, 305, 178, { width:50 })
                .moveDown();
                break;
            case "FARMACÉUTICA":
                doc.image(logoFarmaceutica, 305, 178, { width:50 })
                .moveDown();
                break;
            case "CANNABIS":
                doc.image(logoCannabis, 305, 178, { width:50 })
                .moveDown();
                break;
        }

        doc
            .fontSize(16)
            .fillColor('#285258')
            .text(data.market8, 370, 160, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#285258')
            .font('Helvetica-Oblique')
            .text(data.description_market8, 370, 190, {width: 210})
            .moveDown();

        doc.lineJoin('miter')
            .rect(10, 0, cuadrado[0], cuadrado[1]).fill('#ff9f0f');

        doc.circle(0, 60, 25)
            .lineWidth(3)
            .fillOpacity(0.98)
            .fillAndStroke("white", "#f6f6f6")

        doc
            .fontSize(16)
            .fillColor('#285258')
            .text(data.market9, 40, 10, {width: 200})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#285258')
            .font('Helvetica-Oblique')
            .text(data.description_market9, 40, 60, {width: 210})
            .moveDown();

        doc.lineJoin('miter')
            .rect(10, 140, cuadrado[0], cuadrado[1]).fill('#25acb1');

        doc.circle(0, 210, 25)
            .lineWidth(3)
            .fillOpacity(0.98)
            .fillAndStroke("white", "#f6f6f6")

        doc
            .fontSize(16)
            .fillColor('#ffffff')
            .text(data.market10, 40, 160, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#ffffff')
            .font('Helvetica-Oblique')
            .text(data.description_market10, 40, 190, {width: 210})
            .moveDown();



        doc.lineJoin('miter')
            .rect(99, 350, 200, 200).fill('#2e6ca7');

        doc.circle(200, 400, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc
            .fontSize(11)
            .text(`${data.feature1}`,
            125, 440,  
            {
                width:150,
                align: 'center'
                
            })

        doc.image(pathImage1, 185, 385, {width: 30})

        doc.lineJoin('miter')
            .rect(301, 350, 200, 200).fill('#fbc02d');

        doc.circle(400, 400, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc.image(pathImage2, 385, 385, {width: 30})

        doc
            .fontSize(11)
            .text(`${data.feature2}`,
            325, 440,  
            {
                width:150,
                align: 'center'
                
            })


        doc.lineJoin('miter')
            .rect(99, 552, 200, 200).fill('#ff9f0f');

        doc.circle(200, 600, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();
        
        doc.image(pathImage3, 185, 585, {width: 30})

        doc
            .fontSize(11)
            .text(`${data.feature3}`,
            125, 640,  
            {
                width:150,
                align: 'center'
                
            })

        doc.lineJoin('miter')
            .rect(301, 552, 200, 200).fill('#24abb1');

        doc.circle(400, 600, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc.image(pathImage4, 385, 585, {width: 30})

        doc
            .fontSize(11)
            .text(`${data.feature4}`,
            330, 640,  
            {
                width:150,
                align: 'center'
                
            })

        doc.lineJoin('miter')
            .rect(99, 754, 402, 80).fill('#ff6510');

        doc.circle(140, 792, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc.image(pathImage5, 125, 776, {width: 30})

        doc
            .fontSize(11)
            .text(`${data.feature5}`,
            170, 770,  
            {
                width:300,
                align: 'center'    
            })

    //------------------------------ NEW PAGE ------------------------------------------

        doc.addPage({
            size: [595, 920],
        })
            .moveDown()

        doc.lineJoin('FondoAzulClaro')
            .roundedRect(50,0, 500, 500, 30 )
            .fillAndStroke('#EDF4F7', '#D5E8F4')

        

        doc.lineJoin('VentajasCompetitivas')
            .rect(0, 0, fullDocH, 60).fill('#2e6ca7');

        doc
            .fillColor('#fff')
            .fontSize(30)
            .text('Ventajas competitivas', 170, 15, {width:300})
            .moveDown();


        if(data.adventage1 != null){

            doc.lineJoin('fondoGris')
            .roundedRect(70, 80, 450, 70, 3 )
            .fill('#E2E8EA')

            doc.circle(100, 113, 25)
                .lineWidth(3)
                .fillOpacity(0.95)
                .fillAndStroke("#2e6ca7", "#fff")
                .moveDown();

            doc.image(ventaja1, 88, 100, {width: 25})

            doc
                .fontSize(11)
                .fillColor('#163461')
                .text(data.adventage1,
                140, 90,  
                {
                    width:350,
                    align: 'center'    
                })
        }

        if(data.adventage2 != null){

            doc.lineJoin('fondoGris')
            .roundedRect(70, 160, 450, 70, 3 )
            .fill('#E2E8EA')

            doc.circle(100, 195, 25)
                .lineWidth(3)
                .fillOpacity(0.95)
                .fillAndStroke("#fbc02d", "#fff")
                .moveDown();

            doc.image(ventaja2, 88, 183, {width: 30})

            doc
                .fontSize(11)
                .fillColor('#163461')
                .text(data.adventage2,
                140, 170,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(data.adventage3 != null){

            doc.lineJoin('fondoGris')
            .roundedRect(70, 240, 450, 70, 3 )
            .fill('#E2E8EA')

            doc.circle(100, 275, 25)
                .lineWidth(3)
                .fillOpacity(0.95)
                .fillAndStroke("#ff9f0f", "#fff")
                .moveDown();

            doc.image(ventaja3, 88, 263, {width: 30})

            doc
                .fontSize(11)
                .fillColor('#163461')
                .text(data.adventage3,
                140, 250,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(data.adventage4 != null){

            doc.lineJoin('fondoGris')
                .roundedRect(70, 320, 450, 70, 3 )
                .fill('#E2E8EA')

            doc.circle(100, 355, 25)
                .lineWidth(3)
                .fillOpacity(0.95)
                .fillAndStroke("#24abb1", "#fff")
                .moveDown();

            doc.image(ventaja4, 88, 343, {width: 30})

            doc
                .fontSize(11)
                .fillColor('#163461')
                .text(data.adventage4,
                140, 330,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(data.adventage5 != null){

            doc.lineJoin('fondoGris')
            .roundedRect(70, 400, 450, 70, 3 )
            .fill('#E2E8EA')

            doc.circle(100, 440, 25)
                .lineWidth(3)
                .fillOpacity(0.95)
                .fillAndStroke("#ff6510", "#fff")
                .moveDown();

            doc.image(ventaja5, 84, 426, {width: 30})


            doc
                .fontSize(11)
                .fillColor('#163461')
                .text(data.adventage5,
                140, 410,  
                {
                    width:350,
                    align: 'center'    
                })

        }
    }

    const buffers = await new Promise((resolve, reject) => {
        const chunks = [];
        doc.on('data', chunk => chunks.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(chunks)));
        doc.end();
    });

    //Subir el buffer del PDF a cloudinary
    const result = await new Promise((resolve, reject) => {
        const upload_stream = cloudinary.uploader.upload_stream({
            resource_type: 'auto',
            public_id: name.trim()
        }, async (error, result) => {
            if(error){
                console.error('Error al subir el archivo', error);
                reject(error);
            }else{
                console.log('Archivo subido exitosamente');

                //Check by exist product
                const dataQuery = await Product.findByPk(id);

                //INGRESA Y GUARDA EL PDF PRODUCTO
                console.log('GUARDA EL PDF');
                console.log('secureUrlPdf', result.secure_url);
                console.log('publicIdPdf', result.public_id);

                //console.log('DATAQUERY', dataQuery)
                dataQuery['secureUrlPdf'] = result.secure_url;
                dataQuery['publicIdPdf'] = result.public_id;

                await dataQuery.save()

                resolve(result);
            }
        });
        upload_stream.end(buffers);
    });

    return result;

}

async function destroyPDF(publicId){
    cloudinary.uploader.destroy(publicId, function(error, result) {
        console.log(result, error);
    });
}

export {
    LocalPDF,
    destroyPDF,
}