import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}
  selectedIndex = 0;
  userId;
  email;
  username = "Guest";
  private token: BehaviorSubject<string> = new BehaviorSubject<string>("");
  tokenExpirationDate: BehaviorSubject<Date> = new BehaviorSubject<Date>(null);
  // token; //subject
  type;

  getToken(): Observable<string> {
    return this.token.asObservable();
  }

  updateToken(token: string) {
    this.token.next(token);
  }

  getTokenExpirationDate(): Observable<Date> {
    return this.tokenExpirationDate.asObservable();
  }

  updateTokenExpirationDate(tokenExpirationDate: Date) {
    this.tokenExpirationDate.next(tokenExpirationDate);
  }

  signup(email, password, type) {
    return this.http
      .post<any>("http://localhost:5000/api/users/signup", {
        email: email,
        password: password,
        type: type,
      })
      .pipe(
        catchError((errorRes) => {
          return throwError(errorRes);
        })
      );
  }

  login(email, password) {
    return this.http
      .post<any>("http://localhost:5000/api/users/login", {
        email: email,
        password: password,
      })
      .pipe(
        catchError((errorRes) => {
          return throwError(errorRes);
        })
      );
  }

  isLoggedIn() {
    if (this.token.value && this.tokenExpirationDate.value) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    console.log("user logged out");
    this.token.next(null);
    this.tokenExpirationDate.next(null);
    this.userId = "";
    this.email = "";
    this.router.navigate(["/auth"]);
  }

  goToLogin() {
    this.selectedIndex = 0;
  }

  goToSignup() {
    this.selectedIndex = 1;
  }
}
