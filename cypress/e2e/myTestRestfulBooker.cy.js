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
  it('TC03 - Navegar a la sección Amenities al hacer click en el botón Amenities', () => {
    cy.get('a[href="/#amenities"]').click()
    cy.url().should('include','/#amenities')
    cy.contains('h2', 'Amenities').should('be.visible')
  })
    it('TC04 - Navegar a la sección Location al hacer click en el botón Location', () => {
    cy.get('a[href="/#location"]').click()
    cy.url().should('include','/#location')
    cy.contains('h2', 'Our Location').should('be.visible')
  })
  it('TC05 - Navegar a la sección Contact al hacer click en el botón Contact', () => {
    cy.get('a[href="/#contact"]').click()
    cy.url().should('include','/#contact')
    cy.contains('h3', 'Send Us a Message').should('be.visible')  
  })
  it('TC06 - Navegar al panel de Admin', () => {
    cy.contains('a', 'Admin').click()
    cy.url().should('include','/admin')
  })
  
  // Sección de formulario de reserva
  it('TC07 - Ingresar al formulario de reserva', () => {
    cy.contains('a, button', 'Book Now').first().click();
    cy.contains('button, a', 'Check Availability').click();
    cy.contains('a, button', 'Book now').first().click();
    cy.contains('button', 'Reserve Now').click();

    cy.contains('h2', 'Book This Room').should('be.visible');
    cy.get('input[name="firstname"]').should('be.visible');
    cy.get('input[name="lastname"]').should('be.visible');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="phone"]').should('be.visible');
  });  
  it('TC08 - Confirmar la reserva con datos válidos', () => {
    cy.irAFormularioDesdeBookNow(true);
    cy.get('input[name="firstname"]').type('Juan');
    cy.get('input[name="lastname"]').type('Choque');
    cy.get('input[name="email"]').type('juanroman@gmail.com');
    cy.get('input[name="phone"]').type('12345678901');

    cy.contains('button', 'Reserve Now').click();

    cy.contains('Booking Confirmed').should('be.visible');
  });

  it('TC09 - Mostrar alertas al enviar el formulario vacío', () => {
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
  
  it('TC10 - Mostrar alerta cuando Firstname se encuentre vacío', () => {
    cy.irAFormularioDesdeBookNow();

    cy.get('input[name="firstname"]').clear();
    cy.get('input[name="lastname"]').type('Choque');
    cy.get('input[name="email"]').type('juanroman@gmail.com');
    cy.get('input[name="phone"]').type('12345678901');

    cy.contains('button', 'Reserve Now').click();

    cy.get('.alert').should('be.visible')
      .and('contain.text', 'Firstname should not be blank');
  });

  it('TC11 - Mostrar alerta cuando Firstname tiene menos de 3 caracteres', () => {
    cy.irAFormularioDesdeBookNow();

    cy.get('input[name="firstname"]').type('Lu');
    cy.get('input[name="lastname"]').type('Choque');
    cy.get('input[name="email"]').type('juanroman@gmail.com');
    cy.get('input[name="phone"]').type('1121062001');

    cy.contains('button', 'Reserve Now').click();

    cy.get('.alert').should('be.visible')
      .and('contain.text', 'size must be between 3 and 18');
  });

  it('TC13 - Mostrar alerta cuando Firstname tiene más de 18 caracteres', () => {
    cy.irAFormularioDesdeBookNow();

    cy.get('input[name="firstname"]').type('Maximiliano Alejandro');
    cy.get('input[name="lastname"]').type('Choque');
    cy.get('input[name="email"]').type('juanroman@gmail.com');
    cy.get('input[name="phone"]').type('1121062001');

    cy.contains('button', 'Reserve Now').click();

    cy.get('.alert').should('be.visible')
      .and('contain.text', 'size must be between 3 and 18');
  });

  it('TC14 - Mostrar alerta cuando Lastname se encuentre vacío', () => {
    cy.irAFormularioDesdeBookNow();

    cy.get('input[name="firstname"]').type('Juan');
    cy.get('input[name="lastname"]').clear();
    cy.get('input[name="email"]').type('juanroman@gmail.com');
    cy.get('input[name="phone"]').type('1121062001');

    cy.contains('button', 'Reserve Now').click();

    cy.get('.alert').should('be.visible')
      .and('contain.text', 'Lastname should not be blank');
  });

  it('TC15 - Mostrar alerta cuando Lastname tiene menos de 3 caracteres', () => {
    cy.irAFormularioDesdeBookNow();

    cy.get('input[name="firstname"]').type('Juan');
    cy.get('input[name="lastname"]').type('Ch');
    cy.get('input[name="email"]').type('juanroman@gmail.com');
    cy.get('input[name="phone"]').type('1121062001');

    cy.contains('button', 'Reserve Now').click();

    cy.get('.alert').should('be.visible')
      .and('contain.text', 'size must be between 3 and 30');
  });

  it('TC16 - Mostrar alerta cuando Lastname supera los 30 caracteres', () => {
    cy.irAFormularioDesdeBookNow();

    cy.get('input[name="firstname"]').type('Juan');
    cy.get('input[name="lastname"]').type('choquechoquechoquechoquechoquee');
    cy.get('input[name="email"]').type('juanroman@gmail.com');
    cy.get('input[name="phone"]').type('1121062001');

    cy.contains('button', 'Reserve Now').click();

    cy.get('.alert').should('be.visible')
      .and('contain.text', 'size must be between 3 and 30');
  }); 
  
  it('TC17 - Mostrar alerta cuando el Email no tiene dominio', () => {
    cy.irAFormularioDesdeBookNow();

    cy.get('input[name="firstname"]').type('Juan');
    cy.get('input[name="lastname"]').type('Choque');
    cy.get('input[name="email"]').type('juanromangmail.com');
    cy.get('input[name="phone"]').type('1121062001');

    cy.contains('button', 'Reserve Now').click();

    cy.get('.alert').should('be.visible')
      .and('contain.text', 'must be a well-formed email address');
  });

  it('TC18 - Mostrar alerta cuando el Email está vacío', () => {
    cy.irAFormularioDesdeBookNow();

    cy.get('input[name="firstname"]').type('Juan');
    cy.get('input[name="lastname"]').type('Choque');
    cy.get('input[name="email"]').clear();
    cy.get('input[name="phone"]').type('1121062001');

    cy.contains('button', 'Reserve Now').click();

    cy.get('.alert').should('be.visible')
      .and('contain.text', 'must not be empty');
  });

  it('TC19 - Mostrar alerta cuando Phone está vacío', () => {
    cy.irAFormularioDesdeBookNow();

    cy.get('input[name="firstname"]').type('Juan');
    cy.get('input[name="lastname"]').type('Choque');
    cy.get('input[name="email"]').type('juanroman@gmail.com');
    cy.get('input[name="phone"]').clear();

    cy.contains('button', 'Reserve Now').click();

    cy.get('.alert').should('be.visible')
      .and('contain.text', 'must not be empty');
  });

  it('TC20 - Mostrar alerta cuando Phone tiene menos de 11 caracteres', () => {
    cy.irAFormularioDesdeBookNow();

    cy.get('input[name="firstname"]').type('Juan');
    cy.get('input[name="lastname"]').type('Choque');
    cy.get('input[name="email"]').type('juanroman@gmail.com');
    cy.get('input[name="phone"]').type('1234567890');

    cy.contains('button', 'Reserve Now').click();

    cy.get('.alert').should('be.visible')
      .and('contain.text', 'size must be between 11 and 21');
  });

  it('TC21 - Mostrar alerta cuando Phone supera los 21 caracteres', () => {
    cy.irAFormularioDesdeBookNow();

    cy.get('input[name="firstname"]').type('Juan');
    cy.get('input[name="lastname"]').type('Choque');
    cy.get('input[name="email"]').type('juanroman@gmail.com');
    cy.get('input[name="phone"]').type('1234567890123456789012');

    cy.contains('button', 'Reserve Now').click();

    cy.get('.alert').should('be.visible')
      .and('contain.text', 'size must be between 11 and 21');
  });

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