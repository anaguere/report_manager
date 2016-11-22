//********************************************** LAWS SECTION ********************************************************
function getAllLaws(){
  $.post("../controller/law_detail_controller.php",{
    router: "view_law_names"
  }).done(function(e){
    var result = JSON.parse(e);
     if(typeof(localStorage.getItem('law_list')) === undefined){
      localStorage.setItem('law_list',JSON.stringify(result));
    }else{
     localStorage.law_list =  JSON.stringify(result);
    }    
  });

  $.post("../controller/law_detail_controller.php",{
    router : "law_types"
  }).done(function(e){
    var result = JSON.parse(e);
    localStorage.setItem('law_category',JSON.stringify(result));
    
  });
}
function getAllLawCategory(){
  $('#list_name').text('Laws by category');
  $('.list-items ul').empty();
  var result = JSON.parse(localStorage.getItem('law_category'));
  var card = " ";
  $.each(result,function(i,n){
      $.each(n.contenido,function(y,j){
        if(j.law_type_id == 2 || j.law_type_id == 3){
          card += "<li title='"+j.law_type_name+"' class='tag-list' onclick='getLawByCategory("+j.law_type_id+")' >"+j.law_type_name+"</li>";
        }
      });
    });
  $('.list-items ul').append(card);
}

function getAllYearLaws(){
  $('#list_name').text('Laws by year');
  $('.list-items ul').empty();
    var result = JSON.parse(localStorage.getItem('law_list'));
    var years = new Array();
    $.each(result, function(i,n){
      str = n.law_det_date;
      res = str.substr(0,4);
      years.push(res);
    });
    var years = jQuery.unique(years);
    var card = " ";
    $.each(years,function(y,j){
      card += "<li title='"+j+" News' class='tag-list' onclick='getNewsByYear("+j+")' >"+j+"</li>";
    });
  $('.list-items ul').append(card);
}

function getNewsByYear(year) {
  $('#pdf').hide();
  $('.list-news-det').empty().show();
  var law_list = JSON.parse(localStorage.getItem('law_list'));
  var list = " ";
  $.each(law_list,function(i,n){
    str = n.law_det_date;
    res = str.substr(0,4);
    if(res == year){
      list += "<li class='news-list' title='Open "+n.law_det_name+"' onclick='getLaw("+n.law_det_id+")'>";
      list += "<strong>"+n.law_det_type+"</strong>";
      list += "<div style='marging-left:100px'>\
                <i title='Law preview' class='fa fa-eye' onclick='getLaw("+n.law_det_id+")' style='padding-left=5px; cursor=pointer;'></i>\
                <i title='Edit law information' class='fa fa-pencil-square-o' onclick='getLawEdit("+n.law_det_id+")' style='padding-left=5px; cursor=pointer;'></i>\
                <i title='Delete law' class='fa fa-trash' style='padding-left=5px; cursor=pointer;' onclick='deleteLaw("+n.law_det_id+")'></i>\
              </div>";
      list += "<h4>"+n.law_det_name+"</h4>";
      list += "</li>";
    }
  });
  $('.list-news-det').append(list);
}

function getLawByCategory(category) {
  $('#pdf').hide();
  $('#pdf_edit').hide();
  $('.list-news-det').empty().show();
  var law_list = JSON.parse(localStorage.getItem('law_list'));
  var list = " ";
  $.each(law_list,function(i,n){
    if(n.law_det_type_id == category){
      list += "<li class='news-list' title='Open "+n.law_det_name+"'>";
      list += "<strong>"+n.law_det_type+"</strong>";
      list += "<div style='marging-left:100px'>\
                <i title='Law preview' class='fa fa-eye' onclick='getLaw("+n.law_det_id+")' style='padding-left=5px; cursor=pointer;'></i>\
                <i title='Edit law information' class='fa fa-pencil-square-o' onclick='getLawEdit("+n.law_det_id+")' style='padding-left=5px; cursor=pointer;'></i>\
                <i title='Delete law' class='fa fa-trash' style='padding-left=5px; cursor=pointer;' onclick='deleteLaw("+n.law_det_id+")'></i>\
              </div>";
      list += "<h4>"+n.law_det_name+"</h4>";
      list += "</li>";
    }
  });
  $('.list-news-det').append(list);
}

function getLaw(law_id){
    $('#pdf_name #pdf_category #pdf_date').text(" ");
    $('#pdf_view').attr('src'," ");
    $('.list-news-det').hide();
    $.post("../controller/law_detail_controller.php",{
    router : "law_view",
    law_id : law_id,
    function(){ $("#cargando").show()}
  }).done(function(e){
    result = JSON.parse(e);


    $('#pdf_name').text(result.contenido[0].law_det_name);
    $('#pdf_category').text(result.contenido[0].law_det_type[0].law_type_name);
    $('#pdf_date').text(result.contenido[0].law_det_date);
    $('#pdf_view').attr('src',result.contenido[0].law_file_id[0].news_file_archive);
    $("#cargando").hide();
    $('#pdf').show();

  });
}

function deleteLaws(){
  localStorage.removeItem('law_list');
  localStorage.removeItem('law_category');
}

function validateSession(){
  if (typeof(sessionStorage.login) === "undefined" && typeof(sessionStorage.user_name) === "undefined") {
      location = "login.html";
  } 
}

//***************************************** Admin functions ***********************************************
function getLawEdit(law_id) {
  $('#pdf').hide();
  $('.list-news-det').hide();
  $('#pdf_edit').show();
  $.post("../controller/law_detail_controller.php",{
    router : "law_view",
    law_id : law_id,
    function(){ $("#cargando").show()}
  }).done(function(e){
      var result = JSON.parse(e);
      $('#law_number').val(result.contenido[0].law_gaceta_number);
      $('#law_date').val(result.contenido[0].law_det_date);
      $('#law_name').val(result.contenido[0].law_det_name);
      $('#pdf_view_edit').attr('src',result.contenido[0].law_file_id[0].news_file_archive);
      $('#save_edit').attr('onclick','getLawUpdate('+result.contenido[0].law_det_id+')')
      var law_types = JSON.parse(localStorage.getItem('law_category'));
      $.each(law_types,function(i,n){
        $.each(n.contenido,function(j,k){
          $('#law_type').append("<option value='"+k.law_type_id+"'>"+k.law_type_name+"</option>");
        });
      });
      $("#cargando").hide();

  });
}

function getLawUpdate(law_id) {

  $.post("../controller/law_detail_controller.php",{
    router : "update",
    law_id : law_id,
    law_gaceta : $('#law_number').val(),
    law_date : $('#law_date').val(),
    law_name : $('#law_name').val(),
    law_type : $('#law_type').val()
  }).done(function(e){
      var result = JSON.parse(e)
      if (result.conexion) {
        alert('Successful');
        location.reload();
      }else{
        alert('Having something wrong, please try again!');
      }
  });
}

function cancelLawUpdate(){
  location.reload();
}

function deleteLaw(law_id){
  $.post("../controller/law_detail_controller.php",{
    router : 'delete',
    law_id : law_id
  }).done(function(e){
    var result = JSON.parse(e);
    if(result.conexion){
      alert('Delete successful');
    }else{
        alert('Having something wrong, please try again!');
    }
    location.reload();
  });
}
$(document).ready(function(){

getAllLaws();
getAllYearLaws();
validateSession();
});
