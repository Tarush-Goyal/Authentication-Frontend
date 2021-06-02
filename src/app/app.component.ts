import { AuthService } from "./auth/auth.service";
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  logoutTimer;
  constructor(private auth: AuthService) {
    this.auth.tokenExpirationDate.subscribe((ted) => {
      console.log("inside ted subscription");
      if (this.auth.isLoggedIn()) {
        const remainingTime = ted.getTime() - new Date().getTime();
        this.logoutTimer = setTimeout(() => {
          this.auth.logout();
        }, remainingTime);
      } else {
        console.log("logout called");
        clearTimeout(this.logoutTimer);
      }
    });
  }
  title = "client";
}
