import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private menuSubject$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() { }

   public setMenuEntryActive(nr: number){
     this.menuSubject$.next(nr);
   }

   public getActiveEntry(): Observable<number>{
     return this.menuSubject$.asObservable();
   }

}
