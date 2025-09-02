import type { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import prisma from '../utils/prismaClient.js';
import type { Prisma } from '@prisma/client';

// Listar usuarios
export async function listUsers(_req: Request, res: Response, next: NextFunction) {
  try {
    const users = await prisma.user.findMany({
      orderBy: { created_at: 'desc' },
      include: { userRoles: { include: { Role: true } } },
    });
    return res.json(
      users.map((u) => ({
        user_id: u.user_id,
        full_name: u.full_name,
        email: u.email,
        is_active: u.is_active,
        created_at: u.created_at,
        roles: u.userRoles.map((ur: any) => ur.Role.role_name),
      })),
    );
  } catch (err) {
    console.error('listUsers error', err);
    return next(err);
  }
}

// Obtener usuario por ID
export async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const id = String(req.params.id);
    const user = await prisma.user.findUnique({
      where: { user_id: id },
      include: { userRoles: { include: { Role: true } } },
    });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    return res.json({
      user_id: user.user_id,
      full_name: user.full_name,
      email: user.email,
      is_active: user.is_active,
      created_at: user.created_at,
      roles: user.userRoles.map((ur: any) => ur.Role.role_name),
    });
  } catch (err) {
    console.error('getUser error', err);
    return next(err);
  }
}

// Crear usuario (admin)
export async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { full_name, email, password, role_ids } = req.body as {
      full_name: string;
      email: string;
      password: string;
      role_ids?: number[];
    };
    if (!full_name || !email || !password) {
      return res.status(400).json({ message: 'full_name, email y password son requeridos' });
    }

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return res.status(409).json({ message: 'El email ya está registrado' });

    const password_hash = await bcrypt.hash(password, 10);

    // Si no se pasan roles, asignar rol "user" por defecto
    let rolesToAssign: { role_id: number }[] = [];
    if (Array.isArray(role_ids) && role_ids.length > 0) {
      rolesToAssign = role_ids.map((r) => ({ role_id: Number(r) }));
    } else {
      const userRole =
        (await prisma.role.findUnique({ where: { role_name: 'user' } })) ??
        (await prisma.role.create({
          data: { role_name: 'user', description: 'Usuario estándar' },
        }));
      rolesToAssign = [{ role_id: userRole.role_id }];
    }

    const user = await prisma.user.create({
      data: {
        full_name,
        email,
        password_hash,
        userRoles: { create: rolesToAssign },
      },
      include: { userRoles: { include: { Role: true } } },
    });

    return res.status(201).json({
      user_id: user.user_id,
      full_name: user.full_name,
      email: user.email,
      is_active: user.is_active,
      created_at: user.created_at,
      roles: user.userRoles.map((ur: any) => ur.Role.role_name),
    });
  } catch (err: any) {
    console.error('createUser error', err);
    return next(err);
  }
}

// Actualizar usuario (admin o el propio usuario)
export async function updateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const id = String(req.params.id);
    const { full_name, email, is_active } = req.body as {
      full_name?: string;
      email?: string;
      is_active?: boolean;
    };

    const data: Prisma.UserUpdateInput = { updated_at: new Date() };
    if (full_name !== undefined) data.full_name = full_name;
    if (email !== undefined) data.email = email;
    if (is_active !== undefined) data.is_active = is_active;

    type UserWithRoles = Prisma.UserGetPayload<{
      include: { userRoles: { include: { Role: true } } };
    }>;
    const user = (await prisma.user.update({
      where: { user_id: id },
      data,
      include: { userRoles: { include: { Role: true } } },
    })) as UserWithRoles;

    return res.json({
      user_id: user.user_id,
      full_name: user.full_name,
      email: user.email,
      is_active: user.is_active,
      created_at: user.created_at,
      roles: user.userRoles.map((ur: any) => ur.Role.role_name),
    });
  } catch (err: any) {
    console.error('updateUser error', err);
    return next(err);
  }
}

// Eliminar usuario (admin)
export async function deleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    const id = String(req.params.id);
    await prisma.user.delete({ where: { user_id: id } });
    return res.json({ message: 'Usuario eliminado' });
  } catch (err: any) {
    console.error('deleteUser error', err);
    return next(err);
  }
}

// Asignar rol a usuario (admin)
export async function addRoleToUser(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = String(req.params.id);
    const { role_id } = req.body as { role_id: number };
    if (!role_id) return res.status(400).json({ message: 'role_id es requerido' });

    const [user, role] = await Promise.all([
      prisma.user.findUnique({ where: { user_id: userId } }),
      prisma.role.findUnique({ where: { role_id: Number(role_id) } }),
    ]);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    if (!role) return res.status(404).json({ message: 'Rol no encontrado' });

    const ur = await prisma.userRole.upsert({
      where: { user_id_role_id: { user_id: userId, role_id: Number(role_id) } },
      update: {},
      create: { user_id: userId, role_id: Number(role_id) },
    });
    return res.status(201).json(ur);
  } catch (err) {
    console.error('addRoleToUser error', err);
    return next(err);
  }
}

// Remover rol de usuario (admin)
export async function removeRoleFromUser(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = String(req.params.id);
    const roleId = Number(req.params.roleId);
    if (!userId || Number.isNaN(roleId)) {
      return res.status(400).json({ message: 'Parámetros inválidos' });
    }
    await prisma.userRole.delete({
      where: { user_id_role_id: { user_id: userId, role_id: roleId } },
    });
    return res.json({ message: 'Rol removido del usuario' });
  } catch (err: any) {
    console.error('removeRoleFromUser error', err);
    return next(err);
  }
}

// Cambiar password (admin)
export async function changePassword(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = String(req.params.id);
    const { new_password } = req.body as { new_password: string };
    if (!new_password) return res.status(400).json({ message: 'new_password es requerido' });

    const password_hash = await bcrypt.hash(new_password, 10);
    await prisma.user.update({
      where: { user_id: userId },
      data: { password_hash, updated_at: new Date() },
    });
    return res.json({ message: 'Password actualizado' });
  } catch (err: any) {
    console.error('changePassword error', err);
    return next(err);
  }
}

// Asignar múltiples roles a usuario (admin)
export async function addRolesToUserBulk(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = String(req.params.id);
    const role_ids_raw = (req.body as any)?.role_ids as Array<number | string> | undefined;

    if (!Array.isArray(role_ids_raw) || role_ids_raw.length === 0) {
      return res.status(400).json({ message: 'role_ids (array) es requerido' });
    }

    const roleIds = Array.from(
      new Set(role_ids_raw.map((r) => Number(r)).filter((n) => Number.isFinite(n)) as number[]),
    );

    if (roleIds.length === 0) {
      return res.status(400).json({ message: 'role_ids debe contener ids numéricos válidos' });
    }

    const user = await prisma.user.findUnique({ where: { user_id: userId } });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const existingRoles = await prisma.role.findMany({
      where: { role_id: { in: roleIds } },
      select: { role_id: true },
    });
    const existingIds = new Set(existingRoles.map((r) => r.role_id));
    const invalid = roleIds.filter((id) => !existingIds.has(id));
    if (invalid.length > 0) {
      return res
        .status(400)
        .json({ message: 'Algunos role_ids no existen', invalid_role_ids: invalid });
    }

    await prisma.userRole.createMany({
      data: roleIds.map((rid) => ({ user_id: userId, role_id: rid })),
      skipDuplicates: true,
    });

    const userWithRoles = await prisma.user.findUnique({
      where: { user_id: userId },
      include: { userRoles: { include: { Role: true } } },
    });

    return res.status(201).json({
      message: 'Roles asignados',
      user_id: userId,
      roles: (userWithRoles?.userRoles || []).map((ur: any) => ur.Role.role_name),
    });
  } catch (err) {
    console.error('addRolesToUserBulk error', err);
    return next(err);
  }
}
