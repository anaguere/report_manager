<?php
require '../libraries/get_contents.php';
require '../model/connector.php';
require '../model/law_detail.php';
require '../model/law_type.php';
require '../model/news_files.php';

if ($_POST['router'] == "create") {
    $content = new GetContents();
    $files   = new NewsFiles(null, 1, null);

    $file_archive = $content->GetPostContent('law_file');
    $file_name    = $content->GetPostContent('law_file_title');
    $files->setNewsFileArchive($file_archive);
    $files->setNewsFileName($file_name);
    $law_file_id = $files->saveNewsFiles();
    $file_id     = $files->selectAllNewsFiles();
    #echo "<iframe src='data:application/pdf;base64,".$test['contenido'][0]['news_file_id']."' width='200px' height='500px'></iframe>";
    $laws_req       = $content->GetPostContent('laws');
    $law_det_date   = $content->GetPostContent('law_date');
    $law_det_gaceta = $content->GetPostContent('law_gaceta');
    for ($i = 0; $i < count($laws_req); $i++) {
        $laws        = new LawDetail(null, null, null, null, null, null);
        $law_details = explode(",", $laws_req[$i]);
        $laws->setLawDetDate($law_det_date);
        $laws->setLawDetName($law_details[0]);
        $laws->setLawDetType($law_details[1]);
        $laws->setLawFileId($file_id['contenido'][0]['news_file_id']);
        $laws->setLawGacetaNumber($law_det_gaceta);
        $resul = $laws->saveLawDetail();
    }
    echo json_encode($resul);
}

if ($_POST['router'] == "law_types") {
    $law_type = new LawType(null, null, null);
    echo json_encode(array($law_type->selectAllLawType()));
}

