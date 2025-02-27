import {Injectable, NestMiddleware} from '@nestjs/common';
import {NextFunction, Request, Response} from 'express';
import { Logger } from '@nestjs/common';
@Injectable()
export class AppsMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
       
        next()
    }
}