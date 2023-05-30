import { NgModule } from "@angular/core";
import { SecurityComponent } from "./security.component";
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { SecurityRoutingModule } from "./security-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AngularMaterialModule } from "../shared/angular-material/angular-material.module";

@NgModule({
    declarations: [
        SecurityComponent,
        SignInComponent,
        SignUpComponent
    ],
    imports: [
        SecurityRoutingModule,
        AngularMaterialModule,
        ReactiveFormsModule,
        CommonModule
    ]
  })
  export class SecurityModule { }