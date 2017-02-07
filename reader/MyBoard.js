
function MyGameBoard(scene){
	CGFobject.call(this,scene);
	this.scene = scene;
	this.initialized = false;
	this.ended = false;
	
	this.boardString;
	
	this.board= "placeholder"
	
	//this.boardLines = this.boardString.match(/\[(.*?)\|/g);
	
	this.getPrologRequest("board");
	
	//console.log(boradLines);
	
	
}

MyGameBoard.prototype = Object.create(CGFobject.prototype);
MyGameBoard.prototype.constructor= MyGameBoard;

MyGameBoard.prototype.getPrologRequest = function(requestString, onSuccess, onError, port){
				
				var requestPort = port || 8081
				var request = new XMLHttpRequest();
				request.open('GET', 'http://localhost:'+requestPort+'/'+requestString, true);

				request.onload = onSuccess || function(data){
					console.log("Request successful. Reply: " + data.target.response);
					var response = data.target.response;
					console.log(response);
					
					if(requestString == "board"){
						console.log("machadinha");
						this.boardString = response;
						console.log(this.boardString);
						this.parseBoard(this.boardString);
					}
					
					};
				request.onerror = onError || function(){console.log("Error waiting for response");};

				request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
				request.send();
				
}


MyGameBoard.prototype.parseBoard = function(plBoard){
		
	plBoard = plBoard.substring(plBoard.indexOf("[")+1, plBoard.lastIndexOf("]"));
 	plBoard = plBoard.replace(/\]\,/g, "\|\]\,").replace(/\]$/, "\|\]");
 	var lines = plBoard.match(/\[(.*?)\|/g);
	
	console.log(lines);
	
	
}
		