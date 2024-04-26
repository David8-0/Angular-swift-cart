import { Component, OnDestroy } from '@angular/core';
import { User } from '../../shared/interfaces/user';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../shared/services/users.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnDestroy{
  value: string | undefined;
  editable: boolean=false;
  userData:User = {} as User;
  visibleDialog:boolean = false;

    constructor(private _authService:AuthenticationService,
      private _userService: UsersService,
      private messageService: MessageService
    ){
      _authService.userData.subscribe(userData =>{
        this.userData = userData;
        console.log(this.userData);
        this.updateUserForm.get('name')?.setValue(userData.name);
        this.updateUserForm.get('email')?.setValue(userData.email);
        this.updateUserForm.get('phone')?.setValue(userData.phone);
        this.updateUserForm.get('role')?.setValue(userData.role);
        this.updateUserForm.get('Age')?.setValue(userData.Age);
        this.updateUserForm.get('address')?.setValue(userData.address);
        this.updateUserForm.disable();
      });
    }

    updateUserForm:FormGroup = new FormGroup({
      name:new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(15)]),
      email:new FormControl('',[Validators.required,Validators.email]),
      phone:new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(13)]),
      role:new FormControl(''),
      Age:new FormControl('',[Validators.min(12)]),
      address:new FormControl(''),
      photo:new FormControl(null)
    });

    updateUserPasswordForm:FormGroup = new FormGroup({
      oldPassword:new FormControl('',[Validators.required,Validators.pattern(/^[A-Za-z0-9]{3,12}/)]),
      newPassword:new FormControl('',[Validators.required,Validators.pattern(/^[A-Za-z0-9]{3,12}/)]),
      newConfirmPassword:new FormControl('',[Validators.required,Validators.pattern(/^[A-Za-z0-9]{3,12}/)]),
    });

    submitUserInfo(form:FormGroup){
      if(form.valid){
        this._userService.updateUser(form.value).subscribe({
          next:(res)=>{
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Your info updated Successfuly' });
            this._authService.userData.next(res.data.user);
            console.log(this.userData);
          },
          error:(err)=>{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'there was an error updating your info' });
            console.log(err);
          }
        })
      }else{
        console.log(form);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'there was an error updating your info' });
      }
    }
    submitUserPassword(form:FormGroup){
      if(form.valid){
        this._authService.updatePassword(form.value).subscribe({
          next:(res)=>{
            console.log(res.status);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Password Changed Successfuly' });
          },
          error:(err)=>{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'incorrect password' });
            console.log(err);
          }
        })
      }else{
        console.log(form);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'invalid input' });
      }
      this.visibleDialog=false;
    }

    edit():void{
      this.editable=true;
      this.updateUserForm.enable();
      this.updateUserForm.get('role')?.disable();
    }

    showDialog():void{
      this.visibleDialog=true;
    }
    onFileSelected(event:any) {
   
      const file: File = event.target.files[0];
      if (file) {
        let formData = new FormData();
        formData.append('photo',file);
        console.log(formData);
        
        this._userService.uploadPhoto(formData).subscribe({
          next:(res)=>{
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Your Photo updated Successfuly' });
            this._authService.userData.next(res.data.user);
          },
          error:(err)=>{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'there was an error updating your photo' });
            console.log(err);
          }
        })
      }
    }

    ngOnDestroy(): void {
        //this._authService.userData.unsubscribe();
    }
}

