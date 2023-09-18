/*
    Agregamos seis campos a la tabla producto, dos para videos y 4 para enlaces opcionales.
*/

alter table Products
  add videoExtra1 varchar(200) null,
  add urlExtra1 varchar(200) null,
  add urlExtra2 varchar(200) null,
  add urlExtra3 varchar(200) null,
  add etiquetaEnlace1 varchar(200) null,
  add etiquetaEnlace2 varchar(200) null,
  add etiquetaEnlace3 varchar(200) null,

  alter table Products
  drop videoExtra1, drop urlExtra1, drop urlExtra2, drop urlExtra3; 

  ALTER TABLE Products ALTER COLUMN market1 VARCHAR (50); 

  ALTER TABLE Products
    MODIFY COLUMN market1 VARCHAR(50);  

     doc.lineJoin('fondoazul')
            .rect(40, 520, 175, 55).fill('#2e6ca7');

        doc 
            .fontSize(20)
            .fillColor('#fff')
            .text('Tips comerciales', 50, 540)

        doc 
            .fontSize(20)
            .fillColor('#575756')
            .text('Conoce los tips de venta de este producto en el siguiente video.', 50, 620, {width: 230} )

        doc
            .fillColor('#016cb2')
            .fontSize(12)
            .image(pathImage6, 300, 600, {width: 200})
            .link(300, 600, 200, 105, `${productSelected.url_video}`)

    
