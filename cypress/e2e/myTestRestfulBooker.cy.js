describe('Shady Meadows B&B - Challenge QA', () => {
  beforeEach(() => {

    cy.on('uncaught:exception', (err) => {
      if (err.message.includes('Minified React error #418')) {
        return false // evita que Cypress falle ese test por esa excepción
      }
    })

    cy.visit('https://automationintesting.online/')
  })

  it.skip('Visualización de habitaciones disponibles', () => {
    
    cy.get(':nth-child(1) > .nav-link').click()
    cy.url().should('include','/#rooms')
    cy.get('#rooms > .container > .text-center > .display-5').should('have.text','Our Rooms')
  })

  it.skip('Ingreso a formulario de reserva exitoso', () => {
    
    cy.get(':nth-child(1) > .nav-link').click()
    cy.get(':nth-child(1) > .card > .card-footer > .btn').click()
    cy.get('#doReservation').click()

    cy.url().should('include','/reservation')
    cy.get(':nth-child(1) > .card-title').should('have.text','Book This Room')
  })

  it.skip('Completar formulario con datos válidos', () => {
    
    cy.irAlFormularioReserva()
    cy.completarFormulario('Juan','Choque','tutankamon@gmail.com','01121062001')
    // cy.get('.alert').should('be.visible')
    cy.get(':nth-child(1) > .col-lg-4 > .card > .card-body > .card-title').should('have.text','Booking Confirmed')
  })

  it.skip('Nombre con caracteres inválidos', () => {
    
    cy.irAlFormularioReserva()
    cy.completarFormulario('Juan1234','Choque','tutankamon@gmail.com','01121062001')
    cy.get(':nth-child(1) > .col-lg-4 > .card > .card-body > .card-title').should('have.text','Booking Confirmed')
  })
  it.skip('Nombres sin espaciados', () => {
    
    cy.irAlFormularioReserva()
    cy.completarFormulario('JuanRomán','Choque','tutankamon@gmail.com','01121062001')
    cy.get(':nth-child(1) > .col-lg-4 > .card > .card-body > .card-title').should('have.text','Booking Confirmed')
    
  })
  it.skip('Nombres con más de 5 espaciados de distancia', () => {
    
    cy.irAlFormularioReserva()
    cy.completarFormulario('Jorge    Porcel','Choque','tutankamon@gmail.com','01121062001')
    cy.get(':nth-child(1) > .col-lg-4 > .card > .card-body > .card-title').should('have.text','Booking Confirmed')
  })

  //Fecha CheckIn y Check Out

  it('Agregar fecha próxima en el campo Check In', () => {
    cy.seleccionarFechasCheckinCheckout('27','29')
    cy.confirmarReserva()
  })

  it('Agregar fecha próxima en el campo Check In', () => {
    cy.seleccionarFechasCheckinCheckout('28','30')
    cy.confirmarReserva()
  })

  it('Agregar fecha próxima en el campo Check In', () => {
    cy.seleccionarFechasCheckinCheckout('11','30')
    cy.confirmarReserva()
  })

  it('Agregar fecha próxima en el campo Check In', () => {
    cy.seleccionarFechasCheckinCheckout('27','12')
    cy.confirmarReserva()
  })

it('IT Nuevo prueba', () => {
    cy.seleccionarFechasCheckinCheckout('27','12')
    cy.confirmarReserva()
  })

















})