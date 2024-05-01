import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "./user";
import { Role } from "./role";

export type SubscriberDocument = HydratedDocument<Subscriber>;

@Schema({ timestamps: true, })
export class Subscriber {

    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User 

    @Prop({ required: true })
    city: string
    
    @Prop({})
    state: string

    @Prop({ required: true, default: true })
    active: Boolean



}

export const SubscriberSchema = SchemaFactory.createForClass(Subscriber)