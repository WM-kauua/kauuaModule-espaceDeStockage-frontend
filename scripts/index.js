'use strict'

const fs = require('fs');
const util = require('util');
const copy = util.promisify(fs.copyFile);
const path = require('path');

const add_dossier_icons = [ path.resolve(__dirname,'../assets/icons','add-dossier-32.png'),
			    path.resolve(__dirname,'../assets/icons','add-dossier-48.png'),
			    path.resolve(__dirname,'../assets/icons','add-dossier-64.png'),
			    path.resolve(__dirname,'../assets/icons','add-dossier-128.png'),
			    path.resolve(__dirname,'../assets/icons','add-dossier-256.png'),
			    path.resolve(__dirname,'../assets/icons','add-dossier-512.png') ];
const dossier_icons 	= [ path.resolve(__dirname,'../assets/icons','dossier-32.png'),
			    path.resolve(__dirname,'../assets/icons','dossier-48.png'),
			    path.resolve(__dirname,'../assets/icons','dossier-64.png'),
			    path.resolve(__dirname,'../assets/icons','dossier-128.png'),
			    path.resolve(__dirname,'../assets/icons','dossier-256.png'),
			    path.resolve(__dirname,'../assets/icons','dossier-512.png') ];
const download_icons	= [ path.resolve(__dirname,'../assets/icons','download-32.png'),
			    path.resolve(__dirname,'../assets/icons','download-48.png'),
			    path.resolve(__dirname,'../assets/icons','download-64.png'),
			    path.resolve(__dirname,'../assets/icons','download-128.png'),
			    path.resolve(__dirname,'../assets/icons','download-256.png'),
			    path.resolve(__dirname,'../assets/icons','download-512.png')];
const music_icons	= [ path.resolve(__dirname,'../assets/icons','music-32.png'),
			    path.resolve(__dirname,'../assets/icons','music-48.png'),
			    path.resolve(__dirname,'../assets/icons','music-64.png'),
			    path.resolve(__dirname,'../assets/icons','music-128.png'),
			    path.resolve(__dirname,'../assets/icons','music-256.png'),
			    path.resolve(__dirname,'../assets/icons','music-512.png') ];
const photos_icons 	= [ path.resolve(__dirname,'../assets/icons','photo-32.png'),
			    path.resolve(__dirname,'../assets/icons','photo-48.png'),
			    path.resolve(__dirname,'../assets/icons','photo-64.png'),
			    path.resolve(__dirname,'../assets/icons','photo-128.png'),
			    path.resolve(__dirname,'../assets/icons','photo-256.png'),
			    path.resolve(__dirname,'../assets/icons','photo-512.png')];
const remove_dossier_icons = [ path.resolve(__dirname,'../assets/icons','remove-dossier-32.png'),
			       path.resolve(__dirname,'../assets/icons','remove-dossier-48.png'),
			       path.resolve(__dirname,'../assets/icons','remove-dossier-64.png'),
			       path.resolve(__dirname,'../assets/icons','remove-dossier-128.png'),
			       path.resolve(__dirname,'../assets/icons','remove-dossier-256.png'),
			       path.resolve(__dirname,'../assets/icons','remove-dossier-512.png')];
const remove_file_icons = [ path.resolve(__dirname,'../assets/icons','remove-file-32.png'),
			    path.resolve(__dirname,'../assets/icons','remove-file-48.png'),
			    path.resolve(__dirname,'../assets/icons','remove-file-64.png'),
			    path.resolve(__dirname,'../assets/icons','remove-file-128.png'),
			    path.resolve(__dirname,'../assets/icons','remove-file-256.png'),
			    path.resolve(__dirname,'../assets/icons','remove-file-512.png')];
const upload_icons 	= [ path.resolve(__dirname,'../assets/icons','upload-32.png'),
			    path.resolve(__dirname,'../assets/icons','upload-48.png'),
			    path.resolve(__dirname,'../assets/icons','upload-64.png'),
			    path.resolve(__dirname,'../assets/icons','upload-128.png'),
			    path.resolve(__dirname,'../assets/icons','upload-256.png'),
			    path.resolve(__dirname,'../assets/icons','upload-512.png')];
const video_icons	= [ path.resolve(__dirname,'../assets/icons','video-32.png'),
			    path.resolve(__dirname,'../assets/icons','video-48.png'),
			    path.resolve(__dirname,'../assets/icons','video-64.png'),
			    path.resolve(__dirname,'../assets/icons','video-128.png'),
			    path.resolve(__dirname,'../assets/icons','video-256.png'),
			    path.resolve(__dirname,'../assets/icons','video-512.png')];

const icons = [ add_dossier_icons, dossier_icons, download_icons, music_icons, photos_icons, 
		remove_dossier_icons, remove_file_icons, upload_icons, video_icons ];


module.exports = () => {

  const destination_path = path.resolve(__dirname,'../../../../../assets/icons'));

  icons.forEach( (icon, indice) => {
    icon.forEach( (taille, i) => {
      copy( taille, destination );
    });
  });
  
  return 'ok' ;
}
