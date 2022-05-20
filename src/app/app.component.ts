import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  dataSource: any;
  id: any;
  name: any;
  personalInfo: any;
  editObj: any;

  @ViewChild('btnShow')
  btnShow!: ElementRef;

  @ViewChild('btnClose')
  btnClose!: ElementRef;

  constructor(private store: AngularFirestore) {}

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.store
      .collection('userInfo')
      .snapshotChanges()
      .subscribe((response) => {
        console.log('response ', response);
        this.dataSource = response.map((item) =>
          Object.assign({ id: item.payload.doc.id }, item.payload.doc.data())
        );
      });
  }

  add() {
    this.store
      .collection('userInfo')
      .add({ name: this.name, personalInfo: this.personalInfo });
    this.closeDialog();
  }

  edit(id: string) {
    this.store
      .collection('userInfo')
      .doc(id)
      .get()
      .subscribe((response) => {
        this.editObj = Object.assign({ id: response.id }, response.data());
        this.name = this.editObj.name;
        this.personalInfo = this.editObj.personalInfo;
        this.openDialog();
      });
  }

  openDialog() {
    this.btnShow.nativeElement.click();
  }

  closeDialog() {
    this.btnClose.nativeElement.click();
  }

  clearEdit(){
    this.editObj = null;
    this.name = "";
    this.personalInfo = "";
  }

  deleteItem(id : string){
    this.store.collection('userInfo').doc(id).delete();
  }
}
