import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntryRoutingModule } from './entry-routing.module';
import { EntryMaterialModule } from '../common/core/module/material/entry-material.module';

import { EntryComponent } from './entry.component';

import { FirestoreService } from '../common/core/service/firestore.service';

@NgModule({
  imports: [
    CommonModule,
    EntryRoutingModule,
    EntryMaterialModule
  ],
  declarations: [
    EntryComponent
  ],
  providers: [
    FirestoreService
  ]
})
export class EntryModule { }
