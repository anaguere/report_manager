<?php
require '../libraries/get_contents.php';
require '../model/connector.php';
require '../model/news_detail.php';
require '../model/news_comment.php';
require '../model/client_list.php';
require '../model/news_category.php';
require '../model/news_type.php';
require '../model/news_files.php';

if ($_POST['router'] == 'create') {
  $content     = new GetContents();
  $news_detail = new NewsDetail(null, null, null, null, null, null, null, null, null, null,null);
  $files  = new NewsFiles(null,null,null);
  $news_file = $content->GetPostContent('news_file');
  $title_es    = $content->GetPostContent("news_title_es");
  $tmp_img     = $content->GetPostContent("news_img");
  if (empty($tmp_img)) {
    $img = "N/E";
  } else {
    $img = base64_encode(file_get_contents($tmp_img));
  }
  $body_es  = $content->GetPostContent("news_body_es");
  $date     = $content->GetPostContent("news_date");
  $source   = $content->GetPostContent("news_source");
  $title_en = $content->GetPostContent("news_title_en");
  $body_en  = $content->GetPostContent("news_body_en");
  $category = $content->GetPostContent("news_category");
  $range    = $content->GetPostContent("news_range");

  $files->setNewsFileName('news_'.$date);
  $files->setNewsFileArchive($news_file);
  $file_id = $files->saveNewsFiles();

  $news_detail->setNewsDetDate($date);
  $news_detail->setNewsDetImage($img);
  $news_detail->setNewsDetSource($source);
  $news_detail->setNewsDetText($body_es);
  $news_detail->setNewsDetTexten($body_en);
  $news_detail->setNewsDetTit($title_es);
  $news_detail->setNewsDetTiten($title_en);
  $news_detail->setNewsDetCategory($category);
  $news_detail->setNewsDetPriority($range);
  $news_detail->setNewsDetFile($file_id['contenido']['news_file_id']);

  $news_id = $news_detail->saveNewsDetail();

  echo json_encode($news_id);
}

if ($_POST['router'] == "list") {
  $category = new NewsCategory(null, null, null);
  $type     = new NewsType(null, null, null);

  echo json_encode(array("category" => $category->selectAllNewsCategory(),
  "type"                          => $type->selectAllNewsType()
));
}

if ($_POST['router'] == "view_index_titles") {
  #_____________________________Selection spanish list___________________________________
  $news_list_es = new NewsDetail(null, null, null, null, null, null, null, null, null, null, null, null);
  $title_es     = $news_list_es->selectOneTypeNewsDetail(array("news_det_tit", "news_det_id"));
  for ($i = 97; $i <= 122; $i++) {
    $spanish_list[chr($i)] = array();
    foreach ($title_es['contenido'] as $title => $text) {
      $tmp = array_filter(mb_split('[\W+\s]', strtolower($text['news_det_tit'])));
      if (substr($tmp[0], 0, 1) == chr($i)) {
        array_push($spanish_list[chr($i)], array($text['news_det_id'], $text['news_det_tit']));
      }
    }}
    #_____________________________Selection english list___________________________________
    $news_list_en = new NewsDetail(null,null, null, null, null, null, null, null, null, null, null, null, null);
    $title_es     = $news_list_en->selectOneTypeNewsDetail(array("news_det_tit_en", "news_det_id"));
    for ($i = 97; $i <= 122; $i++) {
      $english_list[chr($i)] = array();
      foreach ($title_es['contenido'] as $title => $text) {
        $tmp = array_filter(mb_split('[\W+\s]', strtolower($text['news_det_tit_en'])));
        if (substr($tmp[0], 0, 1) == chr($i)) {
          array_push($english_list[chr($i)], array($text['news_det_id'], $text['news_det_tit_en']));
        }
      }}
      echo json_encode(array("spanish_list" => $spanish_list, "english_list" => $english_list));
    }

    if ($_POST['router'] == "news_view") {
      $content = new GetContents();
      $news_id = (int)$content->GetPostContent("news_id");
      $news    = new NewsDetail(null,null,null,$news_id,null,null,null,null,null,null,null);
      echo json_encode($news->selectAllNewsDetail());
    }

    if ($_POST['router'] == "range_search") {
      $news = new NewsDetail(null,null,null,null,null,null,null,null,null,null,null);
      $content = new GetContents();
      $desde = $content->GetPostContent('desde');
      $hasta = $content->GetPostContent('hasta');
      $categoria = (int)$content->GetPostContent('categoria');
      $field = array();
      $field['news_det_category'] = $categoria;
      if($desde != "" && $hasta != ""){
        $field['news_det_date'] = array($desde,$hasta);
      }
      $result = $news->RangeSearchNewsDetail($field);
      #-------------Searrch categories ----------------------------
      $final = array();
      foreach ($result['contenido'] as $key => $value) {
        $array = array();
        $category = new NewsCategory(null, $value['news_det_category'], null);
        $cat_names =$category->selectAllNewsCategory();
        $value['news_det_category'] = $cat_names['contenido'][0]['news_cat_name'];
        foreach ($value as $det => $val) {
          $array[$det] = ($det == "news_det_category") ? $cat_names['contenido'][0]['news_cat_name'] : $val ;
        }
        array_push($final,$array);
      }
      echo json_encode($final);
    }

    if ($_POST['router'] == 'update') {
      $content = new GetContents();
      $news_id = $content->GetPostContent('news_id');
      $news = new NewsDetail(null,null,null,$news_id,null,null,null,null,null,null,null);
      $body_es  = $content->GetPostContent("news_body_es");
      $date     = $content->GetPostContent("news_date");
      $source   = $content->GetPostContent("news_source");
      $title_en = $content->GetPostContent("news_title_en");
      $body_en  = $content->GetPostContent("news_body_en");
      $category = $content->GetPostContent("news_category");
      $range    = $content->GetPostContent("news_range");

      $news_detail->setNewsDetDate($date);
      $news_detail->setNewsDetSource($source);
      $news_detail->setNewsDetText($body_es);
      $news_detail->setNewsDetTexten($body_en);
      $news_detail->setNewsDetTit($title_es);
      $news_detail->setNewsDetTiten($title_en);
      $news_detail->setNewsDetCategory($category);
      $news_detail->setNewsDetPriority($range);
      echo json_encode($news->updateNewsDetail($news_id));
    }

    if($_POST['router'] == 'delete'){
      $news = new NewsDetail(null,null,null,null,null,null,null,null,null,null,null);
      $content = new GetContents();
      $news_id = $content->GetPostContent('news_id');
      echo json_encode($news->deleteNewsDetail($news_id));
    }
