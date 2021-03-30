import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FotoService } from '../foto.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  urlimagtestorage : string[] = [];
  namagambar:string[] = [];
  constructor(
    private afstorage: AngularFireStorage,
    private fotoservis : FotoService
  ) {}
  
  async ngOnInit() {
    await this.fotoservis.loadFoto();
    this.tampilkandata();
  }

  tampilkandata(){
    this.urlimagtestorage=[];
    this.namagambar=[];
    var refimage = this.afstorage.storage.ref('imgStorage');
    refimage.listAll()
    .then((res)=>{
      res.items.forEach((itemRef)=>{
        this.namagambar.unshift(itemRef.name);
        itemRef.getDownloadURL().then(url =>{
          this.urlimagtestorage.unshift(url)
        })
      });
    }).catch((error)=>{
      console.log(error);
    });
  }
}
