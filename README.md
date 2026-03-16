# Gestión de Proyectos - Prueba técnica Seicho

Aplicación web fullstack para gestión de proyectos y trabajadores, desarrollada con Next.js, Prisma y SQLite.

## Funcionalidades

- Crear y listar proyectos
- Crear y listar trabajadores
- Asignar trabajadores a proyectos
- Visualizar información de un proyecto y sus trabajadores asignados
- Endpoints implementados para eliminar proyectos y trabajadores (pendiente de integración en frontend)

## Requisitos previos

- Node.js 20 o superior
- npm

## Cómo ejecutar el proyecto

1. **Clonar el repositorio y acceder al directorio**
   ```bash
   git clone <url-del-repositorio>
   cd prueba-tecnica-seicho
   ```

2. **Instalar dependencias**
    ```bash
    npm install
    ```

3. **Configurar las variables de entorno**
   Crear archivo de entorno a partir del ejemplo:
    ```bash
   cp .env.example .env
    ```

    Abrir el archivo `.env` y agregar la URL de conexión a SQLite:
    ```bash
    DATABASE_URL="file:./seicho.db"
   ```

   Este archivo no se sube a Git, por lo que debe ser creado localmente.


4. **Ejecutar migraciones de Prisma**
   ```bash
   npx prisma migrate dev
   ```

5. **Iniciar el servidor de desarrollo**
    ```bash
    npm run dev
    ```

6. **Abrir la aplicación**
   ```
   http://localhost:3000
   ```


### Tecnologías utilizadas
- **Next.js con App Router**: Por ser el estándar actual.
- **Prisma ORM con SQLite**: Elegido por su simplicidad.
- **Tailwind CSS**: Para estilo moderno además de ser otro estándar.

### Prioridades
- **Funcionalidad**: Asegurar que las operaciones básicas (crear, asignar y listar) funcionaran correctamente.
- **Orden**: Separación clara de responsabilidades en carpetas (`/api`, `/components`, `/lib`).
- **Escalabilidad**.

### Aspectos mejorables
- **Roles dinámicos**: Actualmente los roles y seniorities están hardcodeados. Una mejora sería almacenarlos en base de datos para permitir que un administrador los gestione dinámicamente.
- **Formato de visualización**: Los valores de rol como "backend" podrían transformarse en "Backend" para una mejor visualización. 
- **Eliminación en frontend**: Los endpoints DELETE para proyectos y trabajadores están implementados, pero no hay interfaz para usarlos.
- **Diseño**: Se priorizó funcionalidad sobre estética; hay margen para mejorar la interfaz visual.

## Respuestas sobre escalabilidad

### ¿Cómo escalarías este sistema si tuviera 10.000 proyectos?
Cambiar a una base de datos en la nube.
Agregar búsqueda por nombre de proyecto o cliente, y filtros por fechas.

### ¿Qué cambiarías si múltiples usuarios lo usaran al mismo tiempo?

- **Autenticación**: Implementar sistema de login y registro.

### ¿Cómo agregarías permisos por rol?

Implementaría un sistema con tres roles:

- **Administrador**: Acceso completo a todos los proyectos y trabajadores.
- **Gerente de proyecto**: Puede administrar solo los proyectos que tiene asignados.
- **Miembro**: Solo puede visualizar los proyectos en los que participa.

A nivel técnico, sería necesario implementar un middleware de autorización para verificar los roles e iria de la mano
con la autentificación.

## Mejoras futuras
Además de lo ya mencionado si tuviera mas tiempo agregaría mas aspectos de diseño como modo oscuro y claro,
mejora de la interfaz para dispositivos móviles, etc.

---

Nota: El tiempo estimado fue de 3.5 - 4 horas.