import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Ruta 1: /users  -> entrega la lista tal cual (formato JSON)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // Ruta 2: /users/bonito  -> entrega la lista en tarjetas de colores
  @Get('bonito')
  verBonito() {
    const tarjetas = this.usersService
      .findAll()
      .map(
        (u) => `
        <div class="tarjeta">
          <h2>${u.nombre}</h2>
          <p>${u.correo}</p>
        </div>`,
      )
      .join('');

    return `
      <meta charset="utf-8">
      <style>
        body { font-family: Arial; background: #1a1b26; color: white; padding: 40px; }
        h1 { color: #a33378; }
        .tarjeta { background: #252738; padding: 20px; border-radius: 12px; margin-bottom: 16px; }
        .tarjeta h2 { margin: 0 0 8px; }
        .tarjeta p { margin: 0; color: #a9adc1; }
      </style>
      <h1>Lista de usuarios</h1>
      ${tarjetas}
    `;
  }
}