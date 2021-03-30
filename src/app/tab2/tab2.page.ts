import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FotoService } from '../foto.service';

export interface fileFoto{
  name:string; //filepath
  path:string; //webviewpath
}


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  urlimagtestorage : string[] = [];
  constructor(public fotoservis:FotoService,private afstorage:AngularFireStorage) {}
  async ngOnInit(){
    await this.fotoservis.loadFoto();
  }
  upload(data){
    alert("SUKSES");
    for (var index in this.fotoservis.dataFoto){
      const imgfilepath = `imgStorage/${data.filePath}`
      this.afstorage.upload(imgfilepath, this.fotoservis.dataFoto[index].dataImage).then(() =>{
        this.afstorage.storage.ref().child(imgfilepath).getDownloadURL().then((url)=>{
          this.urlimagtestorage.unshift(url)
        });
      });
    }
  }
  Foto(){
    this.fotoservis.Foto();
  }
}
