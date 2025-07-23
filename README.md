# 🎮 Suitch 👾 - Plataforma de Streaming

📹 Suitch fue un excelente proyecto de práctica con el objetivo de simular la plataforma de Twitch 🎮, mediante la creación de componentes y la implementación de responsividad. Hasta ahora, el proyecto te permite buscar a cualquier streamer y ver su contenido.

La UI está inspirada en una web de Edu Calvo ✨![](https://www.smoothui.dev/). Aún falta mejorar el responsive, algo en lo que trabajaré para adaptarlo mejor a pantallas más pequeñas, y por supuesto, agregar inicio de sesión con Twitch.

En verdad, hace un año no me imaginaba cómo hacer esto, y estoy disfrutando mucho el desarrollo de esta simulación de Twitch 🚀.
![Vista de Perfil](public/preview/suitch-proyect-md.webp)


## 🛠️ Tecnologías Utilizadas

- React.js
- Vite
- Tailwind CSS
- Twitch API
- React Router

## 🚀 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/suitch.git
```

2. Instala las dependencias:
```bash
cd suitch
pnpm install
```

3. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
```env
PUBLIC_URL_TWITCH=https://api.twitch.tv/helix/streams
PUBLIC_TWITCH_TOKEN=tu_token_de_twitch
PUBLIC_URL_TWITCH_SEARCH=https://api.twitch.tv/helix/users
PUBLIC_CLIENT_ID=tu_client_id_de_twitch
```

4. Inicia el servidor de desarrollo:
```bash
pnpm run dev
```

## 📦 Estructura del Proyecto

```
suitch/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Channels.jsx
│   │   ├── Perfiles.jsx
│   │   └── ...
│   ├── hooks/
│   │   ├── useStream.jsx
│   │   └── useSearch.jsx
│   ├── logic/
│   │   └── respuesta.js
│   ├── services/
│   │   └── apiTwitch.js
│   └── App.jsx
├── public/
│   └── preview/
├── .env
└── package.json
```

## 🔑 Configuración de Variables de Entorno

Para que la aplicación funcione correctamente, necesitas configurar las siguientes variables de entorno en tu plataforma de despliegue (por ejemplo, Netlify):

- `PUBLIC_URL_TWITCH`
- `PUBLIC_TWITCH_TOKEN`
- `PUBLIC_URL_TWITCH_SEARCH`
- `PUBLIC_CLIENT_ID`


## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

## 👤 Autor

Alan San  - [@alanpro._](https://www.linkedin.com/in/devsan11/)

## 🙏 Agradecimientos
- [Midudev](https://midu.dev/) 💜

## 📚 Cosas a las que me enfrente y aprendi 

- Aprender a usar la twitch api
 * usar las cabeceraz en las apis
 * obtener el token de twitch

- usarCreateContecxt() en React
  * es crear un componenete con contexto en ele estado para que este componenete envuelba los {children} los componenetes que envolvasmo con este componente Padre, muy interesante la forma de compartir interactividad con el estado de un componente a otro. 
  Uso: por ejemplo al colapsar o expanir la Barra lateral izquierda de Recommended Channels reacciona los demas componenets de aceurdo a ese estado. 

  - Astro pages (Dinamicas)    
    * Las utilizamos para crear el perfil dinamico de cada streamer buscado o seleccionado.
    descubrimos que para usar esto dever darle a astro toda la informacion previe de las paginas que vas a renderizar de forma dinamica, esto esta vien si no hay muchos elementos. de echo este fue uno mis
     ## mayores retos
     - para logralo:
      twitch limita la info obtenida con cada curl que hagas y para obtener el perfil de cada streamer se debe hacer una peticion por cada streamer para obtener su ID y con su ID hacer una peticion nueva con otra url diferente mas la id y asi obtener el perfil completo de cada streamer para su informacion.

## 🔧 Últimas Actualizaciones - Solución de Problemas del Iframe de Twitch

### 🐛 Problema Identificado
El iframe de Twitch en las páginas de perfiles no funcionaba correctamente cuando los usuarios navegaban directamente a una URL específica (ej: `/perfiles/nombreusuario`). El reproductor no se cargaba y aparecían errores en la consola.

### 🔍 Diagnóstico del Problema
1. **Problema de Hidratación**: El componente React no se hidrataba correctamente en Astro cuando se accedía directamente a la URL
2. **Hostname no detectado**: La variable `window.location.hostname` no se obtenía correctamente durante la renderización inicial
3. **Errores de CORS**: Twitch bloqueaba las solicitudes debido a políticas de seguridad
4. **Autoplay deshabilitado**: Los streams requerían clic manual para reproducirse

### ✅ Soluciones Implementadas

#### Paso 1: Mejorar la Hidratación del Componente
```jsx
// Antes: Problema de hidratación
useEffect(() => {
  setHostname(window.location.hostname);
}, []);

// Después: Hidratación mejorada
const [isClient, setIsClient] = useState(false);

useEffect(() => {
  setIsClient(true);
  if (typeof window !== "undefined") {
    setHostname(window.location.hostname);
  }
}, []);
```

#### Paso 2: Renderización Condicional del Iframe
```jsx
// Solo renderizar el iframe cuando el componente esté hidratado
{isClient && hostname ? (
  <iframe
    src={`https://player.twitch.tv/?channel=${user}&parent=${hostname}&autoplay=true`}
    // ... otros props
  />
) : (
  <div>Cargando reproductor...</div>
)}
```

#### Paso 3: Cambio de URL del Iframe
- **Problema**: `https://embed.twitch.tv/` mostraba chat no deseado
- **Solución**: Usar `https://player.twitch.tv/` que solo muestra el reproductor
- **Resultado**: Reproductor limpio sin chat

#### Paso 4: Habilitar Autoplay
- **Problema**: Streams requerían clic manual para reproducirse
- **Solución**: Agregar `autoplay=true&muted=false` a la URL
- **Resultado**: Reproducción automática de streams en vivo

### 🎯 Resultado Final
- ✅ El iframe funciona correctamente al navegar directamente a URLs de perfiles
- ✅ Reproducción automática de streams en vivo
- ✅ No aparece chat de Twitch (solo reproductor)
- ✅ Mejor experiencia de usuario con indicador de carga
- ✅ Hidratación correcta del componente React en Astro

### 📝 Lecciones Aprendidas
1. **Hidratación en Astro**: Es crucial manejar correctamente la hidratación de componentes React en Astro, especialmente cuando se accede directamente a rutas dinámicas
2. **APIs de Twitch**: Diferentes endpoints tienen diferentes comportamientos y restricciones
3. **Debugging**: Los logs de consola son fundamentales para identificar problemas de hidratación y CORS
4. **UX**: Siempre mostrar indicadores de carga mientras los componentes se hidratan

### 📖 Glosario de Términos Técnicos

#### 🔄 Hidratación (Hydration)
**¿Qué es?** La hidratación es el proceso donde React "despierta" el HTML estático generado por el servidor y lo convierte en una aplicación interactiva.

**¿Cómo funciona?**
1. **Servidor**: Astro genera HTML estático con el contenido inicial
2. **Cliente**: El navegador recibe este HTML y lo muestra inmediatamente
3. **Hidratación**: React toma control del HTML y añade interactividad (eventos, estado, etc.)

**Ejemplo práctico:**
```jsx
// ❌ Problema: Acceder a window antes de la hidratación
const hostname = window.location.hostname; // Error!

// ✅ Solución: Esperar a que el componente se hidrate
const [isClient, setIsClient] = useState(false);

useEffect(() => {
  setIsClient(true); // Ahora sabemos que estamos en el cliente
  const hostname = window.location.hostname; // ¡Funciona!
}, []);
```

**¿Por qué es importante?**
- Sin hidratación correcta, los componentes no son interactivos
- `window`, `document` y otras APIs del navegador no están disponibles durante la renderización del servidor
- Los eventos de clic, formularios, etc. no funcionarán hasta que se complete la hidratación

#### 🌐 CORS (Cross-Origin Resource Sharing)
**¿Qué es?** CORS es una política de seguridad del navegador que controla qué sitios web pueden acceder a recursos de otros dominios.

**¿Cómo funciona?**
1. **Mismo origen**: `https://miapp.com` puede acceder a `https://miapp.com/api` ✅
2. **Origen diferente**: `https://miapp.com` quiere acceder a `https://api.twitch.tv` ❓
3. **Verificación CORS**: El navegador pregunta a Twitch si permite el acceso
4. **Respuesta**: Twitch dice "Sí, pero solo si vienes de dominios autorizados"

**Ejemplo del problema:**
```javascript
// ❌ Error CORS típico
fetch('https://api.twitch.tv/helix/streams')
  .then(response => response.json())
  .catch(error => {
    console.error('CORS Error:', error);
    // Error: Access to fetch at 'api.twitch.tv' from origin 'localhost:4322' 
    // has been blocked by CORS policy
  });
```

**¿Cómo se soluciona?**
1. **Parámetro parent**: Twitch requiere que especifiques tu dominio
   ```html
   <iframe src="https://player.twitch.tv/?channel=usuario&parent=localhost"></iframe>
   ```

2. **Headers autorizados**: Usar las cabeceras correctas
   ```javascript
   fetch('https://api.twitch.tv/helix/streams', {
     headers: {
       'Client-ID': 'tu_client_id',
       'Authorization': 'Bearer tu_token'
     }
   });
   ```

**¿Por qué existe CORS?**
- **Seguridad**: Evita que sitios maliciosos roben datos de otros sitios
- **Privacidad**: Protege información sensible del usuario
- **Control**: Permite a las APIs decidir quién puede usarlas

**Analogía simple:**
Imagina que CORS es como un portero de un edificio:
- El portero (navegador) verifica si tienes permiso
- El edificio (API de Twitch) tiene una lista de visitantes autorizados
- Si no estás en la lista, no puedes entrar
- Para entrar, necesitas una invitación (configuración CORS correcta)
