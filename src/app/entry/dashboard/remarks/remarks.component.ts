import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { ExpandRemarksDialogComponent } from '../../../common/shared/component/expand-remarks-dialog/expand-remarks-dialog.component';

@Component({
  selector: 'app-remarks',
  templateUrl: './remarks.component.html',
  styleUrls: ['./remarks.component.scss']
})
export class RemarksComponent implements OnInit {

  dialogRef: MatDialogRef<ExpandRemarksDialogComponent>;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  expandRemarks() {
    this.dialogRef = this.dialog.open(ExpandRemarksDialogComponent, { });
  }

}
