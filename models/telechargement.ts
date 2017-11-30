import { EventEmitter }		from '@angular/core' ;

export class Telechargement {

  private _nom: string ;
  private _progress: number ;

  get nom(): string {
    return this._nom ;
  }

  set nom( value: string ) {
    this._nom = value ;
  }

  get progress(): number {
    return this._progress ;
  }

  set progress( value: number ) {
    this._progress = value ;
  }

}
