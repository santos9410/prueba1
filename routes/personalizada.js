$(document).ready(function()
{
    
    $(".interno").hide();
   	$(".encontrados").hide();
   


$("#buscar").on("click", function()
    {
    	$(".encontrados").hide();
    	$(".interno").show();


});




$("#todos").on("click", function()
    {

$(".interno").hide();
$(".encontrados").show();
    });




$("#encontrar").on("click",function(){

alert("goll");

});


});












