import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { PublisherModule } from './publisher/publisher.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user';
import { Role, RoleSchema } from './schemas/role';
import { Publisher, PublisherSchema } from './schemas/publisher';
import { Post, PostSchema } from './schemas/post';
import { Reader, ReaderSchema } from './schemas/reader';
import { ReaderModule } from './reader/reader.module';
import { Subscriber, SubscriberSchema } from './schemas/subscriber';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { PostVisitMiddleware } from './middlewares/post_visit.middleware';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/news-app'),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
      { name: Publisher.name, schema: PublisherSchema },
      { name: Subscriber.name, schema: SubscriberSchema },
      { name: Reader.name, schema: ReaderSchema },
      { name: Post.name, schema: PostSchema },
    ]),
    AdminModule, PublisherModule, ReaderModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.
    apply(LoggerMiddleware).forRoutes('').
    apply(PostVisitMiddleware).forRoutes('reader/*')
  }

}
