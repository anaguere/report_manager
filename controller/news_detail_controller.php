<?php
require '../libraries/get_contents.php';
require '../model/connector.php';
require '../model/news_detail.php';
require '../model/news_comment.php';
require '../model/news_category.php';
require '../model/client_list.php';

if ($_POST['router'] == 'create') {
    $content      = new GetContents();
    $news_detail  = new NewsDetail(null, null, null, null, null, null, null, null, null, null);
    $title_es     = $content->GetPostContent("news_title_es");
    $img          = base64_encode(file_get_contents($content->GetPostContent("news_img")));
    $body_es      = $content->GetPostContent("news_body_es");
    $date         = $content->GetPostContent("news_date");
    $source       = $content->GetPostContent("news_source");
    $comment_es   = $content->GetPostContent("news_comment_es");
    $title_en     = $content->GetPostContent("news_title_en");
    $body_en      = $content->GetPostContent("news_body_en");
    $comment_en   = $content->GetPostContent("news_comment_en");
    $comment_date = $content->GetPostContent("news_comment_date");
    $client       = $content->GetPostContent("news_client");
    $category     = $content->GetPostContent("news_category");

    $news_detail->setNewsDetDate($date);
    $news_detail->setNewsDetImage($img);
    $news_detail->setNewsDetUrl($source);
    $news_detail->setNewsDetText($body_es);
    $news_detail->setNewsDetTexten($body_en);
    $news_detail->setNewsDetTit($title_es);
    $news_detail->setNewsDetTiten($title_en);
    $news_detail->setNewsDetClient($client);
    $news_detail->setNewsDetCategory($category);
    $news_id = $news_detail->saveNewsDetail();

    $news_comment = new NewsComment(null, null, null, null, null, null);
    $news_comment->setNewsComComment($comment_es);
    $news_comment->setNewsComCommenten($comment_en);
    $news_comment->setNewsComDate($comment_date);
    $news_comment->setNewsComNewsid($news_id['contenido']['news_det_id']);
    $saveNewsComment = $news_comment->saveNewsComment();
    echo $saveNewsComment['conexion'];
}

if ($_POST['router'] == "list") {
    $category = new NewsCategory(null, null, null);
    $client   = new ClientList(null, null, null);
    echo json_encode(array("client" => $client->selectAllClientList(), "category" => $category->selectAllNewsCategory()));
}

