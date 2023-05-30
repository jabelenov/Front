import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { BikeService } from '../service/bike.service';
import { BuyBikeService } from '../service/buyBike.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  products: any[] = []
  ids: any[] = []
  userId: any = localStorage.getItem('userId');


  constructor(
    private bikeService: BikeService,
    private buyBikeService: BuyBikeService,
    private matDialogRef: MatDialogRef<any>
  ){   
  }

  ngOnInit(): void {
    this.findAllCar();
  }

  close(){
    this.matDialogRef.close();
  }

  buyCar(){
    this.buyBikeService.buyProductCar(this.userId,this.ids).subscribe({
      next: (data) => {
        Swal.fire('Felicidades', 'productos comprados con exito')
        this.matDialogRef.close();
      },
      error: (err) => {
      }
    })
  }

  findAllCar(){
    this.bikeService.findAllCart().subscribe({
      next: (data) => {
        this.products.push(...data);
        const idProducts = this.products.map((product) => product.id)
        this.ids.push(...idProducts);
        console.log(this.ids);
      },
      error: (err) => {
      }
    })
  }

  deleteCar(id: any){
    this.bikeService.deleteCart(id).subscribe({
      next: (data) => {
        Swal.fire('Felicidades', 'producto eliminado con exito')
        location.reload();
      },
      error: (err) => {
      }

    })
  }

}
