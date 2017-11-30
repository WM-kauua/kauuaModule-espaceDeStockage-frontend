import { Injectable }			from '@angular/core' ;
import { User }				from '../../models/user' ;
import { EventEmitter }			from '@angular/core' ;
import { StorageService }		from '../../storage.service' ;
import { Http, Headers, Response }	from '@angular/http' ;
import { Fichier } 			from './models/fichier' ;
import { Repertoire }			from './models/repertoire' ;
import { saveAs }			from 'file-saver/FileSaver' ;
import { ResponseContentType }		from '@angular/http' ;
import { HttpClient }			from '@angular/common/http' ;
import { HttpHeaders } 			from '@angular/common/http' ;
import { HttpParams }			from '@angular/common/http' ;
import { HttpEventType }		from '@angular/common/http' ;
import { Telechargement }		from './models/telechargement' ;

@Injectable()
export class EspaceDeStockageService {

  public listeDeRepertoires: Repertoire[] = [] ;
  public listeDeFichiers: Fichier[] = [] ;
  public listeDeRepertoiresObs : EventEmitter<Repertoire[]>  = new EventEmitter<Repertoire[]>();
  public listeDeFichiersObs : EventEmitter<Fichier[]> = new EventEmitter<Fichier[]>();
  public downloadProgress: EventEmitter<number> = new EventEmitter<number>();
  public downloadStart: EventEmitter<boolean> = new EventEmitter<boolean>();
  public uploadProgress: EventEmitter<number> = new EventEmitter<number>();
  private currentDirectory: string;

  private downloadsList: Telechargement[] = [] ;
  private uploadsList: Telechargement[] = [] ;
  private identifiantTelechargement: number ;
  private telechargements = {} ;
  private upchargements = {} ;
  public downloadsProgressTransmitter: EventEmitter<any> = new EventEmitter<any>() ;
  public uploadsProgressTransmitter: EventEmitter<any> = new EventEmitter<any>() ;

  constructor( private http: Http, 
    private storageService: StorageService, private httpClient: HttpClient ) { 
      this.currentDirectory = '.'; 
      this.identifiantTelechargement = 0 ; 
    }

  enterDirectory( value: string ): void {
    let token = this.storageService.retrieveToken() ;
    let header = new Headers({ "Authorization": "bearer "+token , "Content-type": "application/json" });
    
    //this.listeDeFichiers.splice(0);
    //this.listeDeRepertoires.splice(0);
    //this.currentDirectory += '/'+value;

    console.log("dirname : "+this.currentDirectory+'/'+value);
    this.http.put('/api/kmodule/espaceDeStockage/directory/',
     { "dirname": this.currentDirectory+'/'+value },
     { headers: header }).subscribe( response => {
      if( response.status === 200 ) {
        this.listeDeFichiers.splice(0);
        this.listeDeRepertoires.splice(0);
        this.currentDirectory += '/'+value;

        let lefichier, lerepertoire ;
        response.json().files.forEach( fichier => {
          lefichier = new Fichier() ;
          lefichier.nom = fichier.name ;
          //lefichier.path = value+'/'+fichier.name ;
          lefichier.path = this.currentDirectory+'/'+fichier.name ;
          lefichier.type = fichier.type ;
          this.listeDeFichiers.push(lefichier);
        });
        response.json().directories.forEach( repertoire => {
          lerepertoire = new Repertoire() ;
          lerepertoire.nom = repertoire ;
          lerepertoire.path = this.currentDirectory+'/'+repertoire ;
          this.listeDeRepertoires.push(lerepertoire);
        });
        // signale la fin du traitement , mise a disposition :
        this.listeDeFichiersObs.emit(this.listeDeFichiers);
        this.listeDeRepertoiresObs.emit(this.listeDeRepertoires);
      }else{
        //errror :
        console.log('enter directory error');
      }
    }) ;
  }

  uploadFile( form: any, filename: string): void{
    
    let token = this.storageService.retrieveToken() ;
    let header = new HttpHeaders({ "Authorization": "bearer "+token  });
    header.delete("Content-Type");
    let params = new HttpParams().set("destinationpath",this.currentDirectory);
    let progressValue ;
    console.log('dir : '+this.currentDirectory);
    form.append("destinationpath",this.currentDirectory);
    this.httpClient.request( 'POST', '/api/kmodule/espaceDeStockage/file?destinationpath='+this.currentDirectory ,
      { headers: header, params: params, body: form, responseType: 'json' , observe: 'events', reportProgress: true }).subscribe( ( event: any) => {
      /*const blob = new Blob([response]);*/
      if(event.type == HttpEventType.UploadProgress){
        console.log('sent from espace de stocakge service');
        progressValue = (event.loaded/event.total)*100 ;
        console.log('in progress type'+progressValue);
        this.uploadProgress.emit((event.loaded/event.total)*100);
        this.upchargements[filename]=((event.loaded/event.total)*100);
        this.uploadsProgressTransmitter.emit({ "filename":filename,"progress":progressValue });
      }
      if(event.type == HttpEventType.Sent){
        // download starts :
        // ajoute à l'object telechargement une nouvelle entrée :
        console.log('upload started');
       // this.telechargements[filename]=0;
       // this.downloadsProgressTransmitter.emit({"filename":filename,"progress":0});
        //this.downloadStart.emit(true);
      }
      /*saveAs(blob,filename);*/
      //console.log(event);
      if(event.type == HttpEventType.Response){
        //this.telechargements[filename]=100;
        //this.downloadsProgressTransmitter.emit({"filename":filename,"progress":100});
        //console.log(this.telechargements[filename]);
        //const blob = new Blob([event.body]);
        //saveAs(blob,filename);
        console.log('upload finished');
        this.listeDeFichiers.splice(0);
        this.listeDeRepertoires.splice(0);
        let lefichier, lerepertoire ;
        console.log(event.body) ;
        event.body.files.forEach( fichier => {
          console.log(fichier);
          lefichier = new Fichier() ;
          lefichier.nom = fichier.name ;
          lefichier.path = this.currentDirectory+'/'+fichier.name ;
          lefichier.type = fichier.type ;
          this.listeDeFichiers.push(lefichier);
        });
        event.body.directories.forEach( repertoire => {
          lerepertoire = new Repertoire() ;
          lerepertoire.nom = repertoire ;
          lerepertoire.path = this.currentDirectory+'/'+repertoire ;
          this.listeDeRepertoires.push(lerepertoire);
        });
        
        this.listeDeFichiersObs.emit(this.listeDeFichiers);
        this.listeDeRepertoiresObs.emit(this.listeDeRepertoires);
      }
    });
  }

  downloadFileAgain( value: string, filename: string){
    let token = this.storageService.retrieveToken() ;
    
  }

  anotherDownloadFile( value: string, filename: string){
    let token = this.storageService.retrieveToken() ;
    let header = new HttpHeaders({ "Authorization": "bearer "+token , "Content-type": "application/json" });
    let params = new HttpParams().set("fichier",value);
    let progressValue ;

    this.httpClient.request( 'GET', '/api/kmodule/espaceDeStockage/file?fichier='+value ,
      { headers: header, responseType: 'blob' , observe: 'events', reportProgress: true }).subscribe( event => {
      /*const blob = new Blob([response]);*/
      if(event.type == HttpEventType.DownloadProgress){
        console.log('sent from espace de stocakge service');
        progressValue = (event.loaded/event.total)*100 ;
        this.downloadProgress.emit((event.loaded/event.total)*100);
        this.telechargements[filename]=((event.loaded/event.total)*100);
        this.downloadsProgressTransmitter.emit({ "filename":filename,"progress":progressValue });
      }
      if(event.type == HttpEventType.Sent){
        // download starts :
        // ajoute à l'object telechargement une nouvelle entrée :
        
        this.telechargements[filename]=0;
        this.downloadsProgressTransmitter.emit({"filename":filename,"progress":0});
        //this.downloadStart.emit(true);
      }
      /*saveAs(blob,filename);*/
      //console.log(event);
      if(event.type == HttpEventType.Response){
        this.telechargements[filename]=100;
        this.downloadsProgressTransmitter.emit({"filename":filename,"progress":100});
        console.log(this.telechargements[filename]);
        const blob = new Blob([event.body]);
        saveAs(blob,filename);
      }
    });
  }

  downloadFile( value: string , filename: string): void{
    let token = this.storageService.retrieveToken() ;
    let header = new Headers({ "Authorization": "bearer "+token , "Content-type": "application/json" });
    console.log(value);
    this.http.put('/api/kmodule/espaceDeStockage/file',
      { "filename": value },
      { headers: header , responseType: ResponseContentType.Blob }).subscribe( (response) => {
    
      console.log(response.status);
      //const contentDispositionHeader: string = response.headers.get('Content-Disposition');
      //const parts: string[] = contentDispositionHeader.split(';');
      response.headers.keys().forEach( clef => {
        console.log('clef : '+clef+', '+response.headers.get(clef));
      });
      //const blob = new Blob([response._body],{ type: response.headers.get('Content-type')} );
      //const blob = new Blob([response._body]);
      //console.log(response._body);
      //console.log('$$$'+blob);
      //const file = new File([response.blob()], filename, { type: response.headers.get('Content-type') } );
      const blob = new Blob([response.blob()]);
      saveAs(blob,filename);
    });
  }

  createDirectory( value: string){
    let token = this.storageService.retrieveToken() ;
    let header = new HttpHeaders({ "Authorization": "bearer "+token });
    
    this.httpClient.request( 'POST' ,
      '/api/kmodule/espaceDeStockage/directory',
      { body: { dirname : this.currentDirectory+'/'+value },
        headers : header ,
        responseType: 'json'
      }).subscribe( (response: any) => {
        this.listeDeFichiers.splice(0);
        this.listeDeRepertoires.splice(0);

        let lefichier, lerepertoire ;
        response.files.forEach( fichier => {
          lefichier = new Fichier() ;
          lefichier.nom = fichier.name ;
          //lefichier.path = value+'/'+fichier.name ;
          lefichier.path = this.currentDirectory+'/'+fichier.name ;
          lefichier.type = fichier.type ;
          this.listeDeFichiers.push(lefichier);
        });
        response.directories.forEach( repertoire => {
          lerepertoire = new Repertoire() ;
          lerepertoire.nom = repertoire ;
          lerepertoire.path = this.currentDirectory+'/'+repertoire ;
          this.listeDeRepertoires.push(lerepertoire);
        });
        // signale la fin du traitement , mise a disposition :
        this.listeDeFichiersObs.emit(this.listeDeFichiers);
        this.listeDeRepertoiresObs.emit(this.listeDeRepertoires);
        
    });
  }

}
