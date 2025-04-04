import { Controller, Get,Post, UseInterceptors, UploadedFile, Headers, Body, Param } from '@nestjs/common';
import {BondAttackRepository} from '../repositories/bond-attack.repository';
import {FileInterceptor} from '@nestjs/platform-express';
import {Express} from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import {BondAttackService} from '../services/bond-attack.service';

@Controller('bond-attack')
export class BondAttackController {
    constructor(private bondAttackRepository: BondAttackRepository, private bondAttackService: BondAttackService ){}

    @Get('')
    getBondAttack(){
        return this.bondAttackRepository.findBondAttackDoc();
    }

    @Post('upload-file')
    @UseInterceptors(FileInterceptor('file',{
        storage: diskStorage({
            destination: './uploads',
                filename: (req, file, cb)=>{
                  const ext = extname(file.originalname);
                  const filename = `${Date.now()}-${file.originalname}${ext}`;
                  cb(null, filename);
                },     
              })
    }))
    async uploadFile(@Headers() headers: any, @UploadedFile() file: Express.Multer.File) {
    const bondAttackDoc = await this.bondAttackService.updatedBondAttackDocByUploaded(headers);
    return { 
        message: 'File uploaded successfully!',
        filename: file.filename, 
        path: file.path,       
        url: `/uploads/${file.filename}`,
        bondAttackDoc
      };
    }

    @Post('goals')
    async getGoalsForBondStokvel(@Body() payload: any){
      return this.bondAttackService.calculateGoalsOfBond(payload)
    }

    @Post('update/:id')
    updateBondAttackDoc(@Param('id') id: string, @Body() changes: any){
      return this.bondAttackRepository.updateBondAttackDo(id, changes)
    }



    
}
