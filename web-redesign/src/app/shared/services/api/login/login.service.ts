import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { Observable } from 'rxjs';
import { ILogin } from 'src/app/shared/interfaces/login.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private baseService: BaseService) { }

  login(loginBody: ILogin): Observable<any> {
    return this.baseService.post('/login', loginBody);
  }
}
