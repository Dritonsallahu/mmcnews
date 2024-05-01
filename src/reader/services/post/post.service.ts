import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, ObjectId } from 'mongoose';
import { Post } from 'src/schemas/post';
import { PostCategory } from 'src/schemas/post_category';
import { PostComment } from 'src/schemas/post_comment';
import { PostLike } from 'src/schemas/post_like';
import { PostVisit } from 'src/schemas/post_visit';
import { SavedPost } from 'src/schemas/saved_post';


@Injectable()
export class PostService {
    constructor(
        @InjectModel(Post.name) private postModel: Model<Post>,
        @InjectModel(PostCategory.name) private postCategory: Model<PostCategory>,
        @InjectModel(SavedPost.name) private savedPost: Model<SavedPost>,
        @InjectModel(PostVisit.name) private postVisitModel: Model<PostVisit>,
        @InjectModel(PostLike.name) private postLikeModel: Model<PostLike>,
        @InjectModel(PostComment.name) private postCommentModel: Model<PostComment>,
    ) { }

    async getPosts() {
        const posts = await this.postModel.find({ breakingNews: false })
            .populate('postCategory')
            .populate('author')
            .sort({ createdAt: -1 }).limit(15);

        return posts
    }

    async visitNewPost(userID: any, uniqueID: string, postID: any) {
        var data = { phoneID: uniqueID, post: postID };
        if (userID) { data['user'] = userID } 
        data['visitNumber'] = 1;

        try {
            const postObjectId = new mongoose.Types.ObjectId(postID);
            const exist = await this.postVisitModel.findOne({ post: postObjectId })

            if (exist) {
                if (exist.phoneID == uniqueID) {

                    // dont update
                    return null;
                }
                else {
                    if (!exist.visitNumber) {
                        exist.visitNumber = 1; 
                        exist.save();
                        return exist;
                    }
                    exist.visitNumber = (exist.visitNumber as number) + 1;
                    exist.save();
                    return exist;
                }

            }
            const post = await this.postVisitModel.create(data)
            return post;

        } catch (error) {
            // console.log(error); 
            return null;
        }
    }

    async getNewsById(id: string) {
        const [post] = await this.postModel.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(id) }, // Match the specific _id
            },
            {
                $lookup: {
                    from: 'postcomments', // Replace with the actual name of your PostComment collection
                    localField: '_id',
                    foreignField: 'post',
                    as: 'comments',
                },
            },
            { 
                $lookup: {
                    from: 'postlikes', // Replace with the actual name of your PostComment collection
                    localField: '_id',
                    foreignField: 'post',
                    as: 'likes',
                },
            },

            {
                $addFields: {
                    commentsNumber: { $size: '$comments' },
                    likesNumber: { $size: '$likes' },
                },
            },
            {
                $lookup: {
                    from: 'users', // Replace with the actual name of your User collection
                    localField: 'author',
                    foreignField: '_id',
                    as: 'author',
                },
            },
            {
                $lookup: {
                    from: 'postcategories', // Replace with the actual name of your PostCategory collection
                    localField: 'postCategory',
                    foreignField: '_id',
                    as: 'postCategory', 
                },
            },
            {
                $addFields: {
                    author: { $arrayElemAt: ['$author', 0] }, // Get the first element as a single object
                    postCategory: { $arrayElemAt: ['$postCategory', 0] }, // Get the first element as a single object
                },
            },
            {
                $unset: ['comments', 'likes'], // Remove the comments array
            },

            {
                $sort: { createdAt: -1 },
            },
        ]);


        return post
    }

    async getBreakingNews() {
        const posts = await this.postModel.find({ breakingNews: true })
            .populate('postCategory')
            .populate('author')
            .sort({ createdAt: -1 }).limit(15);
        return posts
    }

    async getRecommendedNews(userId: string, categoryString: string) {
        const category = await this.postCategory.findOne({ categoryName: categoryString });
        if (category) {
            const posts = await this.postModel.find({ postCategory: category })
                .populate('postCategory')
                .populate('author')
                .sort({ createdAt: -1 }).limit(10);
            return posts
        }
        else {
            const posts = await this.postModel.find()
                .populate('postCategory')
                .populate('author')
                .sort({ createdAt: -1 });
            return posts
        }

    }

    async getPopularNews(userId: string) {
        try {
            const posts = await this.postModel.aggregate([
                {
                  $lookup: {
                    from: 'postvisits', // Replace with the actual name of your PostVisit collection
                    localField: '_id',
                    foreignField: 'post',
                    as: 'visits',
                  },
                },
                {
                    $lookup: {
                        from: 'users', // Replace with the actual name of your User collection
                        localField: 'author',
                        foreignField: '_id',
                        as: 'author',
                    },
                },
                {
                    $lookup: {
                        from: 'postcategories', // Replace with the actual name of your PostCategory collection
                        localField: 'postCategory',
                        foreignField: '_id',
                        as: 'postCategory', 
                    },
                },
                {
                    $addFields: {  
                      visitNumber: { $size: '$visits' }, // Count the number of visits
                      author: { $arrayElemAt: ['$author', 0] }, // Get the first element as a single object
                      postCategory: { $arrayElemAt: ['$postCategory', 0] }, // Get the first element as a single object
                    },
                  },
                {
                  $sort: { visitNumber: -1, createdAt: -1 }, // Sort by visitNumber (most visited first) and createdAt (latest first)
                },
              ]);
              console.log(posts)
              return posts;
        } catch (error) {
            console.log(error);
            return new BadRequestException();
        }
      }
      

    async getNewsByCategory(categoryString: string) {
        const category = await this.postCategory.findOne({ categoryName: categoryString });
        const posts = await this.postModel.find({ postCategory: category })
            .populate('postCategory')
            .populate('author')
            .sort({ createdAt: -1 });
        return posts
    }

    async getNewsCategories() {
        const posts = await this.postCategory.find();
        return posts
    }

    async getPost(id: string) {
        const post = await this.postModel.findById(id)
            .populate('postCategory'); if (post) return post
        throw new NotFoundException();
    }

    async getSavedNews(userId: string, uniqueID: string) {

        const posts = await this.savedPost.find({ $or: [{ user: userId }, { app_id: uniqueID }] })
            .populate({
                path: 'post',
                populate: {
                    path: 'postCategory',
                    model: 'PostCategory', // Replace with the actual model name for PostCategory
                },
            })
            .sort({ createdAt: -1 });

        return posts
    }

    async saveNews(userId: string, uniqueID: string, postID: string) {

        var data = {};
        try {
            if (userId) {
                data['author'] = userId;
            }
            data['app_id'] = uniqueID;
            data['post'] = postID;
            const exist = await this.savedPost.findOne({ post: postID });
            if (!exist) {
                const post = await this.savedPost.create(data)
                if (post) {
                    return post;
                }
                return new BadRequestException();
            }
            return new ConflictException();
        } catch (error) {
            return new BadRequestException();
        }
    }

    async getLatestNews() {
        const posts = await this.postModel.find()
            .populate('postCategory')
            .populate('author')
            .sort({ createdAt: -1 });
        return posts
    }

    async getLatestNewByCategory(categoryString: string) {
        const category = await this.postCategory.findOne({ categoryName: categoryString });
        const posts = await this.postModel.find({ postCategory: category })
            .populate('postCategory')
            .populate('author')
            .sort({ createdAt: -1 });
        return posts
    }

    async getWorldNews() {
        const posts = await this.postModel.find({ breakingNews: false })
            .populate('postCategory')
            .populate('author')
            .sort({ createdAt: -1 }).limit(15);
        return posts
    }

    async getWorldNewsByCategory(categoryString: string) {
        const category = await this.postCategory.findOne({ categoryName: categoryString });
        const posts = await this.postModel.find({ postCategory: category })
            .populate('postCategory')
            .populate('author')
            .sort({ createdAt: -1 });
        return posts
    }

    async getNewsByContient(continent: string) {
        const posts = await this.postModel.find({ continent: continent })
            .populate('postCategory')
            .populate('author')
            .sort({ createdAt: -1 });
        return posts
    }

    async getNewsByContientByCategory(continent: string, categoryString: string) {

        const category = await this.postCategory.findOne({ categoryName: categoryString });
        const posts = await this.postModel.find({ continent: continent, postCategory: category })
            .populate('postCategory')
            .populate('author')
            .sort({ createdAt: -1 });
        return posts
    }

    async searchNews(title: string) {

        try {
            const posts = await this.postModel.find({ postTitle: { $regex: title['title'], $options: 'i' } })
                .populate('postCategory')
                .populate('author')
                .sort({ createdAt: -1 }).limit(20);
            if (posts) { return posts }
            return new BadRequestException();
        } catch (error) {
            console.log(error);
        }

    }

    async likePost(userId: string, uniqueId: string, postId: string) {

        const exists = await this.postLikeModel.findOne({ post: postId });
        if (exists) { return new ConflictException(); }
 
        var data = { phone_id: uniqueId, post: postId };
        if (userId) { data['user'] = userId; }
 
        const posts = await this.postLikeModel.create(data);
        if (posts) { return posts }
        return new BadRequestException();

    }

    async commentPost(userId: string, uniqueId: string, body: any) {


        var data = { phone_id: uniqueId, post: body.post, comment: body.comment, username: body.username };
        if (userId) { data['user'] = userId; }

        const posts = await this.postCommentModel.create(data);
        if (posts) { return posts }
        return new BadRequestException();

    }

    async getNewsComments(post: string) {

        const posts = await this.postCommentModel.find({ post }).sort({ updatedAt: -1 });
        if (posts) { return posts }
        return new BadRequestException();
    }

}
