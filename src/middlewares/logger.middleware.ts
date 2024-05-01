
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const {userid, uniqueid} = req.headers;
    // console.log('Request...',req.method,' ',req.path,userid, uniqueid);
    next();
  } 
}