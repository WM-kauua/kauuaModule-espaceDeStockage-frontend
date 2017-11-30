import { Component }					from '@angular/core' ;
import { EspaceDeStockageService }			from './espace-de-stockage.service' ;
import { OnInit, OnDestroy }				from '@angular/core' ;
import { Repertoire }					from './models/repertoire' ;
import { Fichier }					from './models/fichier' ;
import { Subscription }					from 'rxjs/Subscription' ;
import { BreakpointObserver, Breakpoints } 		from '@angular/cdk/layout' ;
import { EspaceDeStockageProgressDialogComponent }	from './espace-de-stockage-progress-dialog.component' ;
import { EspaceDeStockagePopMenuDialogComponent }	from './espace-de-stockage-pop-menu-dialog.component' ;
import { MatDialog }					from '@angular/material' ;

@Component({
  templateUrl: './espace-de-stockage-main-surface.component.html', 
  styleUrls: ['./espace-de-stockage-main-surface.component.css']
})
export class EspaceDeStockageMainSurfaceComponent implements OnInit,OnDestroy {

  private fichiers: Fichier[] = [] ;
  private repertoires: Repertoire[] = [] ;
  private _fichiersSubscription: Subscription ;
  private _repertoiresSubscription: Subscription ;
  private _breakpointSubscription_max320: Subscription ;
  private _breakpointSubscription_max640: Subscription ;
  private _launchDownloadDialogSubscription: Subscription ;
  private colnum: number = 5 ;
  private currentPath: string ;
  private iconSize = 2 ;

  constructor( private espaceDeStockageService : EspaceDeStockageService, 
               private breakpointObserver: BreakpointObserver,
               private espaceDeStockageProgressDialog: MatDialog,
               private espaceDeStockagePopMenuDialog: MatDialog ) {}

  ngOnInit(): void{
    this.fichiers.splice(0) ;
    this.repertoires.splice(0);
    this.currentPath = '.' ;
    
    this._fichiersSubscription = this.espaceDeStockageService.listeDeFichiersObs.subscribe( _listedefichiers => {
      this.fichiers = _listedefichiers ;
    });
    this._repertoiresSubscription = this.espaceDeStockageService.listeDeRepertoiresObs.subscribe( _listederepertoires => {
      this.repertoires = _listederepertoires ;
      let rep = new Repertoire() ;
      rep.nom = '..' ;
      rep.path = '..';
      this.repertoires.unshift(rep);
    });

    this.espaceDeStockageService.enterDirectory(this.currentPath);

    this._breakpointSubscription_max320 = this.breakpointObserver.observe( Breakpoints.HandsetPortrait ).subscribe( match => {
      if(match){
        this.colnum = 3 ;
        this.iconSize = 1 ;
      }
    });

    this._breakpointSubscription_max640 = this.breakpointObserver.observe( Breakpoints.HandsetLandscape ).subscribe( match => {
      if( match ){
        this.colnum = 4 ;
        this.iconSize = 1 ;
      } 
    });

  }

  ngOnDestroy(): void{
    this._fichiersSubscription.unsubscribe() ;
    this._repertoiresSubscription.unsubscribe() ;
    this._breakpointSubscription_max320.unsubscribe();
    this._breakpointSubscription_max640.unsubscribe();
  }
  
  popMenuDir(value: string): void{
    console.log('pop menu dir');
    this.espaceDeStockagePopMenuDialog.open( EspaceDeStockagePopMenuDialogComponent,
      { data: { type: "popDir", iconSize: this.iconSize , dirname: value }});
  }

  popMenuFile(path: string): void{
    console.log('pop menu file');
    this.espaceDeStockagePopMenuDialog.open( EspaceDeStockagePopMenuDialogComponent,
      { data: { type: "popFile", iconSize: this.iconSize , filepath: path }});
  }

  changeDir(value: string): void{
    console.log(' change to : '+value);
    this.currentPath = value ;
    this.espaceDeStockageService.enterDirectory(value);
  }

  downloadFile( value: string, nom: string): void{
    //this.espaceDeStockageService.downloadFile(value, nom);
    this.espaceDeStockageProgressDialog.open(EspaceDeStockageProgressDialogComponent,
      { data: { filename: nom } });
    this.espaceDeStockageService.anotherDownloadFile(value,nom);
    
  }  

  popMenuFab(): void{
    console.log('pop fab menu');
    this.espaceDeStockagePopMenuDialog.open( EspaceDeStockagePopMenuDialogComponent,
      { data: { type: "popFab", iconSize: this.iconSize }});
  }

}
