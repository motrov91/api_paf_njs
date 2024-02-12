import express from 'express';
import cors from 'cors';
import users from './routes/users_routes.js';
import auths from './routes/auths_routes.js';
import brands from './routes/brands_routes.js';
import categories from './routes/category_routes.js'
import products from './routes/products_routes.js'
import uploads from './routes/uploads.js'
import reports from './routes/reports.js'
import db from './config/db.js';
import bodyParser from "body-parser";
import fileUpload from 'express-fileupload';

//Create server
const app = express();


//Enable body-parser to JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}))


//db connection
try {
    await db.authenticate();
    db.sync()
    console.log('db conection successfuly')
} catch ( error ) {
    console.log(error)
}

app.use(cors());

//Upload files
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir: '/tmp/',
    //Create dynamically the folder
    createParentPath: true
}))

//App routes
app.use('/user', users);
app.use('/auth', auths);
app.use('/brand', brands);
app.use('/category', categories);
app.use('/product', products);
app.use('/uploads', uploads)
app.use('/reports', reports)



//Port
app.listen(process.env.PORT || 3000);
console.log('Server up in port ', process.env.PORT );

