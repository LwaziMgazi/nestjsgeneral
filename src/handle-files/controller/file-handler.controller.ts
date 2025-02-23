import { Controller, Post ,UploadedFile, UseInterceptors} from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express';
import {Express} from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('file-handler')
export class FileHandlerController {
    constructor(){}

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
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return { 
        message: 'File uploaded successfully!',
        filename: file.filename, 
        path: file.path,       
        url: `/uploads/${file.filename}`
        
      };
    }
}
