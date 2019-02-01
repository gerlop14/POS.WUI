import { Component, Inject } from "@angular/core";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: "login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})

export class LoginComponent {
  title: string;
  form: FormGroup;

  constructor(private router: Router,
    private fb: FormBuilder,
    private authService: AuthService) {

    this.title = "User Login";

    // initialize the form
    this.createForm();

  }

  createForm() {
    this.form = this.fb.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }

  onSubmit() {
    
    var username = this.form.value.Username;
    var password = this.form.value.Password;

    this.authService.login(username, password)
      .subscribe(res => {
          this.router.navigate(["home"]);
      },
        err => {
          // login failed
          //console.log(err)
            if (err === "Unauthorized") {
                this.form.setErrors({
                    "auth": "Invalid Username or Password."
                });
            }
            else {
                this.form.setErrors({
                    "auth": "Unable to Connect with the Authentication Server."
                });
            }

        });
  }

  onBack() {
    this.router.navigate(["/"]);
  }

  // retrieve a FormControl
  getFormControl(name: string) {
    return this.form.get(name);
  }

  // returns TRUE if the FormControl is valid
  isValid(name: string) {
    var e = this.getFormControl(name);
    return e && e.valid;
  }

  // returns TRUE if the FormControl has been changed
  isChanged(name: string) {
    var e = this.getFormControl(name);
    return e && (e.dirty || e.touched);
  }

  // returns TRUE if the FormControl is invalid after user changes
  hasError(name: string) {
    var e = this.getFormControl(name);
    return e && (e.dirty || e.touched) && !e.valid;
  }
}
