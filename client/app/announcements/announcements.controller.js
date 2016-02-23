'use strict';

angular.module('meccanoAdminApp')
	.controller('AnnouncementsCtrl', function ($scope, Announcements, $state, $interval){

		// initialize variables
		$scope.parametersFilter = $state.params;
		$scope.annoucements = [];

		$scope.currentState = $state.current;

		/** function to load last annoucements
		  * @param parameters {object}
		  * @param page
		  * @param channel
		  * @param size
		  * @param device_group
		  * @param device
		  * @param sensor
		  * @param data
		  * @param creationDate
		  * @param clearArray {boolen}
		  */
		function loadAnnouncements (parameters, clearArray){

			if(clearArray){
				$scope.announcements = [];
			}

			// Start load Gif
			$scope.isLoading = true;

			Announcements.lastAnnouncements().get(parameters, function (res){
				// Populate Array to show last announcements
				angular.forEach(res.data, function (item){
					$scope.announcements.push(item);
				});
				// Stop load Gif
				$scope.isLoading = false;

			}, function (err){
				console.log(err);
				// Stop load Gif
				$scope.isLoading = false;
			});
		}
		var intervalGrid;
		// Reload information of grid in five minutes
		function reloadGrid (){
			if(angular.isDefined(intervalGrid)){
				$interval.cancel(intervalGrid);
			}
			intervalGrid = $interval(function(){
				loadAnnouncements({}, true);
			}, 300000);
		}
		// Validate state to apply interval to reload grif of announcements
		if ($state.current.name === 'main.dash'){
			$scope.parametersFilter.size = 5;
			reloadGrid();
		}

		// Load Announcements in load Controller with parameter passed in the url
		loadAnnouncements($state.params, true);



		// Filter announcements by inputs of grid
		$scope.filterAnnouncements = function (parameters){
			parameters.page = 1;
			$state.go($state.current, parameters, {reload: true});
		};

		// Button to load more annoucements
		$scope.loadMore = function (parameters){

			// Set incrementation to get next page of announcements
			if (parameters.page === undefined){
				parameters.page = 1;
			} else {
				parameters.page += 1;
			}

			// get annoucements
			loadAnnouncements(parameters);
		};
		$scope.$on('$destroy', function() {
      // Make sure that the interval is destroyed too
			if(angular.isDefined(intervalGrid)){
				$interval.cancel(intervalGrid);
			}
    });
	});
