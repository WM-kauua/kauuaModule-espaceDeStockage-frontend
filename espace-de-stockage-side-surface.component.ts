import { Component, OnInit, OnDestroy }			from '@angular/core' ;
import { Telechargement }				from './models/telechargement' ;
import { EspaceDeStockageService }			from './espace-de-stockage.service' ;
import { Subscription }					from 'rxjs/Subscription' ;

@Component({
  templateUrl: './espace-de-stockage-side-surface.component.html', 
  styleUrls: ['./espace-de-stockage-side-surface.component.css']
})
export class EspaceDeStockageSideSurfaceComponent implements OnInit, OnDestroy {

  private downloads: Telechargement[] = [] ;
  private uploads: Telechargement[] = [] ;
  private progressSubscription: Subscription ;
  private upProgressSubscription: Subscription ;
  private listeTelechargement: Map<string,number> = new Map<string,number>();
  private autreListeTelechargement: Object = {} ;
  private upListeChargement: Object = {} ;

  constructor( private espaceDeStockageService: EspaceDeStockageService) {} 

  ngOnInit(): void {
    this.downloads.splice(0) ;
    this.uploads.splice(0) ;
    this.progressSubscription = this.espaceDeStockageService.downloadsProgressTransmitter.subscribe( progressObject => {
      //this.listeTelechargement.set(progressObject.filename,progressObject.progress);
      console.log(progressObject.filename+','+progressObject.progress);
      this.autreListeTelechargement[progressObject.filename] = progressObject.progress ;
    });

    this.upProgressSubscription = this.espaceDeStockageService.uploadsProgressTransmitter.subscribe( progressObject => {
      console.log(progressObject.filename+', '+progressObject.progress);
      this.upListeChargement[progressObject.filename] = progressObject.progress ;
    });
    
  }

  ngOnDestroy(): void{
    this.progressSubscription.unsubscribe() ;
    this.upProgressSubscription.unsubscribe() ;
  }

  lesClefs(): string[] {
    return Object.keys(this.autreListeTelechargement);
  }

  upKeys(): string[] {
    return Object.keys(this.upListeChargement);
  }
  
}
