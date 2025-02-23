import { Module } from '@nestjs/common';
import {FileHandlerController} from './controller/file-handler.controller';
import { HandleFilesService } from './service/handle-files.service';

@Module({
    controllers: [FileHandlerController],
    providers: [HandleFilesService]
})
export class HandleFilesModule {}
