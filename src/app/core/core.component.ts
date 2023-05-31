import { Component } from '@angular/core';
import { BikeService } from './service/bike.service';
import { BuyBikeService } from './service/buyBike.service';
import { FormBuilder, FormGroup, UntypedFormGroup } from '@angular/forms';
import { BuyComponent } from './buy/buy.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})
export class CoreComponent {
  bikes: any[] = [];
  selectedLanguage: string = 'es';
  languageForm!: FormGroup;
  buy!: UntypedFormGroup;
  product: any;
  sesionIniciada: boolean = false;
  userId: any = localStorage.getItem('userId');
  images: string[] = [
    'https://www.incolmotos-yamaha.com.co/wp-content/uploads/2023/05/Key-Visual-Modelos-2023-V3_2.jpg',
    'https://www.incolmotos-yamaha.com.co/wp-content/uploads/2023/05/Plan-80-20-WEB-FZ25-MAYO-1.jpg',
    'https://www.incolmotos-yamaha.com.co/wp-content/uploads/2023/04/MT15-banner.jpg'
  ];
  currentImage: string = '';
  currentIndex: number = 0;

  constructor(
    private bikeService: BikeService,
    private buyBikeService: BuyBikeService,
    private matDialog: MatDialog,
    private fb: FormBuilder,
    private translocoService: TranslocoService
  ){
    this.languageForm = this.fb.group({
      language: [this.selectedLanguage],
    });
  }

  ngOnInit(): void {
    this.findAllBikes();
    this.startImageSlider();
  }

  onChangeLanguage(): void {
    const selectedLanguage = this.languageForm.get('language')?.value;
    this.translocoService.setActiveLang(selectedLanguage);
  }

  changeLanguage(lang: string) {
    this.translocoService.setActiveLang(lang);
  }

  findAllBikes(){
    this.bikeService.findAll().subscribe({
      next: (data) => {
        this.bikes.push(...data);
        console.log(data)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }




  cambiarEstadoSesion() {
    if (this.sesionIniciada) {
      // Cerrar sesión
      localStorage.removeItem('access_token');
    } else {
      // Iniciar sesión
      localStorage.setItem('access_token', 'valor_del_access_token');
    }

    this.sesionIniciada = !this.sesionIniciada;
  }

  startImageSlider() {
    this.currentImage = this.images[this.currentIndex];
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this.currentImage = this.images[this.currentIndex];
    }, 3000);
  }


  buyProduct(product: any){
    const modalRef = this.matDialog.open(BuyComponent
      );
    modalRef.componentInstance.bike = product;
    console.log(product)
  }


  addCart(id: Number){
    this.bikeService.addCart(id).subscribe({
      next: (data) => {
        Swal.fire('¡Felicitaciones!', 'Producto agregado al carrito', 'success');
      },
      error: (err) => {
      }
    });
  }


  openCart(){
    const modalRef = this.matDialog.open(DashboardComponent
      );
  }


}
