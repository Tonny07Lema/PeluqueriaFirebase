import { Injectable } from '@angular/core';
import { Auth,createUserWithEmailAndPassword } from '@angular/fire/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Usuario } from '../entidades/Cita';
import { clear } from 'console';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //constructor(private auth:Auth) { }
  constructor(private auth:AngularFireAuth) { }
  /*
  register({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }
  */
 /*
  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
  */
  login1(correo: string, password: string){
    return this.auth.signInWithEmailAndPassword(correo, password)
  }

  logaut(){
    this.auth.signOut();
    
  }

  registrar(datos:Usuario){
    return this.auth.createUserWithEmailAndPassword(datos.correo,datos.password)
  }

  estadoUsuario(){
    return this.auth.authState
  }

  async getId(){
    const user = await this.auth.currentUser
    if(user){
      return user.uid
    }else {
      return "";
    }
    
  }

}

