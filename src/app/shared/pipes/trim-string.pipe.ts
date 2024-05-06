import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimString'
})
export class TrimStringPipe implements PipeTransform {

  transform(value: string, num:number): string {
    let strArr = value.split(' ');
    let str="";
    if(num < strArr.length){
      for(let i = 0; i < num; i++){
        str += strArr[i] + " ";
      }
      return str.trimEnd();
    }else{
      return value;
    }
  }

}
