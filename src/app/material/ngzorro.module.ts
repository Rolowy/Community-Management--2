import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzSpinModule } from 'ng-zorro-antd/spin';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    NzTypographyModule,
    NzCollapseModule,
    NzNotificationModule,
    NzInputModule,
    NzIconModule,
    NzFormModule,
    NzAlertModule,
    NzMessageModule,
    NzCardModule,
    NzEmptyModule,
    NzSpinModule
  ]
})
export class NgzorroModule { }
