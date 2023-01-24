import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private firestore: AngularFirestore,
    public storage:AngularFireStorage) { }

  crearDocumento( data:any, path:string, id:string){
    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data);
  }

  getId(){
    return this.firestore.createId();
  }

  getCollection<tipo>(path:string){
    const collection = this.firestore.collection<tipo>(path);
    return collection.valueChanges();
  }

  getDocument<tipo>(path:string,id:string){
    return this.firestore.collection(path).doc<tipo>(id).valueChanges();
  }

  update(path:string, id:string, data:any){
    this.firestore.collection(path).doc(id).update(data);
  }

  cargarImagen(file:any ,path:string,nombre:string):Promise<string>{
    return new Promise( resolve =>{
      const files = path + "/" + nombre;
      const ref = this.storage.ref(files);
      resolve('este es el enlace');
    });
  }
}
