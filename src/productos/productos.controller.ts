import { Controller, Get , Post , Put , Delete , Res , Body, Query , HttpStatus,
    Param , NotFoundException , Next} from '@nestjs/common';
    import { ProductosService } from '../productos/productos.service';
    import { CreateProductosDto } from '../dto/productos.dto';

@Controller('productos')
export class ProductosController {
    
constructor(private productosService: ProductosService){}

@Get('/get')
async getProdutos(@Res() res , @Next() next ){
    try{
        const productos =  await this.productosService.getProductos();
        return res.status(HttpStatus.OK).json({
            massage:'Productos Obtenido',
            productos
        })
    }catch(e){return next(e)}
 
};

@Get('/:id')
 async getProducto(@Res() res, @Param('id') id , @Next() next){
     try{ const producto = await this.productosService.getProducto(id)
        if(!producto)throw new NotFoundException('Producto Agotado!')
        return res.status(HttpStatus.OK).json({
            massage:'Producto Obtenido!',
            producto
        })
      } catch(e){ 
          return next(e)
       } 
};

 @Post('/add')
 async createAdd(@Res() res , @Body() createProductos: CreateProductosDto , @Next() next ){
    try{
        const producto = await this.productosService.createProducto(createProductos);
        res.status(HttpStatus.OK).json({
            massage:'Producto Agregado!',
            producto
        })
    }catch(e){
        return next(e)
    }
 };

 @Put('/update')
 async update(@Body() createProductoDTO: CreateProductosDto, @Res() res, @Query('id') id , @Next() next){
     try{
      const editProducto =  await  this.productosService.updateProductos(id , createProductoDTO)
      if(!editProducto) throw new NotFoundException('Producto No Existe!')
      res.status(HttpStatus.OK).json({
          massage:'Producto Actualizado!',
          editProducto
      })
     }catch(e){ return next(e)}
 };

  @Delete('/:id')
  async deleteProducto(@Res() res, @Query('id') id  , @Next() next) {
      try{
       const deleteProductos = await  this.productosService.deleteProductos(id);
       if(!deleteProductos) throw new NotFoundException('Producto No Existe!')
       res.status(HttpStatus.OK).json({
           massage:'El Producto Ha Sido Elimindo!',
           deleteProductos
       })
      }catch(e){
          return next(e)
      }

  };
}
