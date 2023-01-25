import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistroU } from '../entidades/Clases';
import { DocumentService } from '../servicios/document.service';
import { UsuarioChatService } from '../servicios/usuario-chat.service';

@Component({
  selector: 'app-registro-chat',
  templateUrl: './registro-chat.page.html',
  styleUrls: ['./registro-chat.page.scss'],
})
export class RegistroChatPage implements OnInit {

  datos:RegistroU={
    correo: "",
    password : "",
    nombre : "", 
    usuario:"",
    uid:"",
    texto: "",
    fecha:new Date(),
  }
  constructor(
    private router: Router,
    private documento : DocumentService,
    private servicechat : UsuarioChatService,
  ) { }

  ngOnInit() {
  }
  async registrar(){
    console.log('datos ->',this.datos);
    const res = await this.servicechat.registrar(this.datos).catch(error => {console.log(error)}
    )
    if(res){
      console.log('cliente creado');
      const path ='Cliente';
      const id = res.user!.uid
      this.datos.uid = id;
      this.datos.password = "";
      await this.documento.crearDocumento(this.datos,path,id)
      this.router.navigate(['/login-chat'])
    }
  }
}
