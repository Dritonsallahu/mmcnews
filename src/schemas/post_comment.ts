import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { HydratedDocument } from "mongoose";
import { Role } from "./role";
import { User } from "./user";
import { Post } from "./post";
 

export type PostCommentDocument = HydratedDocument<PostComment>;

@Schema({timestamps: true,})
export class PostComment {

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Post' })
    post: Post

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'PostComment' })
    user: User

    @Prop({required: true })
    username: string

    @Prop({required: true })
    phone_id: string

    @Prop({required: true })
    comment: string

    @Prop({required: true,default: true})
    active: Boolean
}

export const PostCommentSchema = SchemaFactory.createForClass(PostComment);