'use strict'

const fs = require('fs');
const util = require('util');
const copy = util.promisify(fs.copyFile);
const path = require('path');

const add_dossier_icons = [ path.resolve(__dirname) ];

module.exports = () => {
  console.log(add_dossier_icons[0]);
}
