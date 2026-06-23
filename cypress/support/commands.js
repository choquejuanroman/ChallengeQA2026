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
Cypress.Commands.add('irAlFormularioReserva', () => {
    cy.get(':nth-child(2) > .nav-link').click()
    cy.get(':nth-child(2) > .card > .card-footer > .btn').click()
    cy.get('#doReservation').click()

    cy.url().should('include','/reservation')
    cy.get(':nth-child(1) > .card-title').should('have.text','Book This Room')
})

Cypress.Commands.add('completarFormulario', (firstName, lastName, email, phone) => {
    cy.get('[name="firstname"]').type(firstName)
    cy.get('[name="lastname"]').type(lastName)
    cy.get('[name="email"]').type(email)
    cy.get('[name="phone"]').type(phone)
    cy.get('.btn-primary').click()
})