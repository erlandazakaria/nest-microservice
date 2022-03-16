import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/models/user.model';
import { Model } from "mongoose";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async getUser(_id: string) {
    const data = await this.userModel.findById(_id).select(["_id", "name"]).exec();
    return data.toJSON()
  }
}
