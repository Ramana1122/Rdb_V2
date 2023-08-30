import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'

})

export class server {
 
  ServerUrls: any;
  production: boolean = false;
  development: boolean = true;
  private profileObs$: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(private http: HttpClient) {
    this.getJonsurl();
  }

  getProfileObs(): Observable<any> {
    return this.profileObs$.asObservable();
}

setProfileObs(profile: any) {
    this.profileObs$.next(profile);
}

  getJonsurl() {
    let url: any = '';
    if (this.development) {
     
      url = '../../assets/url.json';
      console.log("dev"+"check"+url);
    } else {
      url = '../../rdbapp/assets/url.json';
      console.log("dev else"+"check....."+url);
    }
    this.http.get(url, { responseType: 'json' })
      .subscribe((data: any) => {
        console.log('data' + JSON.stringify(data));
        if (data && data.serverEndPoint) {
          console.log('urls' + data.serverEndPoint);
          this.ServerUrls = data.serverEndPoint;
        }
      })
  }
}