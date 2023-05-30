import { NgModule } from "@angular/core";
import { CoreComponent } from "./core.component";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { BuyComponent } from "./buy/buy.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AngularMaterialModule } from "../shared/angular-material/angular-material.module";
import { CoreRoutingModule } from "./core-routing.module";

@NgModule({
    declarations: [
      BuyComponent,
      CoreComponent,
      DashboardComponent
    ],
    imports: [
      CommonModule,
      CoreRoutingModule,
      AngularMaterialModule,
      ReactiveFormsModule
    ]
  })
  export class CoreModule { }