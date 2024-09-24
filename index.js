require("dotenv").config()
const express =  require('express');
const app = express();
const morgan = require('morgan');
const mongoose=require("mongoose")
const port=process.env.PORT;
const path=require('path')
// const ejs=require('ejs');

// database connection
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use('/public/images',express.static(path.join(__dirname,'public/images'))) 



app.get("/",(req,res)=>{
    res.send("welcome to Express server");
});

//user routes
const userRoutes = require('./routes/user.route');
app.use('/api/user',userRoutes);

// otp route
const otpRoutes = require('./routes/otp.routes');
app.use("/api/otp",otpRoutes);

// product route
const productRoutes = require('./routes/product.routes');
app.use('/api/product',productRoutes);

// cart routes
const cartRoutes = require('./routes/cart.routes');
app.use('/api/cart',cartRoutes);

// order routes
const orderRoutes = require('./routes/order.routes');
app.use('/api/order',orderRoutes);

// review routes
const reviewRoutes=require('./routes/review.routes');
app.use("/api/review",reviewRoutes)

// wishlist review
const favoriteRoutes=require('./routes/wishlist.routes');
app.use("/api/wishlist",favoriteRoutes)

app.listen(port,()=>{
mongoose
.connect(process.env.MONGODB_URI)
.then(()=>console.log(`Database connection sucessfull.....`))
.catch(err=>console.log(err));
console.log("server start");
});









