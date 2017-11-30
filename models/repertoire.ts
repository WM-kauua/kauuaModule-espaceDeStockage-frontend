export class Repertoire {

  private _nom: string ;
  private _path: string ;

  get nom(): string {
    return this._nom ;
  }

  set nom( value: string ) {
    this._nom = value;
  }

  get path(): string {
    return this._path;
  }

  set path( value: string) {
    this._path = value;
  }

  constructor() {}

}
