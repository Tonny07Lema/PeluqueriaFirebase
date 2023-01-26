import { Injectable } from '@angular/core';
import { Auth,createUserWithEmailAndPassword } from '@angular/fire/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Usuario } from '../entidades/Cita';
import { clear } from 'console';
import { finalize, map, Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private dbPath = '/Cliente';
  usersRef: AngularFirestoreCollection<Usuario>;
  //constructor(private auth:Auth) { }
  constructor(private auth:AngularFireAuth,
    private db: AngularFirestore,
    public storage: AngularFireStorage,) {
    this.usersRef = db.collection(this.dbPath);
   }
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
  getAuth() {
    return this.auth.authState.pipe( //esto regresaria el usuario autenticado en caso de haberlo
      map(auth => auth)
    );
  }
  
  getById(id: string): Observable<any> {
    return this.usersRef.doc(id).valueChanges();
  }
  uploadImage(file: any, path: string, nombre: string): Promise<string> {
    return new Promise(resolve => {
      const filePath = path + '/' + nombre;
      const ref = this.storage.ref(filePath);
      const task = ref.put(file);
      task.snapshotChanges().pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe(res => {
            const downloadURL = res;
            resolve(downloadURL);
            return;
          });
        })
      )
        .subscribe();
    });
  }
  update(id: string, user: Usuario){
    return this.usersRef.doc(id).update(user);
  }
}

