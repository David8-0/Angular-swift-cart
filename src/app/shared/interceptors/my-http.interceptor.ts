import { HttpInterceptorFn } from '@angular/common/http';

export const myHttpInterceptor: HttpInterceptorFn = (req, next) => {
  let newReq = req.clone({
    headers:req.headers.set("authorization",`Bearer ${localStorage.getItem("token")}`)
  });
  // console.log(newReq);
  
  
  return next(newReq);
};
