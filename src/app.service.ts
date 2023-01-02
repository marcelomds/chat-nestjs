import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async getHello() {
    await this.cacheManager.set('cached_value', { key: 4564564 });
    // await this.cacheManager.del('cached_value');
    // await this.cacheManager.reset();
    const cachedValue = await this.cacheManager.get('cached_value');

    console.log('cachedValue: ', cachedValue);
    return 'Hello World!';
  }
}
