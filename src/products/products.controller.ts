import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // Ruta 1: /products  -> entrega la lista tal cual (formato JSON)
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  // Ruta 2: /products/bonito  -> entrega la lista en tarjetas de colores
  @Get('bonito')
  verBonito() {
    const tarjetas = this.productsService
      .findAll()
      .map(
        (p) => `
        <div class="tarjeta">
          <h2>${p.nombre}</h2>
          <p>Q${p.precio}</p>
        </div>`,
      )
      .join('');

    return `
      <meta charset="utf-8">
      <style>
        body { font-family: Arial; background: #1a1b26; color: white; padding: 40px; }
        h1 { color: #4fd1c5; }
        .tarjeta { background: #252738; padding: 20px; border-radius: 12px; margin-bottom: 16px; }
        .tarjeta h2 { margin: 0 0 8px; }
        .tarjeta p { margin: 0; color: #a9adc1; }
      </style>
      <h1>Lista de productos</h1>
      ${tarjetas}
    `;
  }
}
