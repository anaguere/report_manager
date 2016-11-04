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
            var news_body_html = $(this).html();
            var news_img = $(news_body_html).contents().find("img").attr("src");
            if (news_img != null) {
                $('#h5_title').after("<img id='new_img_prev' src='"+news_img+"' style='margin-left: 5%;' width='90%' height='35%'> ");
            }else{
                $('#h5_title').after("<hr></hr>");
            }
            $('#new_img_prev').attr('src',news_img);
            $('#news_body_prev').text($(this).text());
        });
        $('#news_title_es').focusout(function(){
            $('#news_title_prev').text($(this).val());
        });
        $('#news_date').change(function(){
            var d = new Date($('#news_date').val());
            var date = $('#news_date').val();
            date = date.split(" ");
            $('#news_month_prev').text(date[1]+date[2]+".-");
            $('#news_date_prev').text(d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear());
        });
        $('#news_source').focusout(function(){
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
        





