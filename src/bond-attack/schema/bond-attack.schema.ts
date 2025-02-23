import * as mongoose from 'mongoose';

export const bond_attack_model = new mongoose.Schema(
    {
        name: String,
        membersByPlace: Object
      }
)
