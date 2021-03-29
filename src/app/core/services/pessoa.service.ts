import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PessoasData } from '../constants/pessoa-static-data';
import { Pessoa } from '../models/pessoa';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoas$: BehaviorSubject<Pessoa[]>;
  pessoas: Array<Pessoa> = [];
  constructor() {
    this.pessoas$ = new BehaviorSubject([]);
    this.pessoas = PessoasData;
  }

  getAll() {
    this.pessoas$.next(this.pessoas);
  }

  add(pessoa: Pessoa) {
    let id = Math.max.apply(Math, this.pessoas.map(function(pessoa) { return pessoa.id + 1; }));
    pessoa.id = id;
    this.pessoas.push(pessoa);
    this.pessoas$.next(this.pessoas);
  }

  edit(pessoa: Pessoa) {
    let findElem = this.pessoas.find(p => p.id == pessoa.id);

    findElem.nome = pessoa.nome;
    findElem.idade = pessoa.idade;
    findElem.cargo = pessoa.cargo;

    this.pessoas$.next(this.pessoas);
  }

  remove(id: number) {

    this.pessoas = this.pessoas.filter(p => {
      return p.id != id
    });

    this.pessoas$.next(this.pessoas);
  }

}
