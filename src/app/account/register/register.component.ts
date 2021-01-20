import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthServiceService } from "../../services/auth-service.service";
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formGroup: FormGroup;
  returnUrl: string;
  submitted = false;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private authService: AuthServiceService) {

    // redirect to home if already logged in
    if (this.authService.userValue) {
      this.router.navigate(['/']);
    }

  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup(
      {
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
      });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.formGroup.controls; }

  registerProcess() {
    this.submitted = true;

    // reset alerts on submit
   // this.alertService.clear();

    // stop here if form is invalid
    if (this.formGroup.invalid) {
      return;
    }
    console.log("reg hit");
    //this.loading = true;
    this.authService.register(this.formGroup.value)
      .pipe(first())
      .subscribe(
        data => {
         // this.alertService.success('Registration successful', { keepAfterRouteChange: true });
          this.router.navigate(['../login'], { relativeTo: this.route });
        },
        error => {
          console.log("reg error");

          //this.alertService.error(error);
         // this.loading = false;
        });
  }


  cancel() {
    this.formGroup.reset();
  }
}


