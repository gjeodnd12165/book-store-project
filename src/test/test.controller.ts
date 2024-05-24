import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  Redirect,
} from '@nestjs/common';
import { CreateTestDto } from './create-test.dto';
import { TestService } from './test.service';

@Controller({ path: 'test' })
export class TestController {
  constructor(private testService: TestService) {}

  @Post()
  @Header('Some-Custom', 'none')
  create(@Body() createTestDto: CreateTestDto) {
    return this.testService.create(createTestDto);
  }

  @Get('redirection')
  @Redirect('https://google.com', 301)
  redirect(): string {
    return 'redirect test';
  }

  @Get('parameters/:id')
  getParamed(@Param('id') id: number): number {
    return this.testService.getParamed(id);
  }
}
