import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
  validateForm!: FormGroup;
  oldpasswordVisible = false;
  newpasswordVisible = false;
  newpassword?: string;
  oldpassword?: string;

  submitForm(): void {
    this.authService.changePassword(this.validateForm.value.oldPassword, this.validateForm.value.newpassword);
  }

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      oldpassword: [null, [Validators.required]],
      newpassword: [null, [Validators.required]]
    });
  }
}
