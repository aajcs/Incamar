import express from 'express';
import type { Request, Response } from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import 'dotenv/config';

import authRoutes from './routes/auth.js';
import roleRoutes from './routes/role.js';
import permissionRoutes from './routes/permission.js';
import userRoutes from './routes/user.js';
import { errorHandler } from './middleware/errorHandler.js';

// Global diagnostic handlers
process.on('unhandledRejection', (reason) => {
  console.error('UNHANDLED REJECTION =>', reason);
});
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION =>', err);
});
console.log('Starting app with NODE_ENV=', process.env.NODE_ENV);

const app = express();
const port = process.env.PORT || 4000;
const server = createServer(app);

app.use(express.json());

// Rutas de autenticación
app.use('/auth', authRoutes);
// Rutas de roles protegidas
app.use('/roles', roleRoutes);
// Rutas de permisos protegidas
app.use('/permissions', permissionRoutes);
// Rutas de usuarios protegidas
app.use('/users', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// WebSocket setup
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('New WebSocket connection');
  ws.send('Welcome to WebSocket server!');

  ws.on('message', (message) => {
    console.log('Received:', message.toString());
    ws.send(`Echo: ${message}`);
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });
});

// Error handler (después de las rutas)
app.use(errorHandler);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`WebSocket server running on port ${port}`);
});
