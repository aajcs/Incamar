import { Router } from 'express';
import { authenticateJWT } from '../middleware/authMiddleware.js';
import { requireRoles } from '../middleware/roleMiddleware.js';
import {
  createPermission,
  listPermissions,
  getPermission,
  updatePermission,
  deletePermission,
} from '../controllers/permissionController.js';

const router = Router();

// Listar y obtener permisos (solo autenticados)
router.get('/', authenticateJWT, listPermissions);
router.get('/:id', authenticateJWT, getPermission);

// Crear/actualizar/eliminar permisos (solo admin)
router.post('/', authenticateJWT, requireRoles(['superAdmin', 'admin']), createPermission);
router.put('/:id', authenticateJWT, requireRoles(['superAdmin', 'admin']), updatePermission);
router.delete('/:id', authenticateJWT, requireRoles(['superAdmin', 'admin']), deletePermission);

export default router;
