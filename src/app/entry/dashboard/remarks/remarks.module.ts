import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RemarksRoutingModule } from './remarks-routing.module';
import { RemarksMaterialModule } from '../../../common/core/module/material/remarks-material.module';

import { RemarksComponent } from './remarks.component';
import { ExpandRemarksDialogComponent } from '../../../common/shared/component/expand-remarks-dialog/expand-remarks-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    RemarksRoutingModule,
    RemarksMaterialModule
  ],
  declarations: [
    RemarksComponent,
    ExpandRemarksDialogComponent
  ],
  entryComponents: [
    ExpandRemarksDialogComponent
  ]
})
export class RemarksModule { }
