/**
 * Script para el portfolio de Ricardo Hernández
 * Funcionalidades: Modo oscuro/claro, formulario de contacto
 */

// ============================================
// Variables y elementos del DOM
// ============================================
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');
const contactForm = document.getElementById('contactForm');
const yearSpan = document.getElementById('year');

const DARK_THEME = 'dark';
const LIGHT_THEME = 'light';

// ============================================
// Inicialización
// ============================================

// Establecer el año actual en el footer
yearSpan.textContent = new Date().getFullYear();

// Verificar preferencia guardada del tema
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Aplicar tema guardado o preferencia del sistema
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
} else if (prefersDark) {
    document.documentElement.setAttribute('data-theme', DARK_THEME);
    updateThemeIcon(DARK_THEME);
}

// ============================================
// Funcionalidad de modo oscuro/claro
// ============================================

/**
 * Actualiza el icono del botón de tema
 * @param {string} theme - Tema actual ('dark' o 'light')
 */
function updateThemeIcon(theme) {
    if (theme === DARK_THEME) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

/**
 * Alterna entre modo oscuro y claro
 */
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

// Event listener para el botón de tema
themeToggle.addEventListener('click', toggleTheme);

// ============================================
// Funcionalidad del formulario de contacto
// ============================================

/**
 * Maneja el envío del formulario de contacto
 * @param {Event} e - Evento del formulario
 */
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Obtener valores del formulario
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validar que los campos no estén vacíos
    if (!name || !email || !message) {
        alert('Por favor, completa todos los campos del formulario.');
        return;
    }
    
    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, ingresa un correo electrónico válido.');
        return;
    }
    
    // Mostrar mensaje de éxito (simulación)
    alert(`¡Gracias ${name}! Tu mensaje ha sido enviado correctamente.\n\nTe contactaré pronto a: ${email}`);
    
    // Limpiar el formulario
    contactForm.reset();
}

// Event listener para el formulario
contactForm.addEventListener('submit', handleFormSubmit);

// ============================================
// Smooth scroll para navegación
// ============================================

// Agregar smooth scroll a todos los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
