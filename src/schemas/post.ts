import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { HydratedDocument } from "mongoose";
import { Role } from "./role";
import { User } from "./user";
import { PostCategory } from "./post_category";

export type PostDocument = HydratedDocument<Post>;

@Schema({ timestamps: true })
export class Post {
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    author: User;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'PostCategory' })
    postCategory: PostCategory;

    @Prop({ required: true })
    postTitle: string;

    @Prop({})
    postSubtitle: string;

    @Prop({ required: true })
    body: string;

    @Prop({ required: true })
    breakingNews: boolean;

    @Prop({ required: true })
    continent: string;

    @Prop({ required: true })
    country: string;

    @Prop({ required: true })
    tags: string[]; // Use lowercase 'string' instead of 'String'

    @Prop({ required: true })
    image: string;

    @Prop({ required: true })
    files: string[]; // Use lowercase 'string' instead of 'String'

    @Prop({ required: true, default: true })
    active: boolean;
}

export const PostSchema = SchemaFactory.createForClass(Post);

// Apply the virtual property to the schema
PostSchema.set('toObject', { virtuals: true });
PostSchema.set('toJSON', { virtuals: true });

// Correct the virtual property name to match your model name
PostSchema.virtual('commentsNumber', {
    ref: 'PostComment',
    localField: '_id',
    foreignField: 'post',
    count: true
});

// Correct the virtual property name to match your model name
PostSchema.virtual('likesNumber', {
    ref: 'PostLike',
    localField: '_id',
    foreignField: 'post',
    count: true
});
