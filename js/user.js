/*
        function InitSelect(){
                         //Categories list
                         $.post("../controller/user_detail_controller.php",
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
*/
        function ne(x){
            if(x.length<1){
                return " ";
            }else{
                return x;
            }
        };


        function SaveUser(){
            var news_body_html = $('#news_body_es').html();
            var news_img = $(news_body_html).contents().find("img").attr("src");
            var news_body_es = $('#news_body_es').text();


            $.post( "../controller/user_detail_controller.php", {
                router : "create",
                user_inf_full_name: ne($('#user_inf_full_name').val()),
                user_inf_login: ne($('#user_inf_login').val()),
                user_inf_mail: ne($('#user_inf_mail').val()),
                user_inf_national_ID: ne($('#user_inf_national_ID').val()),
                user_inf_password: ne($('#user_inf_password').val()),
                user_inf_type: ne($('#user_inf_type').val())
            }).done(function(message){
                message = JSON.parse(message);
                if(message.conexion){
                    location.reload();
                }else{
                    alert('Ha ocurrido un error al procesar la información, intente nuevamente!');
                }
            });
        };
