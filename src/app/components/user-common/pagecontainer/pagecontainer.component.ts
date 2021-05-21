import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagecontainer',
  templateUrl: './pagecontainer.component.html',
  styleUrls: ['./pagecontainer.component.scss']
})
export class PagecontainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
 
  user_type: string= 'seller';  
  loged_id:boolean=true;
}
