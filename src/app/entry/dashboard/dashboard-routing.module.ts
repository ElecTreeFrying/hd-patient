import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from "./dashboard.component";

const routes: Routes = [
  { path: '', component: DashboardComponent, children: [
    { path: '', loadChildren: './page/page.module#PageModule' },
    { path: 'readings', loadChildren: './page/page.module#PageModule' },
    { path: 'remarks', loadChildren: './remarks/remarks.module#RemarksModule' }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
