// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
//angular.module('starter', ['ionic', 'starter.controllers'])
angular.module('puppetApp', ['ionic', 'puppetApp.controllers', 'puppetApp.services'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.run(function ($rootScope, IPfactory) {
		$rootScope.ip = "";
		IPfactory.getIP().then(
			function (response) {
                $rootScope.ip = response.data.ip;
				//console.log("$rootScope.ip" + $rootScope.ip);
            },
            function (e) {
                console.log("error");
            }
		);
	})


.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/sidebar.html'//,
    //controller: 'AppCtrl'
  })

  .state('app.home', {
    url: '/home',
    views: {
      'mainContent': {
        templateUrl: 'templates/home.html'
      }
    }
  })

  .state('app.comments', {
      url: '/comments',
      views: {
        'mainContent': {
          templateUrl: 'templates/comments.html',
			controller  : 'CommentController'
		}
      }
    })

   .state('app.contact', {
      url: '/contact',
      views: {
        'mainContent': {
			templateUrl: 'templates/contact.html',
			controller  : 'ContactController'
        }
      }
    })

    .state('app.gallery', {
      url: '/gallery',
      views: {
        'mainContent': {
          templateUrl: 'templates/gallery.html',
          controller  : 'GalleryController'
        }
      }
    })

	.state('app.gallerydetails', {
    url: '/gallery/:id',
    views: {
      'mainContent': {
        templateUrl: 'templates/gallerydetail.html',
        controller  : 'GalleryDetailController'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');

});