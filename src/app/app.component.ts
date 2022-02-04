/*
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild
} from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalService } from './services/global.service';
import { TagsService } from './services/tags.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

  @ViewChild('companySelector') companySelector: any;

  public busy: Subscription;
  public selected: string = 'role';
  public user: any;
  public userRole: string;
  public optionLabel: string;
  public isGlobal: boolean = true;
  public companies: any[] = [];
  public companyName: string = '';

  constructor(
    private globalService: GlobalService,
    private tagsService: TagsService
  ) {
  }

  public ngOnInit() {
    this.userRole = 'globalAdmin';
  }
}
