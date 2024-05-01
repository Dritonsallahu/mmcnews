import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"; 
import { HydratedDocument } from "mongoose";

export type PostCategoryDocument = HydratedDocument<PostCategory>;

@Schema({timestamps: true,})
export class PostCategory {

    @Prop({required: true})
    categoryNumber: Number;

    @Prop({required: true})
    categoryName: string
}

export const PostCategorySchema = SchemaFactory.createForClass(PostCategory)