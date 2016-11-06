<?php
require '../libraries/get_contents.php';
require '../model/connector.php';
require '../model/users_details.php';

if($_POST̈́['router'] == 'create'){
  $content = new GetContents();
  $user = new UsersDetails(null,null,null,null,null,null,null);
  $user_name = $content('user_inf_full_name');
  $user_login = $content('user_inf_login');
  $user_mail = $content('user_inf_mail');
  $user_nationalid = $content('user_inf_national_ID');
  $user_password = md5($content('user_inf_password'));
  $user_type = $content('user_inf_type');

  $user->setUserInfFullname($user_name);
  $user->setUserInfLogin($user_login);
  $user->setUserInfMail($user_mail);
  $user->setUserInfNationalid($user_nationalid);
  $user->setUserInfPassword($user_password);
  $user->setUserInfType($user_type);
  $user_create = $user->saveUsersDetails();

  echo json_encode($user_create);
}

if ($_POST['router'] == 'login_user') {
  $content = new GetContents();
  $user = new UsersDetails(null,null,null,null,null,null,null);
  $user_login = $content->GetPostContent('user_login');
  $user_password = md5($content->GetPostContent('user_password'));
  $field = array();
  $field['user_inf_login'] = $user_login;
  $field['user_inf_password'] = $user_password;
  $result = $user->RangeSearchUsersDetail($field);

  echo json_encode($result);
}
 ?>
