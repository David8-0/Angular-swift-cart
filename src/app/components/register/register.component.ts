import { AuthenticationService } from './../../shared/services/authentication.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  isLoading:boolean = false;
  apiError:string = "";
  constructor(
    private _authService:AuthenticationService,
    private _router: Router
  ){}


  registerForm:FormGroup = new FormGroup({
    name:new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(15)]),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{3,8}/)]),
    confirmPassword:new FormControl('',[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{3,8}/)]),
    Phone:new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(13)]),
    role:new FormControl('',[Validators.required])
  });



  submit(form:FormGroup){
    if(form.valid){
      this.isLoading = true;
      this._authService.registerUser(form.value).subscribe({
        next:(data)=>{
          console.log(data)
          this.isLoading = false;
          this._router.navigate(['/home']);
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

}
