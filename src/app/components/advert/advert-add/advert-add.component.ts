import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/auth.service';
import { Adverts } from 'src/app/_interface/adverts';

@Component({
  selector: 'app-advert-add',
  templateUrl: './advert-add.component.html',
  styleUrls: ['./advert-add.component.scss']
})
export class AdvertAddComponent {
  form: FormGroup = this.fb.group({
    title: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(71)]),
    desc: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(1001)])
  })


  constructor(
    public dialogRef: MatDialogRef<AdvertAddComponent>,
    private fb: FormBuilder,
    private authService: AuthService  ) {}

  ngOnInit() {
  }


  onNoClick(): void {
    this.dialogRef.close();
  }


  async saveAdvert() {
    const data:Adverts = {
      user: this.authService.userInfo.getValue(),
      title: this.form.value.title,
      desc: this.form.value.desc,
      createdAt: new Date()
    };

    this.authService.addAdvert(data).then(() => {
      this.authService.viewMessageSuccess('Pomyślnie dodano ogłoszenie');
    }).catch(error => {
      this.authService.viewMessageError('Wystąpił błąd podczas dodawania ogłoszenia.')
      console.log(error);
    })

    this.dialogRef.close();
  }
}
