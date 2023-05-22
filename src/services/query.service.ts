import { IQueryOptions } from 'src/interfaces/query/query-options.interface';
import { OptionQuery } from 'src/queries/option.query';
import { Service } from 'typedi';
import { ILike, Repository } from 'typeorm';

@Service()
export class QueryService {
  async paginate(respository: Repository<any>,
    query: OptionQuery, where: any | undefined) {
    const options: IQueryOptions = {};
    if (query.limit && query.offset) {
      options.skip = query.limit * (query.offset - 1);
      options.take = query.limit;
    } else {
      delete options.skip;
    }
    if (query.sortField && query.sortDirection) {
      options.order = {
        [query.sortField]: query.sortDirection
      };
    }
    if (query.filterField && query.filterValue) {
      options.where = { [query.filterField]: ILike(`%${query.filterValue}%`) };
    }
    if (where) {
      // where array when is OR
      if (Array.isArray(where)) {
        const array: any[] = [];
        where.forEach(element => {
          element = { ...element, ...options.where }; // Add AND operator
          array.push(element);
        });
        options.where = array;
      } else {
        options.where = { ...options.where, ...where };
      }
    }
    if (query.boolField && query.boolValue != undefined) {
      if (Array.isArray(options.where)) {
        const array: any[] = [];
        options.where.forEach(element => {
          element = { ...element, [query.boolField]: query.boolValue };
          array.push(element);
        });
        options.where = array;
      } else {
        options.where = { ...options.where, [query.boolField]: query.boolValue };
      }
    }
    if (query.relations && query.relations?.length > 0) {
      options.relations = this.getRelations(query.relations);
    }
    const [result, total] = await respository.findAndCount(options);
    return {
      previousPage: this.getPreviousPage(query.offset),
      currentPage: query.offset,
      nextPage: this.getNextPage(query.offset, query.limit, total),
      total,
      limit: query.limit,
      data: result
    };
  }

  getRelations(relations: string | undefined) {
    if (relations) {
      const relationList = relations.split(',');
      const relationsNew: string[] = [];
      for (let i = 0; i < relationList.length; i++) {
        const element = relationList[i].trim();
        relationsNew.push(element);
      }
      return relationList;
    }
    return [];
  }

  private getNextPage(offset, limit, total) {
    if ((total / limit) > offset) {
      return offset + 1;
    }
    return null;
  }

  private getPreviousPage(offset) {
    if (offset <= 1) {
      return null;
    }
    return offset - 1;
  }
}
