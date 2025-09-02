import type { Request, Response, NextFunction } from 'express';
import prisma from '../utils/prismaClient.js';

// Crear un permiso
export async function createPermission(req: Request, res: Response, next: NextFunction) {
  try {
    const { permission_name, description } = req.body;
    if (!permission_name) return res.status(400).json({ message: 'permission_name es requerido' });

    const existing = await prisma.permission.findUnique({ where: { permission_name } });
    if (existing) return res.status(409).json({ message: 'El permiso ya existe' });

    const permission = await prisma.permission.create({ data: { permission_name, description } });
    return res.status(201).json(permission);
  } catch (err) {
    console.error('createPermission error', err);
    return next(err);
  }
}

// Listar permisos
export async function listPermissions(_req: Request, res: Response, next: NextFunction) {
  try {
    const permissions = await prisma.permission.findMany({ orderBy: { permission_id: 'asc' } });
    return res.json(permissions);
  } catch (err) {
    console.error('listPermissions error', err);
    return next(err);
  }
}

// Obtener un permiso por ID
export async function getPermission(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ message: 'ID inválido' });

    const permission = await prisma.permission.findUnique({
      where: { permission_id: id },
      include: { rolePermissions: { include: { Role: true } } },
    });
    if (!permission) return res.status(404).json({ message: 'Permiso no encontrado' });
    return res.json(permission);
  } catch (err) {
    console.error('getPermission error', err);
    return next(err);
  }
}

// Actualizar un permiso
export async function updatePermission(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ message: 'ID inválido' });
    const { permission_name, description } = req.body;

    const permission = await prisma.permission.update({
      where: { permission_id: id },
      data: { permission_name, description },
    });
    return res.json(permission);
  } catch (err) {
    console.error('updatePermission error', err);
    return next(err);
  }
}

// Eliminar un permiso
export async function deletePermission(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ message: 'ID inválido' });
    await prisma.permission.delete({ where: { permission_id: id } });
    return res.json({ message: 'Permiso eliminado' });
  } catch (err) {
    console.error('deletePermission error', err);
    return next(err);
  }
}
