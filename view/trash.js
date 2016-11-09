/*

                  $( "#close_vistaprevia" ).click(function() {
                   $('#panel_vistaprevia').hide();
                   $('#container_principal').show();
                 });


                  $( "#vista_previa" ).click(function() {
                   $('#panel_vistaprevia').show();
                   $('#container_principal').hide();
                 });


                  $( "#ver_upload" ).click(function() {

                   $('#panel0004').hide();
                   $('#encabezado_vistaprevia').hide();
                   $('#panel0006').show();

                 });






                  $(".bottom0010").sideNav();

                  $( "#bottom0001" ).click(function() {
                   $('#panel0002').hide();
                   $('#panel0003').hide();
                   $('#panel0001').show();
                 });


                  $( "#bottom0003" ).click(function() {
                   $('#panel0001').hide();
                   $('#panel0002').hide();
                   $('#panel0003').show();
                 });


                  $( "#bottom0004" ).click(function() {
                   $('#panel0005').hide();
                   $('#panel0006').hide();
                   $('#panel0004').show();
                 });

                  $( "#bottom0005" ).click(function() {
                   $('#panel0004').hide();
                   $('#panel0006').hide();
                   $('#panel0005').show();

                 });

                  $( "#bottom0006" ).click(function() {
                   $('#panel0004').hide();
                   $('#panel0005').hide();
                   $('#panel0006').show();

                 });
  */
                    function menuLoad(){



               $( "#menu0002" ).click(function() {
                 $('#index_english').css("display","none");
                 $('#index_spanish').css("display","none");
                 void_menu();

               });


               $( "#menu0004" ).click(function() {
                 $('#index_english').css("display","none");
                 $('#index_spanish').css("display","none");
                 void_menu();
                 $('#panel_menu0004').css("display","block");
               });

               $( "#menu0003" ).click(function() {
                 $('#index_english').css("display","none");
                 $('#index_spanish').css("display","none");
                 void_menu();
               });


               $( "#menu0001" ).click(function() {
                 $('#index_english').css("display","inline-block");
                 $('#index_spanish').css("display","inline-block");
               });



               $("#index_english" ).click(function(){
                $('#panel_menu0001_1').css("display","block");
                $('#panel_menu0001_2').css("display","none");
              });




               $("#index_spanish").click(function(){
                 $('#panel_menu0001_1').css("display","none");
                 $('#panel_menu0001_2').css("display","block");
               });
             }