'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './createButton.routes';

export class CreateButtonComponent {
  /*@ngInject*/
  constructor($scope,$http, Upload, $stateParams, $location, $rootScope) {
    var vm = this;
    
    
    $scope.lesbtns = []
    $scope.lespages =[]
    $scope.numero = $stateParams.id;
    $scope.username = $rootScope.Username;
    $scope.appname= $rootScope.appname;
    $scope.load = function(){

      $scope.loadpages();
      $scope.loadbtns();

      console.log('/public/applications/'+$scope.username+'/'+$scope.appname+'/'+$scope.numero+'/1_bg.jpg');

       
  
      }

      $scope.loadpages = function(){
       try{
      
      var object  = {
          appname : $rootScope.appname,
          username :$rootScope.Username 
         }

     
           $http.post('/api/things/getpage', object).then(function(res){
            console.log(res.data)
             $scope.lespages= res.data

            });
         }
      
        catch(e){ console.log(e)}

        console.log( $scope.lespages)
      } 
      
      $scope.loadbtns = function(){
       try{
       
       var object  = {
          appname : $rootScope.appname,
          username :$rootScope.Username,
          id :  $scope.numero
        }
      
     
           $http.post('/api/things/getbtns',object).then(function(res){
            console.log(res.data)
             $scope.lesbtns= res.data

            });
         }
      
        catch(e){ console.log(e)}

        console.log( $scope.lesbtns)
      }
   

     $scope.changetype = function(button){

      if (button.type == "link")
      {
        button.menupage=null
      }
      else{
         button.link=null
      }

      }


      $scope.selectoption = function(nom,button)
      {
         button.numpage = $scope.getpagebyname(nom)
         console.log(button.numpage)
      }

      $scope.getpagebyname=function(name)
      {
        var numero = 0 ;
        $scope.lespages.forEach(function(element)
        {
          if (element.nom== name)
          {
            numero = element.numero;
          }
        })

        return numero;

      }

    


   $scope.savebtn = function() {
       
     var object = []
     object = {
          appname : $rootScope.appname,
          username :$rootScope.Username,
          numero: $scope.numero ,
          bouton: $scope.lesbtns}

          console.log(object)

      try{
      
     
           $http.post('/api/things/addbuton', object ).then(function(res){
            console.log(res.data)

            });
         }
      
        catch(e){ console.log(e)}

        $location.path("/createPage")
   
      }

    $scope.decrem = function() {
      $scope.lesbtns.pop()
      console.log($scope.lesbtns)
      
     
     
    }

    $scope.increm = function() {
     

      $scope.lesbtns.push({
        link : 'http://bfast-system.com',
        id : $scope.lesbtns.length +1,
        type: "link",
        numpage: 0,
        background: $scope.lesbtns.length +1 + "_bg.jpg",
        X:200,
        Y:200,
        height:300,
        width:720
      })
      console.log($scope.lesbtns)
       
      
    }

    

    $scope.testMyurl = function(url) {
          if (validUrl.isUri(url)){
            return true
        } else {
            return false
        }
    }

    $scope.upload = function(file,index){
     
      console.log(file)
      var object = {
        index : index,
        appname : $rootScope.appname,
        username : $rootScope.Username,
        page : $scope.numero


      }

        try{
         
         Upload.upload({
              url: '/api/things/uploadScreenindex',
              data: {file: file, object:object}
          }) 
     
/*           $http.post('/api/things/uploadScreenindex', object ).then(function(res){
            console.log(res.data)

            });*/
         }
      
        catch(e){ console.log(e)}



    }



 
   /* $scope.testbtn = function(){
       var lesvaleurs= vm.buttons;
       lesvaleurs.forEach(function(element){
        if(element.type == 'Menu'){
          element.url= null;
        }
       })
    
      try{
      
     
           $http.post('/api/things/save1', lesvaleurs ).then(function(res){
            console.log(res.data)

            });
         }
      
        catch(e){ console.log(e)}
   
      }
*/
      

  }
}


export default angular.module('browserApp.createButton', [uiRouter])
  .config(routes)
  .component('createButton', {
    template: require('./createButton.html'),
    controller: CreateButtonComponent,
    controllerAs: 'createButtonCtrl'
  })
  .name;
