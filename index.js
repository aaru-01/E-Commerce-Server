import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/product.js'

dotenv.config();



const app = express();
app.use(express.json())





const connectMongoDB = async () => {
    const conn = await mongoose.connect(process.env.MONGODB_URI)
    if (conn) {
        console.log('MongoDB connected sucessfully..');
    }
};

connectMongoDB();

// pass product name via query
// app.get('/product', (req, res) => {

//     const { name, price } = req.query;

//     res.json({
//         message: `product name is ${name} and price is ${price}`
//     })
// });

app.get('/product',async (req, res)=>{
    const prodFind = await Product.findOne()
    res.json({

        data: prodFind,
        message: 'Sucessfully fetched all students',
    })
})


// find all data using get method
app.get('/products', async (req, res) => {
    const prodFind = await Product.find()
    res.json({

        data: prodFind,
        message: 'Sucessfully fetched all students',
    })
});


// app.delete('/products',(req, res)=>{
// const {id} = req.params;


// })


// delete data
app.delete('/product/:_id',async (req, res)=>{
    // ye 3 tarike hai
// const {id} = req.body;
// const {id} = req.query;
const {_id} = req.params;

// const deleteResponse=
await Product.deleteOne({_id: _id});

res.json({
    success: true,
    data:{},
    message: `Successfully deleted product with id ${_id}`
})
});



app.put('/product/:_id', async (req, res) => {

    const { _id } = req.params;
    const { name, description, price, productImage, brand } = req.body;

    if (!name) {
        return res.json({
            sucess: false,
            message: 'Name is required',
        })
    }

    if (!description) {
        return res.json({
            sucess: false,
            message: 'description is required',
        })
    }

    if (!price) {
        return res.json({
            sucess: false,
            message: 'price is required',
        })
    }

    if (!productImage) {
        return res.json({
            sucess: false,
            message: 'productImage is required',
        })
    }
    if (!brand) {
        return res.json({
            sucess: false,
            message: 'brand is required',
        })
    }


    // const updateResponse =
 await Product.updateOne(
    {_id: _id},
    {$set: {
        name:name,
        description:description,
        price:price,
        productImage:productImage,
        brand: brand,
    }})

const updatedProduct = await Product.findOne({_id: _id})
    



    res.json({
        sucess: true,
        data: updatedProduct,
        message: 'product is updated'
    })
});

app.patch('/product/:_id', async(req,res)=>{
    const { _id } = req.params;
    const { name, description, price, productImage, brand } = req.body;

    // findById(_id) also use
    // findOne({ _id:  _id})
    const product = await Product.findById(_id);

    if(name){
        product.name = name;
    }

    if(description){
        product.description = description;
    }

    if(price){
        product.price = price;
    }
    if(productImage){
        product.productImage = productImage;
    }
    if( brand){
        product.brand =  brand;
    }

    const updatedProduct = await product.save();

    res.json({
        success:true,
        data:updatedProduct,
        message:`Sucessfully updated`,
    })
})

// add data using post method
app.post('/product', async (req, res) => {
    const { name, description, price, productImage, brand } = req.body;

    if (!name) {
        return res.json({
            sucess: false,
            message: 'Name is required',
        })
    }

    if (!description) {
        return res.json({
            sucess: false,
            message: 'description is required',
        })
    }

    if (!price) {
        return res.json({
            sucess: false,
            message: 'price is required',
        })
    }

    if (!productImage) {
        return res.json({
            sucess: false,
            message: 'productImage is required',
        })
    }
    if (!brand) {
        return res.json({
            sucess: false,
            message: 'brand is required',
        })
    }



    // model 
    const prod = new Product({
        name: name,
        description: description,
        price: price,
        productImage: productImage,
        brand: brand
    })


    const saveStudent = await prod.save();

    res.json({
        sucess: true,
        data: saveStudent,
        message: 'Sucessfully added new product',
    })
});







const PORT = 5000;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})