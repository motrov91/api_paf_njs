import express from 'express';
import cors from 'cors';
import users from './routes/users_routes.js';
import auths from './routes/auths_routes.js';
import brands from './routes/brands_routes.js';
import categories from './routes/category_routes.js'
import products from './routes/products_routes.js'
import db from './config/db.js';
import bodyParser from "body-parser";

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

//App routes
app.use('/user', users);
app.use('/auth', auths);
app.use('/brand', brands);
app.use('/category', categories);
app.use('/product', products);



//Port
app.listen(process.env.PORT_SERVER);
console.log('Server up in port ', process.env.PORT_SERVER );

