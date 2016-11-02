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
                        $("#abc_index").append("<li>\
                                               <div class='collapsible-header' id='header_"+cant+"'>"+i.toUpperCase()+"</div>");
                        if(n.length != 0){
                            $.each(n,function(j,v){
                                $("#header_"+cant).after("<div class='collapsible-body' style='height:auto; line-height:26px'><a onclick='searchNews("+v[0]+")'>"+v[1]+"</a></div>");
                            });
                            $("#header_"+cant).after("</li>");
                        }
                        cant++;
                    });
                });
               };

        //Searching detail news
        function searchNews(news_id){
            console.log(news_id);
            $.post("../controller/news_detail_controller.php",
                   {router:"news_view",
                   news_id : news_id
               }).done(function(data){
                console.log(JSON.parse(data));
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
                news_comment_date : ne($('#comment_date').val()),
                news_comment_es : ne($('#news_comment_es').val()),
                news_title_en : ne($('#news_title_en').val()),
                news_body_en : ne($('#news_body_en').val()),
                news_comment_en : ne($('#news_comment_en').val()),
                news_category : ne($('#news_category').val()),
                news_type : ne($('#news_type').val()),
                news_range : ne($('#news_range').val())
            }).done(function(message){
                if(message == 1){
                    location.reload();
                }else{
                    alert('Ha ocurrido un error al procesar la información, intente nuevamente!');
                }
            });
        };

        //Searching detail news
        function searchNews(news_id){
            console.log(news_id);
            $.post("../controller/news_detail_controller.php",
                   {router:"news_view",
                   news_id : news_id
               }).done(function(data){
                console.log(JSON.parse(data));
            });
           }

        //Sending news to database



        function SaveLey(){
         
            /* tratamiento de los comentarios de las leyes*/
            var comment = new Array();
            var type_comment = new Array();
            y=0;
            for (x = 1; x < 20; x++) {
                if($('#text'+x).val()){
                    comment[y] = $('#text'+x).val();
                    type_comment[y] = $('#selected'+x).val();
                }
            };
            /* fin del tratamiento de los comentarios de las leyes */


                     console.log( $('#news_title_es').val());
                     console.log($('#news_date').val());
                     console.log($('#new_source').val());
                     console.log($('#news_category').val());
                     console.log( comment[0]);
                     console.log(type_comment[0]  );


        };


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
        //View PDF preview
        function PDFViewer(){
            $(this).change(
                           function(event){
                            var path = URL.createObjectURL(event.target.files[0]);
                            $('#pdf_view').attr('src',path);
                        });
        }




        function edit(x,y,z){

            $('#news_comment_es_edit').val($(x).val());
            $('#news_comment_es_edit_value').val(x);
            $('#news_comment_es_edit_value_selected').val(y);
            $('#code').val(z);
       }



       function save(){
        g =  $('#news_comment_es_edit_value_selected').val();
        $(g).val( $('#news_comment_es_edit_selected').val() );
        z =$('#news_comment_es_edit_selected').val();
        if(z.length>1){
        $('#label'+$('#code').val()).text( $('#news_comment_es_edit_selected').val() );
        }else{
        }
        x =  $('#news_comment_es_edit_value').val();
        $(x).val( $('#news_comment_es_edit').val() );
    }

    function delete2(x,y){
       $(x).remove();
       $(y).remove();
   }