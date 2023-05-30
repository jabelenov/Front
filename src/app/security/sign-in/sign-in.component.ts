import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IdentityService } from '../shared/identity.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  signInForm!: UntypedFormGroup;
  submmiting = false;
  isLoggedIn = false;
  isSubmit: boolean = false;
  isLoginFailed = false;
  returnUrl!: string;
  hide: boolean = true;

  constructor(
    private router: Router,
    private identityService: IdentityService,
  ) {
    this.ngOnInit();
  }

  ngOnInit(): void {
    if (this.identityService.getToken()) {
      this.isLoggedIn = true;
    }
    this.signInForm = new UntypedFormGroup({
      username: new UntypedFormControl('', Validators.required),
      password: new UntypedFormControl('', Validators.required),
    });
  }

  signIn(): void {
      this.identityService.signIn(this.signInForm.value).subscribe({
        next: (data) => {
          console.log(data);
          if (data && data.accessToken) {
            localStorage.setItem('access_token', data.accessToken);
            localStorage.setItem('currentUser', JSON.stringify(data));
            localStorage.setItem('userId', data.userInfo.userId);
            localStorage.setItem('userInfo', JSON.stringify(data.userInfo));
            this.router.navigate(['core']);
          }
        },
        error: (err) => {
          Swal.fire('!Oops!', err.error.message, 'error');
          this.submmiting = false;
        },
        complete: () => {
          this.submmiting = false;
        },
      });
    
  }

  redirect() {
    this.router.navigate(['/security/sign-up']);
  }


}
