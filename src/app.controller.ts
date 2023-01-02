import { Controller, Get, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { AppService } from './app.service';

@Controller()
export class AppController {
  randomNumDbs = Math.floor(Math.random() * 10);
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  @Get('get-number-cache')
  async getNumber(): Promise<any> {
    const val = await this.cacheManager.get('number');
    if (val) {
      return {
        data: val,
        FromRedis: 'this is loaded from redis cache',
      };
    }

    if (!val) {
      await this.cacheManager.set('number', this.randomNumDbs);
      return {
        data: this.randomNumDbs,
        FromRandomNumDbs: 'this is loaded from randomNumDbs',
      };
    }
  }
}
