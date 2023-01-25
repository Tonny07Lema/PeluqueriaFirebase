import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginChatPage } from './login-chat.page';

const routes: Routes = [
  {
    path: '',
    component: LoginChatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginChatPageRoutingModule {}
