var socket = io.connect('http://localhost:3000');
 
var notmore=0;
var name1;
var uno=0;

$(document).ready(function()
{
    
   $(".buscados").hide();
    $(".exito").hide();
    name1=$(".inputBuscar").val();
    // 	$(".encontrados").hide();
   


      $("#buscar").on("click", function()
         {
    	//$(".encontrados").hide();
    	     $(".buscados").show();


        });




      $("#todos").on("click", function()
        {

        //$(".interno").hide();
        //$(".encontrados").show();
      });




      $("#encontrar").on("click",function(){


		    var texto=$(".inputBuscar").val();
        console.log(texto);
          if(texto.length>0){

        if(name1!=texto){
		socket.emit("NewBusqueda", texto);
    $( ".error1" ).hide();
    uno=0;
    // $( ".exito" ).remove();
  
  }
	}
	
	else{
		Error("introduce una busqueda");
    $( ".exito" ).remove();
    notmore=0;

	}






    });

    var norepit=0;

      socket.on("refreshBusqueda", function(action, message,name)
          {

        //simplemente mostramos el nuevo mensaje a los usuarios
        
          //si es un nuevo mensaje 
          console.log("nombre  "+name);
          console.log(message);
            
          if(message.length<1 && norepit==0){
          //  alert("vacio");
            $(".error2").append("<p class='col-md-12 alert-warning'>" + "0 resultados" + "</p>");
            norepit++;
           

          }
          else if(message.length>0){


            
                $.each(message,function(index,contenido){
                //  ( ".exito" ).remove();

                 if(notmore==0){


                   $(".list-group-item-success").append('<span class="vaciar-nombre"></span>');
                   $(".list-group-item-success").append('<span class="vaciar-apellido"></span>');
                 //  $(".list-group-item-success").append('<span>'+contenido.biografia+'</span>');
                 
                   $(".list-group-item-success").append('<a class="ver-personaje">Ver</a>');
                   

                  
                   $(".list-group-item-success").append('<a class="editar-personaje">Editar</a>');
                   

                   $(".exito").show();
                   notmore++;
                              }


                 // vaciar dinamicamente los elementos obtenidos
                  $(".vaciar-nombre").html(contenido.nombre);
                  $(".vaciar-apellido").html(contenido.apellido);
                  var link_ver="/personajes/"+contenido._id;
                  $ ( ".ver-personaje" ). attr ( "href" ,link_ver );
                  var link_editar="/personajes/"+contenido._id+"/edit";
                  $ ( ".editar-personaje" ). attr ( "href" ,link_editar );









});
              }

 // <li class="list-group-item list-group-item-success">Dapibus ac facilisis in</li>


                //  ul.acomodo.list-group
                 //   $(".encontrados").append("<p class='col-md-12 alert-warning'>" + contenido.nombre + "</p>");
                   // $(".encontrados").append("<p class='col-md-12 alert-warning'>" + contenido.apellido + "</p>");


               

              

             











          });

//});
        	







          //  $("#chatMsgs").append("<p class='col-md-12 alert-warning'>" + message + "</p>");
        
        
        























function Error(message){
if(uno==0){
$(".error1").append("<p class='col-md-12 alert-danger', id='menserror1'>" + message + "</p>");
uno++;
$('#menserror1').toggle(10000);
}

};




});











