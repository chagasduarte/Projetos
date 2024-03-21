import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Box, BoxInput } from '../models/box';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoxService {

  constructor(private readonly htppClient: HttpClient) { }

  public GetAll(): Observable<Box[]>{
    return this.htppClient.get<Box[]>("https://localhost:7069/api/Box");
  }

  public Insert(nome: BoxInput): Observable<number>{
    return this.htppClient.post<number>('https://localhost:7069/api/Box', nome);
  }

}
