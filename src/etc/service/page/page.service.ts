import { Injectable } from '@nestjs/common';
import { FindManyOptions, Like } from 'typeorm';

@Injectable()
export class PageService {
  async generatePage(data, repo, opt: FindManyOptions = {}) {
    const { page, limit, ...where } = data;
    if (where) {
      const filter = {};
      Object.keys(where).forEach((f) => {
        filter[f] = Like(`%${where[f]}%`);
      });
      opt.where = filter;
    }
    const total = await repo.count(opt);
    opt.skip = (data.page - 1) * data.limit;
    opt.take = data.limit;
    const result = await repo.find(opt);
    const pages = Math.ceil(total / data.limit);
    const finalData = {
      total: total,
      page: data.page,
      pages: pages,
      data: result,
    };
    return finalData;
  }
}
