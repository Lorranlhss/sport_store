import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {
  transform<T>(items: T[], searchText: string, fields: string[]): T[] {
    if (!items || !searchText || !fields || fields.length === 0) {
      return items;
    }

    searchText = searchText.toLowerCase();

    return items.filter(item => {
      return fields.some(field => {
        const value = this.getNestedProperty(item, field);
        if (value === null || value === undefined) {
          return false;
        }
        return value.toString().toLowerCase().includes(searchText);
      });
    });
  }

  private getNestedProperty(obj: any, path: string): any {
    return path.split('.').reduce((current, property) => current?.[property], obj);
  }
}
