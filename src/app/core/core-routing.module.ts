import { RouterModule, Routes } from "@angular/router";
import { CoreComponent } from "./core.component";
import { NgModule } from "@angular/core";
import { BuyComponent } from "./buy/buy.component";

const routes: Routes = [
    {
      path: '',
      component: CoreComponent,
      children:[
        {
          path: 'buy',
          component: BuyComponent,
        }
      ]
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class CoreRoutingModule { }