import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { createMask } from '@ngneat/input-mask';

@Component({
  selector: 'app-input2',
  templateUrl: './input2.component.html',
  styleUrls: ['./input2.component.scss'],
})

export class Input2Component implements OnInit {
  @Input() title:string = ''
  @Input() control: FormControl = new FormControl('', Validators.required)
  @Input() placeholder:string = '0'
  @Input() prefix:string = ''
  @Input() value:any

  InputMask = createMask({
    alias: 'numeric',
    groupSeparator: '',
    digits: 2,
    min: 0.01,
    digitsOptional: false,
    prefix: this.prefix,
    placeholder: this.placeholder
  });

  constructor() {
  }

  ngOnInit(): void {
    if(this.value != null)
    {
      this.control.setValue(this.value);
    }
  }

}
