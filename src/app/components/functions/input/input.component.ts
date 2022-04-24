import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() title:string = ''
  @Input() setValue:any
  @Input() maxLength:number = 50
  @Input() minLength:number = 1
  @Input() dropSpecial:boolean = true
  @Input() control: FormControl = new FormControl('', [Validators.minLength(this.minLength), Validators.maxLength(this.maxLength)])
  @Input() masktyped:boolean = false;
  @Input() type:string = 'text'
  @Input() placeholder:string = ''
  @Input() format:string = ''

  constructor() { }

  ngOnInit(): void {
    this.control.setValue(this.setValue);
  }

}
