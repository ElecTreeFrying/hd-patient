import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../common/core/service/auth.service';
import { FirestoreService } from '../common/core/service/firestore.service';
import { SharedService } from '../common/core/service/shared.service';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    // this.sharedService.data();
  }

  onSignout() {
    this.authService.signOut().then(() => {
      this.firestoreService.disableNetwork().then(() => {
        this.router.navigate(['/']);
        this.sharedService.signOutSuccess();
      });
    });
  }

}
