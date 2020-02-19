import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import {HttpService} from '../services/http.service';



@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;

  private listeDepart: any;
  private listeArrivee: any;


  constructor(
    private auth:AuthenticationService,
    private router: Router,
    private http: HttpService
  ){

  }
  

  ngOnInit() {
    console.log("les stations : ");
    this.http.callService("Station").subscribe((data) =>{
     
    console.log("apres call GET STATIONS:");
    
    this.listeDepart = data;
      
      console.log(data);
    })
    


  }
  
}
