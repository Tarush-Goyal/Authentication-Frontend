import { AuthService } from "./auth.service";
import { Component, OnInit } from "@angular/core";
import { MatTabsModule } from "@angular/material/tabs";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"],
})
export class AuthComponent implements OnInit {
  // temp;
  constructor(public authService: AuthService) {
    // this.temp = this.authService.selectedIndex;
  }

  ngOnInit(): void {}
}
