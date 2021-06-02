import { AuthService } from "./../auth/auth.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  token;
  type;
  constructor(public auth: AuthService, private router: Router) {}
  displayToken() {
    console.log(this.token);
  }

  ngOnInit(): void {
    this.auth.getToken().subscribe((newToken) => {
      this.token = newToken;
      this.type = this.auth.type;
    });
  }
}
