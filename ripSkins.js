"use strict";
const fs = require('fs');
const path = require('path');
const { dirToMCFolder } = require('./changeMe.json');

function getAllFiles(dirPath, arrayOfFiles, extension="") {
    var files = fs.readdirSync(dirPath)
   
    arrayOfFiles = arrayOfFiles || []
   
    files.forEach(function(file) {
      if (fs.statSync(dirPath + "/" + file).isDirectory()) {
        arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles, extension)
      } else {
        if(!file.endsWith(extension) || !fs.statSync(dirPath + "/" + file).isFile()) return;
        if(file.endsWith(".DS_Store")) return;
        arrayOfFiles.push(dirPath + '/' + file)
      }
    })
    return arrayOfFiles;
};
const skinsDir = dirToMCFolder + "assets/skins";
if(fs.existsSync(skinsDir)) {
    console.log("Getting skins directory.")
    var skinFiles = getAllFiles(skinsDir, []);
    console.log("Creating skin directory.")
    fs.mkdirSync("./skins", {recursive: true});
    for(var dir of skinFiles) {
        var fileName = "./skins/"+path.basename(dir);
        try {
            console.log("Creating file " + fileName+".png");
            console.log("Copying file " + dir);
            fs.copyFileSync(dir, fileName+".png");
        } catch {}
    }
} else return console.log("Skins directory couldn't be found.");