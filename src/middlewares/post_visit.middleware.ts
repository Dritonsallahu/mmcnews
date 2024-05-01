import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';
import { Post } from 'src/schemas/post';
import { PostVisit } from 'src/schemas/post_visit';

@Injectable()
export class PostVisitMiddleware implements NestMiddleware {
    constructor(
        @InjectModel(Post.name) private postModel: Model<Post>,
    ){}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const { userid, uniqueid } = req.headers;
      if (userid) {
        // Assuming you want to await the result before moving forward
        const visits = await this.postModel.find({$or: [{ user: userid },{ user: userid }]}).exec();
        console.log('Number of visits for user', userid, ':', visits.length);
      } 
      else if(uniqueid){ 
                // Assuming you want to await the result before moving forward
                const visits = await this.postModel.find({ user: userid }).exec();
                console.log('Number of visits for user', userid, ':', visits.length);
      }
      // console.log('Request...', req.method, ' Path: ', req.path, ' UserId:', userid, ' UniqueId:', uniqueid);
      next();
    } catch (error) {
      // Handle errors gracefully and send an appropriate response
      console.error('Error in LoggerMiddleware:', error);
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
