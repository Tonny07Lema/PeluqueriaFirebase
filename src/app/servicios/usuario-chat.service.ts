import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { RegistroU } from '../entidades/Clases';

@Injectable({
  providedIn: 'root'
})
export class UsuarioChatService {
  private dbPath = '/mensajes'
  constructor(private auth: AngularFireAuth,
    private db: AngularFirestore) { }
  registrar(datos: RegistroU) {
    return this.auth.createUserWithEmailAndPassword(datos.correo, datos.password)
  }

  login(correo: string, password: string) {
    return this.auth.signInWithEmailAndPassword(correo, password)
  }
  logaut() {
    this.auth.signOut();
  }
  async getId() {
    const user = await this.auth.currentUser
    if (user) {
      return user.uid
    } else {
      return "";
    }
  } 
}
