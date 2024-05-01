import { Controller, Get, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common'; 
import { Request } from 'express'; 
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { AuthService } from '../../services/auth/auth.service';

@Controller('api/v1/mobile')
export class AuthController {
    constructor(private authService: AuthService) { }

    
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req: Request) {
         
        try {
            const token = await this.authService.login(req.user,req.body.uniqueID); 
            return {user:req.user,token};
        } catch (error) {
            return new UnauthorizedException();
        }
    
    }
 
    @Post('unique-data')
    async getProfile(@Req() req: Request) {
        const uniqueID = req.body.uniqueID; 
        if(uniqueID){
            console.log(uniqueID);
            const result = await this.authService.setUniqueID(uniqueID); 
            return {message: "success"};
        }
        return {message: "exist"};
    }
 
    @Post('delete-account')
    async deleteAccount(@Req() req: Request) {
        const user = req.body.user; 
       
            console.log(user);
            const result = await this.authService.deleteAccount(user); 
            return result;
       
      
    }
}
