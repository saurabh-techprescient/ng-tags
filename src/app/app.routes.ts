import { Routes } from '@angular/router';
import { TopicMgmtComponent } from './components/topic-mgmt/topic-mgmt.component';
import { GroupMgmtComponent } from './components/group-mgmt/group-mgmt.component';


export const ROUTES: Routes = [
  { path: '', redirectTo: 'topic', pathMatch: 'full' },
  { path: 'topic', component: TopicMgmtComponent },
  { path: 'content-group', component: GroupMgmtComponent }
];
