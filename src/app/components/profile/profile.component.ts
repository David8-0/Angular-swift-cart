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
  editable: boolean=false;
  userData:User = {} as User;
  visibleDialog:boolean = false;

    constructor(private _authService:AuthenticationService){
      _authService.userData.subscribe(userData =>{
        this.userData = userData;
        console.log(this.userData);
      });
    }


    edit():void{
      this.editable=true;
    }

    showDialog():void{
      this.visibleDialog=true;
    }

    ngOnDestroy(): void {
        //this._authService.userData.unsubscribe();
    }
}
