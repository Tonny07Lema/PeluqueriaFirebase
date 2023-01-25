import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroChatPage } from './registro-chat.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroChatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroChatPageRoutingModule {}
