import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

const secret: string = process.env.JWT_SECRET || 'jwt_secret';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) return res.status(400).end();
  try {
    verify(token, secret);
    next();
  } catch (error) {
    return res.status(400).json({ message: 'Unvalid Token' });
  }
};

export default validateToken;
