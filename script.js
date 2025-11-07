// ==========================================
// NAVIGATION FUNCTIONS
// ==========================================

/**
 * Show specific page section and hide others
 * @param {string} pageId - ID of the page to show
 */
function showPage(pageId) {
    // Hide all sections
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Show selected section
    const targetSection = document.getElementById(pageId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Close mobile menu
    const navMenu = document.getElementById('navMenu');
    if (navMenu) {
        navMenu.classList.remove('active');
    }
    
    // Scroll to top smoothly
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

/**
 * Toggle mobile menu visibility
 */
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
}

// ==========================================
// FORM HANDLING
// ==========================================

/**
 * Handle form submission
 * @param {Event} event - Form submit event
 */
function handleSubmit(event) {
    event.preventDefault();
    
    const form = document.getElementById('registrationForm');
    const successMessage = document.getElementById('successMessage');
    
    if (!form || !successMessage) {
        console.error('Form or success message element not found');
        return;
    }
    
    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Log form data (in a real application, this would be sent to a server)
    console.log('Form submitted with data:', data);
    
    // Show success message
    form.style.display = 'none';
    successMessage.style.display = 'block';
    
    // Reset form after 5 seconds
    setTimeout(() => {
        form.reset();
        form.style.display = 'block';
        successMessage.style.display = 'none';
    }, 5000);
}

// ==========================================
// FILE DOWNLOAD
// ==========================================

/**
 * Generate and download guide file
 */
function downloadGuide() {
    const guideContent = `
SVENSKA NATIONALPARKER - BESÖKSGUIDE
=====================================

Innehåll:
1. Introduktion till Sveriges nationalparker
2. Allemansrätten och regler
3. Säkerhetstips
4. Packlista
5. Bästa tid att besöka
6. Kontaktinformation

=============================================

INTRODUKTION
------------
Sveriges 30 nationalparker erbjuder fantastiska naturupplevelser året runt.
Denna guide hjälper dig att planera ditt besök och få ut det mesta av din 
upplevelse i den svenska naturen.

ALLEMANSRÄTTEN
--------------
I Sverige har vi allemansrätten som ger dig rätt att:
- Vandra fritt i naturen
- Plocka bär och svamp
- Tälta en natt på samma plats
- Bada i sjöar och hav
- Åka båt på allmänna vatten

Men kom ihåg att INTE:
- Störa eller förstöra
- Lämna skräp
- Göra upp eld när det är torrt
- Bryta grenar från levande träd
- Ta med hundar lösa i naturreservat

SÄKERHETSTIPS
-------------
- Berätta alltid för någon var du ska
- Ta med karta och kompass/GPS
- Kolla väderprognosen innan avfärd
- Ha rätt utrustning för årstiden
- Ta med extra mat och vatten
- Ladda mobilen fullt innan avfärd
- Ha första hjälpen-utrustning
- Klä dig i lager för att enkelt anpassa dig

PACKLISTA
---------
Grundläggande:
□ Vandringskängor
□ Väderpassande kläder
□ Regnkläder
□ Vatten och mat
□ Karta och kompass
□ Första hjälpen-kit
□ Ficklampa
□ Solskydd

För övernattning:
□ Tält/sovsäck
□ Liggunderlag
□ Stormkök
□ Extra mat

BÄSTA TID ATT BESÖKA
--------------------
Vår (april-maj): Fåglar, smältande snö
Sommar (juni-augusti): Midnattssol, vandring
Höst (september-oktober): Färgprakt, svampplockning
Vinter (november-mars): Nordisk vinter, skidåkning

POPULÄRA NATIONALPARKER
-----------------------
1. Abisko - Kungsleden och midnattssol
2. Sarek - Sveriges vildmark
3. Tyresta - Nära Stockholm
4. Fulufjället - Njupeskär, Sveriges högsta vattenfall
5. Kosterhavet - Marint liv

KONTAKTINFORMATION
------------------
Webbplats: www.svenskanationalparker.se
E-post: info@svenskanationalparker.se
Telefon: 010-123 45 67

Naturvårdsverket: www.naturvardsverket.se
Sveriges Nationalparker: www.sverigesnationalparker.se

=============================================

Lycka till med ditt äventyr i naturen!

© 2024 Svenska Nationalparker
`;
    
    try {
        // Create blob from text content
        const blob = new Blob([guideContent], { type: 'text/plain;charset=utf-8' });
        
        // Create download link
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'nationalparker_guide.txt';
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        
        // Cleanup
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        // Show success message
        alert('Guide nedladdad! Kolla din nedladdningsmapp.');
        
    } catch (error) {
        console.error('Error downloading guide:', error);
        alert('Ett fel uppstod vid nedladdning. Försök igen.');
    }
}

// ==========================================
// INITIALIZATION
// ==========================================

/**
 * Initialize app when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Svenska Nationalparker webbplats laddad!');
    
    // Set minimum date for booking form (today)
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
    
    // Add smooth scroll behavior to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && !this.hasAttribute('onclick')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const nav = document.querySelector('nav');
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.getElementById('navMenu');
        
        if (navMenu && navMenu.classList.contains('active')) {
            if (!nav.contains(event.target) || event.target === menuToggle) {
                return;
            }
            if (!navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
            }
        }
    });
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(event) {
        // Close menu on Escape key
        if (event.key === 'Escape') {
            const navMenu = document.getElementById('navMenu');
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        }
    });
});

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

/**
 * Format date to Swedish format
 * @param {Date} date - Date to format
 * @returns {string} Formatted date string
 */
function formatDateSwedish(date) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('sv-SE', options);
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Log page view (for analytics)
 * @param {string} pageName - Name of page viewed
 */
function logPageView(pageName) {
    console.log(`Page viewed: ${pageName} at ${new Date().toISOString()}`);
    // In a real application, this would send data to analytics service
}