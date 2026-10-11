# API Práctica con NestJS

Ejercicio para crear una API con **NestJS** que tiene dos secciones: **usuarios** y **productos**. Cada sección responde en dos formatos: JSON (lista cruda) y una página con tarjetas de colores.

> **Analogía:** NestJS es como armar un restaurante.
> - **Módulo** = una sección del restaurante.
> - **Controlador** = el mesero (recibe los pedidos).
> - **Servicio** = el cocinero (prepara lo que se pide).

---

## Requisitos

- Node.js instalado
- Una terminal (por ejemplo, la de VS Code)

---

## Paso 1. Instalar Node.js

Revisa si ya lo tienes:

```bash
node -v
```

### Windows

```bash
winget install OpenJS.NodeJS.LTS
```

Comprueba que quedó instalado:

```bash
node -v
npm -v
```

### Linux (Ubuntu)

Actualiza la lista de programas disponibles:

```bash
sudo apt update
```

Agrega el repositorio oficial de Node.js (el de Ubuntu suele traer una versión vieja):

```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
```

Instala Node.js (npm viene incluido):

```bash
sudo apt install -y nodejs
```

Comprueba que quedó instalado:

```bash
node -v
npm -v
```

---

## Paso 2. Crear el proyecto

Instala la herramienta de NestJS en la computadora (solo se hace una vez). Es como conseguir las llaves del restaurante:

```bash
npm i -g @nestjs/cli
```

Crea el proyecto con todo lo básico ya armado. Es como construir el restaurante vacío:

```bash
nest new api-practica
```

Entra a la carpeta del proyecto:

```bash
cd api-practica
```

Al crear el proyecto, `nest new` hace unas preguntas. Muévete con las flechas del teclado y presiona Enter:

| Pregunta | Qué elegir |
|---|---|
| Gestor de paquetes | `npm` |
| @nestjs/observe | `No` (no hace falta para el ejercicio) |
| Sistema de módulos | `CJS (CommonJS) with jest` |

> ⚠️ **No** elijas ESM, porque el código de abajo no funciona con esa opción.

---

## Paso 3. Abrir la carpeta en VS Code

1. Arriba a la izquierda: **Open Folder**.
2. Elige la carpeta `api-practica`.
3. Abre una terminal nueva.

---

## Paso 4. Crear las piezas de usuarios

En la terminal escribe, una por una:

Crea la sección "usuarios" del restaurante (el módulo):

```bash
nest g module users
```

Crea al mesero de esa sección (el controlador), que recibe los pedidos:

```bash
nest g controller users
```

Crea al cocinero de esa sección (el servicio), que prepara lo que se pide:

```bash
nest g service users
```

En el explorador de la izquierda abre `src > users`. Ahí aparecieron los archivos nuevos.

---

## Paso 5. Código del servicio de usuarios (el cocinero)

Abre `src/users/users.service.ts`, borra todo y pega esto:

```ts
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
```

---

## Paso 6. Código del controlador de usuarios (el mesero)

Abre `src/users/users.controller.ts`, borra todo y pega esto:

```ts
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
        h1 { color: #ff5c82; }
        .tarjeta { background: #252738; padding: 20px; border-radius: 12px; margin-bottom: 16px; }
        .tarjeta h2 { margin: 0 0 8px; }
        .tarjeta p { margin: 0; color: #a9adc1; }
      </style>
      <h1>Lista de usuarios</h1>
      ${tarjetas}
    `;
  }
}
```

Guarda los dos archivos con `Ctrl + S`.

---

## Paso 7. Encender el servidor

```bash
npm run start:dev
```

Espera a que diga `Nest application successfully started`.

---

## Paso 8. Ver el resultado

Abre estas dos direcciones en el navegador:

- http://localhost:3000/users/bonito → el usuario de prueba en una tarjeta de colores.
- http://localhost:3000/users → la misma información como lista cruda (JSON).

---

## Paso 9. Repetir con productos

Abre una **segunda terminal** y escribe:

Crea la sección "productos" del restaurante (otro módulo, separado del de usuarios):

```bash
nest g module products
```

Crea al mesero de productos (el controlador):

```bash
nest g controller products
```

Crea al cocinero de productos (el servicio):

```bash
nest g service products
```

Abre `src/products/products.service.ts`:

```ts
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
```

Luego abre `src/products/products.controller.ts`:

```ts
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
```

Direcciones para probar:

- http://localhost:3000/products/bonito
- http://localhost:3000/products

---

## Paso 10. Reto: agregar más usuarios y productos

En `users.service.ts`, agrega **10 usuarios nuevos** dentro de la lista, después del de prueba. Cada línea termina con coma. Ejemplo:

```ts
{ id: 2, nombre: 'Nombre', correo: 'nombre@mail.com' },
{ id: 3, nombre: 'Nombre', correo: 'otronombre@mail.com' },
```

En `products.service.ts`, agrega tus propios productos:

```ts
{ id: 2, nombre: 'Mouse', precio: 120 },
{ id: 3, nombre: 'Teclado', precio: 250 },
```

Guarda con `Ctrl + S` y recarga el navegador. Las tarjetas nuevas aparecen solas.

**Para personalizar:** en el controlador cambia los colores de `background` y de `h1` por los que quieras.

---

## Si algo falla

| Problema | Solución |
|---|---|
| No carga la página | Revisa que la terminal siga con `npm run start:dev` y sin errores en rojo. |
| No aparece el cambio | Falta guardar el archivo (`Ctrl + S`). |
| Sale `Cannot GET /users/bonito` | El controlador no se guardó o tiene el código incompleto. Pégalo de nuevo completo. |
| Error `Nest can't resolve dependencies` | Revisa que el servicio tenga `@Injectable()` arriba de la clase. |
| El puerto 3000 está ocupado | Cierra otra terminal que ya tenga el servidor corriendo. |
