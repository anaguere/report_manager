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
  $content     = new GetContents();
  $news_detail = new NewsDetail(null, null, null, null, null, null, null, null, null, null,null);
  $files_l  = new NewsFiles(null,null,null);
  $path = "../Leyes/2010/";
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
    #$news_file = "data:application/pdf;base64,".base64_encode(file_get_contents($path.$files[$i]));
  #  $news_file = file_get_contents($path.$files[$i]);
    $body_es  = "";
    $date     = "2015-07-01";#date("Y/m/d");
    $source   = "OSP";
    $title_en = "";
    $body_en  = "";
    $category = 10;
    $range    = 1;
    $file_path = $path.$files[$i];
    $cadena = explode(".",$files[$i]);
    $files_l->setNewsFileName('news_'.$date);
    $files_l->setNewsFileArchive($file_path);
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
