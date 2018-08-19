import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { map, switchMap } from 'rxjs/operators';
// import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/filter';
import * as moment from 'moment';
import * as _ from 'lodash';

import { AuthService } from './auth.service';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private userPatients: AngularFirestoreCollection<any>;
  private userDoctors: AngularFirestoreCollection<any>;
  private userAdmins: AngularFirestoreCollection<any>;
  private dataReadings: AngularFirestoreCollection<any>;
  private dataPatients: AngularFirestoreCollection<any>;
  private dataDoctors: AngularFirestoreCollection<any>;

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService,
    private database: DatabaseService
  ) {
    this.userPatients = firestore.collection('user-patients');
    this.userDoctors = firestore.collection('user-doctors');
    this.userAdmins = firestore.collection('user-admins');

    this.dataReadings = firestore.collection('data-readings');
    this.dataPatients = firestore.collection('data-patients');
    this.dataDoctors = firestore.collection('data-doctors');
  }

  pushToReadings(reading: string) {
    this.dataReadings.add({ reading: reading })
      .then(() => {
        this.database.createObject('data-readings', reading);
      });
  }

  enableNetwork() {
    return this.firestore.firestore.enableNetwork();
  }

  disableNetwork() {
    return this.firestore.firestore.disableNetwork();
  }

  sendMessageToDoctor(to: string, from: string, message: string) {
    const _message = { to, from, message };
    const timestamp = moment().format('X');

    this.dataPatients.add({ ..._message, timestamp })
      .then(() => {
        this.database.createObject('data-patients', { ..._message, timestamp });
      });
  }

  getDoctorsRemarks(fullname: string) {
    return this.dataDoctors.valueChanges().pipe(
      map((values: any[]) => {
        return values.filter(e => e.to === fullname);
      })
    );
  }

  getPatientReadings(patientNo: string) {
    return this.dataReadings.snapshotChanges().pipe(
      map((values) => {
        const readings = values.map((value) => {

          const index = value.payload.newIndex;
          const data = value.payload.doc.data();

          return { index, ...data };
        }).map((response) => {
          let object = {};
          const index = response.index;
          let reading = response.reading.split(' ');
          reading.map((val) => {
            object[val.split('/')[0]] = val.split('/')[1]
          });
          return { index, ...object };
        }).filter((e: any) => e.patientNo === patientNo);

        return <any[]>_.sortBy(readings, [(message) => message.timestamp]).reverse();
      })
    );
  }

  getPatientDoctors(fullname: string) {
    return this.userPatients.snapshotChanges().pipe(
      map((values) => {
        let doc = [];
        values.map((value) => {
          value.payload.doc.ref.collection('doctors').onSnapshot(
            (data) => {
              fullname === value.payload.doc.data().fullname
                ? data.docChanges().forEach((data) => {
                    const _data = data.doc.data();
                    doc.filter((v) => {
                      return v.fullname === _data.fullname
                    }).length === 0 ? doc.push(_data) : 0;
                  }) : 0;
            }
          )
        });
        return doc;
      })
    );
  }

  getOnline() {
    const patients = this.userPatients.valueChanges();

    return this.authService.getCurrentUid().pipe(
      switchMap((uid) => {
        return patients.pipe(
          map((values: any[]) => {
            return values.filter(e => e.uid === uid)[0]
          })
        )
      })
    );
  }

}
