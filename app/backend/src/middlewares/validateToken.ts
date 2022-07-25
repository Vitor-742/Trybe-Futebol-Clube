import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

const secret: string = process.env.JWT_SECRET || 'jwt_secret';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  console.log('aaaaaaaaaaaaaaa');
  if (!token) return res.status(401).json({ message: 'Token must be a valid token' });
  try {
    verify(token, secret);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default validateToken;
