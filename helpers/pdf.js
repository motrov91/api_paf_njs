import { Product } from '../models/index_model.js';
import pdf from 'pdfkit';
import imageToBase from 'image-to-base64';

import {fileURLToPath} from 'url';
import path from 'path';

const pdfGenerator = async (req, res) => {

    const productSelected = await Product.findByPk(req.params.id);

    console.log('PRODUCT SELECTED', productSelected)

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

    console.log(`dir ${pathImage1}`)

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
    const cuadrado = [291, 1100]

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
        .fontSize(18)
        .fillColor('#ffffff')
        .text(productSelected.market1, 380, 10, {width: 200})
        .moveDown();

    doc
        .fontSize(12)
        .fillColor('#ffffff')
        .font('Helvetica-Oblique')
        .text(productSelected.description_market1, 380, 40)
        .moveDown();

    doc.circle(330, 100, 25)
        .lineWidth(3)
        .fillOpacity(0.98)
        .fillAndStroke("white", "#f6f6f6")
        .moveDown();

    doc.lineJoin('miter')
        .rect(fullDocH / 1.8, 210, cuadrado[0], cuadrado[1]).fill('#ecc101');

    doc.circle(330, 320, 25)
        .lineWidth(3)
        .fillOpacity(0.98)
        .fillAndStroke("white", "#f6f6f6")

    doc
        .fontSize(18)
        .fillColor('#285258')
        .text(productSelected.market2, 380, 220, {width: 200})
        .moveDown();

    doc
        .fontSize(12)
        .fillColor('#285258')
        .font('Helvetica-Oblique')
        .text(productSelected.description_market2, 380, 250)
        .moveDown();

    doc.lineJoin('miter')
        .rect(fullDocH / 1.8, 420, cuadrado[0], cuadrado[1]).fill('#25acb1');

    doc.circle(330, 530, 25)
        .lineWidth(3)
        .fillOpacity(0.98)
        .fillAndStroke("white", "#f6f6f6")

    doc
        .fontSize(18)
        .fillColor('#fff')
        .text(productSelected.market3, 380, 430, {width: 200})
        .moveDown();

    doc
        .fontSize(12)
        .fillColor('#fff')
        .font('Helvetica-Oblique')
        .text(productSelected.description_market3, 380, 460)
        .moveDown();

    doc.lineJoin('miter')
        .rect(fullDocH / 1.8, 630, cuadrado[0], cuadrado[1]).fill('#ff9f0f');

    doc.circle(330, 740, 25)
        .lineWidth(3)
        .fillOpacity(0.98)
        .fillAndStroke("white", "#f6f6f6")
        .moveDown();

    doc
        .fontSize(18)
        .fillColor('#fff')
        .text(productSelected.market4, 380, 650, {width: 200})
        .moveDown();

    doc
        .fontSize(12)
        .fillColor('#fff')
        .font('Helvetica-Oblique')
        .text(productSelected.description_market4, 380, 690)
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
        .text('is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled',
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
        .text('is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled',
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
        .text('is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled',
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
        .text('is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled',
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
        .text('is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled',
        140, 343,  
        {
            width:350,
            align: 'center'    
        })



    doc.pipe(res)
    doc.end();
}

export {
    pdfGenerator
}