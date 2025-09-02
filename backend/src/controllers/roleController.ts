import type { Request, Response, NextFunction } from 'express';
import prisma from '../utils/prismaClient.js';

// Crear un rol
export async function createRole(req: Request, res: Response, next: NextFunction) {
  try {
    const { role_name, description } = req.body;
    if (!role_name) return res.status(400).json({ message: 'role_name es requerido' });

    const existing = await prisma.role.findUnique({ where: { role_name } });
    if (existing) return res.status(409).json({ message: 'El rol ya existe' });

    const role = await prisma.role.create({ data: { role_name, description } });
    return res.status(201).json(role);
  } catch (err) {
    console.error('createRole error', err);
    return next(err);
  }
}

// Listar roles
export async function listRoles(_req: Request, res: Response, next: NextFunction) {
  try {
    const roles = await prisma.role.findMany({ orderBy: { role_id: 'asc' } });
    return res.json(roles);
  } catch (err) {
    console.error('listRoles error', err);
    return next(err);
  }
}

// Obtener un rol por ID
export async function getRole(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ message: 'ID inválido' });
    const role = await prisma.role.findUnique({
      where: { role_id: id },
      include: { rolePermissions: { include: { Permission: true } }, userRoles: true },
    });
    if (!role) return res.status(404).json({ message: 'Rol no encontrado' });
    return res.json(role);
  } catch (err) {
    console.error('getRole error', err);
    return next(err);
  }
}

// Actualizar un rol
export async function updateRole(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ message: 'ID inválido' });
    const { role_name, description } = req.body;

    const role = await prisma.role.update({
      where: { role_id: id },
      data: { role_name, description },
    });
    return res.json(role);
  } catch (err) {
    console.error('updateRole error', err);
    return next(err);
  }
}

// Eliminar un rol
export async function deleteRole(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ message: 'ID inválido' });
    await prisma.role.delete({ where: { role_id: id } });
    return res.json({ message: 'Rol eliminado' });
  } catch (err) {
    console.error('deleteRole error', err);
    return next(err);
  }
}

// Asignar un permiso a un rol
export async function addPermissionToRole(req: Request, res: Response, next: NextFunction) {
  try {
    const roleId = Number(req.params.id);
    const { permission_id } = req.body;
    if (Number.isNaN(roleId) || !permission_id) {
      return res.status(400).json({ message: 'Datos inválidos' });
    }
    // Verificar existencia
    const [role, perm] = await Promise.all([
      prisma.role.findUnique({ where: { role_id: roleId } }),
      prisma.permission.findUnique({ where: { permission_id } }),
    ]);
    if (!role) return res.status(404).json({ message: 'Rol no encontrado' });
    if (!perm) return res.status(404).json({ message: 'Permiso no encontrado' });

    const rp = await prisma.rolePermission.upsert({
      where: { role_id_permission_id: { role_id: roleId, permission_id } },
      update: {},
      create: { role_id: roleId, permission_id },
    });
    return res.status(201).json(rp);
  } catch (err) {
    console.error('addPermissionToRole error', err);
    return next(err);
  }
}

// Remover un permiso de un rol
export async function removePermissionFromRole(req: Request, res: Response, next: NextFunction) {
  try {
    const roleId = Number(req.params.id);
    const permissionId = Number(req.params.permissionId);
    if (Number.isNaN(roleId) || Number.isNaN(permissionId)) {
      return res.status(400).json({ message: 'IDs inválidos' });
    }
    await prisma.rolePermission.delete({
      where: { role_id_permission_id: { role_id: roleId, permission_id: permissionId } },
    });
    return res.json({ message: 'Permiso removido' });
  } catch (err) {
    console.error('removePermissionFromRole error', err);
    return next(err);
  }
}
