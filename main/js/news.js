function getAllNews(){
  $.post("../controller/news_detail_controller.php",{
    router : "view_news_names"
  }).done(function(e){
    var result = JSON.parse(e);
    return result;
  });
}
function getAllCategory(){
  $.post("../controller/news_detail_controller.php",{
    router : "list"
  }).done(function(e){
    var result = JSON.parse(e);
    $.each(result,function(i,n){
      $.each(n.contenido,function(y,j){
        $("#list_category").append("<li class='nav-item'>\
          <a class='nav-link' onclick='getNewsDetCategory("+j.news_cat_id+")'>"+j.news_cat_name+"</a>\
        </li>");
      });
    });
  });
}

function priorNews(){
  $.post("../controller/news_detail_controller.php",{
    router : "view_news_names"
  }).done(function(e){
    var result = JSON.parse(e);
    var cant = result.length;
    var news_sel_id = Math.floor(Math.random() * cant);
    var news_sel_id_two = Math.floor(Math.random() * cant);
    while(result[news_sel_id].news_det_priority > 5){
      var news_sel_id = Math.floor(Math.random() * cant);
    }
    while(result[news_sel_id_two].news_det_priority < 5 && result[news_sel_id_two].news_det_priority > 3){
      var news_sel_id_two = Math.floor(Math.random() * cant);
    }
    $('#prior_one_news').append("<a onclick='getNewsDet("+result[news_sel_id].news_det_id+")'>"+result[news_sel_id].news_det_tit+"</a>");
    $('#prior_two_news').append("<a onclick='getNewsDet("+result[news_sel_id].news_det_id+")'>"+result[news_sel_id_two].news_det_tit+"</a>");
    var news_id = result[news_sel_id].news_det_id;
    $.post("../controller/news_detail_controller.php",{
    router : "news_view",
    news_id : news_id 
  }).done(function(e){
    result = JSON.parse(e);
     $('#news_prev').attr('src',result.contenido[0].news_det_file[0].news_file_archive);
  });
  });
}

function getAllYear(){
  $('#list_options').empty();
  $.post("../controller/news_detail_controller.php",{
    router : "view_news_names"
  }).done(function(e){
    var result = JSON.parse(e);
    var years = new Array();
    $.each(result, function(i,n){
      d = new Date(n.news_det_date);
      years.push(d.getFullYear());
    });
    var years = jQuery.unique(years);
    years.sort(function(a,b){
        return a > b;
    });
    var card = " ";
    $.each(years,function(y,j){
      card += "<a ><div class='card' id='options_card'>\
      <div class='card-header' role='tab' id='heading"+y+"' data-toggle='collapse' data-parent='#accordion' href='#collapse_news"+y+"' aria-expanded='false'  aria-controls='collapse_news"+y+"'>\
      <h5 class='mb-0'>\
      ";
      card += j;
    card += "\
    </h5>\
  </div></a>\
  <div id='collapse_news"+y+"' class='collapse' role='tabpanel' aria-labelledby='heading"+y+"'>";
  $.each(result,function(l,m){
    d = new Date(m.news_det_date);
    if(d.getFullYear() == j){
      card += "<div class='card-block' onclick='getNewsDet_VIEW("+m.news_det_id+")'>&nbsp;&nbsp;&nbsp;&nbsp;";
      card += m.news_det_tit;
      card += "</div>";
    }
  });
  card += "</div>";
});
card += "</div>";
$('#list_options').append(card);

  });
}

function getNewsDet(news_id){

localStorage.setItem("id",news_id);
window.location="new.html";


}


function getNewsDet_VIEW($news_id){
  $.post("../controller/news_detail_controller.php",{
    router : "news_view",
    news_id : $news_id,
    function(){ $("#cargando").show();  }
  }).done(function(e){
  
  $("#cargando").hide();
  var result = JSON.parse(e);

  //console.log(result.contenido[0].news_det_file[0].news_file_archive);

  $("#titulo").text(result.contenido[0].news_det_tit);
  $("#fecha").text(result.contenido[0].news_det_date);
  $("#source").text(result.contenido[0].news_det_source);
  $("#categoria").text(result.contenido[0].news_det_category[0].news_cat_name);
  $("#titulo_ingles").text(result.contenido[0].news_det_tit_en);
  $('#pdf').attr('src',result.contenido[0].news_det_file[0].news_file_archive);
  $('#news_prev').attr('src',result.contenido[0].news_det_file[0].news_file_archive);

 $('#divbutton2 a').remove();
  $('#divbutton2').append("<a style=\" width:100%; float:none \" onclick=\"getNewsDet("+$news_id+")\" class=\"btn btn-danger \"> Go To </a>")
         




  });
}


















function getNewsDetCategory($category_id){
  $('#list_options').empty();
  $.post("../controller/news_detail_controller.php",{
    router : "view_news_names"
  }).done(function(e){
    var result = JSON.parse(e);
    var years = new Array();
    var card = " ";
    $.each(result,function(y,j){
      if(j.news_det_category == $category_id){
        card += "<div class='card' id='options_card'>\
        <div class='card-header' role='tab' id='heading"+y+"'>\
        <h5 class='mb-0'>\
        <a data-toggle='collapse' data-parent='#accordion' href='#collapse"+y+"' aria-expanded='false' aria-controls='collapse"+y+"'onclick='getNewsDet_VIEW("+j.news_det_id+")'>";
        card += j.news_det_tit;
        card += "</a>\
        </h5>\
        </div>\
        <div id='collapse"+y+"' class='collapse' role='tabpanel' aria-labelledby='heading"+y+"'>";
        card += "</div>";
        card += "</div>";
        card += "</div>";
        card += "</div>";
      }
});
$('#list_options').append(card);

  });
}

//********************************************** LAWS SECTION ********************************************************
function getAllLaws(){
  $.post("../controller/law_detail_controller.php",{
    router: "view_law_names"
  }).done(function(e){
    var result = JSON.parse(e);
    return result;
  });
}
function getAllLawCategory(){
  $.post("../controller/law_detail_controller.php",{
    router : "law_types"
  }).done(function(e){
    var result = JSON.parse(e);
    $.each(result,function(i,n){
      $.each(n.contenido,function(y,j){
        $("#list_category_laws").append("<li class='nav-item'>\
          <a class='nav-link' onclick='getLawsDetCategory("+j.law_type_id+")'>"+j.law_type_name+"</a>\
        </li>");
      });
    });
  });
}

function priorLaws(){
  $.post("../controller/law_detail_controller.php",{
    router: "view_law_names"
  }).done(function(e){
    var result = JSON.parse(e);
    var cant = result.length;
    var laws_sel_id = Math.floor(Math.random() * cant);
    var laws_sel_id_two = Math.floor(Math.random() * cant);
    $('#prior_one_law').append("<a onclick='getLawDet("+result[laws_sel_id].law_det_id+")'>"+result[laws_sel_id].law_det_name+"</a>");
    if(laws_sel_id_two !== laws_sel_id){
      $('#prior_two_law').append("<a onclick='getLawDet("+result[laws_sel_id].law_det_id+")'>"+result[laws_sel_id_two].law_det_name+"</a>");
    }
  });
}

function getAllYearLaws(){
  $('#list_options_laws').empty();
  $.post("../controller/law_detail_controller.php",{
    router: "view_law_names"
  }).done(function(e){
    var result = JSON.parse(e);
    var years = new Array();
    $.each(result, function(i,n){
      str = n.law_det_date;
      res = str.substr(0,4);
      years.push(res);
    });
    var years = jQuery.unique(years);
    var card = " ";
    $.each(years,function(y,j){
      card += "<div class='card' id='options_card_laws'>\
      <div class='card-header' role='tab' id='heading"+y+"' data-toggle='collapse' data-parent='#accordion' href='#collapse"+y+"' aria-expanded='false'  aria-controls='collapse"+y+"'>\
      <h5 class='mb-0'>\
      <a >";
      card += j;
    card += "</a>\
    </h5>\
  </div>\
  <div id='collapse"+y+"' class='collapse' role='tabpanel' aria-labelledby='heading"+y+"'>";
  $.each(result,function(l,m){
    d = new Date(m.law_det_date);
    if(d.getFullYear() == j){
      card += "<div class='card-block' onclick='getLawDet("+m.law_det_id+")'>";
      card += m.law_det_name;
      card += "</div>";
    }
  });
  card += "</div>";
});
card += "</div>";
$('#list_options_laws').append(card);

  });
}

function getLawDet_VIEW($law_id){
  $.post("../controller/law_detail_controller.php",{
    router : "law_view",
    law_id : $law_id,
    function(){ $("#cargando").show();  }
  }).done(function(e){
    var result = JSON.parse(e);
   $("#cargando").hide();
    
  //console.log(result.contenido[0].law_file_id[0].news_file_archive);
  //console.log(result.contenido[0].law_file_id[0].news_file_name);

  $("#titulo").text(result.contenido[0].law_det_name);
  $("#fecha").text(result.contenido[0].law_det_date);
  $("#source").text(result.contenido[0].law_gaceta_number);
  $("#categoria").text(result.contenido[0].law_det_type[0].law_type_name);
  $('#pdf').attr('src',result.contenido[0].law_file_id[0].news_file_archive);

  });
}




function getLawDet(news_id){
localStorage.setItem("id",news_id);
window.location="law.html";
}











function getLawsDetCategory($category_id){
  $('#list_options_laws').empty();
  $.post("../controller/law_detail_controller.php",{
    router: "view_law_names"
  }).done(function(e){
    var result = JSON.parse(e);
    var card = " ";
    $.each(result,function(y,j){
      if(j.law_det_type_id == $category_id){
        card += "<div class='card' id='options_card_laws'>\
        <div class='card-header' role='tab' id='heading"+y+"'>\
        <h5 class='mb-0'>\
        <a data-toggle='collapse' data-parent='#accordion' href='#collapse"+y+"' aria-expanded='false' aria-controls='collapse"+y+"' onclick='getLawDet("+j.law_det_id+")'>";
        card += j.law_det_name;
        card += "</a>\
        </h5>\
        </div>\
        <div id='collapse"+y+"' class='collapse' role='tabpanel' aria-labelledby='heading"+y+"'>";
        card += "</div>";
        card += "</div>";
        card += "</div>";
        card += "</div>";
      }
});
$('#list_options_laws').append(card);

  });
}
$(document).ready(function(){
  getAllCategory();
  getAllLawCategory();
  priorNews();
  priorLaws();
  getAllYear();
  getAllYearLaws()

});
