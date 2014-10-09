
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var app = module.exports = express.createServer();

var personajes = require('./routes/personajes');
//var personal=require('./public/javascripts/personalizada');
//Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
 
  app.use(express.static(__dirname + '/public'));
});



app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});


// Routes

app.get('/', routes.index);
//app.get('/User',personajes.index);






app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});


//coneccion mongodb
var mongoose = require('mongoose');
//var personajes = require('./routes/personajes');
mongoose.connect('mongodb://localhost/primer_base', function(error){
   if(error){
      throw error; 
   }else{
      console.log('Conectado a MongoDB');
   }
});
var PersonajeSchema = mongoose.Schema({
   nombre: {type: String, required: true},
   apellido: {type: String, required: true},
   biografia: {type: String, required: true}
});
var PersonajeModel = mongoose.model('Personaje', PersonajeSchema);
//dentro de personaje.js existe una funcion con el nombre de setModel al cual le mando la variable PersonajeModel
personajes.setModel(PersonajeModel);
//personalizada.setModel(PersonajeModel);

var Personaje=PersonajeModel;

app.get('/personajes', personajes.index);
app.get('/personajes/create', personajes.create);
app.post('/personajes', personajes.store);
app.get('/personajes/:id', personajes.show);
app.get('/personajes/:id/edit', personajes.edit);
app.put('/personajes/:id', personajes.update);
app.delete('/personajes/:id', personajes.destroy);














//socket io


var io = require("socket.io").listen(app);
io.sockets.on('connection', function(socket) 
{
  
    //cuando un usuario envia un nuevo mensaje, el parámetro es el 
    //mensaje que ha escrito en la caja de texto
    socket.on('NewBusqueda', function(message) 
    {
        //pasamos un parámetro, que es el mensaje que ha escrito en el chat, 
        //ésto lo hacemos cuando el usuario pulsa el botón de enviar un nuevo mensaje al chat
           
          //personajes.intento(message);
          var name=message;
          Personaje.find({nombre:name}, function(error, person){
      if(error){

      //  socket.emit("refreshBusqueda", "error",person,message);
        // res.send('Ha surgido un error.');
      }else{
         // console.log(person);
          socket.emit("refreshBusqueda","",person,message);
         // console.log(res);
         
      }
   });







          //app.get('/personajes', personajes.intento);
          // app.put('/personajes', personajes.intento);
        //con socket.emit, el mensaje es para mi
      //  socket.emit("refreshBusqueda", "buscar",message);
        //con socket.broadcast.emit, es para el resto de usuarios
       // socket.broadcast.emit("refreshChat", "msg", socket.username + " dice: " + message + ".");
    });





  });