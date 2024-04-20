import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'swift-cart';
  items:MenuItem[] | undefined;
  ngOnInit(): void {
      this.items = [
        {
          label:'file',
          items:[
            {
              label:'new',
              icon:'pi pi-fw pi-plus',
              items:[
                {label:'project',url:'https://github.com'},
                {label:'products',routerLink:['products']}
              ]
            }
          ]
        },{
          label:'Edit',
          items:[
            {label:'update', command:()=>this.log()},
            {label:'delete'}
          ],
          style:{
            color:'red'
          }
        }
      ]
  }
  
  log(){
    console.log("Helllllo");
    
  }
}
