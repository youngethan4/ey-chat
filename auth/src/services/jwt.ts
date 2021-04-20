import jwt from 'jsonwebtoken';

export class JWT {
  static sign(id: string, username: string): string {
    return jwt.sign(
      {
        id: id,
        username: username,
      },
      process.env.JWT_KEY!
    );
  }
}
