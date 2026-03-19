# Desafío Técnico – Invoice Reminder System

Ejercicio técnico para desarrolladores **Junior Full Stack** con orientación a backend.

---

## Descripción

Este ejercicio simula un pequeño sistema de gestión de facturas. La empresa necesita detectar qué facturas están vencidas y enviar recordatorios de pago a los clientes correspondientes.

El backend base ya está implementado con funcionalidades mínimas. Tu tarea es **extenderlo** agregando nuevos endpoints, validaciones y manejo de errores.

No buscamos algoritmos complejos. Queremos ver cómo razonás, cómo organizás tu código y cómo tomás decisiones técnicas simples pero correctas.

---

## Contexto del problema

El sistema actualmente permite:

| Método | Ruta        | Descripción               |
|--------|-------------|---------------------------|
| GET    | `/invoices` | Listar todas las facturas |
| POST   | `/invoices` | Crear una nueva factura   |

Todavía **no tiene** las siguientes funcionalidades:

- Detectar facturas vencidas
- Enviar recordatorios de pago a clientes

Eso es lo que vas a construir.

### Modelo de datos

```json
{
  "id": 1,
  "clientName": "Empresa ACME",
  "amount": 120000,
  "dueDate": "2026-02-10",
  "status": "pending",
  "reminderSent": false
}
```

**Valores posibles de `status`:** `pending` | `paid`

---

## Instalación

### Requisitos previos

- Node.js >= 18
- npm >= 9

### Backend

```bash
cd backend
npm install
npm run dev
```

El servidor queda disponible en `http://localhost:3001`.

> Al iniciar por primera vez se cargan automáticamente facturas de ejemplo mediante un seed.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

La aplicación queda disponible en `http://localhost:5173`.

---

## Tareas a implementar

### Tarea 1 — `GET /invoices/overdue`

Crear un endpoint que devuelva todas las facturas **vencidas**.

Una factura está vencida cuando cumple **ambas** condiciones:

- `status` es `"pending"`
- `dueDate` es anterior a la fecha actual

**Respuesta esperada (`200`):**

```json
[
  {
    "id": 1,
    "clientName": "Empresa ACME",
    "amount": 120000,
    "dueDate": "2026-01-20",
    "status": "pending",
    "reminderSent": false
  }
]
```

---

Tarea 2 — POST /reminders/:invoiceId
Crear un endpoint que simule el envío de un recordatorio de pago.

El endpoint debe:

Verificar que la factura exista — responder 404 si no se encuentra
Marcar reminderSent = true en la factura
Simular el envío con un console.log
Respuesta esperada (200):

{
  "message": "Recordatorio enviado a Empresa ACME",
  "invoice": { ... }
}
Sugerencia: Revisá el código existente con atención antes de implementar este endpoint. Puede haber comportamientos inesperados.### Tarea 2 — `POST /reminders/:invoiceId`

Crear un endpoint que simule el envío de un recordatorio de pago.

El endpoint debe:

1. Verificar que la factura exista — responder `404` si no se encuentra
2. Marcar `reminderSent = true` en la factura
3. Simular el envío con un `console.log`

**Respuesta esperada (`200`):**

```json
{
  "message": "Recordatorio enviado a Empresa ACME",
  "invoice": { ... }
}
```

> **Sugerencia:** Revisá el código existente con atención antes de implementar este endpoint. Puede haber comportamientos inesperados.

---

### Tarea 3 — Validaciones en `POST /invoices`

Agregar validaciones a la creación de facturas:

- `clientName` es obligatorio
- `amount` debe ser mayor a `0`
- `dueDate` debe ser una fecha válida

Devolver `400` con un mensaje claro si alguna validación falla.

**Respuesta esperada (`400`):**

```json
{
  "error": "El campo clientName es obligatorio"
}
```

---

### Tarea 4 — Mejorar el manejo de errores

Revisar todos los endpoints (existentes y nuevos) y garantizar que usen los códigos HTTP correctos:

| Código | Cuándo usarlo                  |
|--------|--------------------------------|
| `200`  | Operación exitosa              |
| `201`  | Recurso creado correctamente   |
| `400`  | Error de validación            |
| `404`  | Recurso no encontrado          |
| `500`  | Error interno del servidor     |

---

## Bonus opcional

### `GET /invoices/stats`

Implementar un endpoint que devuelva estadísticas generales del sistema:

```json
{
  "total": 10,
  "pending": 5,
  "paid": 3,
  "overdue": 2
}
```

> **Tip:** Una factura puede estar `pending` sin estar `overdue`. Pensá bien la diferencia entre ambos conceptos.

---

## Estructura del proyecto

```
invoice-reminder-challenge/
├── backend/
│   ├── src/
│   │   ├── app.js                    # Entry point — configura Express y rutas
│   │   ├── controllers/
│   │   │   └── invoicesController.js # Manejo de requests HTTP
│   │   ├── db/
│   │   │   ├── database.js           # Capa de persistencia (lectura/escritura JSON)
│   │   │   └── seed.js               # Datos iniciales de ejemplo
│   │   ├── routes/
│   │   │   └── invoicesRoutes.js     # Definición de rutas
│   │   └── services/
│   │       └── invoiceService.js     # Lógica de negocio
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx                   # Componente principal — lista de facturas
│   │   ├── api.js                    # Funciones para llamar al backend
│   │   └── main.jsx                  # Entry point de React
│   ├── index.html
│   └── package.json
└── README.md
```

**`backend/`** contiene toda la API REST y la lógica de negocio.  
**`frontend/`** es una interfaz mínima para visualizar las facturas. No es el foco del ejercicio.

---

## Trabajo con Git

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/fgarcia93mdz/invoice-reminder-challenge.git
   cd invoice-reminder-challenge
   ```

2. Crear una rama con tu nombre:

   ```bash
   git checkout -b feature/tu-nombre
   ```

3. Realizar commits claros y atómicos. Algunos ejemplos:

   ```
   feat: add GET /invoices/overdue endpoint
   feat: add POST /reminders/:invoiceId
   fix: add input validations to POST /invoices
   fix: improve error handling with correct HTTP codes
   ```

4. Al terminar, abrir un **Pull Request** hacia `main` con una descripción breve de:
   - Qué implementaste
   - Qué decisiones técnicas tomaste y por qué
   - Qué mejorarías si tuvieras más tiempo

---

## Criterios de evaluación

| Criterio                  | Descripción                                                      |
|---------------------------|------------------------------------------------------------------|
| **Organización del código** | ¿Respetás la estructura existente? ¿El código es claro?        |
| **Claridad de commits**   | ¿Los mensajes son descriptivos y atómicos?                       |
| **Implementación**        | ¿Los endpoints funcionan correctamente según lo especificado?    |
| **Manejo de errores**     | ¿Usás los códigos HTTP correctos? ¿Pensás en los casos borde?   |
| **Razonamiento**          | ¿Se entiende por qué tomaste cada decisión?                      |

---

## Nota final

El objetivo de este ejercicio **no es llegar a una solución perfecta**.

Queremos entender cómo pensás, cómo organizás tu trabajo y cómo explicás tus decisiones.

Si encontrás algo en el código base que te parece incorrecto o mejorable, podés refactorizarlo. Contanos en el Pull Request qué encontraste y qué cambiaste.
