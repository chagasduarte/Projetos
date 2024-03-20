import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Livros } from '../models/livros';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LivrosService {

  constructor(private readonly htppClient: HttpClient) { }

  public getLivros(): Observable<Livros[]> {
    return this.htppClient.get<Livros[]>("https://localhost:7069/api/Livros");
  }

}
