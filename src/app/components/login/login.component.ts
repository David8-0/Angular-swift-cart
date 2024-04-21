import { Component } from '@angular/core';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    isLoading:boolean = false;
    apiError:string = "";
    visible:boolean = false;
    email: string | undefined;
    constructor(
      private _authService:AuthenticationService,
    private _router: Router
    ){}

    loginForm:FormGroup = new FormGroup({
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{3,8}/)]),
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
            this.apiError=err.error.msg;
            this.isLoading = false;
          },
          complete:()=>console.log("Done")
        });
      }
    }

    forgotPassword(){

    }

    showDialog(){
      this.visible = ! this.visible;
    }

}
