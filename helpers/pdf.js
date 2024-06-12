import { Product } from '../models/index_model.js';
import pdf from 'pdfkit';
import imageToBase from 'image-to-base64';

import {fileURLToPath} from 'url';
import path from 'path';
import { header } from 'express-validator';

const pdfGenerator = async (req, res) => {

    const productSelected = await Product.findByPk(req.params.id);

    let markets = [];

    if ( productSelected.market1 !== null ) {
        markets.push(productSelected.market1)
    }
    if ( productSelected.market2 !== null ) {
        markets.push(productSelected.market2)
    }
    if ( productSelected.market3 !== null ) {
        markets.push(productSelected.market3)
    }
    if ( productSelected.market4 !== null ) {
        markets.push(productSelected.market4)
    }
    if ( productSelected.market5 !== null ) {
        markets.push(productSelected.market5)
    }
    if ( productSelected.market6 !== null ) {
        markets.push(productSelected.market6)
    }
    if ( productSelected.market7 !== null ) {
        markets.push(productSelected.market7)
    }
    if ( productSelected.market8 !== null ) {
        markets.push(productSelected.market8)
    }
    if ( productSelected.market9 !== null ) {
        markets.push(productSelected.market9)
    }
    if ( productSelected.market10 !== null ) {
        markets.push(productSelected.market10)
    }
    if ( productSelected.market11 !== null ) {
        markets.push(productSelected.market11)
    }
    if ( productSelected.market12 !== null ) {
        markets.push(productSelected.market12)
    }

    let imgProduct;

    if(productSelected.img){
        imgProduct = await new Promise(function(resolve,reject){
        imageToBase(productSelected.img) // you can also to use url
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
    const logoPaf = path.join(__dirname, '../assets/', 'logo.png' );
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
    const ic_youtube = path.join( __dirname, '../assets/iconos/', 'youtube.png' );  
    const ic_enlace = path.join( __dirname, '../assets/iconos/', 'enlace.png' ); 
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

        if(productSelected.name.length > 25){
            doc
            .fillColor('#163461')
            .fontSize(15)
            .text(
                productSelected.name, 
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
                productSelected.name, 
                60, 50,
                { 
                    width: 200,
                    align: 'center'
                }, 
            ).moveDown();
        }
        

        doc
            .image('data:image/jpeg;base64,'+imgProduct , 120, 100, {width: 130})
            .moveDown();


        doc.lineJoin('test')
            .rect(fullDocH / 1.8, 60, cuadrado[0], cuadrado[1])
            .fill('#016db4')
            .moveDown();

        doc
            .fontSize(16)
            .fillColor('#ffffff')
            .text(productSelected.market1, 380,65, {width: 220})
            .moveDown();

        doc
            .fontSize(11)
            .fillColor('#ffffff')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market1, 380, 105, {width:200})
            .moveDown();
        
        doc.circle(330, 130, 25)
            .lineWidth(3)
            .fillAndStroke("white", "#fff")
            .moveDown();

        switch(productSelected.market1){
            case "TODOS LOS MERCADOS":
            doc.image(logoPaf, 305, 118, { width:50 })
                .moveDown();

                break;
            case "INDUSTRIA QUÍMICA":
                doc.image(logoQuimica, 305, 105, { width:50 })
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
            .rect(105, 390, 190, 170).fill('#2e6ca7');

        doc.circle(210, 425, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc
            .fontSize(10)
            .text(productSelected.feature1,
            115, 455,  
            {
                width:170,
                align: 'center'
                
            })

        doc.image(pathImage1, 195, 410, {width: 30})
        //* ---------------------------------------------
        doc.lineJoin('miter')
            .rect(300, 390, 190, 170).fill('#25acb1');

        doc.circle(385, 425, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc
            .fontSize(10)
            .text(productSelected.feature2,
            310, 455,  
            {
                width:170,
                align: 'center'
                
            })
        doc.image(pathImage2, 370, 410, {width: 30})
        //* ---------------------------------------------
        doc.lineJoin('miter')
            .rect(300, 565, 190, 170).fill('#90caf9');

        doc.circle(385, 600, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc
            .fontSize(10)
            .text(productSelected.feature3,
            300, 630,  
            {
                width:180,
                align: 'center'
                
            })

        doc.image(pathImage4, 370, 585, {width: 30})
        //* ---------------------------------------------
        doc.lineJoin('miter')
            .rect(105, 565, 190, 170).fill('#f8c901');

        doc.circle(210, 600, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc
            .fontSize(10)
            .text(productSelected.feature4,
            118, 630,  
            {
                width:170,
                align: 'center'
                
            })

        doc.image(pathImage3, 195, 585, {width: 30})
        //* ---------------------------------------------
        doc.lineJoin('miter')
            .rect(99, 740, 402, 80).fill('#ff6510');

        doc.circle(140, 780, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc.image(pathImage5, 125, 765, {width: 30})

        doc
            .fontSize(9)
            .text(productSelected.feature5,
            170, 745,  
            {
                width:300,
                align: 'center'    
            })
        
            //FOOTER
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

        if(productSelected.adventage1 != null){

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
                .text(productSelected.adventage1,
                140, 90,  
                {
                    width:350,
                    align: 'center'    
                })
        }

        if(productSelected.adventage2 != null){

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
                .text(productSelected.adventage2,
                140, 170,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(productSelected.adventage3 != null){

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
                .text(productSelected.adventage3,
                140, 250,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(productSelected.adventage4 != null){

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
                .text(productSelected.adventage4,
                140, 330,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(productSelected.adventage5 != null){

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
                .text(productSelected.adventage5,
                140, 410,  
                {
                    width:350,
                    align: 'center'    
                })

        }

        doc
            .image(footerPDF, 0, 830, {width: 600})

            
        doc
            .image(logo, 230, 740, {width: 100})

    } 
    /* PDF PARA UN PRODUCTO DE DOS (2) MERCADOS */
    else if( markets.length === 2 ){
        doc
            .image(headerPDF, 0, 0, {width: 330})

        if(productSelected.name.length > 25){
            doc
            .fillColor('#163461')
            .fontSize(15)
            .text(
                productSelected.name, 
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
                productSelected.name, 
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
            .text(productSelected.market1, 370, 10, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#ffffff')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market1, 370, 50, {width: 210})
            .moveDown();

        switch(productSelected.market1){
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

        switch(productSelected.market2){
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
            .text(productSelected.market2, 370, 180, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#285258')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market2, 370, 210, {width: 210})
            .moveDown();
        
        doc
            .image(footerPDF, 0, 830, {width: 600})

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
            .rect(125, 390, 170, 170).fill('#2e6ca7');

        doc.circle(210, 425, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc
            .fontSize(10)
            .text(productSelected.feature1,
            135, 455,  
            {
                width:150,
                align: 'center'
                
            })

        doc.image(pathImage1, 195, 410, {width: 30})
        //* ---------------------------------------------
        doc.lineJoin('miter')
            .rect(300, 390, 170, 170).fill('#25acb1');

        doc.circle(385, 425, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc
            .fontSize(10)
            .text(productSelected.feature2,
            310, 455,  
            {
                width:150,
                align: 'center'
                
            })
        doc.image(pathImage2, 370, 410, {width: 30})
        //* ---------------------------------------------
        doc.lineJoin('miter')
            .rect(300, 565, 170, 170).fill('#ff9f0f');

        doc.circle(385, 600, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc
            .fontSize(10)
            .text(productSelected.feature3,
            310, 630,  
            {
                width:150,
                align: 'center'
                
            })

        doc.image(pathImage4, 370, 595, {width: 30})
        //* ---------------------------------------------
        doc.lineJoin('miter')
            .rect(125, 565, 170, 170).fill('#fbc02d');

        doc.circle(210, 600, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc
            .fontSize(10)
            .text(productSelected.feature4,
            138, 630,  
            {
                width:150,
                align: 'center'
                
            })

        doc.image(pathImage3, 195, 585, {width: 30})
        //* ---------------------------------------------
        doc.lineJoin('miter')
            .rect(99, 740, 402, 80).fill('#ff6510');

        doc.circle(140, 780, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc.image(pathImage5, 125, 765, {width: 30})

        doc
            .fontSize(11)
            .text(productSelected.feature5,
            170, 750,  
            {
                width:300,
                align: 'center'    
            })

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

        if(productSelected.adventage1 != null){

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
                .text(productSelected.adventage1,
                140, 90,  
                {
                    width:350,
                    align: 'center'    
                })
        }

        if(productSelected.adventage2 != null){

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
                .text(productSelected.adventage2,
                140, 170,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(productSelected.adventage3 != null){

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
                .text(productSelected.adventage3,
                140, 250,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(productSelected.adventage4 != null){

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
                .text(productSelected.adventage4,
                140, 330,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(productSelected.adventage5 != null){

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
                .text(productSelected.adventage5,
                140, 410,  
                {
                    width:350,
                    align: 'center'    
                })

        }

        
        doc
            .image(logo, 230, 740, {width: 100})

    } else if( markets.length === 3 ){
        doc
            .image(headerPDF, 0, 0, {width: 600})

        if(productSelected.name.length > 25){
            doc
            .fillColor('#163461')
            .fontSize(15)
            .text(
                productSelected.name, 
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
                productSelected.name, 
                60, 50,
                { 
                    width: 200,
                    align: 'center'
                }, 
            ).moveDown();
        }

        doc
            .image('data:image/jpeg;base64,'+imgProduct , 120, 140, {width: 150})
            .moveDown();

        doc.lineJoin('Producto 1')
        .rect(fullDocH / 1.8, 50, cuadrado[0], 150)
        .fill('#016db4')
        .moveDown();

        doc
            .fontSize(18)
            .fillColor('#ffffff')
            .text(productSelected.market1, 370, 60, {width: 230})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#ffffff')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market1, 370, 90, {width: 210})
            .moveDown();
        
        const posUnoX = 305;
        const posUnoY = 88;

        switch(productSelected.market1){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoAcueducto, posUnoX, posUnoY, { width:50 })
                .moveDown();
                break;
            case "PROCESOS INDUSTRIALES":
                doc.image(logoIndustriales, posUnoX, posUnoY, { width:50 })
                .moveDown();
                break;
            case "ACUEDUCTOS":
                doc.image(logoAcueducto, posUnoX, posUnoY, { width:50 })
                .moveDown();
                break;
            case "EDUCACIÓN":
                doc.image(logoEducacion, posUnoX, posUnoY, { width:50 })
                .moveDown();
                break;
            case "ALIMENTOS":
                doc.image(logoAlimentos, posUnoX, posUnoY, { width:50 })
                .moveDown();
                break;
            case "GOBIERNO":
                doc.image(logoGobierno, posUnoX, posUnoY, { width:50 })
                .moveDown();
                break;
            case "INVESTIGACIÓN":
                doc.image(logoInvestigacion, posUnoX, posUnoY, { width:50 })
                .moveDown();
                break;
            case "CLINICO Y HOSPITALARIO":
                doc.image(logoClinico, posUnoX, posUnoY, { width:50 })
                .moveDown();
                break;
            case "TRATAMIENTO DE AGUA INDUSTRIAL":
                doc.image(logoTratamientoAguas, posUnoX, posUnoY, { width:50 })
                .moveDown();
                break;
            case "FARMACÉUTICA":
                doc.image(logoFarmaceutica, posUnoX, posUnoY, { width:50 })
                .moveDown();
                break;
            case "CANNABIS":
                doc.image(logoCannabis, posUnoX, posUnoY, { width:50 })
                .moveDown();
                break;
        }


        doc.lineJoin('producto 2')
            .rect(fullDocH / 1.8, 210, cuadrado[0], 150).fill('#ecc101');

        const logoPosX = 305;
        const logoPosY = 260;
        
        switch (productSelected.market2) {
            case "INDUSTRIA QUÍMICA":
                doc.image(logoAcueducto, logoPosX, logoPosY, { width:50 })
                .moveDown();
                break;
            case "PROCESOS INDUSTRIALES":
                doc.image(logoIndustriales, logoPosX, logoPosY, { width:50 })
                .moveDown();
                break;
            case "ACUEDUCTOS":
                doc.image(logoAcueducto, logoPosX, logoPosY, { width:50 })
                .moveDown();
                break;
            case "EDUCACIÓN":
                doc.image(logoEducacion, logoPosX, logoPosY, { width:50 })
                .moveDown();
                break;
            case "ALIMENTOS":
                doc.image(logoAlimentos, logoPosX, logoPosY, { width:50 })
                .moveDown();
                break;
            case "GOBIERNO":
                doc.image(logoGobierno, logoPosX, logoPosY, { width:50 })
                .moveDown();
                break;
            case "INVESTIGACIÓN":
                doc.image(logoInvestigacion, logoPosX, logoPosY, { width:50 })
                .moveDown();
                break;
            case "CLINICO Y HOSPITALARIO":
                doc.image(logoClinico, logoPosX, logoPosY, { width:50 })
                .moveDown();
                break;
            case "TRATAMIENTO DE AGUA INDUSTRIAL":
                doc.image(logoTratamientoAguas, logoPosX, logoPosY, { width:50 })
                .moveDown();
                break;
            case "FARMACÉUTICA":
                doc.image(logoFarmaceutica, logoPosX, logoPosY, { width:50 })
                .moveDown();
                break;
            case "CANNABIS":
                doc.image(logoCannabis, logoPosX, logoPosY, { width:50 })
                .moveDown();
                break;
        }


        doc
            .fontSize(16)
            .fillColor('#285258')
            .text(productSelected.market2, 370, 220, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#285258')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market2, 370, 240, {width: 210})
            .moveDown();

        doc.lineJoin('producto 3')
            .rect(fullDocH / 1.8, 380, cuadrado[0], 150).fill('#25acb1');
        
        const prodTresX = 305;
        const prodTresy = 430;

        switch(productSelected.market3){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoAcueducto, prodTresX, prodTresy, { width:50 })
                .moveDown();
                break;
            case "PROCESOS INDUSTRIALES":
                doc.image(logoIndustriales, prodTresX, prodTresy, { width:50 })
                .moveDown();
                break;
            case "ACUEDUCTOS":
                doc.image(logoAcueducto, prodTresX, prodTresy, { width:50 })
                .moveDown();
                break;
            case "EDUCACIÓN":
                doc.image(logoEducacion, prodTresX, prodTresy, { width:50 })
                .moveDown();
                break;
            case "ALIMENTOS":
                doc.image(logoAlimentos, prodTresX, prodTresy, { width:50 })
                .moveDown();
                break;
            case "GOBIERNO":
                doc.image(logoGobierno, prodTresX, prodTresy, { width:50 })
                .moveDown();
                break;
            case "INVESTIGACIÓN":
                doc.image(logoInvestigacion, prodTresX, prodTresy, { width:50 })
                .moveDown();
                break;
            case "CLINICO Y HOSPITALARIO":
                doc.image(logoClinico, prodTresX, prodTresy, { width:50 })
                .moveDown();
                break;
            case "TRATAMIENTO DE AGUA INDUSTRIAL":
                doc.image(logoTratamientoAguas, prodTresX, prodTresy, { width:50 })
                .moveDown();
                break;
            case "FARMACÉUTICA":
                doc.image(logoFarmaceutica, prodTresX, prodTresy, { width:50 })
                .moveDown();
                break;
            case "CANNABIS":
                doc.image(logoCannabis, prodTresX, prodTresy, { width:50 })
                .moveDown();
                break;
        }

        doc
            .fontSize(16)
            .fillColor('#ffffff')
            .text(productSelected.market3, 370, 400, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#ffffff')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market3, 370, 420, {width: 210})
            .moveDown();
        
        doc
            .image(footerPDF, 0, 830, {width: 600})

        //* -------------------- CARACTERISTICAS -------------------------

        doc.lineJoin('miter')
            .rect(0, 550, fullDocH, 45).fill('#2e6ca7');
        

        doc
            .fillColor('#fff')
            .fontSize(30)
            .text('Características', 190,560)
            .moveDown();
        //* ---------------------------------------------
        doc.lineJoin('miter')
            .rect(70, 600, 220, 170).fill('#2e6ca7');
        

        doc.circle(180, 630, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc
            .fontSize(10)
            .text(productSelected.feature1,
            80, 660,  
            {
                width:190,
                align: 'justify'
                
            })

        doc.image(pathImage1, 165, 615, {width: 30})
        //* ---------------------------------------------
        
        doc.lineJoin('miter')
            .rect(300, 600, 220, 170).fill('#25acb1');

        doc.circle(410, 630, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc
            .fontSize(10)
            .text(productSelected.feature2,
            310, 665,  
            {
                width:190,
                align: 'justify'
                
            })
        doc.image(pathImage2, 395, 615, {width: 30})
        //* ---------------------------------------------

        doc.addPage({
            size: [595, 920],
        })
            .moveDown()
 
        
            doc.lineJoin('miter')
            .rect(70, 10, 220, 170).fill('#fbc02d');

        doc.circle(180, 40, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc
            .fontSize(10)
            .text(productSelected.feature3,
            80, 75,  
            {
                width:190,
                align: 'justify'
                
            })

        doc.image(pathImage3, 165, 25, {width: 30})
        //* ---------------------------------------------
        
        doc.lineJoin('miter')
            .rect(300, 10, 220, 170).fill('#ff9f0f');

        doc.circle(410, 40, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc
            .fontSize(10)
            .text(productSelected.feature4,
            310, 75,  
            {
                width:190,
                align: 'justify'
                
            })
        doc.image(pathImage4, 395, 25, { width: 30 })
        
        //* ---------------------------------------------
        doc.lineJoin('miter')
            .rect(69, 190, 452, 180).fill('#ff6510');

        doc.circle(140, 220, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc.image(pathImage5, 125, 205, {width: 30})

        doc
            .fontSize(11)
            .text(productSelected.feature5,
            170, 200,  
            {
                width:300,
                align: 'center'    
            })
        

        doc.lineJoin('FondoAzulClaro')
            .roundedRect(50,290, 500, 500, 30 )
            .fillAndStroke('#EDF4F7', '#D5E8F4')

        doc.lineJoin('VentajasCompetitivas')
            .rect(0, 290, fullDocH, 60).fill('#2e6ca7');

        doc
            .fillColor('#fff')
            .fontSize(30)
            .text('Ventajas competitivas', 170, 300)
            .moveDown();

        if(productSelected.adventage1 != null){

            doc.lineJoin('fondoGris')
            .roundedRect(70, 365, 450, 70, 3 )
            .fill('#E2E8EA')

            doc.circle(100, 400, 25)
                .lineWidth(3)
                .fillOpacity(0.95)
                .fillAndStroke("#2e6ca7", "#fff")
                .moveDown();

            doc.image(ventaja1, 88, 390, {width: 25})

            doc
                .fontSize(11)
                .fillColor('#163461')
                .text(productSelected.adventage1,
                140, 370,  
                {
                    width:350,
                    align: 'center'    
                })
        }

        if(productSelected.adventage2 != null){

            doc.lineJoin('fondoGris')
            .roundedRect(70, 440, 450, 70, 3 )
            .fill('#E2E8EA')

            doc.circle(100, 475, 25)
                .lineWidth(3)
                .fillOpacity(0.95)
                .fillAndStroke("#fbc02d", "#fff")
                .moveDown();

            doc.image(ventaja2, 88, 463, {width: 30})

            doc
                .fontSize(11)
                .fillColor('#163461')
                .text(productSelected.adventage2,
                140, 450,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(productSelected.adventage3 != null){

            doc.lineJoin('fondoGris')
            .roundedRect(70, 520, 450, 70, 3 )
            .fill('#E2E8EA')

            doc.circle(100, 555, 25)
                .lineWidth(3)
                .fillOpacity(0.95)
                .fillAndStroke("#ff9f0f", "#fff")
                .moveDown();

            doc.image(ventaja3, 88, 543, {width: 30})

            doc
                .fontSize(11)
                .fillColor('#163461')
                .text(productSelected.adventage3,
                140, 530,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(productSelected.adventage4 != null){

            doc.lineJoin('fondoGris')
                .roundedRect(70, 610, 450, 70, 3 )
                .fill('#E2E8EA')

            doc.circle(100, 635, 25)
                .lineWidth(3)
                .fillOpacity(0.95)
                .fillAndStroke("#24abb1", "#fff")
                .moveDown();

            doc.image(ventaja4, 88, 623, {width: 30})

            doc
                .fontSize(11)
                .fillColor('#163461')
                .text(productSelected.adventage4,
                140, 620,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(productSelected.adventage5 != null){

            doc.lineJoin('fondoGris')
            .roundedRect(70, 690, 450, 70, 3 )
            .fill('#E2E8EA')

            doc.circle(100, 720, 25)
                .lineWidth(3)
                .fillOpacity(0.95)
                .fillAndStroke("#ff6510", "#fff")
                .moveDown();

            doc.image(ventaja5, 84, 706, {width: 30})


            doc
                .fontSize(11)
                .fillColor('#163461')
                .text(productSelected.adventage5,
                140, 710,  
                {
                    width:350,
                    align: 'center'    
                })

        }       
        
        doc
            .image(logo, 230, 860, {width: 100})

    } else if( markets.length === 4 ){
        doc
            .image(headerPDF, 0, 0, {width: 330})

        if(productSelected.name.length > 25){
            doc
            .fillColor('#163461')
            .fontSize(15)
            .text(
                productSelected.name, 
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
                productSelected.name, 
                60, 50,
                { 
                    width: 200,
                    align: 'center'
                }, 
            ).moveDown();
        }

        doc
            .image('data:image/jpeg;base64,'+imgProduct , 120, 140, {width: 150})
            .moveDown();

        doc.lineJoin('test')
            .rect(fullDocH / 1.8, 0, cuadrado[0], cuadrado[1])
            .fill('#016db4')
            .moveDown();

        doc
            .fontSize(16)
            .fillColor('#ffffff')
            .text(productSelected.market1, 370, 10, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#ffffff')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market1, 370, 30, {width: 210})
            .moveDown();

        switch(productSelected.market1){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoQuimica, 305, 38, { width:50 })
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

        switch(productSelected.market2){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoQuimica, 305, 254, { width:50 })
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
            .text(productSelected.market2, 370, 220, {width: 210})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#285258')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market2, 370, 240, {width: 210})
            .moveDown();

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 420, cuadrado[0], cuadrado[1]).fill('#25acb1');

        switch(productSelected.market3){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoAcueducto, 305, 468, { width:50 })
                .moveDown();
                break;
            case "PROCESOS INDUSTRIALES":
                doc.image(logoIndustriales, 305, 468, { width:50 })
                .moveDown();
                break;
            case "ACUEDUCTOS":
                doc.image(logoEducacion, 305, 468, { width:50 })
                .moveDown();
                break;
            case "EDUCACIÓN":
                doc.image(logoEducacion, 305, 468, { width:50 })
                .moveDown();
                break;
            case "ALIMENTOS":
                doc.image(logoAlimentos, 305, 468, { width:50 })
                .moveDown();
                break;
            case "GOBIERNO":
                doc.image(logoGobierno, 305, 468, { width:50 })
                .moveDown();
                break;
            case "INVESTIGACIÓN":
                doc.image(logoInvestigacion, 305, 470, { width:50 })
                .moveDown();
                break;
            case "CLINICO Y HOSPITALARIO":
                doc.image(logoClinico, 305, 468, { width:50 })
                .moveDown();
                break;
            case "TRATAMIENTO DE AGUA INDUSTRIAL":
                doc.image(logoTratamientoAguas, 305, 468, { width:50 })
                .moveDown();
                break;
            case "FARMACÉUTICA":
                doc.image(logoFarmaceutica, 305, 468, { width:50 })
                .moveDown();
                break;
            case "CANNABIS":
                doc.image(logoCannabis, 305, 468, { width:50 })
                .moveDown();
                break;
        }

        doc
            .fontSize(16)
            .fillColor('#fff')
            .text(productSelected.market3, 370, 430, {width: 200})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#fff')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market3, 370, 450, {width: 210})
            .moveDown();

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 630, cuadrado[0], cuadrado[1]).fill('#ff9f0f');

        switch(productSelected.market4){
            case "INDUSTRIA QUÍMICA":
                doc.image(logoAcueducto, 305, 680, { width:50 })
                .moveDown();
                break;
            case "PROCESOS INDUSTRIALES":
                doc.image(logoIndustriales, 305, 680, { width:50 })
                .moveDown();
                break;
            case "ACUEDUCTOS":
                doc.image(logoAcueducto, 305, 680, { width:50 })
                .moveDown();
                break;
            case "EDUCACIÓN":
                doc.image(logoEducacion, 305, 680, { width:50 })
                .moveDown();
                break;
            case "ALIMENTOS":
                doc.image(logoAlimentos, 305, 680, { width:50 })
                .moveDown();
                break;
            case "GOBIERNO":
                doc.image(logoGobierno, 305, 680, { width:50 })
                .moveDown();
                break;
            case "INVESTIGACIÓN":
                doc.image(logoInvestigacion, 305, 680, { width:50 })
                .moveDown();
                break;
            case "CLINICO Y HOSPITALARIO":
                doc.image(logoClinico, 305, 680, { width:50 })
                .moveDown();
                break;
            case "TRATAMIENTO DE AGUA INDUSTRIAL":
                doc.image(logoTratamientoAguas, 305, 680, { width:50 })
                .moveDown();
                break;
            case "FARMACÉUTICA":
                doc.image(logoFarmaceutica, 305, 680, { width:50 })
                .moveDown();
                break;
            case "CANNABIS":
                doc.image(logoCannabis, 305, 680, { width:50 })
                .moveDown();
                break;
        }

        doc
            .fontSize(16)
            .fillColor('#fff')
            .text(productSelected.market4, 370, 640, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#fff')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market4, 370, 670, {width: 210})
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
            .rect(79, 100, 230, 200).fill('#2e6ca7');

        doc.circle(200, 135, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc
            .fontSize(11)
            .text(`${productSelected.feature1}`,
            95, 170,  
            {
                width:195,
                align: 'justify'
                
            })

        doc.image(pathImage1, 185, 120, {width: 30})

        doc.lineJoin('miter')
            .rect(311, 100, 230, 200).fill('#fbc02d');

        doc.circle(430, 135, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc.image(pathImage2, 415, 120, {width: 30})

        doc
            .fontSize(11)
            .text(`${productSelected.feature2}`,
            325, 170,  
            {
                width:195,
                align: 'justify'
                
            })


        doc.lineJoin('miter')
            .rect(79, 302, 230, 200).fill('#ff9f0f');

        doc.circle(200, 335, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();
        
        doc.image(pathImage3, 185, 320, {width: 30})

        doc
            .fontSize(11)
            .text(`${productSelected.feature3}`,
            95, 370,  
            {
                width:195,
                align: 'justify'
                
            })

        doc.lineJoin('miter')
            .rect(311, 302, 230, 200).fill('#24abb1');

        doc.circle(420, 335, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc.image(pathImage4, 405, 320, {width: 30})

        doc
            .fontSize(11)
            .text(`${productSelected.feature4}`,
            330, 370,  
            {
                width:195,
                align: 'justify'
                
            })

        doc.lineJoin('miter')
            .rect(79, 504, 462, 100).fill('#ff6510');

        doc.circle(140, 542, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc.image(pathImage5, 125, 526, {width: 30})

        doc
            .fontSize(11)
            .text(`${productSelected.feature5}`,
            170, 520,  
            {
                width:300,
                align: 'center'    
                })
            
        doc
            .image(footerPDF, 0, 830, {width: 600})


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

        if(productSelected.adventage1 != null){

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
                .text(productSelected.adventage1,
                140, 90,  
                {
                    width:350,
                    align: 'center'    
                })
        }

        if(productSelected.adventage2 != null){

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
                .text(productSelected.adventage2,
                140, 170,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(productSelected.adventage3 != null){

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
                .text(productSelected.adventage3,
                140, 250,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(productSelected.adventage4 != null){

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
                .text(productSelected.adventage4,
                140, 330,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(productSelected.adventage5 != null){

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
                .text(productSelected.adventage5,
                140, 410,  
                {
                    width:350,
                    align: 'center'    
                })

        }

        doc
            .fontSize(11)
            .fillColor('#163461')
            .text(productSelected.adventage3,
            140, 250,  
            {
                width:350,
                align: 'center'    
            })
            
        doc
            .image(logo, 230, 740, {width: 100})

    } else if( markets.length === 5 ){
        doc
            .image(headerPDF, 0, 0, {width: 330})

        if(productSelected.name.length > 25){
            doc
            .fillColor('#163461')
            .fontSize(15)
            .text(
                productSelected.name, 
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
                productSelected.name, 
                60, 50,
                { 
                    width: 200,
                    align: 'center'
                }, 
            ).moveDown();
        }

        doc
            .image('data:image/jpeg;base64,'+imgProduct , 100, 140, {width: 150})
            .moveDown();

        doc.lineJoin('test')
            .rect(fullDocH / 1.8, 0, cuadrado[0], cuadrado[1]) 
            .fill('#016db4') 
            .moveDown();

        doc
            .fontSize(16)
            .fillColor('#ffffff')
            .text(productSelected.market1, 370, 10, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#ffffff')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market1, 370, 50, {width: 210})
            .moveDown();

        switch(productSelected.market1){
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

        switch(productSelected.market2){
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
            .text(productSelected.market2, 370, 190, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#285258')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market2, 370, 230, {width: 210})
            .moveDown();

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 360, cuadrado[0], cuadrado[1]).fill('#25acb1');

        switch(productSelected.market3){
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
            .text(productSelected.market3, 370, 370, {width: 200})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#fff')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market3, 370, 410, {width: 210})
            .moveDown();

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 540, cuadrado[0], cuadrado[1]).fill('#ff9f0f');

        switch(productSelected.market4){
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
            .text(productSelected.market4, 370, 550, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#fff')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market4, 370, 590, {width: 210} )
            .moveDown();

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 700, cuadrado[0], 170).fill('#ecc101');

        switch(productSelected.market5){
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
            .text(productSelected.market5, 370, 720, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#fff')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market5, 370, 760, {width: 210})
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
            .text(`${productSelected.feature1}`,
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
            .text(`${productSelected.feature2}`,
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
            .text(`${productSelected.feature3}`,
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
            .text(`${productSelected.feature4}`,
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
            .text(`${productSelected.feature5}`,
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


        if(productSelected.adventage1 != null){

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
                .text(productSelected.adventage1,
                140, 90,  
                {
                    width:350,
                    align: 'center'    
                })
        }

        if(productSelected.adventage2 != null){

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
                .text(productSelected.adventage2,
                140, 170,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(productSelected.adventage3 != null){

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
                .text(productSelected.adventage3,
                140, 250,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(productSelected.adventage4 != null){

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
                .text(productSelected.adventage4,
                140, 330,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(productSelected.adventage5 != null){

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
                .text(productSelected.adventage5,
                140, 410,  
                {
                    width:350,
                    align: 'center'    
                })

        }

    doc
        .image(logo, 230, 740, {width: 100})

    } else if( markets.length === 6 ){

        doc
        .image(headerPDF, 0, 0, {width: 330})

        if(productSelected.name.length > 25){
            doc
            .fillColor('#163461')
            .fontSize(15)
            .text(
                productSelected.name, 
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
                productSelected.name, 
                60, 50,
                { 
                    width: 200,
                    align: 'center'
                }, 
            ).moveDown();
        }


        doc
            .image('data:image/jpeg;base64,'+imgProduct , 120, 140, {width: 150})
            .moveDown();

        doc.lineJoin('producto uno')
            .rect(fullDocH / 1.8, 0, cuadrado[0], cuadrado[1])
            .fill('#016db4')
            .moveDown();

        doc
            .fontSize(16)
            .fillColor('#ffffff')
            .text(productSelected.market1, 370, 10, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#ffffff')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market1, 370, 50, {width: 210})
            .moveDown();

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 130, cuadrado[0], cuadrado[1]).fill('#ecc101');

        switch(productSelected.market1){
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
            .text(productSelected.market2, 370, 140, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#285258')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market2, 370, 180, {width: 210})
            .moveDown();

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 270, cuadrado[0], cuadrado[1]).fill('#25acb1');

        switch(productSelected.market2){
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
            .text(productSelected.market3, 370, 280, {width: 200})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#fff')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market3, 370, 320, {width: 210})
            .moveDown();

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 410, cuadrado[0], cuadrado[1]).fill('#ff9f0f');

        switch(productSelected.market3){
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
            .text(productSelected.market4, 370, 425, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#fff')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market4, 370, 460, {width: 210} )
            .moveDown();


        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 550, cuadrado[0], cuadrado[1]).fill('#ecc101');

        doc
            .fontSize(16)
            .fillColor('#fff')
            .text(productSelected.market5, 370, 560, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#fff')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market5, 370, 600, {width: 210})
            .moveDown();

        switch(productSelected.market4){
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
            .text(productSelected.market6, 370, 700, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#fff')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market6, 370, 740, {width: 210})
            .moveDown();
        
        switch(productSelected.market5){
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

        switch(productSelected.market6){
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
            .text(`${productSelected.feature1}`,
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
            .text(`${productSelected.feature2}`,
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
            .text(`${productSelected.feature3}`,
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
            .text(`${productSelected.feature4}`,
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
            .text(`${productSelected.feature5}`,
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

        if(productSelected.adventage1 != null){

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
                .text(productSelected.adventage1,
                140, 90,  
                {
                    width:350,
                    align: 'center'    
                })
        }

        if(productSelected.adventage2 != null){

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
                .text(productSelected.adventage2,
                140, 170,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(productSelected.adventage3 != null){

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
                .text(productSelected.adventage3,
                140, 250,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(productSelected.adventage4 != null){

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
                .text(productSelected.adventage4,
                140, 330,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(productSelected.adventage5 != null){

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
                .text(productSelected.adventage5,
                140, 410,  
                {
                    width:350,
                    align: 'center'    
                })

        }

        
        doc
            .image(logo, 230, 740, {width: 100})

    } else if( markets.length === 7 ){

        doc
            .image(headerPDF, 0, 0, {width: 330})

       if(productSelected.name.length > 25){
            doc
            .fillColor('#163461')
            .fontSize(15)
            .text(
                productSelected.name, 
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
                productSelected.name, 
                60, 50,
                { 
                    width: 200,
                    align: 'center'
                }, 
            ).moveDown();
        }

        doc
            .image('data:image/jpeg;base64,'+imgProduct , 120, 140, {width: 150})
            .moveDown();

        doc.lineJoin('producto uno')
            .rect(fullDocH / 1.8, 0, cuadrado[0], cuadrado[1])
            .fill('#016db4')
            .moveDown();

        doc
            .fontSize(16)
            .fillColor('#ffffff')
            .text(productSelected.market1, 370, 10, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#ffffff')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market1, 370, 50, {width: 210})
            .moveDown();

        switch(productSelected.market1){
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

        switch(productSelected.market2){
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
            .text(productSelected.market2, 370, 150, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#285258')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market2, 370, 190, {width: 210})
            .moveDown();

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 270, cuadrado[0], cuadrado[1]).fill('#25acb1');

        switch(productSelected.market3){
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
            .text(productSelected.market3, 370, 290, {width: 200})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#fff')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market3, 370, 330, {width: 210})
            .moveDown();

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 410, cuadrado[0], cuadrado[1]).fill('#ff9f0f');

        switch(productSelected.market4){
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
            .text(productSelected.market4, 370, 430, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#fff')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market4, 370, 470, {width: 210} )
            .moveDown();


        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 550, cuadrado[0], cuadrado[1]).fill('#ecc101');

        doc
            .fontSize(16)
            .fillColor('#fff')
            .text(productSelected.market5, 370, 570, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#fff')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market5, 370, 610, {width: 210})
            .moveDown();

        switch(productSelected.market5){
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
            .text(productSelected.market6, 370, 710, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#fff')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market6, 370, 730, {width: 210})
            .moveDown();
        
        switch(productSelected.market6){
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
            .text(productSelected.market7, 370, 10, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#ffffff')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market7, 370, 60, {width: 210})
            .moveDown();

        switch(productSelected.market7){
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
            .text(`${productSelected.feature1}`,
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
            .text(`${productSelected.feature2}`,
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
            .text(`${productSelected.feature3}`,
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
            .text(`${productSelected.feature4}`,
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
            .text(`${productSelected.feature5}`,
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

        if(productSelected.adventage1 != null){

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
                .text(productSelected.adventage1,
                140, 90,  
                {
                    width:350,
                    align: 'center'    
                })
        }

        if(productSelected.adventage2 != null){

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
                .text(productSelected.adventage2,
                140, 170,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(productSelected.adventage3 != null){

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
                .text(productSelected.adventage3,
                140, 250,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(productSelected.adventage4 != null){

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
                .text(productSelected.adventage4,
                140, 330,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(productSelected.adventage5 != null){

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
                .text(productSelected.adventage5,
                140, 410,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        
        doc
            .image(logo, 230, 740, {width: 100})

    } else if( markets.length === 8 ){

        doc
            .image(headerPDF, 0, 0, {width: 330})

        if(productSelected.name.length > 25){
            doc
            .fillColor('#163461')
            .fontSize(15)
            .text(
                productSelected.name, 
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
                productSelected.name, 
                60, 50,
                { 
                    width: 200,
                    align: 'center'
                }, 
            ).moveDown();
        }

        //console.log('*********',imgProduct)

        doc
            .image('data:image/jpeg;base64,'+imgProduct , 120, 140, {width: 150})
            .moveDown();

        doc.lineJoin('producto uno')
            .rect(fullDocH / 1.8, 0, cuadrado[0], cuadrado[1])
            .fill('#016db4')
            .moveDown();

        doc
            .fontSize(16)
            .fillColor('#ffffff')
            .text(productSelected.market1, 370, 10, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#ffffff')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market1, 370, 45, {width: 210})
            .moveDown();

        switch(productSelected.market1){
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

        switch(productSelected.market2){
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
            .text(productSelected.market2, 370, 150, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#285258')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market2, 370, 185, {width: 210})
            .moveDown();

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 270, cuadrado[0], cuadrado[1]).fill('#25acb1');

        switch(productSelected.market3){
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
            .text(productSelected.market3, 370, 290, {width: 200})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#fff')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market3, 370, 325, {width: 210})
            .moveDown();

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 410, cuadrado[0], cuadrado[1]).fill('#ff9f0f');

        switch(productSelected.market4){
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
            .text(productSelected.market4, 370, 430, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#fff')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market4, 370, 460, {width: 210} )
            .moveDown();


        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 550, cuadrado[0], cuadrado[1]).fill('#ecc101');

        doc
            .fontSize(16)
            .fillColor('#fff')
            .text(productSelected.market5, 370, 570, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#fff')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market5, 370, 605, {width: 210})
            .moveDown();

        switch(productSelected.market5){
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
            .text(productSelected.market6, 370, 710, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#fff')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market6, 370, 745, {width: 210})
            .moveDown();
        
        switch(productSelected.market6){
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
            .text(productSelected.market7, 370, 10, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#ffffff')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market7, 370, 50, {width: 210})
            .moveDown();

        switch(productSelected.market7){
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

        switch(productSelected.market8){
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
            .text(productSelected.market8, 370, 145, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#285258')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market8, 370, 180, {width: 210})
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
            .text(`${productSelected.feature1}`,
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
            .text(`${productSelected.feature2}`,
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
            .text(`${productSelected.feature3}`,
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
            .text(`${productSelected.feature4}`,
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
            .text(`${productSelected.feature5}`,
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

        if(productSelected.adventage1 != null){

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
                .text(productSelected.adventage1,
                140, 90,  
                {
                    width:350,
                    align: 'center'    
                })
        }

        if(productSelected.adventage2 != null){

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
                .text(productSelected.adventage2,
                140, 170,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(productSelected.adventage3 != null){

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
                .text(productSelected.adventage3,
                140, 250,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(productSelected.adventage4 != null){

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
                .text(productSelected.adventage4,
                140, 330,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(productSelected.adventage5 != null){

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
                .text(productSelected.adventage5,
                140, 410,  
                {
                    width:350,
                    align: 'center'    
                })

        }

      
        
        doc
            .image(logo, 230, 740, {width: 100})

    } else if( markets.length === 9 ){

        doc
            .fillColor('#016cb2')
            .fontSize(12)
            .text('Purificación y Análisis de Fluidos', 50,10)
            .moveDown();

        doc
            .fillColor('#163461')
            .fontSize(25)
            .text(
                productSelected.name, 
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
            .text(productSelected.market1, 370, 10, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#ffffff')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market1, 370, 40, {width: 210})
            .moveDown();

        switch(productSelected.market1){
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

        switch(productSelected.market2){
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
            .text(productSelected.market2, 370, 150, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#285258')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market2, 370, 180, {width: 210})
            .moveDown();

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 270, cuadrado[0], cuadrado[1]).fill('#25acb1');

        switch(productSelected.market3){
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
            .text(productSelected.market3, 370, 290, {width: 200})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#fff')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market3, 370, 320, {width: 210})
            .moveDown();

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 410, cuadrado[0], cuadrado[1]).fill('#ff9f0f');

        switch(productSelected.market4){
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
            .text(productSelected.market4, 370, 430, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#fff')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market4, 370, 460, {width: 210} )
            .moveDown();


        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 550, cuadrado[0], cuadrado[1]).fill('#ecc101');

        doc
            .fontSize(16)
            .fillColor('#fff')
            .text(productSelected.market5, 370, 570, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#fff')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market5, 370, 600, {width: 210})
            .moveDown();

        switch(productSelected.market5){
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
            .text(productSelected.market6, 370, 710, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#fff')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market6, 370, 740, {width: 210})
            .moveDown();
        
        switch(productSelected.market6){
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
            .text(productSelected.market7, 370, 10, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#ffffff')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market7, 370, 40, {width: 210})
            .moveDown();

        switch(productSelected.market7){
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

       switch(productSelected.market8){
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
            .text(productSelected.market8, 370, 160, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#285258')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market8, 370, 190, {width: 210})
            .moveDown();

        doc.lineJoin('miter')
            .rect(10, 0, cuadrado[0], cuadrado[1]).fill('#ff9f0f');

        switch(productSelected.market9){
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
            .text(productSelected.market9, 60, 10, {width: 200})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#fff')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market9, 60, 60, {width: 210})
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
            .text(`${productSelected.feature1}`,
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
            .text(`${productSelected.feature2}`,
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
            .text(`${productSelected.feature3}`,
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
            .text(`${productSelected.feature4}`,
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
            .text(`${productSelected.feature5}`,
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

        if(productSelected.adventage1 != null){

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
                .text(productSelected.adventage1,
                140, 90,  
                {
                    width:350,
                    align: 'center'    
                })
        }

        if(productSelected.adventage2 != null){

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
                .text(productSelected.adventage2,
                140, 170,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(productSelected.adventage3 != null){

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
                .text(productSelected.adventage3,
                140, 250,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(productSelected.adventage4 != null){

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
                .text(productSelected.adventage4,
                140, 330,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(productSelected.adventage5 != null){

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
                .text(productSelected.adventage5,
                140, 410,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        
        doc
            .image(logo, 230, 740, {width: 100})

        
    } else if( markets.length === 10){
        doc
            .fillColor('#016cb2')
            .fontSize(12)
            .text('Purificación y Análisis de Fluidos', 50,10)
            .moveDown();

        doc
            .fillColor('#163461')
            .fontSize(25)
            .text(
                productSelected.name, 
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
            .text(productSelected.market1, 370, 10, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#ffffff')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market1, 370, 40, {width: 210})
            .moveDown();

        switch(productSelected.market1){
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

        switch(productSelected.market2){
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
            .text(productSelected.market2, 370, 150, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#285258')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market2, 370, 180, {width: 210})
            .moveDown();

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 270, cuadrado[0], cuadrado[1]).fill('#25acb1');

        switch(productSelected.market3){
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
            .text(productSelected.market3, 370, 290, {width: 200})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#fff')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market3, 370, 320, {width: 210})
            .moveDown();

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 410, cuadrado[0], cuadrado[1]).fill('#ff9f0f');

        switch(productSelected.market4){
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
            .text(productSelected.market4, 370, 430, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#fff')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market4, 370, 460, {width: 210} )
            .moveDown();


        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 550, cuadrado[0], cuadrado[1]).fill('#ecc101');

        doc
            .fontSize(16)
            .fillColor('#fff')
            .text(productSelected.market5, 370, 570, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#fff')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market5, 370, 600, {width: 210})
            .moveDown();

        switch(productSelected.market5){
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
            .text(productSelected.market6, 370, 710, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#fff')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market6, 370, 740, {width: 210})
            .moveDown();
        
        switch(productSelected.market6){
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
            .text(productSelected.market7, 370, 10, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#ffffff')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market7, 370, 40, {width: 210})
            .moveDown();

        switch(productSelected.market7){
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

        switch(productSelected.market8){
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
            .text(productSelected.market8, 370, 160, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#285258')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market8, 370, 190, {width: 210})
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
            .text(productSelected.market9, 40, 10, {width: 200})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#285258')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market9, 40, 60, {width: 210})
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
            .text(productSelected.market10, 40, 160, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#ffffff')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market10, 40, 190, {width: 210})
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
            .text(`${productSelected.feature1}`,
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
            .text(`${productSelected.feature2}`,
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
            .text(`${productSelected.feature3}`,
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
            .text(`${productSelected.feature4}`,
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
            .text(`${productSelected.feature5}`,
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


        if(productSelected.adventage1 != null){

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
                .text(productSelected.adventage1,
                140, 90,  
                {
                    width:350,
                    align: 'center'    
                })
        }

        if(productSelected.adventage2 != null){

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
                .text(productSelected.adventage2,
                140, 170,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(productSelected.adventage3 != null){

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
                .text(productSelected.adventage3,
                140, 250,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(productSelected.adventage4 != null){

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
                .text(productSelected.adventage4,
                140, 330,  
                {
                    width:350,
                    align: 'center'    
                })

        }
        if(productSelected.adventage5 != null){

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
                .text(productSelected.adventage5,
                140, 410,  
                {
                    width:350,
                    align: 'center'    
                })

        }


    }


    doc.pipe(res)
    doc.end();

}

export {
    pdfGenerator
}