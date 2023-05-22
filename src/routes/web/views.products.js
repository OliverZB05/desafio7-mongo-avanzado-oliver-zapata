import {Router} from 'express';
import { productModel } from "../../dao/models/products.js";
import { cartsModel } from "../../dao/models/carts.js";

const router = Router();


/* router.get("/products", async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Número de página actual
    const limit = parseInt(req.query.limit) || 3; // Número de documentos por página
    const skip = (page - 1) * limit; // Número de documentos a omitir

    const products = await productModel.find().skip(skip).limit(limit);
    const productsArray = products.map(product => product.toObject());
    const totalProducts = await productModel.countDocuments();
    const totalPages = Math.ceil(totalProducts / limit);

    res.render("products", {
    products: productsArray,
    page,
    totalPages,
    prevPage: page > 1 ? page - 1 : null,
    nextPage: page < totalPages ? page + 1 : null
    });
}); */

async function getProducts(page = 1, limit = 3) {
    const skip = (page - 1) * limit;
    const products = await productModel.find().skip(skip).limit(limit);
    const productsArray = products.map(product => product.toObject());
    const totalProducts = await productModel.countDocuments();
    const totalPages = Math.ceil(totalProducts / limit);

    return {
    products: productsArray,
    page,
    totalPages,
    prevPage: page > 1 ? page - 1 : null,
    nextPage: page < totalPages ? page + 1 : null
    };
}

router.get("/products", async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;

    const data = await getProducts(page, limit);

    res.render("products", data);
});

async function getCart(cartId, page = 1, limit = 3) {
    const skip = (page - 1) * limit;
    const cart = await cartsModel.findById(cartId).populate('products.product');
    if (!cart) {
    throw new Error('Cart not found');
    }

    const products = cart.products.map(p => ({
    id: p.product.id,
    title: p.product.title,
    price: p.product.price,
    quantity: p.quantity
    }));
    const paginatedProducts = products.slice(skip, skip + limit);
    const totalProducts = products.length;
    const totalPages = Math.ceil(totalProducts / limit);

    return {
    products: paginatedProducts,
    page,
    totalPages,
    prevPage: page > 1 ? page - 1 : null,
    nextPage: page < totalPages ? page + 1 : null
    };
}

router.get("/carts/:cid", async (req, res) => {
    const cartId = req.params.cid;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;

    try {
    const data = await getCart(cartId, page, limit);
    res.render("cart", data);
    } catch (error) {
    res.status(404).send({ error: error.message });
    }
});


/* router.get("/carts/:cid", async (req, res) => {
    const cartId = req.params.cid;
    const page = parseInt(req.query.page) || 1; // Número de página actual
    const limit = parseInt(req.query.limit) || 3; // Número de documentos por página
    const skip = (page - 1) * limit; // Número de documentos a omitir

    const cart = await cartsModel.findById(cartId).populate('products.product');
    if (!cart) {
    return res.status(404).send({ error: 'Cart not found' });
    }

    // Agrega un mensaje de registro para imprimir el contenido del carrito
    console.log('Cart:', cart);

    const products = cart.products.map(p => ({
    id: p.product.id,
    title: p.product.title,
    price: p.product.price,
    quantity: p.quantity
    }));
    const paginatedProducts = products.slice(skip, skip + limit);
    const totalProducts = products.length;
    const totalPages = Math.ceil(totalProducts / limit);

    res.render("cart", {
    products: paginatedProducts,
    page,
    totalPages,
    prevPage: page > 1 ? page - 1 : null,
    nextPage: page < totalPages ? page + 1 : null
    });
}); */




export default router;
export {getProducts};
export {getCart};