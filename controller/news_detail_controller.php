<?php
require '../libraries/get_contents.php';
require '../model/connector.php';
require '../model/news_detail.php';
require '../model/news_comment.php';
require '../model/news_category.php';
require '../model/client_list.php';
require '../model/news_type.php';

if ($_POST['router'] == 'create') {
    $content     = new GetContents();
    $news_detail = new NewsDetail(null, null, null, null, null, null, null, null, null, null);
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

    $news_detail->setNewsDetDate($date);
    $news_detail->setNewsDetImage($img);
    $news_detail->setNewsDetSource($source);
    $news_detail->setNewsDetText($body_es);
    $news_detail->setNewsDetTexten($body_en);
    $news_detail->setNewsDetTit($title_es);
    $news_detail->setNewsDetTiten($title_en);
    $news_detail->setNewsDetCategory($category);
    $news_detail->setNewsDetPriority($range);

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
    $news_list_en = new NewsDetail(null, null, null, null, null, null, null, null, null, null, null, null);
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

    #$news = new NewsDetail(null, null, $content->GetPostContent("news_id"), null, null, null, null, null, null, null, null);
    $news = new NewsDetail(null, null, 22, null, null, null, null, null, null, null, null);
    #echo json_encode($news->selectAllNewsDetail());
    $array_res = $news->selectAllNewsDetail();
    echo base64_decode($array_res['contenido'][0]['news_det_image']);
    echo "<img src='".base64_decode($array_res['contenido'][0]['news_det_image'])."' heigth='50%' width='50%'></img>";
    #print_r($array_res['contenido']['news_det_image']);
}

