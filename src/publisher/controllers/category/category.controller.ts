import { BadRequestException, Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CategoryService } from 'src/publisher/services/category/category.service';

@Controller('publisher')
export class CategoryController {
    constructor(private categoryService: CategoryService) { }

    @Get('categories')
    async getCategories(@Req() req: Request, @Res() res: Response) {
        try { const categories = await this.categoryService.getPostCategories(); res.send({ categories }) }
        catch (error) { throw new BadRequestException(); }
    }

    @Post('category')
    async createPostCategory(@Body() body:any,@Req() req: Request, @Res() res: Response) {
        console.log(body);
        try { const categories = await this.categoryService.createNewCategory(body); res.send({ categories }) }
        catch (error) {console.log(error); throw new BadRequestException(); }
    }
}
