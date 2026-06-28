# Challenge QA Automation - Shady Meadows B&B
 
Automatización de pruebas E2E con Cypress sobre el sitio [Restful Booker Platform](https://automationintesting.online/), cubriendo los flujos de reserva de habitaciones, validaciones del formulario de reserva y formulario de contacto.
 
## Grupo 15
 
| Integrantes | Email |
|---|---|
| Juan Román Francisco Choque | choquejuanroman@gmail.com |
| Melisa Agustina Araoz | melii.araoz96@gmail.com |
 
## Recursos del proyecto
 
- **Tablero de Trello (gestión de bugs):** [Challenge - Gestión de Bugs](https://trello.com/invite/b/6a3895b878fdb66b9dd8d3be/ATTI6ef217570410ab3a0324ee2ac816c5ee6F50810A/challenge-gestion-de-bugs)
- **Planilla de Test Cases:** [Google Sheets](https://docs.google.com/spreadsheets/d/1vwfwVihr7iDLmCBTPYotSy4KMQrXM5zR/edit?gid=1033429375#gid=1033429375)
## Estructura del proyecto
 
```
cypress/
├── e2e/
│   └── myTestRestfulBooker.cy.js   # Suite principal de tests
└── support/
    └── commands.js                 # Custom commands reutilizables
    └── fechaCheckinCheckout.js     # Custom commands reutilizables
    └── formularioContacto.js       # Custom commands reutilizables
```
 
## Flujos cubiertos
 
1. **Navegación del Home Page** — acceso a las secciones Rooms, Booking, Location, Contact y Admin.
2. **Reserva exitosa como usuario invitado** — selección de habitación, completado del formulario con datos válidos (incluyendo fechas) y confirmación de la reserva.
3. **Validaciones del Formulario de reserva** — envío de formulario vacío y validación de reglas de negocio por campo (Firstname, Lastname, Email, Phone).
4. **Validaciones Formulario de contacto** — envío de formulario vacío y validación de reglas de negocio por campo (Name, Email, Phone, Subject, Message).
5. **Validaciones Footer** — acceso a los Quick Links y Redes Sociales (Instagram, Twitter, Facebook).

## Cómo ejecutar los tests
 
```bash
npm install
npx cypress open    # modo interactivo
# o
npx cypress run     # modo headless
```
