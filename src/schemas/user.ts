import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { HydratedDocument } from "mongoose";
import { Role } from "./role";
 

export type UserDocument = HydratedDocument<User>;

@Schema({timestamps: true,})
export class User {
    @Prop()
    fullname: string; 

    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Role' })
    role: Role 

    @Prop({required: true})
    username: string

    @Prop({required: true, unique: true})
    email: string

    @Prop({required: true}) 
    password: string

    @Prop({required: true,default: true})
    active: Boolean
}

export const UserSchema = SchemaFactory.createForClass(User);