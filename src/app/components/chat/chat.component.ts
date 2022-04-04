import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  message = new FormControl('', [Validators.required, Validators.minLength(4)]);

  constructor() { }

  ngOnInit(): void {
  }

  sendMessage() {
    this.message.value
  }

}
