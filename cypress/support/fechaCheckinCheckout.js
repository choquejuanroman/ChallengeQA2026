Cypress.Commands.add('seleccionarFechasCheckinCheckout',(fechaInicio, fechaFinal) => {
    cy.get(':nth-child(1) > .react-datepicker-wrapper > .react-datepicker__input-container > .form-control').click()
    cy.get(`.react-datepicker__day--0${fechaInicio}`).click()
    cy.get(':nth-child(2) > .react-datepicker-wrapper > .react-datepicker__input-container > .form-control').click()
    cy.get(`.react-datepicker__day--0${fechaFinal}`).click()
})

Cypress.Commands.add('confirmarReserva', () => {
    cy.get('.col-8 > .btn').click()
    cy.get('#rooms > .container > .row').should('be.visible')
})