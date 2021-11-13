
import {Schema } from 'mongoose'
export const ProductosSchema = new Schema({
   name:String,
   brand:String,
   description:String,
   imageURL:String,
   price:Number,
   createAt:{
       type:Date, 
       default:Date.now
   }
})