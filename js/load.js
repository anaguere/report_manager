function DatePicker(){
  $('.datepicker').pickadate({
    selectMonths: true,
    selectYears: true,
    selectYear: 10

  });
}

function InitSelect(){
  //Categories list
  $.post("../controller/news_detail_controller.php",
  {router : "list" }).done(function(data){
    var selects = JSON.parse(data);
    categories = selects.category.contenido;
    types = selects.type.contenido;
    for(i =0; i < categories.length ; i++){
      $('#news_category').append("<option value="+categories[i].news_cat_id+">"+categories[i].news_cat_name+"</option>");
      $('select').material_select();
      $('#categoria').append("<option value="+categories[i].news_cat_id+">"+categories[i].news_cat_name+"</option>");
      $('select').material_select();
    }
    for(j =0; j < types.length ; j++){
      $('#news_type').append("<option value="+types[j].news_type_id+">"+types[j].news_type_name+"</option>");
      $('select').material_select();
    }
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




//Load index view
function IndexViewTitles(){
  $.post("../controller/news_detail_controller.php",
  {router: "view_index_titles"}).done(function(data){
    var titles = JSON.parse(data);
    var cant = 0;
    $.each(titles.spanish_list,function(i,n){
      $("#abc_index_spanish").append("<li>\
      <div class='collapsible-header' id='header_"+cant+"'>"+i.toUpperCase()+"</div>");
      if(n.length != 0){
        $.each(n,function(j,v){
          $("#header_"+cant).after("<div class='collapsible-body' style='height:auto; line-height:26px'><a onclick='searchNews("+v[0]+")'>"+v[1]+"</a></div>");
        });
        $("#header_"+cant).after("</li>");
      }
      cant++;
    });
    // List English titles
    var cant_en = 0;
    $.each(titles.english_list,function(i, n){
      $("#abc_index").append("<li>\
      <div  class='collapsible-header' id='header_"+cant_en+"'>"+i.toUpperCase()+"</div>");
      if(n.length != 0){
        $.each(n,function(j,k){
          $("#header_"+cant_en).after("<div class='collapsible-body' style='height:auto; line-height:26px'><a onclick='searchNews("+k[0]+")'>"+k[1]+"</a></div>");
        });
        $("#header_"+cant_en).after("</li>");
      }
      cant_en++;
    });
  });
};



function addSearch(){

	 $("#searchButtom").click(function() {

              var desde =  $("#desde").val();
              var hasta = $("#hasta").val();
              var categoria = $("#categoria").val();

              $("#desde").val("");
              $("#hasta").val("");
              $("#categoria").val("");


               $.post( "../controller/news_detail_controller.php", {
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
function SaveNews(){
  var news_body_html = $('#news_body_es').html();
  var news_img = $(news_body_html).contents().find("img").attr("src");
  var news_body_es = $('#news_body_es').text();
  $.post( "../controller/news_detail_controller.php", {
    router : "create",
    news_title_es: ne($('#news_title_es').val()),
    news_img: news_img,
    news_body_es: news_body_es,
    news_date: ne($('#news_date').val()),
    news_source: ne($('#news_source').val()),
    news_title_en : ne($('#news_title_en').val()),
    news_body_en : ne($('#news_body_en').val()),
    news_category : ne($('#news_category').val()),
    news_range : ne($('#news_range').val())
  }).done(function(message){
    message = JSON.parse(message);
    if(message.conexion){
      location.reload();
    }else{
      alert('Ha ocurrido un error al procesar la información, intente nuevamente!');
    }
  });
};

//Searching detail news
/*function searchNews(news_id){
console.log(news_id);
$.post("../controller/news_detail_controller.php",
{router:"news_view",
news_id : news_id
}).done(function(data){
var res = JSON.parse(data);
$.each(res.contenido, function(i,n){
console.log(i);
})
});
}*/

//Sending news to database
function PDFViewer(){
  $(this).change(function(event){
    window.path = URL.createObjectURL(event.target.files[0]);
    $('#pdf_view').attr('src',path);
    $('#modal1').modal('close');


  });
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



function searchNews(idioma){

  var idm = idioma;
  var desde =  $("#desde").val();
  var hasta = $("#hasta").val();
  var categoria = $("#categoria").val();

  $("#desde").val("");
  $("#hasta").val("");
  $("#categoria").val("");

  $.post("../controller/news_detail_controller.php",{
    router:"range_search",
    desde : desde,//$('#desde').val(),
    hasta : hasta,//$('#hasta').val(),
    categoria : categoria//$('#categoria').val()
  }).done(function(e){
    var news = JSON.parse(e);
    console.log(news.contenido);
    $.each(news,function(i,n){




            $("#bodyTable").append("<tr style='width:100px' id="+n.news_det_id+" ><td>"+n.news_det_date+"</td><td>"+n.news_det_category+"</td><td>"+n.news_det_tit_en+"</td><td style='width:150px'><a  onclick='editar_news("+n.news_det_id+")'  class='fa fa-edit tam26'></a> <a  onclick='searchNewsIndividual("+n.news_det_id+")'  class='fa fa-eye tam26' ></a> <a onclick=print_ley("+n.news_det_id+")> <i class='fa fa-print tam26'></i> </a> <a onclick=delete_news("+n.news_det_id+")> <i class='fa fa-trash tam26'></i> </a>  </td></tr>");

                  if(n.news_det_priority>3){

                    $("#col_derecha").append("\
                    <div style='width:100%;margin-bottom:10px; font-size:20px; border-bottom: 2px solid #333; padding-bottom:15px; margin-bottom:15px; font-weigth:bold; line-height: 22px'>"+n.news_det_tit_en+"</div>\
                    <div style='width:100%;margin-bottom:10px; text-align:justify;'><b>"+n.news_det_date+".- </b>"+n.news_det_text_en+"</div><br><br>\
                    ");
                  }


                  if(n.news_det_priority<=3){

                            if(n.news_det_image==null){
                              $("#col_izquierda").append("\
                              <div style='width:100%;margin-bottom:10px; font-size:20px; font-weigth:bold; line-height: 22px'>"+n.news_det_tit_en+"</div>\
                              <hr>\
                              <div style='width:100%;margin-bottom:10px; text-align:justify;'><b>"+n.news_det_date+".- </b>"+n.news_det_text_en+"</div><hr><br>\
                              ");
                            }else{
                              $("#col_izquierda").append("\
                              <div style='width:100%;margin-bottom:10px; font-size:20px; font-weigth:bold; line-height: 22px'>"+n.news_det_tit_en+"</div>\
                              <div style='margin-top:20px; margin-bottom:10px'><img width='100%' src='data:application/png;base64,"+n.news_det_image+"'></div>\
                              <div style='width:100%;margin-bottom:10px; text-align:justify;'><b>"+n.news_det_date+".- </b>"+n.news_det_text_en+"</div><hr>\
                              ");
                            }

                  }





                $("#bodyTable_spanish").append("<tr style='width:100px' id="+n.news_det_id+" ><td>"+n.news_det_date+"</td><td>"+n.news_det_category+"</td><td>"+n.news_det_tit+"</td><td style='width:150px'><a  onclick='editar_news("+n.news_det_id+")'  class='fa fa-edit tam26'></a> <a  onclick='searchNewsIndividual("+n.news_det_id+")'  class='fa fa-eye tam26' ></a> <a onclick=print_ley("+n.news_det_id+")> <i class='fa fa-print tam26'></i> </a> <a onclick=delete_news("+n.news_det_id+")> <i class='fa fa-trash tam26'></i> </a> </td></tr>");

                if(n.news_det_priority>3){

                  $("#col_derecha_spanish").append("\
                  <div style='width:100%;margin-bottom:10px; font-size:20px; border-bottom: 2px solid #333; padding-bottom:15px; margin-bottom:15px; font-weigth:bold; line-height: 22px'>"+n.news_det_tit+"</div>\
                  <div style='width:100%;margin-bottom:10px; text-align:justify;'><b>"+n.news_det_date+".- </b>"+n.news_det_text+"</div><br><br>\
                  ");
                }


                  if(n.news_det_priority<=3){

                            if(n.news_det_image==null){
                              $("#col_izquierda_spanish").append("\
                              <div style='width:100%;margin-bottom:10px; font-size:20px; font-weigth:bold; line-height: 22px'>"+n.news_det_tit+"</div>\
                              <hr>\
                              <div style='width:100%;margin-bottom:10px; text-align:justify;'><b>"+n.news_det_date+".- </b>"+n.news_det_text+"</div><hr><br>\
                              ");
                            }else{
                              $("#col_izquierda_spanish").append("\
                              <div style='width:100%;margin-bottom:10px; font-size:20px; font-weigth:bold; line-height: 22px'>"+n.news_det_tit+"</div>\
                              <div style='margin-top:20px; margin-bottom:10px'><img width='100%' src='data:application/png;base64,"+n.news_det_image+"'></div>\
                              <div style='width:100%;margin-bottom:10px; text-align:justify;'><b>"+n.news_det_date+".- </b>"+n.news_det_text+"</div><hr>\
                              ");
                            }

                    }




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




function searchNewsIndividual(new_id){


    $('#vistaprevia_individual').show();

    $('#divTable').hide();
    $('#vistaprevia').hide();
    $('#divTableTitle').hide();
    $('#botonesSearch').hide();
    $('#opcionesSearch').hide();


    $('#col_izquierda_individual div').remove();
    $('#col_izquierda_spanish_individual div').remove();

    $.post("../controller/news_detail_controller.php",{
      router : "news_view",
      news_id : new_id
    }).done(function(e){
      var news_detail = JSON.parse(e);

                $.each(news_detail.contenido, function(i,n){



                  console.log(n);

                      //       $.each(n.law_file_id, function(x,y){
                           // $('#pdf_vie').attr('src',y.news_file_archive);
                          //  console.log(y.news_file_archive);
                        //    });


                            if(n.news_det_image==null){
                              $("#col_izquierda_individual").append("\
                              <div style='width:100%;margin-bottom:10px; font-size:20px; font-weigth:bold; line-height: 22px'>"+n.news_det_tit_en+"</div>\
                              \
                              <div style='width:100%;margin-bottom:10px; text-align:justify;'><b>"+n.news_det_date+".- </b>"+n.news_det_text_en+"</div>\
                              ");
                            }else{
                              $("#col_izquierda_individual").append("\
                              <div style='width:100%;margin-bottom:10px; font-size:20px; font-weigth:bold; line-height: 22px'>"+n.news_det_tit_en+"</div>\
                              <div style='margin-top:20px; margin-bottom:10px'><img width='100%' src='data:application/png;base64,"+n.news_det_image+"'></div>\
                              <div style='width:100%;margin-bottom:10px; text-align:justify;'><b>"+n.news_det_date+".- </b>"+n.news_det_text_en+"</div>\
                              ");
                            }


                            if(n.news_det_image==null){
                              $("#col_izquierda_spanish_individual").append("\
                              <div style='width:100%;margin-bottom:10px; font-size:20px; font-weigth:bold; line-height: 22px'>"+n.news_det_tit+"</div>\
                              <hr>\
                              <div style='width:100%;margin-bottom:10px; text-align:justify;'><b>"+n.news_det_date+".- </b>"+n.news_det_text+"</div><hr><br>\
                              ");
                            }else{
                              $("#col_izquierda_spanish_individual").append("\
                              <div style='width:100%;margin-bottom:10px; font-size:20px; font-weigth:bold; line-height: 22px'>"+n.news_det_tit+"</div>\
                              <div style='margin-top:20px; margin-bottom:10px'><img width='100%' src='data:application/png;base64,"+n.news_det_image+"'></div>\
                              <div style='width:100%;margin-bottom:10px; text-align:justify;'><b>"+n.news_det_date+".- </b>"+n.news_det_text+"</div><hr>\
                              ");
                            }


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
     $("#vistaprevia").show();
     $("#col_derecha_spanish").show();
     $("#col_izquierda_spanish").show();
     $("#bodyTable_spanish").hide();
     $("#col_derecha").hide();
     $("#col_izquierda").hide();
     $("#bodyTable").hide();
     $("#tableReporte").hide();
     $('#divTableTitle h4').remove();

     $('#divTableTitle').append("<h4 style='font-size: 1.5rem;'> Resultados en Espa&ntilde;ol  ( Semanario )</h4>")

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

   $("#ver_sem_spanish").click(function() {
       $("#container_principal").hide();
       $("#consulta").show();
       $("#ver_registro").hide();
       $("#ver_consulta").show();
       $("#ver_save").hide();
       $("#vistaprevia").show();
       $("#col_derecha_spanish").show();
       $("#col_izquierda_spanish").show();
       $("#bodyTable_spanish").hide();
       $("#col_derecha").hide();
       $("#col_izquierda").hide();
       $("#bodyTable").hide();
       $("#tableReporte").hide();
       $('#divTableTitle h4').remove();

       $('#divTableTitle').append("<h4 style='font-size: 1.5rem;'> Resultados en Espa&ntilde;ol  ( Semanario )</h4>")

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
