import { Component, Inject, OnInit, OnDestroy }	from '@angular/core' ;
import { MatDialogRef, MAT_DIALOG_DATA }	from '@angular/material' ;
import { EspaceDeStockageService }		from './espace-de-stockage.service' ;
import { Subscription }				from 'rxjs/Subscription' ;

@Component({
  templateUrl: './espace-de-stockage-progress-dialog.component.html'
})
export class EspaceDeStockageProgressDialogComponent implements OnInit, OnDestroy{

  private fileName: string ;
  private progressPercent: number;
  private progressSubscription: Subscription ;

  constructor( private dialogRef: MatDialogRef<EspaceDeStockageProgressDialogComponent>,
               @Inject(MAT_DIALOG_DATA) private data: any,
               private espaceDeStockageService: EspaceDeStockageService) {}

  ngOnInit(): void{
    this.fileName = this.data.filename ;
    this.progressSubscription = this.espaceDeStockageService.downloadProgress.subscribe( value => {
      console.log(value);
      this.progressPercent = value;
      
    });
  }

  ngOnDestroy(): void{
    this.progressSubscription.unsubscribe();
  }

}
