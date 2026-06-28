Cypress.Commands.add('completarFormularioContacto', (contactName, contactEmail, contactPhone, contactSubject, contactDescription) => {
    cy.get('[data-testid="ContactName"]').type(contactName)
    cy.get('[data-testid="ContactEmail"]').type(contactEmail)
    cy.get('[data-testid="ContactPhone"]').type(contactPhone)
    cy.get('[data-testid="ContactSubject"]').type(contactSubject)
    cy.get('[data-testid="ContactDescription"]').type(contactDescription)
})

Cypress.Commands.add('confirmarMensajeEnviado', (contactName) => {
    cy.get('.d-grid > .btn').click()
    cy.get('.col-lg-8 > .card > .card-body > .h4').should('have.text',`Thanks for getting in touch ${contactName}!`)
})

Cypress.Commands.add('MensajesDeAlertaCamposVacios', () => {
    cy.get('p').contains('Phone must be between 11 and 21 characters.').should('be.visible')
    cy.get('p').contains('Subject must be between 5 and 100 characters.').should('be.visible')
    cy.get('p').contains('Email may not be blank').should('be.visible')
    cy.get('p').contains('Message may not be blank').should('be.visible')
    cy.get('p').contains('Name may not be blank').should('be.visible')
    cy.get('p').contains('Subject may not be blank').should('be.visible')
    cy.get('p').contains('Message must be between 20 and 2000 characters.').should('be.visible')
    cy.get('p').contains('Phone may not be blank').should('be.visible')
})