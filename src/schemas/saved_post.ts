import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { HydratedDocument } from "mongoose"; 
import { User } from "./user"; 
 import { Post } from "./post";


export type SavedPostDocument = HydratedDocument<SavedPost>;

@Schema({ timestamps: true, })
export class SavedPost { 

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    author: User
 
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Post' })
    post: Post
     
    @Prop({ required: true, default: true })
    app_id: string
      
    @Prop({ required: true, default: true })
    active: Boolean

     
}

export const SavedPostSchema = SchemaFactory.createForClass(SavedPost);