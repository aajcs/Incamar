import type { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { createToken } from '../helpers/createToken.js';
import prisma from '../utils/prismaClient.js';

// Registro de usuario

export async function register(req: Request, res: Response, next: NextFunction) {
  const { full_name, email, password } = req.body;
  if (!full_name || !email || !password) {
    return res.status(400).json({ message: 'Nombre, email y password son requeridos' });
  }
  try {
    // Verifica si el usuario ya existe
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'El email ya está registrado' });
    }

    // Hash de la contraseña
    const password_hash = await bcrypt.hash(password, 10);

    // Busca el rol "user"
    let userRole = await prisma.role.findUnique({ where: { role_name: 'user' } });
    if (!userRole) {
      userRole = await prisma.role.create({
        data: { role_name: 'user', description: 'Usuario estándar' },
      });
    }

    // Crea el usuario
    const user = await prisma.user.create({
      data: {
        full_name,
        email,
        password_hash,
        userRoles: {
          create: [{ role_id: userRole.role_id }],
        },
      },
      include: { userRoles: { include: { Role: true } } },
    });

    // Genera el token
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return next(new Error('JWT_SECRET no configurado'));
    }

    const token = createToken(user, secret);

    // Retorna usuario (sin password) y token
    return res.status(201).json({
      user: {
        user_id: user.user_id,
        full_name: user.full_name,
        email: user.email,
        roles: user.userRoles.map((ur: { Role: { role_name: string } }) => ur.Role.role_name),
        is_active: user.is_active,
        created_at: user.created_at,
      },
      token,
    });
  } catch (err) {
    return next(err);
  }
}

// Inicio de sesión

export async function login(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email y password son requeridos' });
  }
  try {
    // Busca el usuario por email
    const user = await prisma.user.findUnique({
      where: { email },
      include: { userRoles: { include: { Role: true } } },
    });
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Compara el hash de la contraseña
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Genera el token
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return next(new Error('JWT_SECRET no configurado'));
    }
    const token = createToken(user, secret);

    // Registra el access log
    await prisma.accessLog.create({
      data: {
        user_id: user.user_id,
        action: 'login',
        ip_address: req.ip || null,
      },
    });

    // Retorna usuario (sin password) y token
    return res.status(200).json({
      user: {
        user_id: user.user_id,
        full_name: user.full_name,
        email: user.email,
        roles: user.userRoles.map((ur: { Role: { role_name: string } }) => ur.Role.role_name),
        is_active: user.is_active,
        created_at: user.created_at,
      },
      token,
    });
  } catch (err) {
    return next(err);
  }
}
