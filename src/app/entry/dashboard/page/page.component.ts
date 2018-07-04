import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { map, filter } from 'rxjs/operators'

import { MessageDoctorDialogComponent } from '../../../common/shared/component/message-doctor-dialog/message-doctor-dialog.component';

import { FirestoreService } from '../../../common/core/service/firestore.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  dialgoRef: MatDialogRef<MessageDoctorDialogComponent>;

  displayedColumns = ['sbp', 'dbp', 'hr'];
  isDoctorsLoading: boolean = true;
  patientDoctors: Observable<any>;
  patientDetails: any
  dataSource: any;
  readings: any;

  constructor(
    private dialog: MatDialog,
    private firestoreService: FirestoreService
  ) { }

  ngOnInit() {

    this.firestoreService.getOnline().subscribe((patient) => {

      if (patient === undefined) return;
      
      this.firestoreService.getPatientReadings(patient.patientNo).subscribe((response) => {

        this.readings = response[0];
        this.dataSource = new MatTableDataSource<any>(response.slice(1));
        this.dataSource.paginator = this.paginator;

      });

      this.patientDetails = patient;

      this.patientDoctors = this.firestoreService.getPatientDoctors(patient.fullname);

      this.patientDoctors.subscribe(() => (this.isDoctorsLoading = false));

    });

  }

  messageDoctor(doctor: any) {
    this.dialgoRef = this.dialog.open(MessageDoctorDialogComponent, { data: { doctor, patient: this.patientDetails } });
  }

}
