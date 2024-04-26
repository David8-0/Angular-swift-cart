import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { jwtDecode } from 'jwt-decode';
import { UsersService } from './users.service';
import { ResetPassword } from '../interfaces/reset-password';
@Injectable({
  providedIn: 'root'
  })
  export class AuthenticationService {
    baseUrl:string='http://localhost:3000/';
    userData:BehaviorSubject<any> = new BehaviorSubject({} as any);

    constructor(
      private _httpClient:HttpClient,
      private _userService:UsersService
    ) {
      this.getuserData();
    }

    getuserData(){
    const encoded = JSON.stringify(localStorage.getItem('token'));
    const decodedData:any=jwtDecode(encoded);
    const id = decodedData.id;
    this._userService.getUserById(id).subscribe(res=>{
      this.userData.next(res.data.user);
    })
    }

    registerUser(user:User):Observable<any>{
      return this._httpClient.post(`${this.baseUrl}api/v1/users/signup`,user)
    }

    loginUser(user:User):Observable<any>{
      return this._httpClient.post(`${this.baseUrl}api/v1/users/login`,user)
    }

    forgotPassword(email:string):Observable<any>{
      return this._httpClient.post(`${this.baseUrl}api/v1/users/forgotPassword`,{email})
    }

    resetPassword(reset:ResetPassword):Observable<any>{
      return this._httpClient.patch(`${this.baseUrl}api/v1/users/resetPassword/${reset.code}`,{
        password:reset.password,
        confirmPassword:reset.confirmPassword
      })  
    }

    updatePassword(updatedPassword:User):Observable<any>{
      return this._httpClient.patch(`${this.baseUrl}api/v1/users/updatePassword`,updatedPassword)
    }
}


