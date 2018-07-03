import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-message-doctor-dialog',
  templateUrl: './message-doctor-dialog.component.html',
  styleUrls: ['./message-doctor-dialog.component.scss']
})
export class MessageDoctorDialogComponent implements OnInit {

  form: FormGroup;

  constructor(@Inject(FormBuilder) public fb: FormBuilder) {
    this.form = fb.group({
      'recipient': [ 'Dr. Lena Sims' ],
      'message': [ '' ]
    })
  }

  ngOnInit() {
    this.form.get('recipient').disable();
  }

  onSubmit() {
    console.log(this.form.value);
  }

}
