import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../entidades/Cita';
import { DocumentService } from '../servicios/document.service';
import { UsuarioService } from '../servicios/usuario.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  datos:Usuario={
    correo: "",
    password : "",
    nombre : "",
    cedula : "",
    telefono:"",
    uid : "",
    perfil:'cliente'
  }
  
  constructor(
    private serviceUser:UsuarioService,
    private router: Router,
    private documento : DocumentService,
  ) {
    
  }

  ngOnInit():void {
  }
  
  async registrar(){
    console.log('datos ->',this.datos);
    const res = await this.serviceUser.registrar(this.datos).catch(error => {console.log(error)}
    )
    if(res){
      console.log('cliente creado');
      const path ='Cliente';
      const id = res.user!.uid
      this.datos.uid = id;
      this.datos.password = "";
      await this.documento.crearDocumento(this.datos,path,id)
      this.router.navigate(['/login'])
    }
  }
  /*
  registrar(){
    this.serviceUser.register(this.formReg.value)
    .then(response => {console.log(response);
    this.router.navigate(['/login']);})
    .catch(error => console.log(error));
  }
 */

}
