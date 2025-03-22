const { PrismaClient } =  require('@prisma/client');
const prisma = new PrismaClient();

// Get All
const getProduct = async (req, res)=> {
    try {
        const{ search, sort , order } = req.query;
        let where = {}

        // Search
        if (search) where.name = { contains: search, mode: "insensitive"}

        // Order
        let orderBy = {};
        if(sort) orderBy[sort] =  order === "desc" ? "desc":"asc";

        const products =  await prisma.product.findMany({ where , orderBy });
        res.json(products);
    } catch (error) {
        res.status(500).json({message: "Error Fetching Products"})
    }
}

// Get Product by ID
const getProductBYId = async (req,res) => {
    try {
        const product = await prisma.product.findUnique({
            where: {id: Number(req.params.id) },
        });
        // Jika tidak ditemukan
        product ? res.json(product) : res.status(400).json({message: "Product not found"})
    } catch (error) {
        res.status(500).json({message: "Error Fetching Products"})
    }
}

// Insert Product
const addProduct = async (req,res) =>{
    const { name, price, stock}=req.body;
    if(!name || !price || !stock){
        return res.status(400).json({message : "Field cannot be blank"})
    }
    try {
        const nowJakarta = new Date().toLocaleString("en-us", {timeZone:"Asia/Jakarta"});
        const product = await prisma.product.create({
            data: {
                name, 
                price: Number(price), 
                stock: Number(stock),
                // createdAt: new Date(nowJakarta),
                // updatedAt: new Date(nowJakarta)
            },            
        });
        res.json(product);
    } catch (error) {
        res.status(400).json({message: "Product Name Must be Unique",
            error : error.message,
        })
    }
}

// Update Product
const updateProduct = async (req,res) => {
    const { name, price, stock}=req.body;
    try {
        const product = await prisma.product.update({
            where: {id: Number(req.params.id)},
            data: {name, price, stock},
        });
        res.json(product);
    } catch {
        res.status(400).json({message: "Product Not Found"})
    }
}

// Delete Product
const deleteProduct = async (req,res) => {
    try {
        await prisma.product.delete({where: {id:Number(req.params.id)}});
        res.json({message : 'Deleted Sucess'});
    } catch  {
        res.status(400).json({message: "Product Not Found"})
    }
}

// Favorite
const favoriteProduct = async (req,res) => {
    const { id }=req.params;
    try {
        const product = await prisma.product.findUnique({
            where: {id: Number(id)},
        });
        const updateProduct = await prisma.product.update({
            where: {id:parseInt(id)},
            data:{
                isFavorite: !product.isFavorite,
            },
        });
        return res.status(200).json(updateProduct)
        } catch(error) {
        res.status(400).json({message: "Product Not Found", error: error.message})
    }
}
module.exports = { getProduct,getProductBYId,addProduct,deleteProduct,updateProduct, favoriteProduct };