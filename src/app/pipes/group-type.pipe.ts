/**
 * Created by adriangillette on 1/20/17.
 */

import { Pipe, PipeTransform } from '@angular/core';



@Pipe({name: 'groupType'})
export class GroupTypePipe implements PipeTransform {

  private friendlyName: any = {
    filedepot_folder: 'file depot folder',
    homepage: 'homepage',
    article: 'article',
    error_page: 'error page',
    overview: 'overview',
    full_width: 'full width',
    forum: 'forum',
    page: 'page',
    one_col_right: '1 column right',
    file: 'file'
  }

  transform(value) : any {

    var html: string;

    if (value === 'public' || value === null) {
      html = '<i class="fa fa-circle-thin" aria-hidden="true" title="public"></i>';
    } else if (value === 'gated') {
      html = '<i class="fa fa-circle" aria-hidden="true" title="gated"></i>';
    } else if (value === 'restricted') {
      html = '<i class="fa fa-exclamation-circle" aria-hidden="true" title="restricted"></i>';
    }

    return html;
  }
}
