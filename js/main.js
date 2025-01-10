/**----------------------------------------------------------
 * Función para alternar la visibilidad del menú de navegación.
 */
function toggleMenu() {
    // Selecciona el elemento con la clase 'navbar'
    const navbar = document.querySelector('.navbar');
    
    // Alterna la clase 'show' en el elemento 'navbar'
    navbar.classList.toggle('show');
}
//----------------------------------------------------------


/**----------------------------------------------------------
 * Carga dinámicamente contenido HTML desde archivos externos
 * 
 * @description
 * Esta función toma un array de nombres de archivos HTML y los carga de forma asíncrona.
 * Utiliza la API Fetch para realizar las peticiones HTTP y Promise.all para manejar múltiples cargas.
 * 
 * @param {Array<string>} arrayHtml - Array con los nombres de archivos HTML a cargar (sin extensión)
 * @example
 * loadPage(['inicio', 'tarjetas']);
 * 
 * @throws {Error} Si la respuesta HTTP no es satisfactoria
 */
function loadMainPage(arrayHtml) {
    // Iteramos cada archivo HTML del array usando forEach
    arrayHtml.forEach((htmlPage, index) => {
        // Verificamos la existencia del elemento contenedor
        if (htmlIds[index]) {
            // Agregamos nueva promesa de carga al array
            promises.push(
                // Petición fetch al archivo HTML en la carpeta sections
                fetch(`sections/${htmlPage}.html`)
                    // Validación de la respuesta HTTP
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Error HTTP: ${response.status}`);
                        }
                        return response.text();
                    })
                    // Inserción del contenido en el DOM
                    .then(data => {
                        htmlIds[index].innerHTML = data;
                    })
                    // Manejo de errores por archivo
                    .catch(error => {
                        console.error(`Error cargando ${htmlPage}.html:`, error);
                        htmlIds[index].innerHTML = `<p>Error al cargar el contenido ${htmlPage}.html ${error} </p>`;
                    })
            );
        }
        // Manejo de todas las promesas de carga
        Promise.all(promises)
            .catch(error => console.error('Error en carga de secciones:', error));
    });
}

/**
 * Variables globales para la carga dinámica de contenido
 * @constant {Array} htmlList - Lista de nombres de archivos HTML a cargar
 * @constant {Array} htmlIds - Array de elementos DOM donde se insertará el contenido
 * @constant {Array} promises - Array para almacenar las promesas de fetch
 */

// Array con los nombres de los archivos HTML a cargar
let htmlList = ["header","inicio","tarjetas","footer"];

// Array para almacenar los elementos DOM
let htmlIds = [];

// Obtenemos las referencias a los elementos del DOM
let headerSection = document.getElementById('header-section');
let welcomeSection = document.getElementById('welcome-section');
let tarjetasSection = document.getElementById('card-section');
let footerSection = document.getElementById('footer-section');


// Añadimos los elementos al array htmlIds para su uso posterior
htmlIds.push(headerSection,welcomeSection, tarjetasSection,footerSection);

// Array para almacenar las promesas de las peticiones fetch
let promises = [];

// Evento que se dispara cuando el DOM está completamente cargado
// Inicia la carga de los archivos HTML
document.addEventListener('DOMContentLoaded', function() {
    loadMainPage(htmlList);
});


//----------------------------------------------------------





    


    

