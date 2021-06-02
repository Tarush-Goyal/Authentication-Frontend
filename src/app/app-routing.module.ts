import { ListProductComponent } from "./master/listproduct/listproduct.component";
import { AddProductComponent } from "./master/addproduct/addproduct.component";
import { HomeComponent } from "./home/home.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";

const routes: Routes = [
  { path: "auth", component: AuthComponent },
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "admin/addproduct", component: AddProductComponent },
  { path: "admin/listproduct", component: ListProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
