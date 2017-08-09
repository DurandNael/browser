'use strict';
// @flow

type Applications = {
  id: string;
  idUser: string;
  name: string;
};

export default class ApplicationsController {

  /*@ngInject*/
  constructor($http, Application,$location, $rootScope) {
    this.$http = $http; 
    var vm = this;
    
      $http.get('api/applications').then(function(applications){
      vm.applications = applications.data
      console.log(vm.applications)
      if ($rootScope.Username !== "Admin")
    {
      var lesapps= [];
      vm.applications.forEach(function(element){

        if (element.Username == $rootScope.Username )
        {
          lesapps.push(element)

        }



      })
       vm.applications = lesapps
    }
    
  

    })
    
    
    
   

    vm.delete = function (app) {
      console.log('delete')
      $http.delete('api/applications/' + app._id).then(function(){
        vm.applications.splice(vm.applications.indexOf(app),1)
      })

      var object = {
        username : "admin",
        appname : app.Appname


      }

      $http.post('api/things/copyapp', object ).then(function(){})

       $http.post('api/things/deleteapp', object ).then(function(){})
      

      // Application.save(1, vm.app)
    }
     vm.test = function(username,appname){
      var object = { "username" : username , "appname" : appname }; 
      
       $http.post('/api/things/dl',object).then(function(res){
        window.open('http://localhost:3000/'+username+"/"+appname+"/"+appname+".zip");
         console.log('dl')
        console.log(res.data)
      });
      }

      vm.update = function(nomapp)
      {
        $rootScope.appname = nomapp; 
         $location.path('/createApp'); 
      }
  }
   

  /*delete(Applications) {
    Applications.$remove();
    this.Applications.splice(this.users.indexOf(Applications), 1);
  }*/

 
}
