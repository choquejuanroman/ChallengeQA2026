describe('Shady Meadows B&B - Challenge QA', () => {
  beforeEach(() => {

    cy.on('uncaught:exception', (err) => {
      if (err.message.includes('Minified React error #418')) {
        return false // evita que Cypress falle ese test por esa excepción
      }
    })

    cy.visit('https://automationintesting.online/')
  })


  // Sección de navegación del Home Page
  it('TC01 - Navegar a la sección Our Rooms al hacer click en el botón Rooms', () => {
    cy.get('a[href="/#rooms"]').click()
    cy.url().should('include','/#rooms')
    cy.contains('h2', 'Our Rooms').should('be.visible')
  })
  it('TC02 - Navegar a la sección Booking al hacer click en el botón Booking', () => {
    cy.get('a[href="/#booking"]').click()
    cy.url().should('include','/#booking')
    cy.contains('h3', 'Check Availability & Book Your Stay').should('be.visible')
  })
  it('TC03 - Navegar a la sección Location al hacer click en el botón Location', () => {
    cy.get('a[href="/#location"]').click()
    cy.url().should('include','/#location')
    cy.contains('h2', 'Our Location').should('be.visible')
  })
  it('TC04 - Navegar a la sección Contact al hacer click en el botón Contact', () => {
    cy.get('a[href="/#contact"]').click()
    cy.url().should('include','/#contact')
    cy.contains('h3', 'Send Us a Message').should('be.visible')  
  })
  it('TC05 - Navegar al panel de Admin', () => {
    cy.contains('a', 'Admin').click()
    cy.url().should('include','/admin')
  })
  
  // Sección de formulario de reserva
  it('TC06 - Confirmar la reserva con datos válidos', () => {
    cy.irAFormularioDesdeBookNow(true);
    cy.get('input[name="firstname"]').type('Juan');
    cy.get('input[name="lastname"]').type('Choque');
    cy.get('input[name="email"]').type('juanroman@gmail.com');
    cy.get('input[name="phone"]').type('12345678901');

    cy.contains('button', 'Reserve Now').click();

    cy.contains('Booking Confirmed').should('be.visible');
  });

  it('TC07 - Mostrar alertas al enviar el formulario vacío', () => {
    cy.irAFormularioDesdeBookNow();

    cy.contains('button', 'Reserve Now').click();

    cy.get('.alert').should('be.visible').then(($alert) => {
      const text = $alert.text();
      expect(text).to.include('Firstname should not be blank');
      expect(text).to.include('must not be empty');
      expect(text).to.include('size must be between 3 and 18');
      expect(text).to.include('size must be between 11 and 21');
      expect(text).to.include('Lastname should not be blank');
      expect(text).to.include('size must be between 3 and 30');
    });
  });
  
  it('TC08 - Mostrar alerta cuando Firstname se encuentre vacío', () => {
    cy.irAFormularioDesdeBookNow();

    cy.get('input[name="firstname"]').clear();
    cy.get('input[name="lastname"]').type('Choque');
    cy.get('input[name="email"]').type('juanroman@gmail.com');
    cy.get('input[name="phone"]').type('12345678901');

    cy.contains('button', 'Reserve Now').click();

    cy.get('.alert').should('be.visible')
      .and('contain.text', 'Firstname should not be blank');
  });

  it('TC09 - Mostrar alerta cuando Firstname tiene menos de 3 caracteres', () => {
    cy.irAFormularioDesdeBookNow();

    cy.get('input[name="firstname"]').type('Lu');
    cy.get('input[name="lastname"]').type('Choque');
    cy.get('input[name="email"]').type('juanroman@gmail.com');
    cy.get('input[name="phone"]').type('1121062001');

    cy.contains('button', 'Reserve Now').click();

    cy.get('.alert').should('be.visible')
      .and('contain.text', 'size must be between 3 and 18');
  });

  it('TC10 - Mostrar alerta cuando Firstname tiene más de 18 caracteres', () => {
    cy.irAFormularioDesdeBookNow();

    cy.get('input[name="firstname"]').type('Maximiliano Alejandro');
    cy.get('input[name="lastname"]').type('Choque');
    cy.get('input[name="email"]').type('juanroman@gmail.com');
    cy.get('input[name="phone"]').type('1121062001');

    cy.contains('button', 'Reserve Now').click();

    cy.get('.alert').should('be.visible')
      .and('contain.text', 'size must be between 3 and 18');
  });

  it('TC11 - Mostrar alerta cuando Lastname se encuentre vacío', () => {
    cy.irAFormularioDesdeBookNow();

    cy.get('input[name="firstname"]').type('Juan');
    cy.get('input[name="lastname"]').clear();
    cy.get('input[name="email"]').type('juanroman@gmail.com');
    cy.get('input[name="phone"]').type('1121062001');

    cy.contains('button', 'Reserve Now').click();

    cy.get('.alert').should('be.visible')
      .and('contain.text', 'Lastname should not be blank');
  });

  it('TC12 - Mostrar alerta cuando Lastname tiene menos de 3 caracteres', () => {
    cy.irAFormularioDesdeBookNow();

    cy.get('input[name="firstname"]').type('Juan');
    cy.get('input[name="lastname"]').type('Ch');
    cy.get('input[name="email"]').type('juanroman@gmail.com');
    cy.get('input[name="phone"]').type('1121062001');

    cy.contains('button', 'Reserve Now').click();

    cy.get('.alert').should('be.visible')
      .and('contain.text', 'size must be between 3 and 30');
  });

  it('TC13 - Mostrar alerta cuando Lastname supera los 30 caracteres', () => {
    cy.irAFormularioDesdeBookNow();

    cy.get('input[name="firstname"]').type('Juan');
    cy.get('input[name="lastname"]').type('choquechoquechoquechoquechoquee');
    cy.get('input[name="email"]').type('juanroman@gmail.com');
    cy.get('input[name="phone"]').type('1121062001');

    cy.contains('button', 'Reserve Now').click();

    cy.get('.alert').should('be.visible')
      .and('contain.text', 'size must be between 3 and 30');
  }); 
  
  it('TC14 - Motrar alerta cuando el Email no tiene dominio', () => {
    cy.irAFormularioDesdeBookNow();

    cy.get('input[name="firstname"]').type('Juan');
    cy.get('input[name="lastname"]').type('Choque');
    cy.get('input[name="email"]').type('juanromangmail.com');
    cy.get('input[name="phone"]').type('1121062001');

    cy.contains('button', 'Reserve Now').click();

    cy.get('.alert').should('be.visible')
      .and('contain.text', 'must be a well-formed email address');
  });

  it('TC15 - Mostrar alerta cuando el Email está vacío', () => {
    cy.irAFormularioDesdeBookNow();

    cy.get('input[name="firstname"]').type('Juan');
    cy.get('input[name="lastname"]').type('Choque');
    cy.get('input[name="email"]').clear();
    cy.get('input[name="phone"]').type('1121062001');

    cy.contains('button', 'Reserve Now').click();

    cy.get('.alert').should('be.visible')
      .and('contain.text', 'must not be empty');
  });

  it('TC16 - Mostrar alerta cuando Phone está vacío', () => {
    cy.irAFormularioDesdeBookNow();

    cy.get('input[name="firstname"]').type('Juan');
    cy.get('input[name="lastname"]').type('Choque');
    cy.get('input[name="email"]').type('juanroman@gmail.com');
    cy.get('input[name="phone"]').clear();

    cy.contains('button', 'Reserve Now').click();

    cy.get('.alert').should('be.visible')
      .and('contain.text', 'must not be empty');
  });

  it('TC17 - Mostrar alerta cuando Phone tiene menos de 11 caracteres', () => {
    cy.irAFormularioDesdeBookNow();

    cy.get('input[name="firstname"]').type('Juan');
    cy.get('input[name="lastname"]').type('Choque');
    cy.get('input[name="email"]').type('juanroman@gmail.com');
    cy.get('input[name="phone"]').type('1234567890');

    cy.contains('button', 'Reserve Now').click();

    cy.get('.alert').should('be.visible')
      .and('contain.text', 'size must be between 11 and 21');
  });

  it('TC18 - Mostrar alerta cuando Phone supera los 21 caracteres', () => {
    cy.irAFormularioDesdeBookNow();

    cy.get('input[name="firstname"]').type('Juan');
    cy.get('input[name="lastname"]').type('Choque');
    cy.get('input[name="email"]').type('juanroman@gmail.com');
    cy.get('input[name="phone"]').type('1234567890123456789012');

    cy.contains('button', 'Reserve Now').click();

    cy.get('.alert').should('be.visible')
      .and('contain.text', 'size must be between 11 and 21');
  });

/*
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

//Formulario de contacto


  it('Agregar datos válidos en Formulario de Contacto', () => {
    const nombre = 'Juan'
    cy.completarFormularioContacto(nombre,'juanro@gmail.com','01121062001','Pedro Pascal','Buenas tardes, quiero agradecer el servicio brindado')
    cy.confirmarMensajeEnviado(nombre)
  })


  it('Dejar todos los campos vacíos', () => {
    cy.get('button').contains('Submit').click()
    cy.MensajesDeAlertaCamposVacios()
  })


  it('Dejar el campo "nombre" vacío', () => {
    cy.completarFormularioContacto(' ','juanro@gmail.com','01121062001','Pedro Pascal','Buenas tardes, quiero agradecer el servicio brindado')
    cy.get('button').contains('Submit').click()
    cy.get('p').contains('Name may not be blank').should('be.visible')
  })


  it('Agregar caracteres númericos en el campo Nombre', () => {
    const nombre = '123456'
    cy.completarFormularioContacto(nombre,'juanro@gmail.com','01121062001','Pedro Pascal','Buenas tardes, quiero agradecer el servicio brindado')
    cy.confirmarMensajeEnviado(nombre)
  })


  it('Agregar caracteres especiales en el campo Nombre', () => {
    const nombre = '@@@%%%$$$&&&'
    cy.completarFormularioContacto(nombre,'juanro@gmail.com','01121062001','Pedro Pascal','Buenas tardes, quiero agradecer el servicio brindado')
    cy.confirmarMensajeEnviado(nombre)
  })

  it('nuevo it', () => {
    cy.get()
  })*/

})