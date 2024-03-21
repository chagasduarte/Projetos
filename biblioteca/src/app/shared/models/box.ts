import { Livros } from "./livros";

export interface IBox {
  id_box: number,
  nome_box: string,
  livros: Livros[]
}

export class Box implements IBox{
 id_box: number;
 nome_box: string;
 livros: Livros[];

 constructor(id: number, nome:string, livros: Livros[]){
  this.id_box = id;
  this.nome_box = nome;
  this.livros = livros;
 }
}

export interface IBoxInput {
  nome: string
}

export class BoxInput implements IBoxInput {
  nome: string;

  constructor(nome: string) {
    this.nome = nome;
  }
}


