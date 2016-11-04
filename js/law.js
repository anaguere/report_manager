function DatePicker(){
            $('.datepicker').pickadate({
                selectMonths: true,
                selectYears: true,
                selectYear: 10

            });
        };
function InitSelector(){
	$.post("../controller/law_detail_controller.php",
		{router :"law_types"}).done(function(e){
			var data = JSON.parse(e);
			$.each(data,function(i,n){
				$.each(n.contenido,function(y,f){
					$('#law_type').append("<option value="+f.law_type_id+">"+f.law_type_name+"</option>");
					$('select').material_select();
				});
			});
		});
	}

<<<<<<< HEAD

function reset_modal(){

$("#botonmodal1").click(function() {

$("#law_name").val(" ");


});


 
}


=======
>>>>>>> 0fda90d798f80150dcd8de6effc966053205ed7e
function addComment(){
	 $("#addComment").click(function() {
	 	law_name = $("#law_name").val();
	   	law_type = $("#law_type").val();

   		$("#news_comment_es").append("<p font-size:12px; font-weight:400; width:95%; height:60px;' id='law_name_"+nl+"' data-law_name_="+nl+">"+law_name+"</p>\
   			<div class='col s12' id='div"+nl+"' style='margin-bottom:20px; border-top:1px solid #999; height:40px; padding-top:10px'>\
<<<<<<< HEAD
   			<div style='float:left; width:100px;height:40px'> <a href=\"#modal2\" onclick='editLawName(\"#law_name_"+nl+"\",\"#selected"+nl+"\","+nl+")'><i style='font-size:28px; color:green' class='fa fa-pencil-square'></i></a>\
   			 &nbsp; \
   			<a onclick='deleteLawName(\"#law_name_"+nl+"\",\"#div"+nl+"\",\"#vp"+nl+"\")' ><i   style='font-size:28px; color:red' class='fa fa-minus-square'></i></a></div>\
   			 <div style='float: left;    width: 200px;    height: 40px;    letter-spacing: 1px;    font-size: 24px;    margin-top: -5px;    color: #666;  text-align: left;' id='law_type_text_"+nl+"' data-type_"+nl+"= "+law_type+">"+$("#law_type :selected").text()+"</div>\
   			 </div><br><br>");

   		$('#law_detail_prev').after("<p id='vp"+nl+"' style='padding-left:20px'><br> "+law_name+"</p>");

		nl++; 
 });
}


//deleting DOM element
function deleteLawName(law_name,law_name_div,vista_previa){
	$(law_name).remove();
    $(law_name_div).remove();
    $(vista_previa).remove();
=======
   			<a href=\"#modal2\" onclick='editLawName(\"#law_name_"+nl+"\",\"#selected"+nl+"\","+nl+")'><i style='font-size:22px' class='fa fa-edit'></i></a>\
   			 &nbsp; \
   			 <a onclick='deleteLawName(\"#law_name_"+nl+"\",\"#div"+nl+"\")' href='#'><i   style='font-size:22px' class='fa fa-trash'></i></a>\
   			 <p id='law_type_text_"+nl+"' data-type_"+nl+"= "+law_type+">"+$("#law_type :selected").text()+"</p>\
   			 </div><br><br>");
   		$('#law_detail_prev').after("<p>"+law_name+"</p>");
		nl++; 
 });
}
//deleting DOM element
function deleteLawName(law_name,law_name_div){
	$(law_name).remove();
    $(law_name_div).remove();
>>>>>>> 0fda90d798f80150dcd8de6effc966053205ed7e
}

function editLawName(law_name,law_type,nl){
	$("#law_name_edit").attr('data-law_name',nl);
    $('#law_name_edit').val($("#law_name_"+nl).text());
    $('#law_type_edit').before('<p>'+$('#law_type_text_'+nl).text()+'</p>')
    $('#law_type_edit').val($('#law_type_text_'+nl).attr('data-type_'+nl));
}


function saveLawEdit(){
	var law_name_id = $('#law_name_edit').attr('data-law_name');
	var law_name_edit = $('#law_name_edit').val();
	var law_type_id = $('#law_type_edit').val();
	var law_type_name = $('#law_type_edit :selected').text();
	$('#law_name_'+law_name_id).text(law_name_edit);
	$('#law_type_text_'+law_name_id).text(law_type_name);
	$('#law_type_text_'+law_name_id).attr('data-type_'+law_name_id,law_type_id);
    }

//View PDF preview
function PDFViewer(){
    $(this).change(function(event){
        window.path = URL.createObjectURL(event.target.files[0]);
        $('#pdf_view').attr('src',path);
    });
}

function preView(){
	var date;
	$('#law_date').change(function(){
		date = $(this).val();
		d = new Date(date);
		$('#law_year').text(d.getFullYear());
	});
	$('#law_gaceta').focusout(function(){
		d = new Date($('#law_date').val());
		$('#law_gaceta_prev').text($(this).val());
		$('#law_date_prev').text(d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear());
	});
}

function saveLaw(){
	var law_list = new Array();

	var xhr = new XMLHttpRequest;
	xhr.responseType = 'blob';

	xhr.onload = function() {
	   var recoveredBlob = xhr.response;

	   var reader = new FileReader;

	   reader.onload = function() {
	    var blobAsDataUrl = reader.result;
	    //window.path_complete = blobAsDataUrl;
	    for (var i = 0; i < nl; i++) {
			var ll = new Array();
			ll[0] = $('#law_name_'+i).text();
			ll[1] = $('#law_type_text_'+i).attr('data-type_'+i);
			law_list.push(ll);
		}
		$.post("../controller/law_detail_controller.php",
			{
				router :"create",
				law_date : $('#law_date').val(),
				law_gaceta : $('#law_gaceta').val(),
				'laws[]' : law_list,
				law_file_title : $('#law_file_title').val(),
				//law_file : blobAsDataUrl
			});
	   };

	 reader.readAsDataURL(recoveredBlob);
	};

	xhr.open('GET', path);
	xhr.send();

	
	}