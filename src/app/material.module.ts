import { NgModule } from "@angular/core";

import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatCardModule } from "@angular/material/card";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatBadgeModule } from "@angular/material/badge";
import { MatSliderModule } from "@angular/material/slider";
// import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatMenuModule } from "@angular/material/menu";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDividerModule } from "@angular/material/divider";
import { TextFieldModule } from "@angular/cdk/text-field";
import { MatSelectModule } from "@angular/material/select";
import { MatStepperModule } from "@angular/material/stepper";
import { MatTabsModule } from "@angular/material/tabs";
import { MatDialogModule } from "@angular/material/dialog";
// import { MatToolbarModule } from "@angular/material/toolbar";

@NgModule({
  imports: [
    MatTableModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    // MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatCheckboxModule,
    MatDividerModule,
    TextFieldModule,
    MatSelectModule,
    MatStepperModule,
    MatTabsModule,
    MatDialogModule,
  ],

  exports: [
    MatBadgeModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    // MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatCheckboxModule,
    MatDividerModule,
    TextFieldModule,
    MatSelectModule,
    MatStepperModule,
    MatTabsModule,
    MatDialogModule,
  ],
})
export class MaterialModule {}
