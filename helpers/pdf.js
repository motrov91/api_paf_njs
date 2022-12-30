import { Product } from '../models/index_model.js';
import pdf from 'pdfkit';
import imageToBase from 'image-to-base64';

import {fileURLToPath} from 'url';
import path from 'path';

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

    console.log(markets.length)

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
    const pathImage1 = path.join( __dirname, '../assets/', 'img1.png' ); 
    const pathImage2 = path.join( __dirname, '../assets/', 'img2.png' ); 
    const pathImage3 = path.join( __dirname, '../assets/', 'img3.png' ); 
    const pathImage4 = path.join( __dirname, '../assets/', 'img4.png' ); 
    const pathImage5 = path.join( __dirname, '../assets/', 'img5.png' ); 
    const pathImage6 = path.join( __dirname, '../assets/', 'icon_video.png' ); 
    const ventaja1 = path.join( __dirname, '../assets/', 'ventaja1.png' ); 
    const ventaja2 = path.join( __dirname, '../assets/', 'ventaja2.png' ); 
    const ventaja3 = path.join( __dirname, '../assets/', 'ventaja3.png' ); 
    const ventaja4 = path.join( __dirname, '../assets/', 'ventaja4.png' ); 
    const ventaja5 = path.join( __dirname, '../assets/', 'ventaja5.png' ); 
    const logo = path.join( __dirname, '../assets/', 'logo.png' ); 

    //Crea el pdf y se asignamos un tamaño y una información general
    const doc = new pdf({ 
        info:{
            Title: 'Productos PAF',
            Author: 'Purificación y Análisis de Fluidos SAS'
        },
        // size: 'A4',
        size: [595, 920],
    });

    //Medidas de la hota
    const fullDocH = 595;
    const cuadrado = [291, 140]

    if( markets.length === 1){

        doc
            .fillColor('#016cb2')
            .fontSize(12)
            .text('Purificación y Análisis de Fluidos', 220,10)
            .moveDown();

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
            );

        doc
            .image('data:image/jpeg;base64,'+imgProduct , 60, 100, {width: 200})
            .moveDown();

        doc.lineJoin('test')
            .rect(fullDocH / 1.8, 60, cuadrado[0], cuadrado[1])
            .fill('#016db4')
            .moveDown();

        doc
            .fontSize(18)
            .fillColor('#ffffff')
            .text(productSelected.market1, 380, 70, {width: 200})
            .moveDown();

        doc
            .fontSize(12)
            .fillColor('#ffffff')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market1, 380, 100, {width:200})
            .moveDown();

        doc.circle(330, 145, 25)
            .lineWidth(3)
            .fillOpacity(0.98)
            .fillAndStroke("white", "#f6f6f6")
            .moveDown();

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
            .text(productSelected.feature1,
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
            .text(productSelected.feature2,
            310, 465,  
            {
                width:150,
                align: 'center'
                
            })
        doc.image(pathImage2, 366, 415, {width: 40})
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
            .text(productSelected.feature3,
            310, 640,  
            {
                width:150,
                align: 'center'
                
            })

        doc.image(pathImage3, 366, 585, {width: 40})
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
            .text(productSelected.feature4,
            138, 640,  
            {
                width:150,
                align: 'center'
                
            })

        doc.image(pathImage4, 190, 585, {width: 40})
        //* ---------------------------------------------
        doc.lineJoin('miter')
            .rect(99, 750, 402, 80).fill('#ff6510');

        doc.circle(140, 790, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc.image(pathImage5, 121, 775, {width: 40})

        doc
            .fontSize(11)
            .text(productSelected.feature5,
            170, 760,  
            {
                width:300,
                align: 'center'    
            })

        doc.addPage({
            size: [595, 920],
        })
            .moveDown()

        doc.lineJoin('VentajasCompetitivas')
            .rect(0, 0, fullDocH, 60).fill('#2e6ca7');

        doc
            .fillColor('#fff')
            .fontSize(30)
            .text('Ventajas competitivas', 170,18)
            .moveDown();

        doc.circle(100, 120, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("#2e6ca7", "#fff")
            .moveDown();

        doc.image(ventaja1, 88, 108, {width: 25})

        doc
            .fontSize(11)
            .fillColor('#163461')
            .text(productSelected.adventage1,
            140, 103,  
            {
                width:350,
                align: 'center'    
            })

        doc.circle(100, 180, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("#f8c901", "#fff")
            .moveDown();

        doc.image(ventaja2, 88, 168, {width: 30})

        doc
            .fontSize(11)
            .fillColor('#163461')
            .text(productSelected.adventage2,
            140, 163,  
            {
                width:350,
                align: 'center'    
            })

        doc.circle(100, 240, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("#ff9f0f", "#fff")
            .moveDown();

        doc.image(ventaja3, 88, 228, {width: 30})

        doc
            .fontSize(11)
            .fillColor('#163461')
            .text(productSelected.adventage3,
            140, 223,  
            {
                width:350,
                align: 'center'    
            })

        doc.circle(100, 300, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("#24abb1", "#fff")
            .moveDown();

        doc.image(ventaja4, 88, 288, {width: 30})

        doc
            .fontSize(11)
            .fillColor('#163461')
            .text(productSelected.adventage4,
            140, 283,  
            {
                width:350,
                align: 'center'    
            })

        doc.circle(100, 360, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("#ff6510", "#fff")
            .moveDown();

        doc.image(ventaja5, 88, 348, {width: 30})

        doc
            .fontSize(11)
            .fillColor('#163461')
            .text(productSelected.adventage5,
            140, 343,  
            {
                width:350,
                align: 'center'    
            })

        doc 
            .fontSize(20)
            .fillColor('#163461')
            .text('Tips comerciales', 100, 440)

        doc
            .fillColor('#016cb2')
            .fontSize(12)
            .image(pathImage6, 300, 420, {width: 200})
            .link(300, 420, 200, 105, `${productSelected.url_video}`)

        doc.image(logo, 250, 748, {width: 120})

    } else if( markets.length === 2 ){
        doc
            .fillColor('#016cb2')
            .fontSize(12)
            .text('Purificación y Análisis de Fluidos', 80,10)
            .moveDown();

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
            );

        doc
            .image('data:image/jpeg;base64,'+imgProduct , 60, 110, {width: 250})
            .moveDown();

        doc.lineJoin('test')
        .rect(fullDocH / 1.8, 0, cuadrado[0], 150)
        .fill('#016db4')
        .moveDown();

        doc
            .fontSize(16)
            .fillColor('#ffffff')
            .text(productSelected.market1, 370, 20, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#ffffff')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market1, 370, 50, {width: 210})
            .moveDown();

        doc.circle(330, 76, 25)
            .lineWidth(3)
            .fillOpacity(0.98)
            .fillAndStroke("white", "#f6f6f6")
            .moveDown();

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 150, cuadrado[0], 150).fill('#ecc101');

        doc.circle(330, 226, 25)
            .lineWidth(3)
            .fillOpacity(0.98)
            .fillAndStroke("white", "#f6f6f6")

        doc
            .fontSize(16)
            .fillColor('#285258')
            .text(productSelected.market2, 370, 180, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#285258')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market1, 370, 210, {width: 210})
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
            .text(productSelected.feature1,
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
            .text(productSelected.feature2,
            310, 465,  
            {
                width:150,
                align: 'center'
                
            })
        doc.image(pathImage2, 366, 415, {width: 40})
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
            .text(productSelected.feature3,
            310, 640,  
            {
                width:150,
                align: 'center'
                
            })

        doc.image(pathImage3, 366, 585, {width: 40})
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
            .text(productSelected.feature4,
            138, 640,  
            {
                width:150,
                align: 'center'
                
            })

        doc.image(pathImage4, 190, 585, {width: 40})
        //* ---------------------------------------------
        doc.lineJoin('miter')
            .rect(99, 750, 402, 80).fill('#ff6510');

        doc.circle(140, 790, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc.image(pathImage5, 121, 775, {width: 40})

        doc
            .fontSize(11)
            .text(productSelected.feature5,
            170, 760,  
            {
                width:300,
                align: 'center'    
            })

        doc.addPage({
            size: [595, 920],
        })
            .moveDown()

        doc.lineJoin('VentajasCompetitivas')
            .rect(0, 0, fullDocH, 60).fill('#2e6ca7');

        doc
            .fillColor('#fff')
            .fontSize(30)
            .text('Ventajas competitivas', 170,18)
            .moveDown();

        doc.circle(100, 120, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("#2e6ca7", "#fff")
            .moveDown();

        doc.image(ventaja1, 88, 108, {width: 25})

        doc
            .fontSize(11)
            .fillColor('#163461')
            .text(productSelected.adventage1,
            140, 103,  
            {
                width:350,
                align: 'center'    
            })

        doc.circle(100, 180, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("#f8c901", "#fff")
            .moveDown();

        doc.image(ventaja2, 88, 168, {width: 30})

        doc
            .fontSize(11)
            .fillColor('#163461')
            .text(productSelected.adventage2,
            140, 163,  
            {
                width:350,
                align: 'center'    
            })

        doc.circle(100, 240, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("#ff9f0f", "#fff")
            .moveDown();

        doc.image(ventaja3, 88, 228, {width: 30})

        doc
            .fontSize(11)
            .fillColor('#163461')
            .text(productSelected.adventage3,
            140, 223,  
            {
                width:350,
                align: 'center'    
            })

        doc.circle(100, 300, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("#24abb1", "#fff")
            .moveDown();

        doc.image(ventaja4, 88, 288, {width: 30})

        doc
            .fontSize(11)
            .fillColor('#163461')
            .text(productSelected.adventage4,
            140, 283,  
            {
                width:350,
                align: 'center'    
            })

        doc.circle(100, 360, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("#ff6510", "#fff")
            .moveDown();

        doc.image(ventaja5, 88, 348, {width: 30})

        doc
            .fontSize(11)
            .fillColor('#163461')
            .text(productSelected.adventage5,
            140, 343,  
            {
                width:350,
                align: 'center'    
            })

        doc 
            .fontSize(20)
            .fillColor('#163461')
            .text('Tips comerciales', 100, 440)

        doc
            .fillColor('#016cb2')
            .fontSize(12)
            .image(pathImage6, 300, 420, {width: 200})
            .link(300, 420, 200, 105, `${productSelected.url_video}`)

        doc.image(logo, 250, 748, {width: 120})

    } else if( markets.length === 3 ){
        doc
            .fillColor('#016cb2')
            .fontSize(12)
            .text('Purificación y Análisis de Fluidos', 80,10)
            .moveDown();

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
            );

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
            .text(productSelected.market1, 380, 20, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#ffffff')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market1, 380, 50, {width: 210})
            .moveDown();

        doc.circle(330, 57, 25)
            .lineWidth(3)
            .fillOpacity(0.98)
            .fillAndStroke("white", "#f6f6f6")
            .moveDown();

        doc.lineJoin('producto 2')
            .rect(fullDocH / 1.8, 120, cuadrado[0], 120).fill('#ecc101');

        doc.circle(330, 180, 25)
            .lineWidth(3)
            .fillOpacity(0.98)
            .fillAndStroke("white", "#f6f6f6")

        doc
            .fontSize(16)
            .fillColor('#285258')
            .text(productSelected.market2, 370, 140, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#285258')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market1, 370, 170, {width: 210})
            .moveDown();

        doc.lineJoin('producto 3')
            .rect(fullDocH / 1.8, 240, cuadrado[0], 120).fill('#25acb1');

        doc.circle(330, 300, 25)
            .lineWidth(3)
            .fillOpacity(0.98)
            .fillAndStroke("white", "#f6f6f6")

        doc
            .fontSize(16)
            .fillColor('#ffffff')
            .text(productSelected.market3, 370, 260, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#ffffff')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market3, 370, 290, {width: 210})
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
            .text(productSelected.feature1,
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
            .text(productSelected.feature2,
            310, 480,  
            {
                width:150,
                align: 'center'
                
            })
        doc.image(pathImage2, 366, 430, {width: 40})
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
            .text(productSelected.feature3,
            310, 655,  
            {
                width:150,
                align: 'center'
                
            })

        doc.image(pathImage3, 366, 600, {width: 40})
        //* ---------------------------------------------
        doc.lineJoin('miter')
            .rect(125, 590, 170, 170).fill('#f8c901');

        doc.circle(210, 625, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc
            .fontSize(10)
            .text(productSelected.feature4,
            138, 655,  
            {
                width:150,
                align: 'center'
                
            })

        doc.image(pathImage4, 190, 600, {width: 40})
        //* ---------------------------------------------
        doc.lineJoin('miter')
            .rect(99, 770, 402, 80).fill('#ff6510');

        doc.circle(140, 800, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("white", "#fff")
            .moveDown();

        doc.image(pathImage5, 121, 785, {width: 40})

        doc
            .fontSize(11)
            .text(productSelected.feature5,
            170, 780,  
            {
                width:300,
                align: 'center'    
            })

        doc.addPage({
            size: [595, 920],
        })
            .moveDown()

        doc.lineJoin('VentajasCompetitivas')
            .rect(0, 0, fullDocH, 60).fill('#2e6ca7');

        doc
            .fillColor('#fff')
            .fontSize(30)
            .text('Ventajas competitivas', 170,18)
            .moveDown();

        doc.circle(100, 120, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("#2e6ca7", "#fff")
            .moveDown();

        doc.image(ventaja1, 88, 108, {width: 25})

        doc
            .fontSize(11)
            .fillColor('#163461')
            .text(productSelected.adventage1,
            140, 103,  
            {
                width:350,
                align: 'center'    
            })

        doc.circle(100, 180, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("#f8c901", "#fff")
            .moveDown();

        doc.image(ventaja2, 88, 168, {width: 30})

        doc
            .fontSize(11)
            .fillColor('#163461')
            .text(productSelected.adventage2,
            140, 163,  
            {
                width:350,
                align: 'center'    
            })

        doc.circle(100, 240, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("#ff9f0f", "#fff")
            .moveDown();

        doc.image(ventaja3, 88, 228, {width: 30})

        doc
            .fontSize(11)
            .fillColor('#163461')
            .text(productSelected.adventage3,
            140, 223,  
            {
                width:350,
                align: 'center'    
            })

        doc.circle(100, 300, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("#24abb1", "#fff")
            .moveDown();

        doc.image(ventaja4, 88, 288, {width: 30})

        doc
            .fontSize(11)
            .fillColor('#163461')
            .text(productSelected.adventage4,
            140, 283,  
            {
                width:350,
                align: 'center'    
            })

        doc.circle(100, 360, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("#ff6510", "#fff")
            .moveDown();

        doc.image(ventaja5, 88, 348, {width: 30})

        doc
            .fontSize(11)
            .fillColor('#163461')
            .text(productSelected.adventage5,
            140, 343,  
            {
                width:350,
                align: 'center'    
            })

        doc 
            .fontSize(20)
            .fillColor('#163461')
            .text('Tips comerciales', 100, 440)

        doc
            .fillColor('#016cb2')
            .fontSize(12)
            .image(pathImage6, 300, 420, {width: 200})
            .link(300, 420, 200, 105, `${productSelected.url_video}`)

        doc.image(logo, 250, 748, {width: 120})
    } else if( markets.length === 4 ){
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
            .text(productSelected.description_market1, 370, 60)
            .moveDown();

        doc.circle(330, 85, 25)
            .lineWidth(3)
            .fillOpacity(0.98)
            .fillAndStroke("white", "#f6f6f6")
            .moveDown();

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 210, cuadrado[0], cuadrado[1]).fill('#ecc101');

        doc.circle(330, 300, 25)
            .lineWidth(3)
            .fillOpacity(0.98)
            .fillAndStroke("white", "#f6f6f6")

        doc
            .fontSize(16)
            .fillColor('#285258')
            .text(productSelected.market2, 370, 220, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#285258')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market2, 370, 250)
            .moveDown();

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 420, cuadrado[0], cuadrado[1]).fill('#25acb1');

        doc.circle(330, 515, 25)
            .lineWidth(3)
            .fillOpacity(0.98)
            .fillAndStroke("white", "#f6f6f6")

        doc
            .fontSize(16)
            .fillColor('#fff')
            .text(productSelected.market3, 370, 430, {width: 200})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#fff')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market3, 370, 460)
            .moveDown();

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 630, cuadrado[0], cuadrado[1]).fill('#ff9f0f');

        doc.circle(330, 720, 25)
            .lineWidth(3)
            .fillOpacity(0.98)
            .fillAndStroke("white", "#f6f6f6")
            .moveDown();

        doc
            .fontSize(16)
            .fillColor('#fff')
            .text(productSelected.market4, 370, 650, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#fff')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market4, 370, 680)
            .moveDown();

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

        doc.image(pathImage1, 185, 130, {width: 30})

        doc.lineJoin('miter')
            .rect(301, 100, 200, 200).fill('#f8c901');

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
        
        doc.image(pathImage3, 185, 330, {width: 30})

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

        doc.image(pathImage4, 380, 325, {width: 40})

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

        doc.image(pathImage5, 121, 526, {width: 40})

        doc
            .fontSize(11)
            .text(`${productSelected.feature5}`,
            170, 520,  
            {
                width:300,
                align: 'center'    
            })

        doc 
            .fontSize(20)
            .fillColor('#163461')
            .text('Tips comerciales', 100, 640)

        doc
            .fillColor('#016cb2')
            .fontSize(12)
            .image(pathImage6, 300, 620, {width: 200})
            .link(300, 620, 200, 105, `${productSelected.url_video}`)

    //------------------------------ NEW PAGE ------------------------------------------

        doc.addPage({
            size: [595, 920],
        })
            .moveDown()

        doc.lineJoin('VentajasCompetitivas')
            .rect(0, 0, fullDocH, 60).fill('#2e6ca7');

        doc
            .fillColor('#fff')
            .fontSize(30)
            .text('Ventajas competitivas', 170,18)
            .moveDown();

        doc.circle(100, 120, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("#2e6ca7", "#fff")
            .moveDown();

        doc.image(ventaja1, 88, 108, {width: 25})

        doc
            .fontSize(11)
            .fillColor('#163461')
            .text(productSelected.adventage1,
            140, 103,  
            {
                width:350,
                align: 'center'    
            })

        doc.circle(100, 180, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("#f8c901", "#fff")
            .moveDown();

        doc.image(ventaja2, 88, 168, {width: 30})

        doc
            .fontSize(11)
            .fillColor('#163461')
            .text(productSelected.adventage2,
            140, 163,  
            {
                width:350,
                align: 'center'    
            })

        doc.circle(100, 240, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("#ff9f0f", "#fff")
            .moveDown();

        doc.image(ventaja3, 88, 228, {width: 30})

        doc
            .fontSize(11)
            .fillColor('#163461')
            .text(productSelected.adventage3,
            140, 223,  
            {
                width:350,
                align: 'center'    
            })

        doc.circle(100, 300, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("#24abb1", "#fff")
            .moveDown();

        doc.image(ventaja4, 88, 288, {width: 30})

        doc
            .fontSize(11)
            .fillColor('#163461')
            .text(productSelected.adventage4,
            140, 283,  
            {
                width:350,
                align: 'center'    
            })

        doc.circle(100, 360, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("#ff6510", "#fff")
            .moveDown();

        doc.image(ventaja5, 88, 348, {width: 30})

        doc
            .fontSize(11)
            .fillColor('#163461')
            .text(productSelected.adventage5,
            140, 343,  
            {
                width:350,
                align: 'center'    
            })

            doc
            .image(logo, 200, 700, {width: 200})

    } else if( markets.length === 5 ){
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
            .text(productSelected.description_market1, 370, 60, {width: 210})
            .moveDown();

        doc.circle(330, 85, 25)
            .lineWidth(3)
            .fillOpacity(0.98)
            .fillAndStroke("white", "#f6f6f6")
            .moveDown();

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 180, cuadrado[0], cuadrado[1]).fill('#ecc101');

        doc.circle(330, 270, 25)
            .lineWidth(3)
            .fillOpacity(0.98)
            .fillAndStroke("white", "#f6f6f6")

        doc
            .fontSize(16)
            .fillColor('#285258')
            .text(productSelected.market2, 370, 200, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#285258')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market2, 370, 230, {width: 210})
            .moveDown();

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 360, cuadrado[0], cuadrado[1]).fill('#25acb1');

        doc.circle(330, 450, 25)
            .lineWidth(3)
            .fillOpacity(0.98)
            .fillAndStroke("white", "#f6f6f6")

        doc
            .fontSize(16)
            .fillColor('#fff')
            .text(productSelected.market3, 370, 380, {width: 200})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#fff')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market3, 370, 410, {width: 210})
            .moveDown();

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 540, cuadrado[0], cuadrado[1]).fill('#ff9f0f');

        doc.circle(330, 630, 25)
            .lineWidth(3)
            .fillOpacity(0.98)
            .fillAndStroke("white", "#f6f6f6")
            .moveDown();

        doc
            .fontSize(16)
            .fillColor('#fff')
            .text(productSelected.market4, 370, 570, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#fff')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market4, 370, 600, {width: 210} )
            .moveDown();

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 720, cuadrado[0], 170).fill('#ecc101');

        doc.circle(330, 800, 25)
            .lineWidth(3)
            .fillOpacity(0.98)
            .fillAndStroke("white", "#f6f6f6")
            .moveDown();

        doc
            .fontSize(16)
            .fillColor('#fff')
            .text(productSelected.market5, 370, 740, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#fff')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market5, 370, 770, {width: 210})
            .moveDown();

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

        doc.image(pathImage1, 185, 130, {width: 30})

        doc.lineJoin('miter')
            .rect(301, 100, 200, 200).fill('#f8c901');

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
        
        doc.image(pathImage3, 185, 330, {width: 30})

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

        doc.image(pathImage4, 380, 325, {width: 40})

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

        doc.image(pathImage5, 121, 526, {width: 40})

        doc
            .fontSize(11)
            .text(`${productSelected.feature5}`,
            170, 520,  
            {
                width:300,
                align: 'center'    
            })

        doc 
            .fontSize(20)
            .fillColor('#163461')
            .text('Tips comerciales', 100, 640)

        doc
            .fillColor('#016cb2')
            .fontSize(12)
            .image(pathImage6, 300, 620, {width: 200})
            .link(300, 620, 200, 105, `${productSelected.url_video}`)

    //------------------------------ NEW PAGE ------------------------------------------

        doc.addPage({
            size: [595, 920],
        })
            .moveDown()

        doc.lineJoin('VentajasCompetitivas')
            .rect(0, 0, fullDocH, 60).fill('#2e6ca7');

        doc
            .fillColor('#fff')
            .fontSize(30)
            .text('Ventajas competitivas', 170,18)
            .moveDown();

        doc.circle(100, 120, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("#2e6ca7", "#fff")
            .moveDown();

        doc.image(ventaja1, 88, 108, {width: 25})

        doc
            .fontSize(11)
            .fillColor('#163461')
            .text(productSelected.adventage1,
            140, 103,  
            {
                width:350,
                align: 'center'    
            })

        doc.circle(100, 180, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("#f8c901", "#fff")
            .moveDown();

        doc.image(ventaja2, 88, 168, {width: 30})

        doc
            .fontSize(11)
            .fillColor('#163461')
            .text(productSelected.adventage2,
            140, 163,  
            {
                width:350,
                align: 'center'    
            })

        doc.circle(100, 240, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("#ff9f0f", "#fff")
            .moveDown();

        doc.image(ventaja3, 88, 228, {width: 30})

        doc
            .fontSize(11)
            .fillColor('#163461')
            .text(productSelected.adventage3,
            140, 223,  
            {
                width:350,
                align: 'center'    
            })

        doc.circle(100, 300, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("#24abb1", "#fff")
            .moveDown();

        doc.image(ventaja4, 88, 288, {width: 30})

        doc
            .fontSize(11)
            .fillColor('#163461')
            .text(productSelected.adventage4,
            140, 283,  
            {
                width:350,
                align: 'center'    
            })

        doc.circle(100, 360, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("#ff6510", "#fff")
            .moveDown();

        doc.image(ventaja5, 88, 348, {width: 30})

        doc
            .fontSize(11)
            .fillColor('#163461')
            .text(productSelected.adventage5,
            140, 343,  
            {
                width:350,
                align: 'center'    
            })

        doc
            .image(logo, 200, 700, {width: 200})
    } else if( markets.length === 6 ){

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

        doc.circle(330, 60, 25)
            .lineWidth(3)
            .fillOpacity(0.98)
            .fillAndStroke("white", "#f6f6f6")
            .moveDown();

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 130, cuadrado[0], cuadrado[1]).fill('#ecc101');

        doc.circle(330, 200, 25)
            .lineWidth(3)
            .fillOpacity(0.98)
            .fillAndStroke("white", "#f6f6f6")

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

        doc.circle(330, 340, 25)
            .lineWidth(3)
            .fillOpacity(0.98)
            .fillAndStroke("white", "#f6f6f6")

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

        doc.circle(330, 480, 25)
            .lineWidth(3)
            .fillOpacity(0.98)
            .fillAndStroke("white", "#f6f6f6")
            .moveDown();

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

        doc.circle(330, 640, 25)
            .lineWidth(3)
            .fillOpacity(0.98)
            .fillAndStroke("white", "#f6f6f6")
            .moveDown();

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 690, cuadrado[0], cuadrado[1]).fill('#25acb1');

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
        
        doc.circle(330, 760, 25)
            .lineWidth(3)
            .fillOpacity(0.98)
            .fillAndStroke("white", "#f6f6f6")

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

        doc.image(pathImage1, 185, 130, {width: 30})

        doc.lineJoin('miter')
            .rect(301, 100, 200, 200).fill('#f8c901');

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
        
        doc.image(pathImage3, 185, 330, {width: 30})

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

        doc.image(pathImage4, 380, 325, {width: 40})

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

        doc.image(pathImage5, 121, 526, {width: 40})

        doc
            .fontSize(11)
            .text(`${productSelected.feature5}`,
            170, 520,  
            {
                width:300,
                align: 'center'    
            })

        doc 
            .fontSize(20)
            .fillColor('#163461')
            .text('Tips comerciales', 100, 640)

        doc
            .fillColor('#016cb2')
            .fontSize(12)
            .image(pathImage6, 300, 620, {width: 200})
            .link(300, 620, 200, 105, `${productSelected.url_video}`)

    //------------------------------ NEW PAGE ------------------------------------------

        doc.addPage({
            size: [595, 920],
        })
            .moveDown()

        doc.lineJoin('VentajasCompetitivas')
            .rect(0, 0, fullDocH, 60).fill('#2e6ca7');

        doc
            .fillColor('#fff')
            .fontSize(30)
            .text('Ventajas competitivas', 170,18)
            .moveDown();

        doc.circle(100, 120, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("#2e6ca7", "#fff")
            .moveDown();

        doc.image(ventaja1, 88, 108, {width: 25})

        doc
            .fontSize(11)
            .fillColor('#163461')
            .text(productSelected.adventage1,
            140, 103,  
            {
                width:350,
                align: 'center'    
            })

        doc.circle(100, 180, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("#f8c901", "#fff")
            .moveDown();

        doc.image(ventaja2, 88, 168, {width: 30})

        doc
            .fontSize(11)
            .fillColor('#163461')
            .text(productSelected.adventage2,
            140, 163,  
            {
                width:350,
                align: 'center'    
            })

        doc.circle(100, 240, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("#ff9f0f", "#fff")
            .moveDown();

        doc.image(ventaja3, 88, 228, {width: 30})

        doc
            .fontSize(11)
            .fillColor('#163461')
            .text(productSelected.adventage3,
            140, 223,  
            {
                width:350,
                align: 'center'    
            })

        doc.circle(100, 300, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("#24abb1", "#fff")
            .moveDown();

        doc.image(ventaja4, 88, 288, {width: 30})

        doc
            .fontSize(11)
            .fillColor('#163461')
            .text(productSelected.adventage4,
            140, 283,  
            {
                width:350,
                align: 'center'    
            })

        doc.circle(100, 360, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("#ff6510", "#fff")
            .moveDown();

        doc.image(ventaja5, 88, 348, {width: 30})

        doc
            .fontSize(11)
            .fillColor('#163461')
            .text(productSelected.adventage5,
            140, 343,  
            {
                width:350,
                align: 'center'    
            })

        doc
            .image(logo, 200, 700, {width: 200})

    } else if( markets.length === 7 ){

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

        doc.circle(330, 60, 25)
            .lineWidth(3)
            .fillOpacity(0.98)
            .fillAndStroke("white", "#f6f6f6")
            .moveDown();

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 130, cuadrado[0], cuadrado[1]).fill('#ecc101');

        doc.circle(330, 200, 25)
            .lineWidth(3)
            .fillOpacity(0.98)
            .fillAndStroke("white", "#f6f6f6")

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

        doc.circle(330, 340, 25)
            .lineWidth(3)
            .fillOpacity(0.98)
            .fillAndStroke("white", "#f6f6f6")

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

        doc.circle(330, 480, 25)
            .lineWidth(3)
            .fillOpacity(0.98)
            .fillAndStroke("white", "#f6f6f6")
            .moveDown();

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

        doc.circle(330, 640, 25)
            .lineWidth(3)
            .fillOpacity(0.98)
            .fillAndStroke("white", "#f6f6f6")
            .moveDown();

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
        
        doc.circle(330, 760, 25)
            .lineWidth(3)
            .fillOpacity(0.98)
            .fillAndStroke("white", "#f6f6f6")

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

        doc.circle(330, 60, 25)
            .lineWidth(3)
            .fillOpacity(0.98)
            .fillAndStroke("white", "#f6f6f6")
            .moveDown();


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

        doc.image(pathImage1, 185, 280, {width: 30})

        doc.lineJoin('miter')
            .rect(301, 250, 200, 200).fill('#f8c901');

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
        
        doc.image(pathImage3, 185, 480, {width: 30})

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

        doc.image(pathImage4, 380, 465, {width: 40})

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

        doc.image(pathImage5, 121, 676, {width: 40})

        doc
            .fontSize(11)
            .text(`${productSelected.feature5}`,
            170, 670,  
            {
                width:300,
                align: 'center'    
            })

        doc 
            .fontSize(20)
            .fillColor('#163461')
            .text('Tips comerciales', 100, 780)

        doc
            .fillColor('#016cb2')
            .fontSize(12)
            .image(pathImage6, 300, 770, {width: 200})
            .link(300, 770, 200, 105, `${productSelected.url_video}`)

    //------------------------------ NEW PAGE ------------------------------------------

        doc.addPage({
            size: [595, 920],
        })
            .moveDown()

        doc.lineJoin('VentajasCompetitivas')
            .rect(0, 0, fullDocH, 60).fill('#2e6ca7');

        doc
            .fillColor('#fff')
            .fontSize(30)
            .text('Ventajas competitivas', 170,18)
            .moveDown();

        doc.circle(100, 120, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("#2e6ca7", "#fff")
            .moveDown();

        doc.image(ventaja1, 88, 108, {width: 25})

        doc
            .fontSize(11)
            .fillColor('#163461')
            .text(productSelected.adventage1,
            140, 103,  
            {
                width:350,
                align: 'center'    
            })

        doc.circle(100, 180, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("#f8c901", "#fff")
            .moveDown();

        doc.image(ventaja2, 88, 168, {width: 30})

        doc
            .fontSize(11)
            .fillColor('#163461')
            .text(productSelected.adventage2,
            140, 163,  
            {
                width:350,
                align: 'center'    
            })

        doc.circle(100, 240, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("#ff9f0f", "#fff")
            .moveDown();

        doc.image(ventaja3, 88, 228, {width: 30})

        doc
            .fontSize(11)
            .fillColor('#163461')
            .text(productSelected.adventage3,
            140, 223,  
            {
                width:350,
                align: 'center'    
            })

        doc.circle(100, 300, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("#24abb1", "#fff")
            .moveDown();

        doc.image(ventaja4, 88, 288, {width: 30})

        doc
            .fontSize(11)
            .fillColor('#163461')
            .text(productSelected.adventage4,
            140, 283,  
            {
                width:350,
                align: 'center'    
            })

        doc.circle(100, 360, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("#ff6510", "#fff")
            .moveDown();

        doc.image(ventaja5, 88, 348, {width: 30})

        doc
            .fontSize(11)
            .fillColor('#163461')
            .text(productSelected.adventage5,
            140, 343,  
            {
                width:350,
                align: 'center'    
            })

        doc
            .image(logo, 200, 700, {width: 200})

    } else if( markets.length === 8 ){

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

        doc.circle(330, 60, 25)
            .lineWidth(3)
            .fillOpacity(0.98)
            .fillAndStroke("white", "#f6f6f6")
            .moveDown();

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 130, cuadrado[0], cuadrado[1]).fill('#ecc101');

        doc.circle(330, 200, 25)
            .lineWidth(3)
            .fillOpacity(0.98)
            .fillAndStroke("white", "#f6f6f6")

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

        doc.circle(330, 340, 25)
            .lineWidth(3)
            .fillOpacity(0.98)
            .fillAndStroke("white", "#f6f6f6")

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

        doc.circle(330, 480, 25)
            .lineWidth(3)
            .fillOpacity(0.98)
            .fillAndStroke("white", "#f6f6f6")
            .moveDown();

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

        doc.circle(330, 640, 25)
            .lineWidth(3)
            .fillOpacity(0.98)
            .fillAndStroke("white", "#f6f6f6")
            .moveDown();

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
        
        doc.circle(330, 760, 25)
            .lineWidth(3)
            .fillOpacity(0.98)
            .fillAndStroke("white", "#f6f6f6")

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
            .text(productSelected.market7, 370, 10, {width: 250})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#ffffff')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market7, 370, 60, {width: 210})
            .moveDown();

        doc.circle(330, 60, 25)
            .lineWidth(3)
            .fillOpacity(0.98)
            .fillAndStroke("white", "#f6f6f6")
            .moveDown();

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 130, cuadrado[0], cuadrado[1]).fill('#ecc101');

        doc.circle(330, 200, 25)
            .lineWidth(3)
            .fillOpacity(0.98)
            .fillAndStroke("white", "#f6f6f6")

        doc
            .fontSize(16)
            .fillColor('#285258')
            .text(productSelected.market8, 370, 150, {width: 250})
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

        doc.image(pathImage1, 185, 380, {width: 30})

        doc.lineJoin('miter')
            .rect(301, 350, 200, 200).fill('#f8c901');

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
        
        doc.image(pathImage3, 185, 580, {width: 30})

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

        doc.image(pathImage4, 380, 565, {width: 40})

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

        doc.image(pathImage5, 121, 776, {width: 40})

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

        doc 
            .fontSize(20)
            .fillColor('#163461')
            .text('Tips comerciales', 50, 50)

        doc
            .fillColor('#016cb2')
            .fontSize(12)
            .image(pathImage6, 240, 40, {width: 200})
            .link(240, 40, 200, 105, `${productSelected.url_video}`)

        doc.lineJoin('VentajasCompetitivas')
            .rect(0, 200, fullDocH, 60).fill('#2e6ca7');

        doc
            .fillColor('#fff')
            .fontSize(30)
            .text('Ventajas competitivas', 170,218, {width:300})
            .moveDown();

        doc.circle(100, 320, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("#2e6ca7", "#fff")
            .moveDown();

        doc.image(ventaja1, 88, 308, {width: 25})

        doc
            .fontSize(11)
            .fillColor('#163461')
            .text(productSelected.adventage1,
            140, 303,  
            {
                width:350,
                align: 'center'    
            })

        doc.circle(100, 380, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("#f8c901", "#fff")
            .moveDown();

        doc.image(ventaja2, 88, 368, {width: 30})

        doc
            .fontSize(11)
            .fillColor('#163461')
            .text(productSelected.adventage2,
            140, 363,  
            {
                width:350,
                align: 'center'    
            })

        doc.circle(100, 440, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("#ff9f0f", "#fff")
            .moveDown();

        doc.image(ventaja3, 88, 428, {width: 30})

        doc
            .fontSize(11)
            .fillColor('#163461')
            .text(productSelected.adventage3,
            140, 423,  
            {
                width:350,
                align: 'center'    
            })

        doc.circle(100, 500, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("#24abb1", "#fff")
            .moveDown();

        doc.image(ventaja4, 88, 488, {width: 30})

        doc
            .fontSize(11)
            .fillColor('#163461')
            .text(productSelected.adventage4,
            140, 483,  
            {
                width:350,
                align: 'center'    
            })

        doc.circle(100, 560, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("#ff6510", "#fff")
            .moveDown();

        doc.image(ventaja5, 88, 548, {width: 30})

        doc
            .fontSize(11)
            .fillColor('#163461')
            .text(productSelected.adventage5,
            140, 543,  
            {
                width:350,
                align: 'center'    
            })

        doc
            .image(logo, 200, 700, {width: 200})

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

        doc.circle(330, 60, 25)
            .lineWidth(3)
            .fillOpacity(0.98)
            .fillAndStroke("white", "#f6f6f6")
            .moveDown();

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 130, cuadrado[0], cuadrado[1]).fill('#ecc101');

        doc.circle(330, 200, 25)
            .lineWidth(3)
            .fillOpacity(0.98)
            .fillAndStroke("white", "#f6f6f6")

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

        doc.circle(330, 340, 25)
            .lineWidth(3)
            .fillOpacity(0.98)
            .fillAndStroke("white", "#f6f6f6")

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

        doc.circle(330, 480, 25)
            .lineWidth(3)
            .fillOpacity(0.98)
            .fillAndStroke("white", "#f6f6f6")
            .moveDown();

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

        doc.circle(330, 640, 25)
            .lineWidth(3)
            .fillOpacity(0.98)
            .fillAndStroke("white", "#f6f6f6")
            .moveDown();

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
        
        doc.circle(330, 760, 25)
            .lineWidth(3)
            .fillOpacity(0.98)
            .fillAndStroke("white", "#f6f6f6")

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

        doc.circle(330, 60, 25)
            .lineWidth(3)
            .fillOpacity(0.98)
            .fillAndStroke("white", "#f6f6f6")
            .moveDown();

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 140, cuadrado[0], cuadrado[1]).fill('#ecc101');

        doc.circle(330, 210, 25)
            .lineWidth(3)
            .fillOpacity(0.98)
            .fillAndStroke("white", "#f6f6f6")

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
            .fillColor('#fff')
            .text(productSelected.market9, 40, 10, {width: 200})
            .moveDown();

        doc
            .fontSize(10)
            .fillColor('#fff')
            .font('Helvetica-Oblique')
            .text(productSelected.description_market9, 40, 60, {width: 210})
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

        doc.image(pathImage1, 185, 380, {width: 30})

        doc.lineJoin('miter')
            .rect(301, 350, 200, 200).fill('#f8c901');

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
        
        doc.image(pathImage3, 185, 580, {width: 30})

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

        doc.image(pathImage4, 380, 565, {width: 40})

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

        doc.image(pathImage5, 121, 776, {width: 40})

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

        doc 
            .fontSize(20)
            .fillColor('#163461')
            .text('Tips comerciales', 50, 50)

        doc
            .fillColor('#016cb2')
            .fontSize(12)
            .image(pathImage6, 240, 40, {width: 200})
            .link(240, 40, 200, 105, `${productSelected.url_video}`)

        doc.lineJoin('VentajasCompetitivas')
            .rect(0, 200, fullDocH, 60).fill('#2e6ca7');

        doc
            .fillColor('#fff')
            .fontSize(30)
            .text('Ventajas competitivas', 170,218, {width:300})
            .moveDown();

        doc.circle(100, 320, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("#2e6ca7", "#fff")
            .moveDown();

        doc.image(ventaja1, 88, 308, {width: 25})

        doc
            .fontSize(11)
            .fillColor('#163461')
            .text(productSelected.adventage1,
            140, 303,  
            {
                width:350,
                align: 'center'    
            })

        doc.circle(100, 380, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("#f8c901", "#fff")
            .moveDown();

        doc.image(ventaja2, 88, 368, {width: 30})

        doc
            .fontSize(11)
            .fillColor('#163461')
            .text(productSelected.adventage2,
            140, 363,  
            {
                width:350,
                align: 'center'    
            })

        doc.circle(100, 440, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("#ff9f0f", "#fff")
            .moveDown();

        doc.image(ventaja3, 88, 428, {width: 30})

        doc
            .fontSize(11)
            .fillColor('#163461')
            .text(productSelected.adventage3,
            140, 423,  
            {
                width:350,
                align: 'center'    
            })

        doc.circle(100, 500, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("#24abb1", "#fff")
            .moveDown();

        doc.image(ventaja4, 88, 488, {width: 30})

        doc
            .fontSize(11)
            .fillColor('#163461')
            .text(productSelected.adventage4,
            140, 483,  
            {
                width:350,
                align: 'center'    
            })

        doc.circle(100, 560, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("#ff6510", "#fff")
            .moveDown();

        doc.image(ventaja5, 88, 548, {width: 30})

        doc
            .fontSize(11)
            .fillColor('#163461')
            .text(productSelected.adventage5,
            140, 543,  
            {
                width:350,
                align: 'center'    
            })

        doc
            .image(logo, 200, 700, {width: 200})

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

        doc.circle(330, 60, 25)
            .lineWidth(3)
            .fillOpacity(0.98)
            .fillAndStroke("white", "#f6f6f6")
            .moveDown();

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 130, cuadrado[0], cuadrado[1]).fill('#ecc101');

        doc.circle(330, 200, 25)
            .lineWidth(3)
            .fillOpacity(0.98)
            .fillAndStroke("white", "#f6f6f6")

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

        doc.circle(330, 340, 25)
            .lineWidth(3)
            .fillOpacity(0.98)
            .fillAndStroke("white", "#f6f6f6")

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

        doc.circle(330, 480, 25)
            .lineWidth(3)
            .fillOpacity(0.98)
            .fillAndStroke("white", "#f6f6f6")
            .moveDown();

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

        doc.circle(330, 640, 25)
            .lineWidth(3)
            .fillOpacity(0.98)
            .fillAndStroke("white", "#f6f6f6")
            .moveDown();

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
        
        doc.circle(330, 760, 25)
            .lineWidth(3)
            .fillOpacity(0.98)
            .fillAndStroke("white", "#f6f6f6")

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

        doc.circle(330, 60, 25)
            .lineWidth(3)
            .fillOpacity(0.98)
            .fillAndStroke("white", "#f6f6f6")
            .moveDown();

        doc.lineJoin('miter')
            .rect(fullDocH / 1.8, 140, cuadrado[0], cuadrado[1]).fill('#ecc101');

        doc.circle(330, 210, 25)
            .lineWidth(3)
            .fillOpacity(0.98)
            .fillAndStroke("white", "#f6f6f6")

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

        doc.image(pathImage1, 185, 380, {width: 30})

        doc.lineJoin('miter')
            .rect(301, 350, 200, 200).fill('#f8c901');

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
        
        doc.image(pathImage3, 185, 580, {width: 30})

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

        doc.image(pathImage4, 380, 565, {width: 40})

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

        doc.image(pathImage5, 121, 776, {width: 40})

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

        doc 
            .fontSize(20)
            .fillColor('#163461')
            .text('Tips comerciales', 50, 50)

        doc
            .fillColor('#016cb2')
            .fontSize(12)
            .image(pathImage6, 240, 40, {width: 200})
            .link(240, 40, 200, 105, `${productSelected.url_video}`)

        doc.lineJoin('VentajasCompetitivas')
            .rect(0, 200, fullDocH, 60).fill('#2e6ca7');

        doc
            .fillColor('#fff')
            .fontSize(30)
            .text('Ventajas competitivas', 170,218, {width:300})
            .moveDown();

        doc.circle(100, 320, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("#2e6ca7", "#fff")
            .moveDown();

        doc.image(ventaja1, 88, 308, {width: 25})

        doc
            .fontSize(11)
            .fillColor('#163461')
            .text(productSelected.adventage1,
            140, 303,  
            {
                width:350,
                align: 'center'    
            })

        doc.circle(100, 380, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("#f8c901", "#fff")
            .moveDown();

        doc.image(ventaja2, 88, 368, {width: 30})

        doc
            .fontSize(11)
            .fillColor('#163461')
            .text(productSelected.adventage2,
            140, 363,  
            {
                width:350,
                align: 'center'    
            })

        doc.circle(100, 440, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("#ff9f0f", "#fff")
            .moveDown();

        doc.image(ventaja3, 88, 428, {width: 30})

        doc
            .fontSize(11)
            .fillColor('#163461')
            .text(productSelected.adventage3,
            140, 423,  
            {
                width:350,
                align: 'center'    
            })

        doc.circle(100, 500, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("#24abb1", "#fff")
            .moveDown();

        doc.image(ventaja4, 88, 488, {width: 30})

        doc
            .fontSize(11)
            .fillColor('#163461')
            .text(productSelected.adventage4,
            140, 483,  
            {
                width:350,
                align: 'center'    
            })

        doc.circle(100, 560, 25)
            .lineWidth(3)
            .fillOpacity(0.95)
            .fillAndStroke("#ff6510", "#fff")
            .moveDown();

        doc.image(ventaja5, 88, 548, {width: 30})

        doc
            .fontSize(11)
            .fillColor('#163461')
            .text(productSelected.adventage5,
            140, 543,  
            {
                width:350,
                align: 'center'    
            })

        doc
            .image(logo, 200, 700, {width: 200})
    }

    
    


    doc.pipe(res)
    doc.end();

}

export {
    pdfGenerator
}