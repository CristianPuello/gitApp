import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGiftResponse } from '../Interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  
  private servicionUrl :string = 'https://api.giphy.com/v1/gifs'

  private apiKey:string = 'GxZgM01KvZe0clHPK365ShwFqPIz1uuP'

  private _historial:string[] = []

  //TODO: Cambiar any por su tipo correspondiente
  public resultado:Gif[] = []

  get historial(){
    return [...this._historial];
  }

  constructor(private http:HttpClient){
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultado = JSON.parse(localStorage.getItem('resultado')!) || [];
    

  }

  buscarGifs(query:string){
    
    query = query.trim().toLocaleLowerCase();

    if(!this._historial.includes(query)){
      this._historial.unshift(query)
      this._historial = this._historial.splice(0,10)

      localStorage.setItem('historial', JSON.stringify(this._historial));
      
    }

    const params = new HttpParams().set('api_key', this.apiKey).set('limit','10').set('q',query);

    

    this.http.get<SearchGiftResponse>(`${this.servicionUrl}/search`,{params})
    .subscribe( (resp) => {
      this.resultado = resp.data;
      localStorage.setItem('resultado', JSON.stringify(this.resultado));

    } )

  }

}

