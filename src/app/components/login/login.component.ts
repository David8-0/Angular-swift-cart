import { Component } from '@angular/core';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ResetPassword } from '../../shared/interfaces/reset-password';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    showResetToken:boolean = false;
    isLoading:boolean = false;
    apiError:string = "";
    visible:boolean = false;
    email: string ="";
    message:any;

    
    constructor(
      private _authService:AuthenticationService,
      private _router: Router   
     ){
      
     }


    loginForm:FormGroup = new FormGroup({
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required,Validators.pattern(/[a-z0-9]{3,12}/)]),
    });

    resetPasswordForm:FormGroup = new FormGroup({
      code:new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required,Validators.pattern(/[a-z0-9]{3,12}/)]),
      confirmPassword:new FormControl('',[Validators.required,Validators.pattern(/[a-z0-9]{3,12}/)]),
    });

    login(form:FormGroup){
      if(form.valid){
        this.isLoading = true;
        this._authService.loginUser(form.value).subscribe({
          next:(data)=>{
            console.log(data)
            this.isLoading = false;
            localStorage.setItem('token',data.token);
            this._router.navigate(['/home']);
            localStorage.setItem('token',data.token);
            this._authService.getuserData();
          },
          error:(err)=>{
            console.log(err);
            this.apiError=err.error.message;
            this.isLoading = false;
          },
          complete:()=>console.log("Done")
        });
      }
    }

    forgotPassword(){
      this.visible = false;
      this._authService.forgotPassword(this.email).subscribe({
        next:(data)=>{
          this.message=[{ severity: 'success', summary: 'Success', detail: `${data.message}` }];
          this.showResetToken=true;
        },
        error:(err)=>{
          this.message=[{ severity: 'error', summary: 'Error', detail: `${err.error.message}` }];
        },
        complete:()=>console.log("Done")
      });
    }

    showDialog(){
      this.visible = ! this.visible;
    }
    submitResetPassword(form:FormGroup){
      let reset:ResetPassword = {} as ResetPassword
      reset.code = form.value.code;
      reset.password=form.value.password;
      reset.confirmPassword=form.value.confirmPassword;
      this._authService.resetPassword(reset).subscribe({
        next:(res)=>{
          this.message=[{ severity: 'success', summary: 'Success', detail: `Your password has been reseted successfuly you can log in now` }];
          this.showResetToken=false;
        },
        error:(err)=>{this.message=[{ severity: 'error', summary: 'Error', detail: `${err.error.message}` }];}
      })
    }

}
