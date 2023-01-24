import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../servicios/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credenciales ={
    correo :"",
    password :""
  }
  constructor(
    private serviceUser:UsuarioService,
    private router: Router,
  ) {}

  ngOnInit() {
  }
  async login(){
    console.log('crdenciales: ' + this.credenciales);

    const res = await this.serviceUser.login1(this.credenciales.correo , this.credenciales.password)
      .then(res => {
        console.log(res);
        this.router.navigate(['/perfil'])
      })
      .catch(error => console.log(error));
  }
}
