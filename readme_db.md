/*
    Agregamos seis campos a la tabla producto, dos para videos y 4 para enlaces opcionales.
*/

alter table Products
  add videoExtra1 varchar(200) null,
  add videoExtra2 varchar(200) null,
  add urlExtra1 varchar(200) null,
  add urlExtra2 varchar(200) null,
  add urlExtra3 varchar(200) null,
  add urlExtra4 varchar(200) null;

  alter table Products
  drop videoExtra1, drop urlExtra1, drop urlExtra2, drop urlExtra3; 

  ALTER TABLE Products ALTER COLUMN market1 VARCHAR (50); 

  ALTER TABLE Products
    MODIFY COLUMN market1 VARCHAR(50);  

    
