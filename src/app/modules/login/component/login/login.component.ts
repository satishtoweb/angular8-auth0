import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  title = "Sign in Form";
  signInForm: FormGroup;
  isSubmitted = false;

  constructor(
    private commonService: CommonService,
    private router: Router

  ) { }

  ngOnInit() {

    // For Validation
    this.signInForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)]
      })
    })

  }

  // convenience getter for easy access to form fields
  get f() {
    return this.signInForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    console.log(this.signInForm.invalid);

    if (this.signInForm.invalid) {
      return;
    }
  }


}
