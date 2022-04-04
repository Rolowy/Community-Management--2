import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzTypographyModule } from 'ng-zorro-antd/typography';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NzTypographyModule
  ],
  exports: [
    NzTypographyModule
  ]
})
export class NgzorroModule { }
