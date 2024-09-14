# Evolución del Proyecto: De la Idea Inicial a la Solución Final

### Idea Inicial

La idea inicial del proyecto era desarrollar una aplicación de gestión de cine que incluyera funcionalidades básicas como:

- **Registro de películas**: Ingresar detalles sobre las películas a proyectar.
- **Registro de salas de proyección**: Crear y gestionar las salas donde se mostrarán las películas.
- **Horarios de proyección**: Establecer y consultar los horarios en los que se proyectarán las películas.
- **Reservaciones**: Permitir a los clientes realizar reservaciones para las proyecciones.

Las entidades principales identificadas eran **Películas**, **Salas**, **Horarios de proyección**, **Reservaciones** y **Clientes**.

### Modelado de la Base de Datos

La base de datos debía reflejar las relaciones entre estas entidades, como:
- Las películas se proyectan en una o más salas.
- Las salas tienen horarios específicos para las proyecciones.
- Los clientes pueden hacer reservaciones en horarios específicos y en salas determinadas.

### Desarrollo del Backend

El backend se construyó usando **Spring Boot** y se enfocó en crear una API REST que permitiera la interacción con los datos a través de:

- **Controladores**: Para manejar las solicitudes HTTP (por ejemplo, `GET /movies` para obtener la lista de películas).
- **Servicios**: Para gestionar la lógica de negocio, como la validación de reservaciones.
- **Repositorios**: Para interactuar con la base de datos y realizar operaciones CRUD.

### Desarrollo del Frontend

El frontend se desarrolló con **React**. Los componentes principales incluyeron:

- **MoviesList**: Para mostrar la lista de películas.
- **ReservationForm**: Para que los usuarios pudieran realizar reservas.
- **ReservationList**: Para mostrar y cancelar reservaciones existentes.

### Iteraciones y Mejoras

A medida que el proyecto avanzaba, surgieron nuevas necesidades y mejoras, reflejadas en la solución final:

1. **Expansión de Funcionalidades**:
   - **Autenticación y Seguridad**: Implementación de JWT para asegurar la autenticación de los usuarios y proteger los endpoints de la API.
   - **Administración de Imágenes**: Añadido un controlador para gestionar la carga y visualización de imágenes relacionadas con las películas.

2. **Organización y Estructura**:
   - **Backend**: Se mejoró la estructura del proyecto para incluir módulos específicos, como `auth`, `image`, `movie`, `reservation`, `theater`, y `user`, facilitando la extensión y el mantenimiento del código.
   - **Frontend**: Se organizó el código en componentes modulares, incluyendo páginas de administración (`admin-page`), páginas principales (`main-page`), y componentes reutilizables (`components`).

3. **Mejoras en la Usabilidad y Mantenimiento**:
   - **Documentación y Pruebas**: Implementación de Swagger para la documentación de la API y pruebas unitarias para asegurar la calidad del software.
   - **Despliegue y Configuración**: Uso de Docker para la contenedorización y configuración de despliegue automatizado.

### Conclusión

La transición desde la idea inicial a la solución final involucró una serie de mejoras y expansiones para abordar nuevos requerimientos y optimizar el diseño. La solución final se caracteriza por su robustez en términos de seguridad, modularidad y facilidad de mantenimiento, reflejando una evolución que permitió adaptarse a necesidades adicionales y mejorar la funcionalidad general de la aplicación.