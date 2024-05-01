import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { HydratedDocument } from "mongoose";
import { Role } from "./role";
import { User } from "./user";
import { Post } from "./post";
 

export type PostLikeDocument = HydratedDocument<PostLike>;

@Schema({timestamps: true,})
export class PostLike {

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Post' })
    post: Post

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'PostLike' })
    user: User

    @Prop({required: true })
    phone_id: string

    @Prop({required: true,default: true})
    active: Boolean
}

export const PostLikeSchema = SchemaFactory.createForClass(PostLike);