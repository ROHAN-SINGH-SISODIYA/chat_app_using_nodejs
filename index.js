var app = require("express")();

var http = require("http").Server(app);

var io = require("socket.io")(http);

var users =[];
var data =[];
var onlineuser =[];

app.get("/",function(req,res)
{
    	res.sendFile(__dirname+"/index.html");
});
io.sockets.on("connection",function(socket)
{
	    users.push(socket);
	    console.log("New user connected "+users.length),

	socket.on("disconnect",function(disvalue)
	{

		users.splice(users.indexOf(socket),1);
		disvalue=onlineuser.splice(onlineuser.indexOf(socket.username),1);
		console.log("User disconnected "+disvalue);

   
	});

	socket.on("new user",function(data)
	{
		socket.username = data;
		onlineuser.push(socket.username);
		console.log("user connected "+socket.username);
		updateuser();
	});

	socket.on("msg",function(name,msg)
	{
		io.sockets.emit("rmsg",{name:name,msg:msg});
	});
    
    
	function updateuser()
	{
	 	io.sockets.emit("get user",onlineuser);
	}

});

http.listen(8080,function()
{
     console.log("Server Created with port 8080");
});