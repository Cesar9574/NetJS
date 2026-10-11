import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  private products = [
    { id: 1, nombre: 'Producto de prueba', precio: 100 },
  ];

  findAll() {
    return this.products;
  }
}