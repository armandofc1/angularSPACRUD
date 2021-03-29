import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pessoa } from '../../core/models/pessoa';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './pessoa-form-dialog.component.html',
  styleUrls: ['./pessoa-form-dialog.component.scss']
})
export class PessoaFormDialogComponent implements OnInit {
  formInstance: FormGroup;
  formAction: string;

  constructor(public dialogRef: MatDialogRef<PessoaFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Pessoa) {
    this.formInstance = new FormGroup({
      "id":  new FormControl('', Validators.required),
      "nome": new FormControl('', Validators.required),
      "idade": new FormControl('', Validators.required),
      "cargo": new FormControl('', Validators.required),
    });

    this.formInstance.setValue(data);
    if(data.id){
      this.formAction = 'Editar';
    }else{
      this.formAction = 'Cadastrar';
    }
  }

  ngOnInit(): void {

  }

  save(): void {
    this.dialogRef.close(Object.assign(new Pessoa(), this.formInstance.value));
  }
}
