import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/schemas/post';

@Injectable()
export class PublisherService {
    constructor(@InjectModel(Post.name) private postModel: Model<Post>,) { }

    async getPosts() { return await this.postModel.find({}); }

    async getPost(id: string) {
        const post = await this.postModel.findById(id); if (post) return post
        throw new NotFoundException();
    }

    async createPost(postObject: Post) {
        const post = await this.postModel.create(postObject);
        if (post) { return post; }
        else { return; }
    }

    async editPost(id: string, postObject: Post) {
        const post = await this.postModel.findOneAndUpdate(
            { _id: id }, // Use _id if it's the MongoDB ObjectId
            { $set: postObject },
            { new: true } // To return the updated document
        );

        return post; // Return the updated post or null if not found
    }

    async deletePost(id: string) {
        const post = await this.postModel.findByIdAndDelete(
            { _id: id }, // Use _id if it's the MongoDB ObjectId 
        );
        return post; // Return the updated post or null if not found
    }
}
