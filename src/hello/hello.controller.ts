import { Controller } from '@nestjs/common';
import { HelloService } from './hello.service';
import { Get } from '@nestjs/common';

@Controller('/')
export class HelloController {

    constructor(
      private readonly helloService:HelloService    
    ) {}

    @Get()
    getHello(): string {
        return this.helloService.getHello();
    }
}
