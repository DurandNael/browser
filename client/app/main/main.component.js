import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
  $http;
  socket;
  awesomeThings = [];
  newThing = '';

  /*@ngInject*/
  constructor($http, $scope, socket, $rootScope, Auth) {
    this.$http = $http;
    this.socket = socket;
    this.Auth = Auth;
    $rootScope.Username= this.Auth.getCurrentUserSync().name;
    
   console.log( $rootScope.Username)

    
     

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });

    $scope.createdirectory= function(){
      console.log("loading")


      try{
        var object={
          user : $rootScope.Username
        }

        $http.post('/api/things/createrepo', object).then(function(res){
            console.log(res.data)
            });
         }
        catch(e){ console.log(e)}
    }
  }

  $onInit() {
    this.$http.get('/api/things')
      .then(response => {
        this.awesomeThings = response.data;
        this.socket.syncUpdates('thing', this.awesomeThings);
      });
  }

  addThing() {
    if(this.newThing) {
      this.$http.post('/api/things', {
        name: this.newThing
      });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete(`/api/things/${thing._id}`);
  }
}

export default angular.module('browserApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
