import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "./user";

export type ReaderDocument = HydratedDocument<Reader>;

@Schema({ timestamps: true, })
export class Reader {

    @Prop({})
    user: mongoose.Types.ObjectId

    @Prop({ required: true })
    phoneId: string
    
    @Prop({})
    state: string

    @Prop({ required: true, default: true })
    active: Boolean



}

export const ReaderSchema = SchemaFactory.createForClass(Reader)