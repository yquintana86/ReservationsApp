import { DOCUMENT } from '@angular/common';
import { ReturnStatement } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'tinymce';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

public favorite = new Array<Number>();

  constructor() { }

  
 public setlocalstorage (positionf_favotrite: number)
  {   
   let storage: string = positionf_favotrite + '_positionfavorite';       

   if (!localStorage.getItem(storage))      
    localStorage.setItem(storage, positionf_favotrite.toString());
   else
    localStorage.removeItem(storage);
  }

  public getlocalstorag(positionf_favotrite: number): boolean
  {
    let str: string = positionf_favotrite.toString() + '_positionfavorite';     
    
   return (!localStorage.getItem(str)) ? false : true;
  }   
  
  private existe(id: number): boolean
  {
    let existe: boolean = false;

    if (document.cookie.length != 0) {
      let cookie_array = document.cookie.split(';');
      for (let i = 0; i < cookie_array.length; i++) {
        let pair_cookie = cookie_array[i].split('=');
        for (let i = 0; i < pair_cookie.length; i++) {
          let without_ = pair_cookie[i].split('_');

          if (without_.length === 2 && without_[1].trim() === 'positionfavorite') {
            if (Number(without_[0].trim()) === id)
              existe = true;
          }
        }
      }
    }
    return existe;
  }

}