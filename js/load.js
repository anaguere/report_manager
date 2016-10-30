        function DatePicker(){
            $('.datepicker').pickadate({
                selectMonths: true,
                selectYear: 10
            });
        }

        function InitSelect(){
               //Categories list
               $.post("../controller/news_detail_controller.php",
                {router : "list" }).done(function(data){
                    var selects = JSON.parse(data); 
                    categories = selects.category.contenido;
                    clients = selects.client.contenido;
                    for(i =0; i < categories.length ; i++){
                        $('#news_category').append("<option value="+categories[i].news_cat_id+">"+categories[i].news_cat_name+"</option>");
                        $('select').material_select();

                    }
                    for(j =0; j < clients.length ; j++){
                        $('#news_client').append("<option value="+clients[j].cli_lis_id+">"+clients[j].cli_lis_name+"</option>");
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
                    console.log(JSON.parse(data));
                });
            };

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
                news_client : ne($('#news_client').val())
            }).done(function(message){
                var message = message;
            });
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
