import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarRef,
  SimpleSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material';
import { Chance } from 'chance';

import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private vertical: MatSnackBarVerticalPosition = 'bottom';
  private horizontal: MatSnackBarHorizontalPosition = 'center';
  private snackbarRef: MatSnackBarRef<any>;

  constructor(
    private snack: MatSnackBar,
    private firestoreService: FirestoreService
  ) { }




  data() {
    const p1 = 'PX-963309195986';
    const p2 = 'PX-743002104549';
    const p3 = 'PX-318419614038';
    const p4 = 'PX-685932403453';
    const p5 = 'PX-925742140063';
    const p6 = 'PX-978055815189';

    for (let i = 0; i < 120; i++) {
      this.onPush(p1); this.onPush(p2); this.onPush(p3); this.onPush(p4); this.onPush(p5);; this.onPush(p6);
    }
  }

  onPush(patientNo: string) {
    const chance = new Chance();
    const randomFloat1 = chance.floating({min: -30, max: 30, fixed: 2});
    const randomFloat2 = chance.floating({min: -30, max: 30, fixed: 2});
    const randomFloat3 = chance.floating({min: -30, max: 30, fixed: 2});

    const data = `sbp/${randomFloat1} dbp/${randomFloat2} hr/${randomFloat3} patientNo/${patientNo}`;

    this.firestoreService.pushToReadings(data);
  }




  snackbar(message: string, duration: number = 3500): MatSnackBarRef<SimpleSnackBar> {
    const config = new MatSnackBarConfig;
    config.duration = duration;
    config.horizontalPosition = this.horizontal;
    config.verticalPosition = this.vertical;

    return this.snack.open(message, '', config);
  }

  formError() {
    let config = new MatSnackBarConfig();
    config.duration = 2500;
    config.horizontalPosition = this.horizontal;
    config.verticalPosition = this.vertical;
    this.snack.open('Form error. Please try again.', '', config);
  }

  signInSuccess() {
    const message = 'Successfully signed in';
    let config = new MatSnackBarConfig();
    config.duration = 3500;
    config.horizontalPosition = this.horizontal;
    config.verticalPosition = this.vertical;
    this.snack.open(message, '', config)
      .afterDismissed().subscribe(() => {
        const message = 'Welcome to Hyperdetect Patient';
        this.snack.open(message, '', config);
      });
  }

  signOutSuccess() {
    const message = 'Successfully signed out';
    let config = new MatSnackBarConfig();
    config.duration = 3500;
    config.horizontalPosition = this.horizontal;
    config.verticalPosition = this.vertical;
    this.snack.open(message, '', config);
  }

  signInError(error: any) {
    let config = new MatSnackBarConfig();
    config.duration = 7000;
    config.horizontalPosition = this.horizontal;
    config.verticalPosition = this.vertical;
    this.snack.open(error.message, '', config);
  }

  signUpError(error: any) {
    let config = new MatSnackBarConfig();
    config.duration = 7000;
    config.horizontalPosition = this.horizontal;
    config.verticalPosition = this.vertical;
    this.snack.open(error.message, '', config);
  }

}
