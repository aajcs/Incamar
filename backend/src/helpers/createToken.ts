import jwt from 'jsonwebtoken';

export function createToken(user: any, secret: string): string {
  return jwt.sign(
    {
      user_id: user.user_id,
      email: user.email,
      roles: user.userRoles.map((ur: { Role: { role_name: string } }) => ur.Role.role_name),
    },
    secret,
    { expiresIn: '1d' },
  );
}
