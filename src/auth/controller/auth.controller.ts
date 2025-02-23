import { Body, Controller, Get, Param, Patch, Post, Put,UseGuards,Request } from "@nestjs/common";
import { ImaboItems } from "src/model/maboItems";
import {LocalAuthGuard} from '../localAuth.guard';
import {AuthService} from '../auth.service'

@Controller('api')
export class AuthController {
   constructor(private readonly authService: AuthService){}

 @UseGuards(LocalAuthGuard)
 @Post('/login')
 logIn(@Request() req) {
   return this.authService.logIn(req.user);
 }
 }