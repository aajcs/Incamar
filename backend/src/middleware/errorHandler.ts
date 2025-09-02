import type { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';

// Global error handler
export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  // Prisma known errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002': {
        // Unique constraint failed
        const target = Array.isArray((err as any).meta?.target)
          ? (err as any).meta?.target.join(', ')
          : (err as any).meta?.target;
        return res.status(409).json({ message: 'Conflicto de unicidad', code: err.code, target });
      }
      case 'P2025': {
        // Record not found
        return res.status(404).json({ message: 'Recurso no encontrado', code: err.code });
      }
      case 'P2003': {
        // Foreign key constraint failed
        return res
          .status(409)
          .json({ message: 'Conflicto de integridad referencial', code: err.code });
      }
      default:
        return res.status(500).json({ message: 'Error de base de datos', code: err.code });
    }
  }

  // JWT errors
  if (err?.name === 'JsonWebTokenError') {
    return res.status(401).json({ message: 'Token inválido' });
  }
  if (err?.name === 'TokenExpiredError') {
    return res.status(401).json({ message: 'Token expirado' });
  }

  // Fallback
  return res.status(500).json({ message: 'Error interno del servidor' });
}
