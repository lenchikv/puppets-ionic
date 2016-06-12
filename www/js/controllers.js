angular.module('puppetApp.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('GalleryController', ['$scope', '$state', '$stateParams', 'galleryFactory', 'baseURL', '$ionicPopover', '$ionicPopup', 'checkRateFactory', 'rateFactory', 
function ($scope, $state, $stateParams, galleryFactory, baseURL, $ionicPopover, $ionicPopup, checkRateFactory, rateFactory) { 
           $scope.baseURL = baseURL;
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.pad = 0;
	    $scope.ordering = "-rateUp";

            $scope.showMenu = false;
            $scope.message = "Loading ...";
            //$scope.toys = toys;

	    galleryFactory.query(
            	function(response) {
            		$scope.toys = response;
           		 $scope.showMenu = true;
        	},
        	function(response) {
            		$scope.message = "Error: " + response.status + " " + response.statusText;
        	});

	
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "animals";
                }
                else if (setTab === 3) {
                    $scope.filtText = "people";
                }
                else if (setTab === 4) {
                    $scope.filtText = "pillows";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
	    	$scope.selectPad = function (setPad) {
				$scope.pad = setPad;
				console.log("Tab"+setPad);
				if (setPad === 0) {
					$scope.ordering = "-rateUp";
				} else	if (setPad === 1) {
					$scope.ordering = "-rateDown";
				} else if (setPad === 2) {
					$scope.ordering = "name";
				} else if (setPad === 3) {
					$scope.ordering = "category";
				} else {
					$scope.setPad = "-rateUp";
				}
		};

		$scope.isSelectedPad = function (checkPad) {
			return ($scope.pad === checkPad);
		};

		$ionicPopover.fromTemplateUrl('templates/gallery-popover.html', {
		scope: $scope})
			.then(function(popover) {
		$scope.popover = popover;
		});	

		$scope.doRate = function (param, toy) {
			$scope.check = checkRateFactory.doCheckIp(toy);
			if ($scope.check) {
				toy = checkRateFactory.doAdding(toy, param);
				rateFactory.update({id: $stateParams.id}, toy);
				//$scope.rateUp = $scope.toy.rateUp;
				//$scope.rateDown = $scope.toy.rateDown;
			} else {
				var alertPopup = $ionicPopup.alert({
     					title: 'You already voted!',
     					template: '<center>Try on other toy</center>'
   					});
			}
		};

        }])

		.controller('GalleryDetailController', ['baseURL', '$scope', '$state', '$stateParams', 'galleryFactory', 'checkRateFactory', 'rateFactory', '$ionicPopup', function (baseURL, $scope, $state, $stateParams, galleryFactory, checkRateFactory, rateFactory, $ionicPopup) {
		//.controller('GalleryDetailController', ['baseURL', '$scope', '$state', '$stateParams', 'galleryFactory', 'rateFactory', function (baseURL, $scope, $state, $stateParams, galleryFactory, rateFactory) {
	
            $scope.baseURL = baseURL;
            $scope.toy = {};
            $scope.showToy = false;
            $scope.message="Loading ...";
            
            $scope.toy = galleryFactory.get({id:parseInt($stateParams.id,10)})
            .$promise.then(
                            function(response){
                                $scope.toy = response;
                                $scope.showToy = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
            );
			
			$scope.doRate = function (param) {
				$scope.check = checkRateFactory.doCheckIp($scope.toy);
				if ($scope.check) {
					$scope.toy = checkRateFactory.doAdding($scope.toy, param);
					rateFactory.update({id: $stateParams.id}, $scope.toy);
					$scope.rateUp = $scope.toy.rateUp;
					$scope.rateDown = $scope.toy.rateDown;
				} else {
					console.log("we here");
					var alertPopup = $ionicPopup.alert({
     					title: 'You already voted!',
     					template: '<center>Try on other toy</center>'
   					});
				}

				//$scope.$apply();
			};

            
        }])

	.controller('CommentController', ['$scope', '$ionicModal', '$timeout', 'commentFactory', function ($scope, $ionicModal, $timeout, commentFactory) {
	
		$scope.userComment = {
            name: "",
            email: ""
        };
		
		$scope.comment = function () {
        	$scope.comform.show();
    	};

 
		// Triggered in the login modal to close it
		$scope.closeComment = function () {
			$scope.comform.hide();
		};

        $scope.sendComment = function () {
            //console.log($scope.userComment);
            commentFactory.save($scope.userComment);
			$scope.comments.push($scope.userComment);
            $scope.userComment = {
                name: "",
                email: ""
            };
            $scope.commentForm.$setPristine();

        };
        
		$ionicModal.fromTemplateUrl('templates/comment.html', {
			scope: $scope
		}).then(function (modal) {
			$scope.comform = modal;
		});

		// Triggered in the login modal to close it
		$scope.comform = function () {
			$scope.comform.hide();
		};

        commentFactory.query(
            function (response) {
                $scope.comments = response;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );
    }])



    .controller('ContactController', ['$scope', '$ionicModal', '$timeout', 'feedbackFactory', function ($scope, $ionicModal, $timeout, feedbackFactory) {
		
        $scope.feedback = {
            name: "",
			areaCode: "",
            phone: "",
            email: ""
        };


		$ionicModal.fromTemplateUrl('templates/feedback.html', {
			scope: $scope
		}).then(function (modal) {
			$scope.feedbackform = modal;
		});

		// Triggered in the login modal to close it
		$scope.closeFeedback = function () {
			$scope.feedbackform.hide();
		};

		// Open the login modal
		$scope.feedback = function () {
			$scope.feedbackform.show();
		};

		$scope.sendFeedback = function () {
            feedbackFactory.save($scope.feedback);
            $scope.feedback = {
                name: "",
				areaCode: "",
                phone: "",
                email: ""
            };
            $scope.feedbackForm.$setPristine();
        };

	}])



;
