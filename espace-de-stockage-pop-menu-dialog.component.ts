import { Component, Inject, OnInit, OnDestroy }		from '@angular/core' ;
import { MatDialogRef, MAT_DIALOG_DATA }		from '@angular/material' ;
import { EspaceDeStockageService }			from './espace-de-stockage.service' ;
import { Subscription }					from 'rxjs/Subscription' ;
import { FormControl, Validators }			from '@angular/forms' ;

@Component({
  templateUrl: './espace-de-stockage-pop-menu-dialog.component.html'
})
export class EspaceDeStockagePopMenuDialogComponent implements OnInit, OnDestroy {

  private type: string ;
  private iconSize: number ;
  private dirname: string ;
  private filepath: string ;
  private createDirPredicat: boolean ;
  private readyToSent: boolean ;
  private uploadFilePredicat: boolean ;
  private filenameToUpload: string ; 
  private dirnameToCreate: string ;
  private dirnameToCreateControl: FormControl ;
  private alphaNumReg = /^[a-zA-Z0-9]+$/ ;

  constructor( private dialogRef: MatDialogRef<EspaceDeStockagePopMenuDialogComponent>,
               @Inject(MAT_DIALOG_DATA) private data: any,
               private espaceDeStockageService: EspaceDeStockageService) {} 

  ngOnInit(): void {
    this.type = this.data.type;
    this.iconSize = this.data.iconSize ;
    if(this.type === "popdir"){
      this.dirname = this.data.dirname ;
    }else if( this.type === "popfile" ){
      this.filepath = this.data.filepath ;
    }
    this.createDirPredicat = false ;
    this.uploadFilePredicat = false ;
    this.readyToSent = false ;
    this.dirnameToCreateControl = new FormControl('', 
      [ Validators.required, Validators.pattern(this.alphaNumReg) ]);
  }

  ngOnDestroy(): void {

  }

  createDir(): void{
    this.createDirPredicat = true ;
    this.uploadFilePredicat = false ;
  }

  _createDir(): void{
    console.log(this.dirnameToCreate);
    this.espaceDeStockageService.createDirectory(this.dirnameToCreate);
  }

  uploadFile(): void{
    this.createDirPredicat = false ;
    this.uploadFilePredicat = true ;
  }

  fileChangeEvent(event: any): void {
    this.filenameToUpload = event.target.value;
    console.log(this.filenameToUpload);
    this.readyToSent = true ;
  }

  _uploadFile(): void{
    this.readyToSent = false ; 
    let form = new FormData();
    form.append("fichier",(<HTMLInputElement> document.getElementById('fichierAEnvoyer')).files[0],
      (<HTMLInputElement> document.getElementById('fichierAEnvoyer')).files[0].name);
    this.espaceDeStockageService.uploadFile(form,(<HTMLInputElement> document.getElementById('fichierAEnvoyer')).files[0].name);   
  }

}
