'use strict';

angular.module('meccanoAdminApp')
	.controller('AnnouncementsCtrl', function ($scope, Announcements, $state){

		// initialize variables
		$scope.parametersFilter = $state.params;
		$scope.annoucements = [];

		$scope.sensors = ['1', '2'];


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

			clearArray ? $scope.announcements = [] : false;

			Announcements.lastAnnouncements().get(parameters, function (res){
				
				angular.forEach(res.data, function (item){
					$scope.announcements.push(item);
				});

			}, function (err){
				console.log(err);
			});
		};

		// Load Announcements in load Controller with parameter passed in the url
		loadAnnouncements($state.params, true);


		$scope.filterAnnouncements = function (parameters){	
			parameters.page = 1;

			$state.go($state.current, parameters, {reload: true});
		};

		$scope.loadMore = function (parameters){

			if (parameters.page === undefined){
				parameters.page = 1;
			} else {
				parameters.page += 1;				
			}

			loadAnnouncements(parameters);
		}
	});