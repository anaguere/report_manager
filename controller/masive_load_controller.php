<?php
require '../libraries/get_contents.php';
require '../model/connector.php';
require '../model/law_detail.php';
require '../model/news_detail.php';
require '../model/news_comment.php';
require '../model/client_list.php';
require '../model/news_category.php';
require '../model/news_type.php';
require '../model/news_files.php';
/*
#if ($_POST['type'] == 'news') {
  # code...
  $path = "/home/annralf/Documentos/2012/PDF/";
  $dir = opendir($path);
  $files = array();
  while ($current = readdir($dir)){
    if( $current != "." && $current != "..") {
      if(is_dir($path.$current)) {
        showFiles($path.$current.'/');
      }
      else {
        $files[] = $current;
      }
    }
  }
  for($i=0; $i<count( $files ); $i++){
    $files_law   = new NewsFiles(null, null, null);
    $laws_file = "data:application/pdf;base64,".base64_encode(file_get_contents($path.$files[$i]));
    $cadena = explode(".",$files[$i]);
    $laws_file_name = $cadena[0];
    $files_law->setNewsFileArchive($laws_file);
    $files_law->setNewsFileName($laws_file_name);
    $files_result = $files_law->saveNewsFiles();

    $laws        = new LawDetail(null,null,null,null,null,null);
    $law_name = $laws_file_name;#"Leyes sancionadas 2016";
    $law_date = "2012-01-01";#date("Y/m/d");
    $law_gaceta = "";
    $law_type = 1;
    $laws->setLawDetName($law_name);
    $laws->setLawDetDate($law_date);
    $laws->setLawGacetaNumber($law_gaceta);
    $laws->setLawDetType($law_type);
    $laws->setLawFileId($files_result['contenido']['news_file_id']);
    $laws->saveLawDetail();
    echo $i." - ".$law_name."<br>";


  }*/
#}
#if ($_POST['type'] == 'laws') {
  # code...
  $content     = new GetContents();
  $news_detail = new NewsDetail(null, null, null, null, null, null, null, null, null, null,null);
  $files_l  = new NewsFiles(null,null,null);
  $path = "/home/annralf/Documentos/2011/";
  $dir = opendir($path);
  $files = array();
  while ($current = readdir($dir)){
    if( $current != "." && $current != "..") {
      if(is_dir($path.$current)) {
        showFiles($path.$current.'/');
      }
      else {
        $files[] = $current;
      }
    }
  }

  for($i=0; $i<count( $files ); $i++){
    $title_es    = $files[$i];
    $img     = $content->GetPostContent("news_img");
    $news_file = "data:application/pdf;base64,".base64_encode(file_get_contents($path.$files[$i]));
    $body_es  = "";
    $date     = "2014-01-01";#date("Y/m/d");
    $source   = "OSP";
    $title_en = "";
    $body_en  = "";
    $category = 10;
    $range    = 1;
    $cadena = explode(".",$files[$i]);
    $files_l->setNewsFileName('news_'.$date);
    $files_l->setNewsFileArchive($news_file);
    $file_id = $files_l->saveNewsFiles();
    $news_detail->setNewsDetDate($date);
    $news_detail->setNewsDetImage($img);
    $news_detail->setNewsDetSource($source);
    $news_detail->setNewsDetText($body_es);
    $news_detail->setNewsDetTexten($body_en);
    $news_detail->setNewsDetTit($cadena[0]);
    $news_detail->setNewsDetTiten($title_en);
    $news_detail->setNewsDetCategory($category);
    $news_detail->setNewsDetPriority($range);
    $news_detail->setNewsDetFile($file_id['contenido']['news_file_id']);
    $news_id = $news_detail->saveNewsDetail();

  }
#}
