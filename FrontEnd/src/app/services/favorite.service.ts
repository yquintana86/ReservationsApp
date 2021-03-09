import { DOCUMENT } from '@angular/common';
import { ReturnStatement } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'tinymce';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {                    //This services class has all the functions related to
                                                  //WebSorage in the browser

  public favorite = new Array<Number>();

  constructor() { }


  public setlocalstorage(positionFavotrite: number) {
    let storage: string = positionFavotrite + '_positionFavorite';

    if (!localStorage.getItem(storage))
      localStorage.setItem(storage, positionFavotrite.toString());
    else
      localStorage.removeItem(storage);
  }

  public getlocalstorage(positionFavotrite: number): boolean {
    let str: string = positionFavotrite.toString() + '_positionFavorite';
    let str1:any = localStorage.getItem(str);    
    let str2:boolean = (!localStorage.getItem(str)) ? true : false;
    return str2;
  }     


}