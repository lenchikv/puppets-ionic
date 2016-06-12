'use strict';

angular.module('puppetApp.services', ['ngResource'])
        .constant("baseURL","http://localhost:3000/")
	    //  .constant("baseURL","http://192.168.7.2:3000/")
	.factory('IPfactory', ['$http', function ($http, $rootScope) {
		//$scope.global = $rootScope;
		var ipfac = {},
            json = 'http://ipv4.myexternalip.com/json';
		ipfac.getIP = function () {
            return $http.get(json);
        };

		return ipfac;
    }])

	
//        .service('menuFactory', ['$resource', 'baseURL', function($resource,baseURL) {
	.factory('galleryFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

				return $resource(baseURL + "toys/:id", null, {
					'update': {
						method: 'PUT'
					}
				});

	}])

    .factory('checkRateFactory', ['$resource', '$rootScope', 'baseURL', function ($resource, $rootScope, baseURL) {
        var checkFac = {};
		checkFac.doCheckIp = function (toy, param) {
            var arr = toy.ips,
                idx = arr.indexOf($rootScope.ip);
			if (idx === -1) {
				return toy;
			} else {
				return null;
			}
			//return toy;
		};
		
		checkFac.doAdding = function (toy, param) {
			if (param === 'UP') {
				toy.rateUp = toy.rateUp + 1;
			} else {
				toy.rateDown = toy.rateDown + 1;
			}
			toy.ips.push($rootScope.ip);
			return toy;
		};

		return checkFac;
    }])

	.factory('feedbackFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
        return $resource(baseURL + "feedbacks/:id", null, {
            'update': {
                method: 'PUT'
            }
        });
    }])

    .factory('commentFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
        return $resource(baseURL + "comments/:id", null, {
            'update': {
                method: 'PUT'
            }
        });
    }])
	
	.factory('rateFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
        return $resource(baseURL + "toys/:id", null, {
            'update': {
                method: 'PUT'
            }
        });
    }])
	.factory('ratingFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
        return $resource(baseURL + "toys/:id", null, {
            'update': {
                method: 'PUT'
            }
        });
    }])

;