import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Productos } from '../interfaces/productos.interfaces';
import { CreateProductosDto} from '../dto/productos.dto';
  
@Injectable() 
export class ProductosService {
constructor(@InjectModel('Productos')private readonly productoModel: Model<Productos>  ){}

 async getProductos(): Promise<Productos[]> {
   const producto  = await this.productoModel.find()
   return producto;
 };

 async getProducto(id?: string): Promise<Productos>{
      const producto = await  this.productoModel.findById(id)
      return producto;
  };

 async createProducto(createProductoDTO: CreateProductosDto): Promise<Productos>{
    const producto = new this.productoModel(createProductoDTO)
    return await producto.save()
 };
 
  async updateProductos(id: string, createProductoDTO: CreateProductosDto ): Promise<Productos>{
     const updateProductos =  await this.productoModel.findByIdAndUpdate(id , this.createProducto,
      {new:true} )   
      return updateProductos;
  };

  async deleteProductos(id: string): Promise<Productos>{
    const deleteProducto = await this.productoModel.findByIdAndDelete(id)
    return deleteProducto;
  }
} 
