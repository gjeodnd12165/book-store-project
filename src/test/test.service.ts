import { Injectable } from '@nestjs/common';
import { Test } from './test.interface';

@Injectable()
export class TestService {
  private readonly testArr: Test[] = [];

  create(test: Test) {
    this.testArr.push(test);
  }

  findAll(): Test[] {
    return Array.from(this.testArr);
  }

  getParamed(id: number): number {
    return id;
  }
}
