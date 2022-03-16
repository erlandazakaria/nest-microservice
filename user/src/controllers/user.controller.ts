import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from '../services/user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('nest-get-user')
  getUser({value}: {value: string}) {
    return this.userService.getUser(value);
  }
}
