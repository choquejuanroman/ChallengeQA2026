// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// lleva el flujo desde Home hasta el formulario de reserva
// usando el botón "Book Now" con fechas por defecto (hoy -> hoy+1).
 // No se modifican fechas en el calendario, ya que vienen preseleccionadas.
Cypress.Commands.add('irAFormularioDesdeBookNow', (cambiarFechas = false) => {
    cy.contains('a, button', 'Book Now').first().click();

    if (cambiarFechas) {
        cy.seleccionarFechasReserva(5); // check-in = hoy + 5 días, evita choque con reservas previas
    }

    cy.contains('button, a', 'Check Availability').click();
    cy.contains('a, button', 'Book now').first().click();
    cy.contains('button', 'Reserve Now').click();
});

// Command auxiliar: escribe check-in/check-out directo en los inputs de fecha,
// evitando depender de la grilla visual del datepicker.
Cypress.Commands.add('seleccionarFechasReserva', (diasDesdeHoyCheckIn = 5) => {
    const formatearFecha = (fecha) => {
        const dd = String(fecha.getDate()).padStart(2, '0');
        const mm = String(fecha.getMonth() + 1).padStart(2, '0');
        const yyyy = fecha.getFullYear();
        return `${dd}/${mm}/${yyyy}`;
    };

    const hoy = new Date();
    const checkIn = new Date(hoy);
    checkIn.setDate(hoy.getDate() + diasDesdeHoyCheckIn);

    const checkOut = new Date(checkIn);
    checkOut.setDate(checkIn.getDate() + 1);

    const fechaCheckInTexto = formatearFecha(checkIn);
    const fechaCheckOutTexto = formatearFecha(checkOut);

    cy.get('input.form-control[type="text"]').eq(0)
        .clear()
        .type(fechaCheckInTexto)
        .blur();

    cy.get('input.form-control[type="text"]').eq(1)
        .clear()
        .type(fechaCheckOutTexto)
        .blur();
});