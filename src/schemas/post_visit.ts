import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"; 
import mongoose, { HydratedDocument, mongo } from "mongoose";
import { User } from "./user";
import { Post } from "./post";

export type PostVisitDocument = HydratedDocument<PostVisit>;

@Schema({timestamps: true,})
export class PostVisit {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User
 
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Post' })
    post: Post
 
    @Prop({ required: true})
    phoneID: string

    @Prop()
    visitNumber: Number
}

export const PostVisitSchema = SchemaFactory.createForClass(PostVisit)