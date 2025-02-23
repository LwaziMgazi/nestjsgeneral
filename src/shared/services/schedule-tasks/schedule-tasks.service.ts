import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import{BondAttackService} from '../../../bond-attack/services/bond-attack.service';

@Injectable()
export class ScheduleTasksService {

  constructor(private bondAttackService:BondAttackService ){}

    @Cron('5 4 * * *')
    async handleCron() {
        await this.bondAttackService.performBondSmsSendingTasks()
      }
}
