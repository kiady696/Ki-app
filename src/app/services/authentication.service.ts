import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import {HttpService} from '../services/http.service';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authState = new BehaviorSubject(false);

  constructor(
    private router: Router,
    private platform: Platform,
    public toastController: ToastController,
    public httpService: HttpService,
    public storage: Storage
  ) {
    this.platform.ready().then( () => {
      /*ty ifLoggedIn() ty miverifier anle token anle olona oe efa misy
      any am base ve | Tsy mbola lany date ve
      */
      
      this.ifLoggedIn();
    });
   }


 
   

   ifLoggedIn(){
     this.storage.get('USER_INFO').then((response) =>{
       if(response){
        this.authState.next(true);
       }else{
         this.router.navigate(['login']);
       }
      
        
     })
    // 1 - miantso service mverifier token any am base | WEBSERVICE
    // 2 - Mamerina Promise resultatToken eto
    /* 3 - resultatToken.then((response) => {
              if(response){
                this.authState.next(true);
                this.router.navigate(['home']);
              }
           } )*/

   
   }
   

   login(response:any){
     //VARIABLE POUR STOCKER LE TOKEN ET L'EXPIRATION
     if(response.data!=null){
        var token = response.data.token;
        console.log(response.data.token);
        var today = new Date();
        var add_minutes =  function (dt, minutes) {
          return new Date(dt.getTime() + minutes*60000);
      }
        var expiration = add_minutes(today, 14400);
        let User_Info={
          token:token,
          expiration:expiration
        }
        this.storage.set('USER_INFO',User_Info);
        //GENERER L'EXPIRATION DU TOKEN DANS STORAGE
        //PASSER LE TOKEN dans ts les pages tant qu'il n'est pas expiré
          //Sauvegarder token et tokenExpiration dans stockage
          //Creer fonction qui verifie que le token n'est pas encore expiré
        console.log("USER INFO Seté");
        this.router.navigate(['list']);
     }else{
      console.log(response.data.token);
     }
     
     

     
   }

   logout(){
     console.log("mlog out");
     this.storage.remove('USER_INFO').then(() =>{
       this.authState.next(false);
       this.router.navigate(['login']);
     })
   }

}
