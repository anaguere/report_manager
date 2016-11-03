function addComment(){
	 $("#addComment").click(function() {
	 	law_name = $("#law_name").val();
	   	law_type = $("#law_type").val();

   		$("#news_comment_es").append("<p font-size:12px; font-weight:400; width:95%; height:60px;' id='law_name_"+nl+"' data-law_name_="+nl+">"+law_name+"</p>\
   			<div class='col s12' id='div"+nl+"' style='margin-bottom:20px; border-top:1px solid #999; height:40px; padding-top:10px'>\
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
        var path = URL.createObjectURL(event.target.files[0]);
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