// var socket = io.connect('http://morning-coast-9136.herokuapp.com/');
var socket = io.connect('http://morning-coast-9136.herokuapp.com');
var tecla = new Object();

socket.on('connect', function(){
	console.log('Conectado con el socket');

	init();
});

var init = function(){
	console.log('inside function');
};

socket.on('connected', function(algo){
	console.log(algo);
});

var nav = function(dir){
	socket.emit('navigate', dir);
	console.log('enviando dir ='+ dir);
};

socket.on('push',function(data){
	console.log('recibido = '+ data);
    // tecla.keyCode = data;
	KINOUT.Events.move(data);
});

