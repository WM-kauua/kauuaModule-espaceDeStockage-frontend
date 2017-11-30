import { MimeType }	from './mime';

export class Fichier {

  private _nom: string ;
  private _path: string ;
  private _type: MimeType ;

  get nom(): string{
    return this._nom;
  }
  
  set nom( value: string ){
    this._nom = value;
  }

  get path(): string{
    return this._path;
  }

  set path( value: string) {
    this._path = value;
  }

  get type(): string {
    let ret ; 
    switch( this._type ){
      case MimeType.audio :
        ret = 'audio/aac';
        break ;
      case MimeType.video :
        ret = 'video/mpeg';
        break ;
      case MimeType.image :
        ret = 'image/jpeg' ;
        break ;
      case MimeType.archive :
        ret = 'application/zip';
        break ;
      default :
        ret = 'other' ;
        break ;
    }
    return ret ;
  }

  getMimeType(): MimeType {
    return this._type ;
  }

  set type( value: string) {
    switch( value ){
      case 'audio/aac' :
      case 'audio/midi' :
      case 'audio/ogg' :
      case 'audio/mpeg' :
      case 'audio/x-wav' :
      case 'audio/webm' :
      case 'audio/3gpp' :
      case 'audio/3gpp2' :
        this._type = MimeType.audio ;
        break ;
      case 'video/x-msvideo' :
      case 'video/mpeg' :
      case 'video/ogg' :
      case 'video/webm' :
      case 'video/3gpp' :
      case 'video/3gpp2' :
        this._type = MimeType.video ;
        break ;
      case 'image/gif' :
      case 'image/x-icon' :
      case 'image/jpeg' :
      case 'image/svg+xml' :
      case 'image.tiff' :
      case 'image/webp' :
      case 'image/png' :
      case 'image/bmp' :
        this._type = MimeType.image ;
        break ;
      case 'application/x-bzip' :
      case 'application/x-bzip2' :
      case 'application/java-archive' :
      case 'application/x-rar-compressed' :
      case 'application/x-tar' :
      case 'application/zip' :
      case 'application/x-7z-compressed' :
        this._type = MimeType.archive ;
        break ;
      default :
        this._type = MimeType.unknown;
        break ;
    }
  }

  constructor() {}

}
