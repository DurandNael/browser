'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');
var validUrl = require('valid-url');

import routes from './createApp2.routes';


export class CreateApp2Component {
  /*@ngInject*/
  constructor($scope,$http, Upload,$location, $rootScope) {
   
   
    var vm = this;
    var lesmenus ={};
    vm.app = {};
    vm.app.lespages= []
    vm.app.general = {}
    vm.app.general.config= {}
    $rootScope.lespages = {}
    
    var background ; 


    $scope.load = function(){

  

      

         var object  = {
          appname : $rootScope.appname,
          username :$rootScope.Username 
         }

         console.log(object)

         try{
         
           $http.post('/api/things/testpage', object ).then(function(res){
                console.log(res.data);
                res.data;

                 if (res.data == true)
                  {
                   $http.post('/api/things/getpage', object).then(function(res){
                      console.log(res.data)
                     vm.app.lespages= res.data

                    });
                  }

            });
         }
      
        catch(e){ console.log(e)}
          
       
       

       
   
      }


      $scope.finish = function(){
      $location.path('/main'); 
    }

    

    $scope.ajouterpage = function(){
      if ($scope.pagename != null )
      {
          
        vm.app.lespages.push({
        nom : $scope.pagename, 
        numero : vm.app.lespages.length +1 ,
        lesboutons : []});

        $scope.pagename = null;

        var object = {
          appname : $rootScope.appname,
          username :$rootScope.Username, 
          lespages : vm.app.lespages

         }

         console.log(object)

         
        


            try{
                 $http.post('/api/things/addpage', object ).then(function(res){
                  console.log(res.data)
                   console.log(vm.app.lespages)

                  });
               }
            
              catch(e){ console.log(e)}
          
            
          
         
         }

      else{
        console.log('Pas de nom entré')
      }
     
   
      }

    $scope.modifpage=function(numero){

       $rootScope.lespages = vm.app.lespages;
       console.log("rootScope"+$rootScope.lespages)

       try{
        var object = {
          appname : $rootScope.appname,
          username :$rootScope.Username, 
          numero : numero

         }
                 $http.post('/api/things/createrepopage', object ).then(function(res){
                  console.log(res.data)
                 

                  });
               }
            
              catch(e){ console.log(e)}


       console.log("modification")
            $location.path('/createButton'+numero); 
        


    }
    
    

    $scope.deletepage = function(numero){
      console.log(numero)
      
      var inarray= numero-1; 
      vm.app.lespages.splice( inarray,1);
         vm.app.lespages.forEach(function(element)
         {
          if(element.numero > inarray)
          {
            element.numero--; 
          }
         })

        console.log(vm.app.lespages)

        var object = {
          appname : $rootScope.appname,
          username :$rootScope.Username, 
          lespages : vm.app.lespages

         }


      try{
           $http.post('/api/things/addpage',  object ).then(function(res){
            console.log(res.data)
             console.log(vm.app.lespages)

            });
         }
      
        catch(e){ console.log(e)}
      
    }

   
     

    $scope.testMyurl = function(url) {
          if (validUrl.isUri(url)){
            console.log('Looks like an URI');
        } else {
            console.log('Not a URI');
        }
    }

 
  
   


  }}
  
export default angular.module('createApp2', [uiRouter])
  .config(routes)
  .component('createApp2', {
    template: require('./createApp2.html'),
    controller: CreateApp2Component,
    controllerAs: 'vm'
  })
  .name;

