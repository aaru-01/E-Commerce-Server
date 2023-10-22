import { Schema, model } from "mongoose";

const productSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    productImage: String,
    brand: String
})


const Product = model('Product', productSchema);

export default Product;