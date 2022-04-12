import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/shared/auth-service.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
  validateForm!: FormGroup;

  oldpasswordVisible = false;
  newpasswordVisible = false;

  submitForm(): void {
    console.log('submit', this.validateForm.value);
    this.authService.changePassword(this.validateForm.value.oldPassword, this.validateForm.value.newpassword);
  }


  newpassword?: string;
  oldpassword?: string;

  constructor(private fb: FormBuilder, private authService: AuthServiceService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      oldpassword: [null, [Validators.required]],
      newpassword: [null, [Validators.required]]
    });
  }


}
