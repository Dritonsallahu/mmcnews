import { Module } from '@nestjs/common';
import { PublisherController } from './controllers/publisher/publisher.controller';
import { PublisherService } from './services/publisher/publisher.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from 'src/schemas/post';
import { CategoryController } from './controllers/category/category.controller'; 
import { CategoryService } from './services/category/category.service';
import { PostCategory, PostCategorySchema } from 'src/schemas/post_category';

@Module({
    imports: [
        MongooseModule.forFeature([ 
            { name: Post.name, schema: PostSchema },
            { name: PostCategory.name, schema: PostCategorySchema },    
          ]),
    ],
    controllers: [PublisherController, CategoryController],
    providers: [PublisherService, CategoryService]
})
export class PublisherModule {}
