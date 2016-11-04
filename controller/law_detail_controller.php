<?php
require '../libraries/get_contents.php';
require '../model/connector.php';
require '../model/law_detail.php';
require '../model/law_type.php';
require '../model/news_files.php';

if ($_POST['create']) {
    $content = new GetContents();
    $laws    = new LawDetail(null, null, null, null, null, null);
    $files   = new NewsFiles(null, 1, null);

    $file_archive = base64_encode(file_get_contents($content->GetPostContent('test.pdf')));
    $file_name    = $content->GetPostContent('law_gaceta')."-".$content->GetPostContent('law_date');

    $files->setNewsFileArchive($file_archive);
    $files->setNewsFileName($file_name);
    $law_file_id = $files->saveNewsFiles();

    $file_id = $files->selectAllNewsFiles();
    #echo "<iframe src='data:application/pdf;base64,".$test['contenido'][0]['news_file_id']."' width='200px' height='500px'></iframe>";
    $law_det_date   = $content->GetPostContent('law_date');
    $law_det_name   = $content->GetPostContent('law_name');
    $law_det_type   = $content->GetPostContent('law_type');
    $law_det_file   = $file_id['contenido'][0]['news_file_id'];
    $law_det_gaceta = $content->GetPostContent('law_gaceta');

    $laws->setLawDetDate($law_det_date);
    $laws->setLawDetName($laws_det_name);
    $laws->setLawDetType($law_det_type);
    $laws->setLawFileId($law_det_file);
    $laws->setLawGacetaNumber($law_det_gaceta);

    echo json_encode($laws->saveLawDetail());
}

if ($_POST['router'] == "law_types") {
    $law_type = new LawType(null, null, null);
    echo json_encode(array($law_type->selectAllLawType()));
}

