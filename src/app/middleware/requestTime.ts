import { Request, Response, NextFunction } from 'express';

const requestTime = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Request-Time', new Date().toLocaleString());
  next();
};

export default requestTime;
