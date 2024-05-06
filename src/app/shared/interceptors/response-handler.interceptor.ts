import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';

export const responseHandlerInterceptor: HttpInterceptorFn = (req, next:HttpHandlerFn) => {
  let _router = inject(Router);
  let _message = inject(MessageService)

  return next(req).pipe(
    catchError(
      (error: HttpErrorResponse)=>{
        if (error.status === 0) {
          console.error('An error occurred:', error.error);
        } else if (error.error.message =="jwt malformed"){
          _router.navigate(['/login']);
          _message.add({ severity: 'error', summary: 'Error', detail: 'You need to log in' });
        }
        
        else {

          console.log(
            `Backend returned code ${error.status}, body was: `, error.error);
        }
        return throwError(() => new Error('Something bad happened; please try again later.'));
      }
    )
  );
};


  
