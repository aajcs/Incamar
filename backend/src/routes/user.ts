import { Router, type Request, type Response, type NextFunction } from 'express';
import { authenticateJWT } from '../middleware/authMiddleware.js';
import { requireRoles } from '../middleware/roleMiddleware.js';
import {
  listUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  addRoleToUser,
  removeRoleFromUser,
  changePassword,
  addRolesToUserBulk,
} from '../controllers/userController.js';

const router = Router();

// Middleware para permitir al propietario o a un admin
function ownerOrAdmin(req: Request, res: Response, next: NextFunction) {
  const authUser = (req as any).user as { user_id?: string; roles?: string[] } | undefined;
  if (!authUser) return res.status(401).json({ message: 'No autenticado' });

  if (authUser.user_id === req.params.id) return next();
  const roles = authUser.roles || [];
  if (roles.includes('superAdmin') || roles.includes('admin')) return next();

  return res.status(403).json({ message: 'No tienes permisos suficientes' });
}

// Listar usuarios (solo admin)
router.get('/', authenticateJWT, requireRoles(['superAdmin', 'admin']), listUsers);

// Obtener usuario por ID (propietario o admin)
router.get('/:id', authenticateJWT, ownerOrAdmin, getUser);

// Crear usuario (solo admin)
router.post('/', authenticateJWT, requireRoles(['superAdmin', 'admin']), createUser);

// Actualizar usuario (propietario o admin)
router.put('/:id', authenticateJWT, ownerOrAdmin, updateUser);

// Eliminar usuario (solo admin)
router.delete('/:id', authenticateJWT, requireRoles(['superAdmin', 'admin']), deleteUser);

// Asignar rol a usuario (solo admin)
router.post('/:id/roles', authenticateJWT, requireRoles(['superAdmin', 'admin']), addRoleToUser);

// Remover rol de usuario (solo admin)
router.delete(
  '/:id/roles/:roleId',
  authenticateJWT,
  requireRoles(['superAdmin', 'admin']),
  removeRoleFromUser,
);

// Cambiar password (solo admin)
router.post(
  '/:id/change-password',
  authenticateJWT,
  requireRoles(['superAdmin', 'admin']),
  changePassword,
);

// Asignar múltiples roles (solo admin)
router.post(
  '/:id/roles/bulk',
  authenticateJWT,
  requireRoles(['superAdmin', 'admin']),
  addRolesToUserBulk,
);

export default router;
