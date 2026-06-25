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
    cy.intercept('GET','/api/room').as('fechasSeleccionadas')
    cy.seleccionarFechasCheckinCheckout('27','29')
    cy.get('button').contains('Check Availability').click()
    cy.get('#rooms > .container > .row').should('be.visible')
    cy.wait('@fechasSeleccionadas').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
  })

  it('Agregar fecha próxima en el campo Check Out', () => {
    cy.intercept('GET','/api/room').as('fechasSeleccionadas')
    cy.seleccionarFechasCheckinCheckout('28','30')
    cy.get('button').contains('Check Availability').click()
    cy.get('#rooms > .container > .row').should('be.visible')
    cy.wait('@fechasSeleccionadas').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
  })

  it('Agregar fecha antigua en el campo Check In', () => {
    cy.intercept('GET','/api/room').as('fechasSeleccionadas')
    cy.seleccionarFechasCheckinCheckout('11','30')
    cy.get('button').contains('Check Availability').click()
    cy.get('#rooms > .container > .row').should('be.visible')
    cy.wait('@fechasSeleccionadas').then((interception) => {
      expect(interception.response.statusCode).to.equal(400)
    })
  })

  it('Agregar fecha antigua en el campo Check Out', () => {
    cy.intercept('GET','/api/room').as('fechasSeleccionadas')
    cy.seleccionarFechasCheckinCheckout('27','12')
    cy.get('button').contains('Check Availability').click()
    cy.get('#rooms > .container > .row').should('be.visible')
    cy.wait('@fechasSeleccionadas').then((interception) => {
      expect(interception.response.statusCode).to.equal(400)
    })
  })

//Formulario de contacto


  it('Agregar datos válidos en Formulario de Contacto', () => {
    cy.intercept('POST', '/api/message').as('mensajeEnviado')
    const nombre = 'Juan'
    cy.completarFormularioContacto(nombre,'juanro@gmail.com','01121062001','Pedro Pascal','Buenas tardes, quiero agradecer el servicio brindado')
    cy.confirmarMensajeEnviado(nombre) //siempre que use este comando le tengo que pasar un argumento ya sea una variable o el contacto
    cy.wait('@mensajeEnviado').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
  })


  it('Dejar todos los campos vacíos', () => {
    cy.intercept('POST', '/api/message').as('mensajeEnviado')
    cy.get('button').contains('Submit').click()
    cy.MensajesDeAlertaCamposVacios()
    cy.wait('@mensajeEnviado').then((interception) => {
      expect(interception.response.statusCode).to.equal(400)
    })
  })


  it('Dejar el campo "nombre" vacío', () => {
    cy.intercept('POST', '/api/message').as('mensajeEnviado')
    cy.completarFormularioContacto(' ','juanro@gmail.com','01121062001','Pedro Pascal','Buenas tardes, quiero agradecer el servicio brindado')
    cy.get('button').contains('Submit').click()
    cy.get('p').contains('Name may not be blank').should('be.visible')
    cy.wait('@mensajeEnviado').then((interception) => {
      expect(interception.response.statusCode).to.equal(400)
    })
  })


  it('Agregar caracteres númericos en el campo Nombre', () => {
    const nombre = '123456'
    cy.intercept('POST', '/api/message').as('mensajeEnviado')
    cy.completarFormularioContacto(nombre,'juanro@gmail.com','01121062001','Pedro Pascal','Buenas tardes, quiero agradecer el servicio brindado')
    cy.get('button').contains('Submit').click()
    cy.wait('@mensajeEnviado').then((interception) => {
      expect(interception.response.statusCode).to.equal(400)
    })
  })


  it('Agregar caracteres especiales en el campo Nombre', () => {
    cy.intercept('POST', '/api/message').as('mensajeEnviado')
    const nombre = '@@@%%%$$$&&&'
    cy.completarFormularioContacto('@@@%%%$$$&&&','juanro@gmail.com','01121062001','Pedro Pascal','Buenas tardes, quiero agradecer el servicio brindado')
    cy.get('button').contains('Submit').click()
    cy.wait('@mensajeEnviado').then((interception) => {
      expect(interception.response.statusCode).to.equal(400)
    })
  })

  it('Agregar en el campo "Phone" 10 caracteres númericos', () => {
    cy.intercept('POST', '/api/message').as('mensajeEnviado')
    cy.completarFormularioContacto('Juan','juanro@gmail.com','1126337461','Pedro Pascal','Buenas tardes, quiero agradecer el servicio brindado')
    cy.get('button').contains('Submit').click()
    cy.get('p').contains('Phone must be between 11 and 21 characters.').should('be.visible')
    cy.wait('@mensajeEnviado').then((interception) => {
      expect(interception.response.statusCode).to.equal(400)
    })
  })

  it('Agregar en el campo "Phone" caracteres alfabeticos', () => {
    cy.intercept('POST', '/api/message').as('mensajeEnviado')
    cy.completarFormularioContacto('Juan','juanro@gmail.com','Cristiano Ronaldo','Pedro Pascal','Buenas tardes, quiero agradecer el servicio brindado')
    cy.get('button').contains('Submit').click()
    cy.wait('@mensajeEnviado').then((interception) => {
      expect(interception.response.statusCode).to.equal(400)
    })
  })

  it('Agregar en el campo "Phone" caracteres especiales', () => {
    cy.intercept('POST', '/api/message').as('mensajeEnviado')
    cy.completarFormularioContacto('Juan','juanro@gmail.com','@@@%%%&&&$$$','Pedro Pascal','Buenas tardes, quiero agradecer el servicio brindado')
    cy.get('button').contains('Submit').click()
    cy.wait('@mensajeEnviado').then((interception) => {
      expect(interception.response.statusCode).to.equal(400)
    })
  })

  it('Dejar el campo "Phone" vacío', () => {
    cy.intercept('POST', '/api/message').as('mensajeEnviado')
    cy.completarFormularioContacto('Juan','juanro@gmail.com',' ','Pedro Pascal','Buenas tardes, quiero agradecer el servicio brindado')
    cy.get('button').contains('Submit').click()
    cy.get('p').contains('Phone may not be blank').should('be.visible')
    cy.wait('@mensajeEnviado').then((interception) => {
      expect(interception.response.statusCode).to.equal(400)
    })
  })

  it('Dejar el campo "Subject" vacío', () => {
    cy.intercept('POST', '/api/message').as('mensajeEnviado')
    cy.completarFormularioContacto('Juan','juanro@gmail.com','01121062001',' ','Buenas tardes, quiero agradecer el servicio brindado')
    cy.get('button').contains('Submit').click()
    cy.get('p').contains('Subject may not be blank').should('be.visible')
    cy.get('p').contains('Subject must be between 5 and 100 characters.').should('be.visible')
    cy.wait('@mensajeEnviado').then((interception) => {
      expect(interception.response.statusCode).to.equal(400)
    })
  })

  it('Agregar en el campo "Subject" caracteres alfanumericos', () => {
    cy.intercept('POST', '/api/message').as('mensajeEnviado')
    cy.completarFormularioContacto('Juan','juanro@gmail.com','01121062001','Facundo1234','Buenas tardes, quiero agradecer el servicio brindado')
    cy.get('button').contains('Submit').click()
    cy.wait('@mensajeEnviado').then((interception) => {
      expect(interception.response.statusCode).to.equal(400)
    })
  })

  it('Agregar en el campo "Subject" caracteres especiales', () => {
    cy.intercept('POST', '/api/message').as('mensajeEnviado')
    cy.completarFormularioContacto('Juan','juanro@gmail.com','01121062001','@@@$$$%%%','Buenas tardes, quiero agradecer el servicio brindado')
    cy.get('button').contains('Submit').click()
    cy.wait('@mensajeEnviado').then((interception) => {
      expect(interception.response.statusCode).to.equal(400)
    })
  })

  it('Agregar en el campo "Subject" 4 caracteres', () => {
    cy.intercept('POST', '/api/message').as('mensajeEnviado')
    cy.completarFormularioContacto('Juan','juanro@gmail.com','01121062001','Facu','Buenas tardes, quiero agradecer el servicio brindado')
    cy.get('button').contains('Submit').click()
    cy.get('p').contains('Subject must be between 5 and 100 characters.').should('be.visible')
    cy.wait('@mensajeEnviado').then((interception) => {
      expect(interception.response.statusCode).to.equal(400)
    })
  })

  it('Agregar en el campo "Subject" 101 caracteres', () => {
    cy.intercept('POST', '/api/message').as('mensajeEnviado')
    const subject = 'juanromanfranciscojuanromanfranciscojuanromanfranciscojuanromanfranciscojuanromanfranciscojulianroman'
    cy.completarFormularioContacto('Juan','juanro@gmail.com','01121062001',subject,'Buenas tardes, quiero agradecer el servicio brindado')
    cy.get('button').contains('Submit').click()
    cy.get('p').contains('Subject must be between 5 and 100 characters.').should('be.visible')
    cy.wait('@mensajeEnviado').then((interception) => {
      expect(interception.response.statusCode).to.equal(400)
    })
  })

  it('Dejar el campo "Message" vacío', () => {
    cy.intercept('POST', '/api/message').as('mensajeEnviado')
    cy.completarFormularioContacto('Juan','juanro@gmail.com','01121062001','Pedro Pascal',' ')
    cy.get('button').contains('Submit').click()
    cy.get('p').contains('Message may not be blank').should('be.visible')
    cy.wait('@mensajeEnviado').then((interception) => {
      expect(interception.response.statusCode).to.equal(400)
    })
  })

  it('Agregar en el campo "Message" 19 caracteres', () => {
    cy.intercept('POST', '/api/message').as('mensajeEnviado')
    cy.completarFormularioContacto('Juan','juanro@gmail.com','01121062001','Pedro Pascal',' ')
    cy.get('button').contains('Submit').click()
    cy.get('p').contains('Message must be between 20 and 2000 characters.').should('be.visible')
    cy.wait('@mensajeEnviado').then((interception) => {
      expect(interception.response.statusCode).to.equal(400)
    })
  })

  it('Verificar enlace Rooms', () => {
    cy.get('a').contains('Home').click()
    cy.url().should('include','/#rooms')
  })

  it('Verificar enlace Booking', () => {
    cy.get('a').contains('Home').click()
    cy.url().should('include','/#booking')
  })

  it('Verificar enlace Home', () => {
    cy.get('a').contains('Home').click()
    cy.url().should('include','/#')
  })

  it('Verificar enlace Rooms', () => {
    cy.get('a').contains('Home').click()
    cy.url().should('include','/#contact')
  })

  it('Verificar enlace Facebook', () => {
    cy.get('.row > :nth-child(1) > .d-flex > :nth-child(1) > .bi').click()
    cy.url().should('include','/www.facebook.com')
  })

  it('Verificar enlace Twitter', () => {
    cy.get('.row > :nth-child(1) > .d-flex > :nth-child(1) > .bi').click()
    cy.url().should('include','/x.com')
  })

  it('Verificar enlace Instagram', () => {
    cy.get('.row > :nth-child(1) > .d-flex > :nth-child(1) > .bi').click()
    cy.url().should('include','/www.instagram.com')
  })
})