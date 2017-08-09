/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/things              ->  index
 * POST    /api/things              ->  create
 * GET     /api/things/:id          ->  show
 * PUT     /api/things/:id          ->  upsert
 * PATCH   /api/things/:id          ->  patch
 * DELETE  /api/things/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import JSZip from 'jszip';
import zipFolder from 'zip-folder';
import fs from 'fs-extra';
import download from 'download-file';
import path from 'path';
import {Thing} from '../../sqldb';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      // eslint-disable-next-line prefer-reflect
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.destroy()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Things
export function index(req, res) {
  return Thing.findAll()
   
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function save(req,res) {
  var user = req.body.user 
  var app = req.body.app
  var config = req.body.lesvaleurs

  var dir = './public/applications/'+user+'/'+app;

  if (!fs.existsSync(dir)){
        console.log("dossier n'existe pas ")
          fs.mkdirSync(dir);
        console.log("dossier créé ")
  }
      else
  {
         console.log("dossier existe")
  }
  console.log('envoie des données')
  fs.copy(  path.normalize('./server/source/Debug'),path.normalize('./public/applications/'+user+'/'+app),  function (err) {
  if (err){
    return console.log(err) 
  }
  else {
    console.log('Fichiers source copiés')
  }            
  });
 

   fs.writeFile( path.normalize('./public/applications/'+user+'/'+app+'/')+"config.json", JSON.stringify(config));
   console.log('config envoyé')

  }

  export function addbuton(req,res) {

  console.log(req.body)
  var listtbns = req.body.bouton; 
  console.log(listtbns)
  var id = req.body.numero; 
  console.log(id)
  var json = [];
  json= JSON.parse(fs.readFileSync( path.normalize('./public/applications/'+req.body.username+'/'+req.body.appname+'/')+"buttons.json", 'utf8'));
  console.log(json[0])
  json.forEach(function(element){
    if(element.numero == id ){
      element.lesboutons=listtbns;
    }
  })

   fs.writeFile( path.normalize('./public/applications/'+req.body.username+'/'+req.body.appname+'/')+"buttons.json", JSON.stringify(json));
   console.log("changement des boutons")



}
export function testpage(req,res) {
   var path='./public/applications/'+req.body.username+'/'+req.body.appname+'/buttons.json';
   var test = false; 
   console.log(path)
    if (fs.existsSync(path)) {
      console.log("existe")
     test = true
    }
    else{
      console.log("existe pas")
     test = false

    }

    res.json(test) 
 
}

 export function getpage(req,res) {

    var json = [{}];
    json= JSON.parse(fs.readFileSync( path.normalize('./public/applications/'+req.body.username+'/'+req.body.appname+'/')+"buttons.json", 'utf8'));
    res.json(json);
 
}

 export function getconfig(req,res) {
  
   console.log(req.body.username + req.body.appname )

    var json = [{}];
    json= JSON.parse(fs.readFileSync( path.normalize('./public/applications/'+req.body.username+'/'+req.body.appname+'/')+"config.json", 'utf8'));
    res.json(json);
}

export function deleteapp(req,res) {
    
    var nomapp = req.body.appname; 
    var user = req.body.username; 
   
    fs.remove( path.normalize('./public/applications/'+user+'/'+nomapp));
    console.log("Application supprimé ")

    
}
export function copyapp(req,res) {
    
    var nomapp = req.body.appname; 
    var user = req.body.username; 
  
    fs.copy(path.normalize('./public/applications/'+user+'/'+nomapp+'/'),path.normalize('./public/old/'+user+nomapp),  function (err) {
  if (err){
    return console.log(err) 
  }
  else {
    console.log('Fichiers copiéss')
  }            
  });


    
}

export function getbtns(req,res) {
    var id = req.body.id; 
    
    var json = [];
    var btns = []; 

    json= JSON.parse(fs.readFileSync( path.normalize('./public/applications/'+req.body.username+'/'+req.body.appname+'/')+"buttons.json", 'utf8'));
    json.forEach(function(element)
    {
      if( element.numero == id)
      {
        btns= element.lesboutons; 
      }
    })

    res.json(btns);
 
}

export function addpage(req,res) {

  console.log(req.body)

   fs.writeFile( path.normalize('./public/applications/'+req.body.username+'/'+req.body.appname+'/')+"buttons.json", JSON.stringify(req.body.lespages));
   console.log("ajout de "+req.body.lespages )

  

  }

export function createrepopage(req,res) {

  var json = [{}]
  json= JSON.parse(fs.readFileSync( path.normalize('./public/applications/'+req.body.username+'/'+req.body.appname+'/')+"buttons.json", 'utf8'));
 
 console.log(json)
  json.forEach(function(element){

    var dir = './public/applications/'+req.body.username+'/'+req.body.appname+'/'+element.numero;
       console.log(dir)
  if (!fs.existsSync(dir)){
        console.log("dossier n'existe pas ")
          fs.mkdirSync(dir);
        console.log("dossier créé ")
  }
      else
  {
         console.log("dossier existe")
  }
    
  })

  

  }


  export function createrepo(req,res) {
    var user = req.body.user
      var dir = './public/applications/'+user;

      if (!fs.existsSync(dir)){
        console.log("dossier n'existe pas ")
          fs.mkdirSync(dir);
        console.log("dossier créé ")
      }
      else
      {
         console.log("dossier existe")
      }

  }

   

  
  export function dl(req,res) {
  
   
    console.log(req.body)

    zipFolder('./public/applications/'+req.body.username+'/'+req.body.appname, './public/applications/'+req.body.username+'/'+req.body.appname+'/'+req.body.appname+'.zip', function(err) {
    if(err) {
        console.log('Probleme', err);
    } else {
        console.log("it's work");
        res.end('cool')
    }});

   

  }

  export function uploadScreen(req,res) {
  
   var file = req.files.file;
   var appPath =__dirname + '/../../../public/applications/'+req.body.object.username+'/'+req.body.object.appname;
   
   fs.move(file.path , appPath + '/bg.jpg', {overwrite: true}, err => {
    if(err) return console.error(err)
      console.log('success')
   });
   res.status(200).end();

   

  }

  export function uploadScreenWithIndex(req,res) {
  
  console.log(req.body)
   var file = req.files.file;
   var appPath =__dirname + '/../../../public/applications/'+req.body.object.username+'/'+req.body.object.appname+'/'+req.body.object.page;
   
   fs.move(file.path , appPath + '/'+ req.body.object.index + '_bg.jpg',{overwrite: true}, err => {
    if(err) return console.error(err)
      console.log(appPath)
      console.log('success')
   });
   res.status(200).end();
  }

// Gets a single Thing from the DB
export function show(req, res) {
  return Thing.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Thing in the DB
export function create(req, res) {
  return Thing.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Thing in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }

  return Thing.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Thing in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Thing.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Thing from the DB
export function destroy(req, res) {
  return Thing.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
