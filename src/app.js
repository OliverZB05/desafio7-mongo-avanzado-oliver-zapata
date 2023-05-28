//========={ Dependencias }=========
import express from 'express';
import mongoose from 'mongoose';
import exphbs from 'express-handlebars';
//========={ Dependencias }=========

//========={ Dirname }=========
import __dirname from './utils.js';
//========={ Dirname }=========

//========={ Routers }=========
import cartsRouter from './routes/api/carts.router.js';
import productsRouter from './routes/api/products.router.js';
import viewsProductRouter from './routes/web/views.products.js';
import viewsIndexRouter from './routes/web/views.index.js'
//========={ Routers }=========

import { Server } from "socket.io";
import { getProducts } from './routes/web/views.products.js';
import { getCart } from './routes/web/views.products.js';

const app = express();

app.use(express.json());  
app.use(express.urlencoded({ extended: true }));

const hbs = exphbs.create({
    helpers: {
    debug: function (value) {
        console.log("Current Context");
        console.log("====================");
        console.log(this);

        if (value) {
        console.log("Value");
        console.log("====================");
        console.log(value);
        }
    },
    },
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.set("view engine", "handlebars");
app.use(express.static(__dirname+"/public"));
app.use("/", viewsProductRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsIndexRouter);

const environment = async () => {
    try {
        await mongoose.connect('mongodb+srv://oliverzapata_arg:bxhp_bVE7c_DebEeSfFDÑñC_r@ecommerce.qe4ogkk.mongodb.net/?retryWrites=true&w=majority');
        } catch (error) {
            console.log(error);
        }
}


async function main() {
    await environment();
}

main();

const server = app.listen(8080);
const io = new Server(server);

app.on('cartUpdated', async cartId => {
const productsData = await getProducts();
io.emit('products', productsData.products);

const cartData = await getCart(cartId);
io.emit('cart', cartData.products);
});


app.set('socketio', io);
io.sockets.setMaxListeners(20);


app.set('socketio', io);
io.sockets.setMaxListeners(20);
