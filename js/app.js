var app = angular.module('guessNumberApp', []);


app.controller('playCtrl', function($scope){

	_startGame();

	$scope.initValues = function(){
		if($scope.userWin){
			_startGame();
		}
	}

	$scope.submitNumber = function(){
		$scope.userWin = _isUserWin();
		if(!$scope.userWin && $scope.guessedNb){
			if($scope._userNbsArray.indexOf($scope.guessedNb) == -1){
				$scope.nbOfGuesses++;
				$scope._userNbsArray.push($scope.guessedNb);
				var compare = _compareNumbers();
				$scope.guessedNbList.push({"val":$scope.guessedNb,"compare":compare});
			}
		}
	}

	function _startGame(){
		$scope.userWin = false;
		$scope._userNbsArray = [];
		$scope.numberToGuess = _getNumberToGuess(1,999);
		$scope.guessedNbList = [];
		$scope.nbOfGuesses = 1;
		$scope.guessedNb = "";
		$scope.time = "0";
		_chrono();
		console.log("Number to guess: " + $scope.numberToGuess);
	}

	function _getNumberToGuess(min,max){
		var nb = Math.floor(Math.random() * (max - min + 1)) + min;
		return nb;
	};

	function _isUserWin(){
		return $scope.guessedNb === $scope.numberToGuess;
	};

	function _compareNumbers(){
		var compare = "";
		if($scope.guessedNb > $scope.numberToGuess){
			compare = " is too high";
		}else{
			compare = " is too low";
		}
		return compare;
	};

	function _chrono(){
		var second = 0;
		var minute = 0;
		setInterval(function(){
			if(second < 59){
				second++;
			}else{
				second=0;
				minute++;
			}
			$scope.time = minute + "m : " + second + "s";
		},1000);
	}

});