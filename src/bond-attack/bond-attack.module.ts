import { Module } from '@nestjs/common';
import {MongooseModule } from '@nestjs/mongoose';
import { BondAttackController } from './controller/bond-attack.controller';
import {bond_attack_model} from './schema/bond-attack.schema';
import { BondAttackRepository} from './repositories/bond-attack.repository';
import { BondAttackService } from './services/bond-attack.service';
@Module({
    imports: [MongooseModule.forFeature([{
        name: 'bondAttack',
        schema: bond_attack_model
    }])],
    controllers: [BondAttackController],
    providers: [BondAttackRepository, BondAttackService],
    exports:[BondAttackService]
})
export class BondAttackModule {}
