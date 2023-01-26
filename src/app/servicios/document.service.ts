import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, map } from 'rxjs';
import { Usuario } from '../entidades/Cita';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private firestore: AngularFirestore,
    private authService: AngularFireAuth,
    public storage: AngularFireStorage) { }

  crearDocumento(data: any, path: string, id: string) {
    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data);
  }

  getId() {
    return this.firestore.createId();
  }

  getCollection<tipo>(path: string) {
    const collection = this.firestore.collection<tipo>(path);
    return collection.valueChanges();
  }

  getDocument<tipo>(path: string, id: string) {
    return this.firestore.collection(path).doc<tipo>(id).valueChanges();
  }

  update(path: string, id: string, data: any) {
    this.firestore.collection(path).doc(id).update(data);
  }
  updateFoto(id: string, user: Usuario) {
    return this.firestore.doc(id).update(user);
  }


  cargarImagen(file: any, path: string, nombre: string): Promise<string> {
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
          })
        })
      )
        .subscribe();
    });
  }

}
