<?php
header( 'Cache-Control: no-store, no-cache, must-revalidate' );
header( 'Cache-Control: post-check=0, pre-check=0', false );
header( 'Pragma: no-cache' );
require '../libraries/get_contents.php';
require '../model/connector.php';
require '../model/law_detail.php';
require '../model/law_type.php';
require '../model/news_files.php';

if ($_POST['router'] == "create") {
  $content = new GetContents();
  $files   = new NewsFiles(null, null, null);

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
    $laws        = new LawDetail(null,null,null,null,null,null);
    #$law_details = explode(",", $laws_req[$i]);
    $val = substr($laws_req[$i],0,-2);
    $val2 = substr($laws_req[$i],-1);
    $laws->setLawDetDate($law_det_date);
    $laws->setLawDetName($val);
    $laws->setLawDetType($val2);
    $laws->setLawFileId($law_file_id['contenido']['news_file_id']);
    $laws->setLawGacetaNumber($law_det_gaceta);
    $resul = $laws->saveLawDetail();
  }
  echo json_encode($resul);
}

if ($_POST['router'] == "law_types") {
  $law_type = new LawType(null, null, null);
  echo json_encode(array($law_type->selectAllLawType()));
}





if ($_POST['router'] == "law_view") {

    $content = new GetContents();
    $law_id  = $content->GetPostContent('law_id');
    $law     = new LawDetail(null, $law_id, null, null, null, null);
    $result = $law->selectAllLawDetail();
    usort($result['contenido'], function ($a, $b)
    {
      return $a['law_det_date'] > $b['law_det_date'];
    });
     echo json_encode($result);
}





if ($_POST['router'] == "view_law_names") {
  $law       = new LawDetail(null, null, null, null, null, null);
  $law_names = $law->selectOneTypeLawDetail(array("law_det_id", "law_det_name", "law_gaceta_number", "law_det_type","law_det_date"));
  usort($law_names['contenido'], function ($a, $b)
  {
    return $a['law_det_name'] > $b['law_det_name'];
  });
  $new = array();
  foreach ($law_names['contenido'] as $det => $val) {
    $law_type                   = new LawType(null, $val['law_det_type'], null);
    $type                       = $law_type->selectAllLawType();
    $final['law_det_id']        = $val['law_det_id'];
    $final['law_det_name']      = $val['law_det_name'];
    $final['law_gaceta_number'] = $val['law_gaceta_number'];
    $final['law_det_date'] = $val['law_det_date'];
    $final['law_det_type']      = $type['contenido'][0]['law_type_name'];
    array_push($new, $final);
  }
  usort($new, function ($a, $b)
  {
    return $a['law_det_date'] > $b['law_det_date'];
  });
  echo json_encode($new);
}


if ($_POST['router'] == "conditionalSearch") {



  $law       = new LawDetail(null, null, null, null, null, null);
  $content = new GetContents();
  $desde  = $content->GetPostContent('desde');
  $hasta  = $content->GetPostContent('hasta');
  $gaceta  = $content->GetPostContent('gaceta');
  $categoria  = $content->GetPostContent('categoria');
  $anio = $content->GetPostContent('anio');
  $fields = array();
  $final = array();
  $final['contenido'] = array();
  array_push($final,$result['conexion']);
  if ($gaceta !== "") {
    # code...
    $fields[law_gaceta_number] = $gaceta;
  }
  if ($categoria !== "") {
    # code...
    $fields[law_det_type] = (int)$categoria;
  }
  if($desde !== "" && $hasta !== ""){
    $fields[law_det_date] = array ($desde,$hasta);
  }
  $result = $law->RangeSearchLawDetail($fields);
  #handling array options
  foreach ($result['contenido'] as $key => $value) {
    $array = array();
    $type = new LawType(null,$value['law_det_type'],null);
    $type_names =$type->selectAllLawType();
    $value['law_det_type'] = $type_names['contenido'][0]['law_type_name'];
    foreach ($value as $det => $val) {
      $array[$det] = ($det == "law_type_name") ? $type_names['contenido'][0]['law_type_name'] : $val ;
    }
    if($anio !== ""){
      $date = date('Y', strtotime($value['law_det_date']));
      if ($date == $anio) {
      # code...
        array_push($final['contenido'],$array);
    }}else{
      array_push($final['contenido'],$array);
    }
  }
  usort($final['contenido'], function ($a, $b)
  {
    return $a['law_det_date'] > $b['law_det_date'];
  });
  echo json_encode($final);
}








if ($_POST['router'] == 'update') {



  $content = new GetContents();
  $id = $content->GetPostContent('law_id');
  $law       = new LawDetail(null,$id,null,null,null,null);
  $gaceta = $content->GetPostContent('law_gaceta');
  $date = $content->GetPostContent('law_date');
  $name = $content->GetPostContent('law_name');
  $type = $content->GetPostContent('law_type');
  $law->setLawGacetaNumber($gaceta);
  $law->setLawDetDate($date);
  $law->setLawDetName($name);
  $law->setLawDetType($type);

  echo json_encode($law->updateLawDetail($id));

}

if ($_POST['router'] == 'delete') {
  $law       = new LawDetail(null,null,null,null,null,null);
  $content = new GetContents();
  $id = $content->GetPostContent('law_id');
  echo json_encode($law->deleteLawDetail($id));
}
