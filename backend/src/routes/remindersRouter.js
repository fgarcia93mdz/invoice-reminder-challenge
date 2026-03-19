const express = require('express');
const router = express.Router();


// Crear un endpoint que simule el envío de un recordatorio de pago.

// El endpoint debe:

// Verificar que la factura exista — responder 404 si no se encuentra
// Marcar reminderSent = true en la factura
// Simular el envío con un console.log
// Respuesta esperada (200):

// {
//   "message": "Recordatorio enviado a Empresa ACME",
//   "invoice": { ... }
// }

// router.post('/:invoiceId', getAllOverdueInvoicesController);



router.post('/:invoiceId', );

module.exports = router;
