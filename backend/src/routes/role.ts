import { Router } from 'express';
import { authenticateJWT } from '../middleware/authMiddleware.js';
import { requireRoles } from '../middleware/roleMiddleware.js';
import {
  createRole,
  listRoles,
  getRole,
  updateRole,
  deleteRole,
  addPermissionToRole,
  removePermissionFromRole,
} from '../controllers/roleController.js';

const router = Router();

// Listar roles (solo usuarios autenticados)
router.get('/', authenticateJWT, listRoles);
// Obtener rol por id
router.get('/:id', authenticateJWT, getRole);

// Crear, actualizar y eliminar roles (solo admin)
router.post('/', authenticateJWT, requireRoles(['superAdmin', 'admin']), createRole);
router.put('/:id', authenticateJWT, requireRoles(['superAdmin', 'admin']), updateRole);
router.delete('/:id', authenticateJWT, requireRoles(['superAdmin', 'admin']), deleteRole);

// Permisos sobre roles (solo admin)
router.post(
  '/:id/permissions',
  authenticateJWT,
  requireRoles(['superAdmin', 'admin']),
  addPermissionToRole,
);
router.delete(
  '/:id/permissions/:permissionId',
  authenticateJWT,
  requireRoles(['superAdmin', 'admin']),
  removePermissionFromRole,
);

export default router;
