import { Module } from '@nestjs/common'; 
import { PostController } from './controllers/post/post.controller';
import { PostService } from './services/post/post.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from 'src/schemas/post';
import { PostCategory, PostCategorySchema } from 'src/schemas/post_category';
import { SavedPost, SavedPostSchema } from 'src/schemas/saved_post';
import { PostVisit, PostVisitSchema } from 'src/schemas/post_visit';
import { PostLike, PostLikeSchema } from 'src/schemas/post_like';
import { PostComment, PostCommentSchema } from 'src/schemas/post_comment';

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
      { name: PostCategory.name, schema: PostCategorySchema },
      { name: SavedPost.name, schema: SavedPostSchema },
      { name: PostVisit.name, schema: PostVisitSchema },
      { name: PostLike.name, schema: PostLikeSchema },
      { name: PostComment.name, schema: PostCommentSchema },
    ]),
  ],
  controllers: [PostController],
  providers: [PostService]
})
export class ReaderModule {}
