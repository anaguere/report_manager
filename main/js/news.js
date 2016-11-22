function getAllNews(){
  $.post("../controller/news_detail_controller.php",{
    router : "view_news_names"
  }).done(function(e){
    var result = JSON.parse(e);
    if(typeof(localStorage.getItem('news_list')) === undefined){
      localStorage.setItem('news_list',JSON.stringify(result));
    }else{
     localStorage.news_list =  JSON.stringify(result);
    }
  });

   $.post("../controller/news_detail_controller.php",{
    router : "list"
  }).done(function(e){
    var result = JSON.parse(e);
    localStorage.setItem('news_category',JSON.stringify(result));
  });
}

function priorNews(){
    var result = JSON.parse(localStorage.getItem('news_list'));
    var cant = result.length;
    var news_sel_id = Math.floor(Math.random() * cant);
    var news_sel_id_two = Math.floor(Math.random() * cant);
    while(result[news_sel_id].news_det_priority > 5){
      var news_sel_id = Math.floor(Math.random() * cant);
    }
    var news_id = result[news_sel_id].news_det_id;
    $.post("../controller/news_detail_controller.php",{
    router : "news_view",
    news_id : news_id,
    function(){ $("#cargando").show()}
  }).done(function(e){
    result = JSON.parse(e);
    $('#pdf_name').text(result.contenido[0].news_det_tit);
    $('#pdf_category').text(result.contenido[0].news_det_category[0].news_cat_name);
    $('#pdf_date').text(result.contenido[0].news_det_date);
    $('#pdf_view').attr('src',result.contenido[0].news_det_file[0].news_file_archive);
    $("#cargando").hide();
    $("#pdf").show();
  });
}
//*********************************************************** NEWS new view ******************************************************************
function getAllYearView(){
  $('#list_name').text('News by year');
  $('.list-items ul').empty();
    var result = JSON.parse(localStorage.getItem('news_list'));
    var years = new Array();
    var card = " ";
    $.each(result, function(i,n){
      d = new Date(n.news_det_date);
      years.push(d.getFullYear());
    });
    var years = jQuery.unique(years);
    years.sort(function(a,b){
        return a > b;
    });
    $.each(years,function(y,j){
      card += "<li title='"+j+" News' class='tag-list' onclick='getNewsByYear("+j+")' >"+j+"</li>";
    
  $.each(result,function(l,m){
    d = new Date(m.news_det_date);
  });
});
$('.list-items ul').append(card);
}

function getAllCategoryView(){
  $('#pdf').hide();
  $('#pdf_edit').hide();
  $('#list_name').text('News by category');
  $('.list-items ul').empty();
  result = JSON.parse(localStorage.getItem('news_category'));
  var card = " ";
  $.each(result,function(i,n){
      $.each(n.contenido,function(y,j){
        card += "<li title='"+j.news_cat_name+"' class='tag-list' onclick='getNewsByCategory("+j.news_cat_id+")' >"+j.news_cat_name+"</li>";
      });
    });
  $('.list-items ul').append(card);
}

function getNewsByYear(year) {
  $('#pdf').hide();
  $('.list-news-det').empty().show();
  var news_list = JSON.parse(localStorage.getItem('news_list'));
  var list = " ";
  $.each(news_list,function(i,n){
    str = n.news_det_date;
    res = str.substr(0,4);
    if(res == year){
      list += "<li class='news-list' title='Open "+n.news_det_tit+"' onclick='getNews("+n.news_det_id+")'>";
      list += "<strong>"+n.news_det_cat_name+"</strong>";
      list += "<h4>"+n.news_det_tit+"</h4>";
      list += "</li>";
    }
  });
  $('.list-news-det').append(list);
}

function getNewsByCategory(category) {
  $('#pdf').hide();
  $('#pdf_edit').hide();
  $('.list-news-det').empty().show();
  var news_list = JSON.parse(localStorage.getItem('news_list'));
  var list = " ";
  $.each(news_list,function(i,n){
    if(n.news_det_category == category){
      list += "<li class='news-list' title='Open "+n.news_det_tit+"' onclick='getNews("+n.news_det_id+")'>";
      list += "<strong>"+n.news_det_cat_name+"</strong>";
      list += "<div style='marging-left:100px'>\
                <i title='Law preview' class='fa fa-eye' onclick='getNews("+n.news_det_id+")' style='padding-left=5px; cursor=pointer;'></i>\
                <i title='Edit news information' class='fa fa-pencil-square-o' onclick='getNewsEdit("+n.news_det_id+")' style='padding-left=5px; cursor=pointer;'></i>\
                <i title='Delete news' class='fa fa-trash' style='padding-left=5px; cursor=pointer;' onclick='deleteNews("+n.law_det_id+")'></i>\
              </div>";
      list += "<h4>"+n.news_det_tit+"</h4>";
      list += "</li>";
    }
  });
  $('.list-news-det').append(list);
}

function getNews(news_id){
    $('#pdf_name #pdf_category #pdf_date').text(" ");
    $('#pdf_view').attr('src'," ");
    $('.list-news-det').hide();
    $.post("../controller/news_detail_controller.php",{
    router : "news_view",
    news_id : news_id,
    function(){ $("#cargando").show()}
  }).done(function(e){
    result = JSON.parse(e);


    $('#pdf_name').text(result.contenido[0].news_det_tit);
    $('#pdf_category').text(result.contenido[0].news_det_category[0].news_cat_name);
    $('#pdf_date').text(result.contenido[0].news_det_date);
    $('#pdf_view').attr('src',result.contenido[0].news_det_file[0].news_file_archive);
    $("#cargando").hide();
    $('#pdf').show();

  });
}

function deleteNews(){
  localStorage.removeItem('news_list');
  localStorage.removeItem('news_category');
}

function validateSession(){
  if (typeof(sessionStorage.login) === "undefined" && typeof(sessionStorage.user_name) === "undefined") {
      location = "login.html";
  } 
}

//***************************************** Admin functions ***********************************************
function getNewsEdit(news_id) {
  $('#pdf').hide();
  $('.list-news-det').hide();
  $('#pdf_edit').show();
  $.post("../controller/news_detail_controller.php",{
    router : "news_view",
    news_id : news_id, 
    function(){ $("#cargando").show()}
  }).done(function(e){
      var result = JSON.parse(e);
      $('#news_name').val(result.contenido[0].news_det_tit);
      $('#news_date').val(result.contenido[0].news_det_date);
      $('#pdf_view_edit').attr('src',result.contenido[0].news_det_file[0].news_file_archive);
      $('#save_edit').attr('onclick','getNewsUpdate('+result.contenido[0].news_det_id+')')
      var news_types = JSON.parse(localStorage.getItem('news_category'));
      $.each(news_types,function(i,n){
        $.each(n.contenido,function(j,k){
          $('#news_type').append("<option value='"+k.news_cat_id+"'>"+k.news_cat_name+"</option>");
        });
      });
      $("#cargando").hide();

  });
}

function getNewsUpdate(news_id) {

  $.post("../controller/news_detail_controller.php",{
    router : "update",
    news_id : news_id,
    news_title_es : $('#news_name').val(),
    news_date : $('#news_date').val(),
    news_category : $('#news_type').val(),
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

function cancelNewsUpdate(){
  location.reload();
}

function deleteLaw(news_id){
  $.post("../controller/news_detail_controller.php",{
    router : 'delete',
    news_id : news_id
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
validateSession();
getAllNews();
getAllYearView();
});
