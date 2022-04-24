import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/auth.service';
import { Adverts } from 'src/app/_interface/adverts';

@Component({
  selector: 'app-advert-edit',
  templateUrl: './advert-edit.component.html',
  styleUrls: ['./advert-edit.component.scss']
})
export class AdvertEditComponent {
  form: FormGroup = this.fb.group({
    title: new FormControl('', [Validators.required, Validators.minLength(4)]),
    desc: new FormControl('', [Validators.required, Validators.minLength(4)])
  })


  constructor(
    public dialogRef: MatDialogRef<AdvertEditComponent>,
    private fb: FormBuilder,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data:Adverts,
    ) {}

  ngOnInit() {
    this.form.patchValue({
      title: this.data.title,
      desc: this.data.desc
    })
  }


  onNoClick(): void {
    this.dialogRef.close();
  }


  async saveAdvert() {
    const data = {
      uid: this.data.uid,
      user: this.authService.userInfo.getValue(),
      title: this.form.value.title,
      desc: this.form.value.desc,
      createdAt: new Date()
    };

    this.authService.update(data, 'adverts');
    this.dialogRef.close();
  }
}
