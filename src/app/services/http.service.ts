import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(
    private httpClient: HttpClient,
    
    private storage:Storage) { }

  buildHeaders(){
    let header = new Headers({
      'Content-Type' : 'application/json',
      'withCredentials' : 'true'
    });
    
    return this.getInfoUser().then((user) =>{
      if(user){
        let info = JSON.parse(user);
        console.log(info.token);
        header.append('Authorization','Bearer '+info.token);
        return header;
      }
    })

  }


  
  getInfoUser(){
    return this.storage.get('USER_INFO');
  } 



  callService(link: string){
    
    var httpOptions = {}

    /*var headers = new HttpHeaders();
    headers.set("Acces-Allow-Control-Origin","*");
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );*/
   
    this.getInfoUser().then((user) =>{
      if(user!=null){
        console.log("yeaeaeae");
        console.log(user.token);
        httpOptions = {
          headers: new HttpHeaders({
            
            'Accept': 'application/json',
            'Content-Type':  'application/json',

            'Authorization': 'Bearer '+user.token
          })
        };
      }
    })
    //const options={headers:headers,withCredentials: true}
    /*this.getInfoUser().then((user) =>{
      if(user!=null){
        console.log(user);
         options = {
          headers: new HttpHeaders({
            'Accept':'application/json',
            'Authorization' : ''+user.token
          })
        }
      }
    })*/
    
      return this.httpClient.get(`http://localhost:5000/${link}`,httpOptions);
  }


  callPostService(params:any,link:string){
    const headers = new HttpHeaders();
    headers.set("Acces-Allow-Control-Origin","*");
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    const options={headers:headers,withCredintials: false}

    const url= `http://localhost:5000/${link}`;
    return this.httpClient.post<any>(url,params,options);
  }
}
