import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";

export interface DialogData {
  error: string;
}

@Component({
  selector: "app-errordialog",
  templateUrl: "./errordialog.component.html",
  styleUrls: ["./errordialog.component.scss"],
})
export class ErrorDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {}
}
