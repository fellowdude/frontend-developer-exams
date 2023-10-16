import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { Observable } from 'rxjs';
import { IRegistration } from 'src/app/shared/interfaces/registration.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private baseService: BaseService) { }

  registerUser(registrationBody: IRegistration): Observable<any> {
    return this.baseService.post('/users/registration', registrationBody);
  }
}
