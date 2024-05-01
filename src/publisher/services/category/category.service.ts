import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostCategory } from 'src/schemas/post_category';

@Injectable()
export class CategoryService {
    constructor(@InjectModel(PostCategory.name) private postCategoryModel: Model<PostCategory>,) { }

    async getPostCategories() { return await this.postCategoryModel.find({}); }

    async createNewCategory(postCategory: PostCategory) {
        const exist = await this.postCategoryModel.findOne({ 
            $or: [{ categoryName: postCategory.categoryName }, { categoryNumber: postCategory.categoryNumber }] 
        });
        if (exist) { return new ConflictException(); }
        return await this.postCategoryModel.create(postCategory);
    }

}
