import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { createMask } from '@ngneat/input-mask';

@Component({
  selector: 'app-input2',
  templateUrl: './input2.component.html',
  styleUrls: ['./input2.component.scss'],
})

export class Input2Component implements OnInit {
  dateInputMask = createMask({
    alias: 'numeric',
    groupSeparator: ',',
    digits: 2,
    digitsOptional: false,
    prefix: 'm2 ',
    placeholder: '0',
  });

  dateFC = new FormControl('', Validators.required);
  
  constructor() { }

  ngOnInit(): void {
  }

}
