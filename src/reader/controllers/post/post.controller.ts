import { BadRequestException, Body, Controller, Get, Param, Post, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { PostService } from 'src/reader/services/post/post.service';

@Controller('api/v1/reader')
export class PostController {
    constructor(private postService: PostService) { }

    @Get('news')
    async getNews(@Req() req: Request, @Res() res: Response) {
        try { const posts = await this.postService.getPosts(); res.send({ posts }) }
        catch (error) { throw new BadRequestException(); }
    }
    @Get('single-news/:id')
    async getNewsById(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
        const { uniqueid, userid } = req.headers;
        try {
            const post = await this.postService.getNewsById(id); res.send({ post })
            if (post) { await this.postService.visitNewPost(userid, uniqueid.toString(), id); res.send({ post }) }
        }
        catch (error) { throw new BadRequestException(); }
    }

    @Get('breaking-news')
    async getBreakingNews(@Res() res: Response) {
        try { const posts = await this.postService.getBreakingNews(); res.send({ posts }) }
        catch (error) { throw new BadRequestException(); }
    }

    @Get('recommended-news')
    async getRecommendedNews(@Res() res: Response) {
        try { const posts = await this.postService.getRecommendedNews("", ""); res.send({ posts }) }
        catch (error) { throw new BadRequestException(); }
    }

    @Get('popular-news')
    async getPopularNews(@Res() res: Response) {
        try { const posts = await this.postService.getPopularNews(""); res.send({ posts }) }
        catch (error) { throw new BadRequestException(); }
    }

    @Get('category/:category')
    async getNewsByCategory(@Param('category') category: string, @Req() req: Request, @Res() res: Response) {

        try { const posts = await this.postService.getNewsByCategory(category); res.send({ posts }) }
        catch (error) { throw new BadRequestException(); }
    }

    @Get('categories')
    async getNewsCategories(@Res() res: Response) {
        try { const posts = await this.postService.getNewsCategories(); res.send({ posts }) }
        catch (error) { throw new BadRequestException(); }
    }

    @Get('saved-news')
    async getSavedNews(@Req() req: Request, @Res() res: Response) {
        const { userid, uniqueid } = req.headers;
        try { const posts = await this.postService.getSavedNews(userid as string, uniqueid as string); res.send({ posts }) }
        catch (error) { throw new BadRequestException(); }
    }

    @Post('save-news')
    async saveNews(@Body() body: any, @Req() req: Request, @Res() res: Response) {
        const { uniqueid, userid } = req.headers;
        try {
            const result = await this.postService.saveNews(userid as string, uniqueid as string, body.postID);
            res.send({ result })
        }
        catch (error) { throw new BadRequestException(); }
    }

    @Get('latest-news')
    async getLatestNews(@Req() req: Request, @Res() res: Response) {
        try { const posts = await this.postService.getLatestNews(); res.send({ posts }) }
        catch (error) { throw new BadRequestException(); }
    }

    @Get('latest-news/:category')
    async getLatestNewsByCategory(@Param('category') category: string, @Req() req: Request, @Res() res: Response) {
        try { const posts = await this.postService.getLatestNewByCategory(category); res.send({ posts }) }
        catch (error) { throw new BadRequestException(); }
    }

    @Get('world-news')
    async getWorldNews(@Req() req: Request, @Res() res: Response) {
        try { const posts = await this.postService.getWorldNews(); res.send({ posts }) }
        catch (error) { throw new BadRequestException(); }
    }

    @Get('world-news/:category')
    async getWorldNewsByCategory(@Param('category') category: string, @Req() req: Request, @Res() res: Response) {
        try { const posts = await this.postService.getWorldNewsByCategory(category); res.send({ posts }) }
        catch (error) { throw new BadRequestException(); }
    }
    @Get('news/:continent')
    async getNewsByContinent(@Param('continent') continent: string, @Req() req: Request, @Res() res: Response) {

        try { const posts = await this.postService.getNewsByContient(continent); res.send({ posts }) }
        catch (error) { throw new BadRequestException(); }
    }

    @Get('news/:continent/:category')
    async getNewsByContinentByCategory(@Param('continent') continent: string, @Param('category') category: string, @Req() req: Request, @Res() res: Response) {

        try { const posts = await this.postService.getNewsByContientByCategory(continent, category); res.send({ posts }) }
        catch (error) { throw new BadRequestException(); }
    }

    @Get('news/:country')
    async getNewsByCountry(@Req() req: Request, @Res() res: Response) {
        const { userid, uniqueid } = req.headers;
        try { const posts = await this.postService.getSavedNews(userid as string, uniqueid as string); res.send({ posts }) }
        catch (error) { throw new BadRequestException(); }
    }

    @Get('search-news')
    async searchNews(@Query() query, @Body() body: any, @Req() req: Request, @Res() res: Response) {
        const { userid, uniqueid } = req.headers;
       
        const title = query;
        try { const posts = await this.postService.searchNews(title); res.send({ posts }) }
        catch (error) { throw new BadRequestException(); }
    }

    @Post('like-news')
    async likePost(@Body() body: any, @Req() req: Request, @Res() res: Response) {
        const { userid, uniqueid } = req.headers;
        try { const posts = await this.postService.likePost(userid as string, uniqueid as string, body.post); res.send({ posts }) }
        catch (error) { throw new BadRequestException(); }
    }

    @Post('comment-news/:id')
    async commentPost(@Param('id') id: string, @Body() body: any, @Req() req: Request, @Res() res: Response) {
        const { userid, uniqueid } = req.headers;
        console.log(body) 
        try { const posts = await this.postService.commentPost(userid as string, uniqueid as string,  body); res.send({ posts }) }
        catch (error) { throw new BadRequestException(); }
    }

    @Get('comments-news/:postId')
    async getAllComments(@Param('postId') postId: string, @Body() body: any, @Req() req: Request, @Res() res: Response) {
        const { userid, uniqueid } = req.headers; 
        try { const posts = await this.postService.getNewsComments(postId); res.send({ posts }) }
        catch (error) { throw new BadRequestException(); }
    }
 
}
