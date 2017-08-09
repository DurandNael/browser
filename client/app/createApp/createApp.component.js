'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');
var validUrl = require('valid-url');

import routes from './createApp.routes';


export class CreateAppComponent {
  /*@ngInject*/
  constructor(Auth , Application, $scope,$http, Upload, $location, $stateParams, $rootScope) {
    var vm = this;
    vm.Application = Application; 
    var lesmenus ={};
    vm.app = {};
    vm.app.general = {}
    vm.app.general.config= {}

    var fileback = null; 
    
    $rootScope.Username; // a changer
    var exist = false; 

    if ( $rootScope.Username == undefined)
    {
         $rootScope.Username =  Auth.getCurrentUserSync().name;
    }

   
    $scope.load = function(){
      console.log($rootScope.appname)
        
      if ( $rootScope.appname !== null && $rootScope.appname !== undefined )
      {
         try{
          var object = {

        username : $rootScope.Username, 
        appname : $rootScope.appname
       }
       console.log(object)
      
     
           $http.post('/api/things/getconfig', object ).then(function(res){
            console.log(res.data)
            vm.app.general.config= res.data
            if (res.data != null)
            {
              exist = true;
            }

            });
         }
      
        catch(e){ console.log(e)}

        console.log(vm.app.general.config)
   
      }
       console.log(vm.app.general.config.hasOwnProperty())
     // a modifier test if vm.app.general.config is empty , pass it default value
      if (vm.app.general.config.hasOwnProperty()== false)
      {
        vm.app.general.config['menu']=false;
        vm.app.general.config['background']= "default",
        vm.app.general.config['url']="http://bfast-system.com";
        vm.app.general.config['navigation']= false;
        vm.app.general.config['home']= false;
        vm.app.general.config['print']= false;
        vm.app.general.config['refresh']= false;
        vm.app.general.config['keyboard']= false;
        vm.app.general.config['barcolor']= "#808080";
        vm.app.general.config['loadcolor']= "#808080";
        vm.app.general.config['colornav']= "#808080";
        vm.app.general.config['colorhome']= "#808080";
        vm.app.general.config['colorprint']= "#808080";
        vm.app.general.config['colorrefresh']= "#808080";
        vm.app.general.config['colorkeyboard']= "#808080";
      }

      }


  
    

    
    $scope.testMyurl = function(url) {
          if (validUrl.isUri(url)){
            console.log('Looks like an URI');
        } else {
            console.log('Not a URI');
        }
    }

    $scope.envoi = function(){
      
      if (vm.app.general.config['menu']== true){
        vm.app.general.config['url']=null
        vm.app.general.config['background']= "bg.jpg"
      }
      else{
        vm.app.general.config['background']= "default"
      }
     
          console.log(vm.app.general.config['name'])
        if ( vm.app.general.config['name'] != null )
        {

          $rootScope.appname = vm.app.general.config['name'];
          $scope.testappexist($rootScope.appname,$rootScope.Username)
          if ( exist == false )
          {
            var info = {
            Username :  $rootScope.Username , 
            Appname : vm.app.general.config['name']
          }

          try{
              $http.post('/api/Applications/', info).then(function(res){
              console.log(res.data)

              });
          }catch(e){ console.log(e)}
          }

          var validurl = true

          if (vm.app.general.config['menu']== false )
          {

            if($scope.testMyurl(vm.app.general.config['url'])== true && vm.app.general.config['url'] != "http://bfast-system.com")
            {
                validurl = true;
            }
            else
            {
              validurl = false;
            }
          }
          console.log(validurl)
           if(validurl === true){
               var object = {
                user :  $rootScope.Username,
                app : vm.app.general.config['name'],
                lesvaleurs : vm.app.general.config
             }
             try{
              $http.post('/api/things/save', object ).then(function(res){
              console.log(res.data)

              });
               }catch(e){ console.log(e)}
               console.log(fileback)
            if (fileback != null) {
              $scope.upload(fileback);
            }
          console.log("Application Save")
          exist = true;

          if (vm.app.general.config['menu']== true){
              $location.path('/createPage');
         }
         else{
           $location.path('/applications');
         }

          window.alert("Application sauvegardé ! ")

        }
        else{

            window.alert("Changé url ") 

        }

     }
          else{
            window.alert("Manque le nom ! ") 
          }

        
      }

      $scope.testappexist = function(appname,username){

        var object = {
          username: username,
          appname : appname
        }

         $http.post('/api/Applications/getappli', object ).then(function(res){
              console.log(res.data)
      }
     }
      $scope.stockfile= function(file)
      {
        fileback = file; 
      }

      $scope.upload = function(file){
      console.log(file)
      if ( vm.app.general.config['name'] != null )
        {
      var object = {
        appname : $rootScope.appname,
        username : $rootScope.Username}

        try{
         
         Upload.upload({
              url: '/api/things/uploadScreen',
              data: {file: file, object:object}
          }) 
         }
      
        catch(e){ console.log(e)}
      }
      else{
        window.alert("Veuillez entrer un nom d'abord")
      }



    }

       $scope.testMyurl = function(url) {
          if (validUrl.isUri(url)){
            return true
        } else {
            return false
        }
    }


      
      

    }

   

   
 
  }
  
export default angular.module('createApp', [uiRouter])
  .config(routes)
  .component('createApp', {
    template: require('./createApp.html'),
    controller: CreateAppComponent,
    controllerAs: 'vm'
  })
  .name;

