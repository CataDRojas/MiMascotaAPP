# 🐾 MiMascota

Una aplicación móvil híbrida desarrollada con **Ionic + Angular** que permite a tutores de mascotas (perros y gatos en una primera versión) gestionar el historial de salud de sus animales desde su teléfono móvil.  

Este proyecto está enfocado en la **primera etapa del desarrollo**, integrando **SQLite** local, pero aún combinando datos con **LocalStorage**.

## ✨ Características

- Registro e inicio de sesión de usuarios (tutores)
- Registro de múltiples mascotas por usuario
- Fichas individuales por mascota con:
  - Información básica (nombre, fecha de nacimiento, especie, sexo, chip)
  - Vacunas con historial adjunto (¡Próximamente!)
  - Registro de desparasitaciones (¡Próximamente!)
- Interfaz amigable, responsive y con animaciones
- Sección “Explorar Razas” que utiliza una API externa para conocer razas de perros y gatos con imagen y descripción
- Interfaz amigable, responsive, con mejoras visuales y diseño mejorado
- Integración de **SQLite** para almacenamiento persistente (en etapa de transición desde LocalStorage)


## 📸 Vistas incluidas

- **Login Page**  
- **Registro de usuario**  
- **Home Page** (con o sin mascotas registradas)  
- **Ficha de mascota** 
- **Registrar nueva mascota**
- **Editar mascota**  
- **Explorar razas** (con conexión a TheCatAPI y TheDogAPI)

## 🚀 Tecnologías utilizadas

- [Ionic Framework 8](https://ionicframework.com/)
- [Angular 19](https://angular.io/)
- Angular Material
- [Capacitor Camera Plugin](https://capacitorjs.com/docs/apis/camera)
- [SQLite para Ionic](https://ionicframework.com/docs/native/sqlite)
- [TheCatAPI](https://thecatapi.com/) y [TheDogAPI](https://thedogapi.com/)
- TypeScript
- Android Studio
- Xcode

## 🐶 Ejemplo de especies contempladas

- Perros 🐕  
- Gatos 🐈  
- Conejos 🐇  (¡Próximamente!)
- Hamsters 🐹 (¡Próximamente!)
- Aves 🪶 (¡Próximamente!) 
- Otros animales exóticos (¡Próximamente!)

## 💾 Cómo ejecutar el proyecto

1. Clona este repositorio:
   ```bash
   git clone https://github.com/CataDRojas/MiMascotaAPP.git
2. Instala las dependencias
   ```bash
   npm install
4. Corre la app en el navegador
   ```bash
   ionic serve

## 🧑‍💻🙋‍♀️ Autor

**Catalina**  
24 años, San Antonio - Chile 🇨🇱  
Estudiante de Analista Programador Computacional.  
Amante de los gatos, el crochet, el japonés y South Park 🧶🐱


## 📄 Licencia

Este proyecto fue desarrollado con fines **educativos** como parte de una asignatura universitaria.  
No está destinado para uso comercial o distribución pública.  
Todos los derechos sobre las imágenes, logos o recursos externos pertenecen a sus respectivos autores.
