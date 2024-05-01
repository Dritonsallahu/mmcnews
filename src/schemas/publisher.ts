import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { HydratedDocument } from "mongoose";
import { Role } from "./role";
import { User } from "./user";
 

export type PublisherDocument = HydratedDocument<Publisher>;

@Schema({timestamps: true,})
export class Publisher {

    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User

    @Prop({required: true,default: true})
    active: Boolean
}

export const PublisherSchema = SchemaFactory.createForClass(Publisher);