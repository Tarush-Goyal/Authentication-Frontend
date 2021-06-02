import { Component, OnInit } from "@angular/core";
import { AuthService } from "./../auth.service";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  FormBuilder,
} from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ErrorDialogComponent } from "../errordialog/errordialog.component";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  Type = "password";
  visible = "visibility";
  values = "";
  focus = true;
  constructor(
    private http: HttpClient,
    private form: FormBuilder,
    public authService: AuthService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.form.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onFocus() {
    this.loginForm.get("password").markAsUntouched();
    this.focus = true;
  }

  onSubmit() {
    this.authService
      .login(
        this.loginForm.get("email").value,
        this.loginForm.get("password").value
      )
      .subscribe(
        (data) => {
          console.log(data);
          let index = data.email.indexOf("@");
          this.authService.username = data.email.slice(0, index);
          this.authService.userId = data.userId;
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

  openDialog(error) {
    this.dialog.open(ErrorDialogComponent, { data: { error: error } });
  }
}
