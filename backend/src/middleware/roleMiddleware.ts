import type { Request, Response, NextFunction } from 'express';
import prisma from '../utils/prismaClient.js';

/**
 * Middleware para verificar si el usuario tiene al menos uno de los roles requeridos.
 * Uso: app.get('/ruta', authenticateJWT, requireRoles(['admin', 'user']), handler)
 */
export function requireRoles(roles: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user || !user.user_id) {
      return res.status(401).json({ message: 'No autenticado' });
    }
    try {
      // Busca los roles del usuario en la base de datos
      const userWithRoles = await prisma.user.findUnique({
        where: { user_id: user.user_id },
        include: { userRoles: { include: { Role: true } } },
      });
      const userRoles =
        userWithRoles?.userRoles.map((ur: { Role: { role_name: string } }) => ur.Role.role_name) ||
        [];
      const hasRole = roles.some((role) => userRoles.includes(role));
      if (!hasRole) {
        return res.status(403).json({ message: 'No tienes permisos suficientes' });
      }
      next();
    } catch (err) {
      return res.status(500).json({ message: 'Error verificando roles', error: err });
    }
  };
}
