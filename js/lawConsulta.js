function DatePicker(){
  $('.datepicker').pickadate({
    selectMonths: true,
    selectYears: true,
    selectYear: 10

  });
}

function InitSelect(){
  //Categories list
  $.post("../controller/law_detail_controller.php",
    {router :"law_types"}).done(function(e){
      var data = JSON.parse(e);
      $.each(data,function(i,n){
        $.each(n.contenido,function(y,f){
          $('#law_type').append("<option value="+f.law_type_id+">"+f.law_type_name+"</option>");
          $('#categoria').append("<option value="+f.law_type_id+">"+f.law_type_name+"</option>");
          $('select').material_select();
        });
      });
    });

  }





//init datepicker component


//Setting empty values
function ne(x){
  if(x.length<1){
    return " ";
  }else{
    return x;
  }
};






function addSearch(){

  $("#searchButtom").click(function() {

    var desde =  $("#desde").val();
    var hasta = $("#hasta").val();
    var categoria = $("#categoria").val();

    $("#desde").val("");
    $("#hasta").val("");
    $("#categoria").val("");


    $.post( "../controller/law_detail_controller.php", {
     router : "conditionalSearch",
     desde: desde,
     hasta: hasta,
     categoria: categoria
   }).done(function(e){

     var news = JSON.parse(e);

     print_tableNews(news.contenido);

   });

 });

}




function print_tableNews(news){

  $("#bodyTable tr").remove();
  $.each(news,function(i,l){
  });

}





function vista_previa_news(law_id){

  $("#container_principal").hide();
  $("#consulta").hide();
  $("#ver_registro").show();
  $("#ver_consulta").show();
  $("#ver_save").hide();
  $("#vistaprevia").show();


  $.post("../controller/law_detail_controller.php",{
    router : "law_view",
    law_id : law_id
  }).done(function(e){
    var law_detail = JSON.parse(e);

    $.each(law_detail.contenido, function(i,n){

      console.log(n);

      d = new Date(n.law_det_date);
      $('#law_gaceta_prev_001').text(n.law_gaceta_number);
      $('#law_date_prev_001').text(d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear());
      $('#law_year_001').text(d.getFullYear());
      $('#law_comentario_prev_001').text(n.law_det_name);


      $.each(n.law_file_id, function(x,y){
        $('#pdf_view_1').attr('src',y.news_file_archive);
          //  console.log(y.news_file_archive);
        });
    });
  });

}





//Searching detail news
function searchNews(news_id){


  $.post("../controller/news_detail_controller.php",
    {router:"news_view",
    news_id : news_id
  }).done(function(data){
    var news_det = JSON.parse(data);
    $.each(news_det.contenido,function(i,n){
      $("#news_title_es").val(n.news_det_tit);
      $("#news_date").val(n.news_det_date);
      $(".div_news_category :input ").val(n.news_det_category);
      $(".div_news_range :input ").val(n.news_det_priority);
      $("#news_title_es").val(n.news_det_id);
      $("#news_source").val(n.news_det_source);
    //    $("#news_title_es").val(n.news_det_category);
    //    $("#news_title_es").val(n.news_det_image);
    $("#news_title_en").val(n.news_det_tit_en);
    $("#news_comment_en").val(n.news_det_text_en);
    $("#news_title_es").val(n.news_det_text);
    $.each(n.news_det_category,function(x,z){
      $(".div_news_category :input ").val( z.news_cat_name );
    });

  });


  });


  $('.button-collapse').sideNav('hide');


}





function preview(){



  $('#news_body_es').focusout(function(){

    $('#encabezado_vistaprevia').show();

    var news_body_html = $(this).html();
    var news_img = $(news_body_html).contents().find("img").attr("src");

    $('#h5_title + img').remove();

    if (news_img != null) {
      $('#h5_title').after("<img id='new_img_prev' src='"+news_img+"' style='margin-left: 5%;' width='90%' height='35%'> ");
    }else{
      $('#h5_title').after("<hr></hr>");
    }


    $('#new_img_prev').attr('src',news_img);
    $('#news_body_prev').text($(this).text());
  });


  $('#news_title_es').focusout(function(){
    $('#encabezado_vistaprevia').show();

    $('#news_title_prev').text($(this).val());
  });
  $('#news_date').change(function(){
    $('#encabezado_vistaprevia').show();

    var d = new Date($('#news_date').val());
    var date = $('#news_date').val();
    date = date.split(" ");
    $('#news_month_prev').text(date[1]+date[2]+".-");
    $('#news_date_prev').text(d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear());
  });
  $('#news_source').focusout(function(){
    $('#encabezado_vistaprevia').show();

    $('#news_source_prev').text($(this).val());
  });

}




//Sending news to database
function PDFViewer(){
  $(this).change(function(event){
    window.path = URL.createObjectURL(event.target.files[0]);
    $('#pdf_view').attr('src',path);
    $('#modal1').modal('close');


  });
}


function isDefined(variable) {
  return (typeof(window[variable]) == "undefined")?  false: true;
}



//show comment panel
function ShowCommentPanel(){
  if ($('#comment_panel_es').css('display') == "none") {
    $('#comment_panel_es').show();
  }else{
    $('#comment_panel_es').hide();
  }
};



//show english settings panel
function ShowEnglishSettingPanel(){
  if ($('#english_content').css('display') == "none") {
    $('#english_content').show();
  }else{
    $('#english_content').hide();
  }
};
//show categories panel




function searchLaw(idioma){

  var idm = idioma;
  var desde =  $("#desde").val();
  var hasta = $("#hasta").val();
  var gaceta = $("#gaceta").val();
  var categoria = $("#categoria").val();

  $("#bodyTable tr").remove();
  $("#col_izquierda div").remove();
  $("#col_izquierda iframe").remove();
  $("#col_izquierda hr").remove();

  if(idioma=='hoy'){

    var fecha = new Date();
    fecha.setDate( fecha.getDate() - 30 );
    var ayer =    fecha.getFullYear()  + "/" + (fecha.getMonth() +1) + "/" + fecha.getDate();

    var fecha1 = new Date();
    fecha1.setDate( fecha1.getDate() );
    var hoy =    fecha1.getFullYear()  + "/" + (fecha1.getMonth() +1) + "/" + fecha1.getDate();

    var desde =  ayer;
    var hasta =  hoy;

  }



  $("#desde").val("");
  $("#hasta").val("");
  $("#categoria").val("");
  $("#gaceta").val("");

  $.post("../controller/law_detail_controller.php",{
    router:"conditionalSearch",
    desde : desde,//$('#desde').val(),
    hasta : hasta,//$('#hasta').val(),
    categoria : categoria,//$('#categoria').val()
    gaceta : gaceta//$('#categoria').val()
  }).done(function(e){
    var laws = JSON.parse(e);
    //console.log(news.contenido);
    $.each(laws.contenido,function(i,n){

      console.log(n);


     $("#bodyTable").append("<tr style='width:100px' id="+n.law_det_id+" ><td>"+n.law_det_date+"</td><td>"+n.law_gaceta_number+"</td><td>"+n.law_det_name+"</td><td style='width:150px'><a  onclick='editar_law("+n.law_det_id+")'  class='fa fa-edit tam26'></a> <a  onclick='searchlawIndividual("+n.law_det_id+")'  class='fa fa-eye tam26' ></a> <a onclick=print_ley("+n.law_det_id+")> <i class='fa fa-print tam26'></i> </a> <a onclick=deletelaw("+n.law_det_id+")> <i class='fa fa-trash tam26'></i> </a>  </td></tr>");

      $("#col_izquierda").append("\
        <div style='width:100%;margin-bottom:10px; font-size:20px; font-weigth:bold; line-height: 22px'>"+n.law_gaceta_number+"</div>\
        <div style='width:100%;margin-bottom:10px; text-align:justify;'><b>"+n.law_det_date+".- </b>"+n.law_det_name+"</div><hr>\
        <hr><iframe id=\"pdf_view2\" width=\"100%\" height=\"100px\"></iframe>\
        <br>\
        "); 
   
    });


  });
}



function volver_atras_busqueda(){

  $('#vistaprevia_individual').hide();

  $('#divTable').show();
  $('#vistaprevia').show();
  $('#divTableTitle').show();
  $('#botonesSearch').show();
  $('#opcionesSearch').show();
}

function editar_law(x){
  localStorage.setItem("ley_id",x);
  window.location.href = "ley.html";

}



function searchlawIndividual(law_id){


  $('#vistaprevia_individual').show();

  $('#divTable').hide();
  $('#vistaprevia').hide();
  $('#divTableTitle').hide();
  $('#botonesSearch').hide();
  $('#opcionesSearch').hide();


  $('#col_izquierda_individual div').remove();
  $('#col_izquierda_spanish_individual div').remove();

  $.post("../controller/law_detail_controller.php",{
    router : "law_view",
    law_id : law_id
  }).done(function(e){
    var laws_detail = JSON.parse(e);


    $.each(laws_detail.contenido, function(i,n){

                console.log(n);

                $.each(n.law_file_id, function(x,y){
                   
                     $('#pdf_view2').show();
                     $('#pdf_view2').attr('src',y.news_file_archive);
                   
                 });



      $("#col_izquierda_individual").append("\
        <div style='width:100%;margin-bottom:10px; font-size:20px; font-weigth:bold; line-height: 22px'>"+n.law_det_name+"</div>\
        <div style='width:100%;margin-bottom:10px; text-align:justify;'>ss<b>"+n.law_det_date+".- </b>"+n.law_gaceta_number+"</div>\
        ");

    });

  });

}




















function verSearch(){

  $("#ver_registro").hide();
  $("#vistaprevia").hide();

  $("#ver_consulta").click(function() {
   $("#container_principal").hide();
   $("#consulta").show();
   $("#ver_registro").show();
   $("#ver_consulta").hide();
   $("#ver_save").hide();
   $("#vistaprevia").show();

   $("#ver_tbl_spanish").hide();
   $("#ver_tbl_english").hide();
   $("#ver_sem_spanish").hide();
   $("#ver_sem_english").hide();
   $("#tableReporte").hide();
   $("#vistaprevia").hide();
   $("#ver_index").hide();


 });

  $("#desde").change(function() {
   $("#container_principal").hide();
   $("#consulta").show();
   $("#ver_registro").show();
   $("#ver_consulta").hide();
   $("#ver_save").hide();
   $("#vistaprevia").show();

   $("#ver_tbl_spanish").hide();
   $("#ver_tbl_english").hide();
   $("#ver_sem_spanish").hide();
   $("#ver_sem_english").hide();
   $("#tableReporte").hide();
   $("#vistaprevia").hide();


 });


  $("#hasta").change(function() {
   $("#container_principal").hide();
   $("#consulta").show();
   $("#ver_registro").show();
   $("#ver_consulta").hide();
   $("#ver_save").hide();
   $("#vistaprevia").show();

   $("#ver_tbl_spanish").hide();
   $("#ver_tbl_english").hide();
   $("#ver_sem_spanish").hide();
   $("#ver_sem_english").hide();
   $("#tableReporte").hide();
   $("#vistaprevia").hide();


 });




  $("#ver_registro").click(function() {
   $("#container_principal").show();
   $("#consulta").hide();
   $("#ver_registro").hide();
   $("#ver_consulta").show();
   $("#ver_save").show();
   $("#vistaprevia").hide();

 });


  $("#searchButtom1").click(function() {
   $("#ver_tbl_spanish").show();
   $("#ver_tbl_english").show();
   $("#ver_sem_spanish").show();
   $("#ver_sem_english").show();
   $("#ver_sem_english").show();
   $("#container_principal").hide();
   $("#consulta").show();
   $("#ver_registro").hide();
   $("#ver_consulta").show();
   $("#ver_save").hide();
   $("#vistaprevia").hide();
   $("#col_derecha_spanish").hide();
   $("#col_izquierda_spanish").hide();
   $("#bodyTable_spanish").show();
   $("#col_derecha").hide();
   $("#col_izquierda").hide();
   $("#bodyTable").hide();
   $("#tableReporte").show();
   $('#divTableTitle h4').remove();
   $('#divTableTitle').append("<h4 style='font-size: 1.5rem;'> Resultados en Espa&ntilde;ol ( Tabla )</h4>")
 });



  $("#ver_tbl_spanish").click(function() {
   $("#container_principal").hide();
   $("#consulta").show();
   $("#ver_registro").hide();
   $("#ver_consulta").show();
   $("#ver_save").hide();
   $("#vistaprevia").hide();
   $("#col_derecha_spanish").hide();
   $("#col_izquierda_spanish").hide();
   $("#bodyTable_spanish").show();
   $("#col_derecha").hide();
   $("#col_izquierda").hide();
   $("#bodyTable").hide();
   $("#tableReporte").show();
   $('#divTableTitle h4').remove();
   $('#divTableTitle').append("<h4 style='font-size: 1.5rem;'> Resultados en Espa&ntilde;ol ( Tabla )</h4>")

 });

  $("#ver_tbl_english").click(function() {
   $("#container_principal").hide();
   $("#consulta").show();
   $("#ver_registro").hide();
   $("#ver_consulta").show();
   $("#ver_save").hide();
   $("#vistaprevia").hide();
   $("#col_derecha_spanish").hide();
   $("#col_izquierda_spanish").hide();
   $("#bodyTable_spanish").hide();
   $("#col_derecha").hide();
   $("#col_izquierda").hide();
   $("#bodyTable").show();
   $("#tableReporte").show();
   $('#divTableTitle h4').remove();

   $('#divTableTitle').append("<h4 style='font-size: 1.5rem;'> Results in English ( Table )</h4>")

 });



  $("#ver_sem_english").click(function() {
   $("#container_principal").hide();
   $("#consulta").show();
   $("#ver_registro").hide();
   $("#ver_consulta").show();
   $("#ver_save").hide();
   $("#vistaprevia").show();
   $("#col_derecha_spanish").hide();
   $("#col_izquierda_spanish").hide();
   $("#bodyTable_spanish").hide();
   $("#col_derecha").show();
   $("#col_izquierda").show();
   $("#bodyTable").hide();
   $("#tableReporte").hide();
   $('#divTableTitle h4').remove();
   $('#divTableTitle').append("<h4 style='font-size: 1.5rem;' >  Results in English  ( Semanario )</h4>")

 });


}



function updateNews(){
//alert('soy  un editar');
//console.log($('#news_category').val());
console.log(localStorage.getItem("category_id"));
if($('#news_category').val()==null){
 $('#news_category').val(localStorage.getItem("category_id"))  ;
}



var news_body_html = $('#news_body_es').html();
var news_body_es = $('#news_body_es').text();
$.post( "../controller/news_detail_controller.php", {
  router : "update",
  news_id : localStorage.getItem("new_id"),
  news_title_es: ne($('#news_title_es').val()),
  news_body_es: news_body_es,
  news_date: ne($('#news_date').val()),
  news_source: ne($('#news_source').val()),
  news_title_en : ne($('#news_title_en').val()),
  news_body_en : ne($('#news_body_en').val()),
  news_category : $('#news_category').val(),
  news_range : ne($('#news_range').val())

}).done(function(message){
  message = JSON.parse(message);

  console.log(message);

  if(message.conexion){
    alert('Update Success!');
    location.reload();
  }else{
    alert('Ha ocurrido un error al procesar la información, intente nuevamente!');
  }
});
}




function deleteLaw(law_id){
  $.post( "../controller/law_detail_controller.php", {
    router : "delete",
    law_id : law_id,
  }).done(function(message){
    message = JSON.parse(message);
    if(message.conexion){
      alert('Deleted Success!');
      location.reload();
    }else{
      alert('Ha ocurrido un error al procesar la información, intente nuevamente!');
    }
  });
}


function masiveLoad(){
  $.post("../controller/news_detail_controller.php",{
    router : "masivo"
  });
}
