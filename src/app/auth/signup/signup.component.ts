import { ErrorDialogComponent } from "./../errordialog/errordialog.component";
import { AuthService } from "./../auth.service";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import axios from "axios";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  FormBuilder,
} from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  Type = "password";
  visible = "visibility";
  Type2 = "password";
  visible2 = "visibility";
  values = "";
  focus = true;
  errorMsg = "";
  successMsg = "";

  constructor(
    private http: HttpClient,
    private form: FormBuilder,
    public authService: AuthService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.form.group(
      {
        email: new FormControl("", [Validators.required, Validators.email]),
        password: new FormControl("", [
          Validators.required,
          Validators.minLength(6),
        ]),
        password2: new FormControl("", []),
        type: new FormControl("", [Validators.required]),
      },
      {
        validators: this.matchPassword,
      }
    );
  }

  clicked() {
    // console.log("clicked");
    this.http
      .post<any>("http://localhost:5000/routes/uploadfile", {
        email: "hello",
      })
      .pipe(
        catchError((errorRes) => {
          return throwError(errorRes);
        })
      )
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  onFocus() {
    this.signupForm.get("password").markAsUntouched();
    this.focus = true;
  }

  onFocus2() {
    this.signupForm.get("password2").markAsUntouched();
    this.focus = true;
  }

  onSubmit() {
    this.authService
      .signup(
        this.signupForm.get("email").value,
        this.signupForm.get("password").value,
        this.signupForm.get("type").value
      )
      .subscribe(
        (data) => {
          console.log(data);
          this.authService.userId = data.userId;
          let index = data.email.indexOf("@");
          this.authService.username = data.email.slice(0, index);
          this.authService.email = data.email;
          this.authService.type = data.type;
          this.authService.updateToken(data.token);
          this.authService.updateTokenExpirationDate(
            new Date(new Date().getTime() + 1000 * 60 * 60)
          );
          if (this.authService.type == "admin") {
            this.router.navigate(["admin/addproduct"]);
          }
          // console.log(this.authService.userId);
        },
        (error) => {
          console.log(error);
          this.openDialog(error.error);
        }
        // () => {
        //   console.log("reached end");
        // }
      );
  }

  showPassword() {
    if (this.Type === "password") {
      this.Type = "text";
      this.visible = "visibility_off";
    } else {
      this.Type = "password";
      this.visible = "visibility";
    }
  }

  showPassword2() {
    if (this.Type2 === "password") {
      this.Type2 = "text";
      this.visible2 = "visibility_off";
    } else {
      this.Type2 = "password";
      this.visible2 = "visibility";
    }
  }

  matchPassword(control: AbstractControl) {
    let newPassword = control.get("password").value;
    let confirmPassword = control.get("password2").value;
    if (newPassword != confirmPassword) {
      control.get("password2").setErrors({ matchPassword: true });
    } else {
      control.get("password2").setErrors(null);
    }
  }

  openDialog(error) {
    this.dialog.open(ErrorDialogComponent, { data: { error: error } });
  }
}
