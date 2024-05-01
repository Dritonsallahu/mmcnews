import { BadRequestException, Controller, Delete, Get, Param, Post, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { PublisherService } from 'src/publisher/services/publisher/publisher.service';

@Controller('publisher')
export class PublisherController {
    constructor(private publisherService: PublisherService) { }

    @Get('posts')
    async getNews(@Req() req: Request, @Res() res: Response) {
        try { const posts = await this.publisherService.getPosts(); res.send({ posts }) }
        catch (error) { throw new BadRequestException(); }

    }

    @Get('post/:id')
    async getPost(@Param() id: string, @Req() req: Request, @Res() res: Response) {
        try { const post = await this.publisherService.getPost(id['id']); res.send({ post }) }
        catch (error) { throw new BadRequestException(); }

    }
    @Post('post')
    async createPost(@Req() req: Request, @Res() res: Response) {
        try { const post = await this.publisherService.createPost(req.body); res.send({ post }); }
        catch (error) { throw new BadRequestException(); }
    }

    @Put('post/:id')
    async editPost(@Param() id: string, @Req() req: Request, @Res() res: Response) {
        try { const post = await this.publisherService.editPost(id['id'], req.body); res.send({ post }); }
        catch (error) { throw new BadRequestException(); }
    }

    @Delete('post/:id')
    async deletePost(@Param() id: string, @Res() res: Response) {
        try { const post = await this.publisherService.deletePost(id['id']); res.send({ post }); }
        catch (error) { throw new BadRequestException(); }
    }
} 
