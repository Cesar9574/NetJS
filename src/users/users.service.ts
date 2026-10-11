import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, nombre: 'Usuario de prueba', correo: 'prueba@mail.com' },
  ];

  findAll() {
    return this.users;
  }
}