import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Livros, LivroInput } from '../models/livros';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LivrosService {

  constructor(private readonly htppClient: HttpClient) { }

  public GetAll(): Observable<Livros[]> {
    return this.htppClient.get<Livros[]>("https://localhost:7069/api/Livros");
  }
  public Insert(livro: LivroInput) : Observable<number>{
    return this.htppClient.post<number>("https://localhost:7069/api/Livros", livro);
  }

}
