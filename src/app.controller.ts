import { Controller, Get, Render } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  @Get('/')
  @ApiOperation({ summary: 'главная страница' })
  @Render('main.hbs')
  async main() {
    return {
      graphql: '/graphql',
      rest: '/api',
      otps: '/otps'
    };
  }
}
