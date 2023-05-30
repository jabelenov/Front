import { Component } from '@angular/core';
import { BikeService } from '../service/bike.service';
import { BuyBikeService } from '../service/buyBike.service';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent {

  bike: any;
  buy!: UntypedFormGroup;
  userId: any = localStorage.getItem('userId');
  

  
  constructor(
    private bikeService: BikeService,
    private buyBikeService: BuyBikeService,
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<any>
  ){}


  initForm(){
    this.buy = this.fb.group({
      bikeId: [{value: this.bike.id, disabled: true}],
      userId: [{value: this.userId, disabled: true}],
      price: [{value: this.bike.price, disabled: true}],
    })
  }

  buyBike(){
    const request = {
      bikeId: this.bike.id,
      clientId: this.userId,
      price: this.bike.price
    }
    this.buyBikeService.buyBike(request).subscribe({
      next: (data) => {
        Swal.fire('¡Felicitaciones!', 'Compra realizada con éxito', 'success');
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  close(){
    this.matDialogRef.close();
  }

}
