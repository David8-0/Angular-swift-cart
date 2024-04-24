import { Component, OnDestroy } from '@angular/core';
import { User } from '../../shared/interfaces/user';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnDestroy{
  value: string | undefined;
    userData:User = {} as User;
    constructor(private _authService:AuthenticationService){
      _authService.userData.subscribe(userData =>{
        this.userData = userData;
        console.log(this.userData);
      });
    }



    ngOnDestroy(): void {
        //this._authService.userData.unsubscribe();
    }
}
