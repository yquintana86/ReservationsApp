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

  
 public setcookie (positionf_favotrite: number)
  {    
   let num = positionf_favotrite.toString();
   let cookie: string = num + "_positionfavorite=" + num;
   let exist = document.cookie.search(cookie.trim());   

   if (exist >= 0)      
     document.cookie.replace(cookie,''); 
   else
   {
    document.cookie = num + "_positionfavorite=" + num + ";";     
    document.cookie = "expires=Fri, 31 Dec 2030 23:59:59 UTC; path=/;";  
   }
        
  }

  public getcookie(): void
{
    if (document.cookie.length != 0) {
      let cookie_array = document.cookie.split(';');
      for (let i = 0; i < cookie_array.length; i++) {
        let pair_cookie = cookie_array[i].split('=');
        for (let i = 0; i < pair_cookie.length; i++) {
          let without_ = pair_cookie[i].split('_');

          if (without_.length === 2 && without_[1].trim() === 'positionfavorite') {
            this.favorite.push(without_[0].trim() as unknown as number);
          }
        }
      }
    }
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
            if (without_[0].trim() as unknown as number === id)
              existe = true;
          }
        }
      }
    }
    return existe;
  }

}