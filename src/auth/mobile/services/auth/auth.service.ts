
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, ObjectId } from 'mongoose';
import { User } from 'src/schemas/user';
import * as bcrypt from 'bcrypt';
import { Reader } from 'src/schemas/reader';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Reader.name) private readerModel: Model<Reader>,
    private jwtService: JwtService
  ) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userModel.findOne({ $or: [{ username }, { email: username }] }).populate('role');
    if (user) {
      if (user.role.roleName == "reader") {
        const isPasswordValid = await bcrypt.compare(pass, user.password);
        if (isPasswordValid) {
          const { password, ...result } = user.toObject();
          return result;
        }
        return null;
      }
      return null;

    }
    return null;
  }

  async login(user: any,uniqueID: string) {
    console.log(user._id);
    const reader = await this.readerModel.findOne({phoneId: uniqueID});
    if(reader){
      console.log(reader);
      if(!reader.user){
        reader['user'] = user._id;
        reader.save();
      }
     
    }
   
    const payload = { username: user.username, sub: user._id };
    return this.jwtService.sign(payload);
  }

  async setUniqueID(uniqueID: string){
    const reader = await this.readerModel.findOne({phoneId: uniqueID});
    console.log(reader);
    if(!reader){
      const newReader = await this.readerModel.create({phoneId: uniqueID,active: true})
      if(newReader){
        return true;
      }
      return false;
    }
    return true 
  }

  async deleteAccount(user: ObjectId){
    const reader = await this.userModel.findOne({_id:user});
 
    if(reader){
      reader.active = false;
      await reader.save();
      return true;
    }
    return false 
  }
}
