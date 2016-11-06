<?php
class UsersDetails extends Connector{
	public $attr_connector;
	public $table_name;
	public $user_inf_full_name;
	public $user_inf_id;
	public $user_inf_login;
	public $user_inf_mail;
	public $user_inf_national_id;
	public $user_inf_password;
	public $user_inf_type;

	public function __construct($user_inf_full_name,$user_inf_id,$user_inf_login,$user_inf_mail,$user_inf_national_id,$user_inf_password,$user_inf_type){
		$connector = Connector::ConexionBD();
		$this->attr_connector = $connector['conexion'];
		$this->table_name ="users_details";
		$seleccion;
		if($user_inf_full_name != null || $user_inf_id != null || $user_inf_login != null || $user_inf_mail != null || $user_inf_national_id != null || $user_inf_password != null || $user_inf_type != null ){
			if(!is_null($user_inf_full_name)){
				$field = "user_inf_full_name";
				$value = $user_inf_full_name;
			}
			if(!is_null($user_inf_id)){
				$field = "user_inf_id";
				$value = $user_inf_id;
			}
			if(!is_null($user_inf_login)){
				$field = "user_inf_login";
				$value = $user_inf_login;
			}
			if(!is_null($user_inf_mail)){
				$field = "user_inf_mail";
				$value = $user_inf_mail;
			}
			if(!is_null($user_inf_national_id)){
				$field = "user_inf_national_id";
				$value = $user_inf_national_id;
			}
			if(!is_null($user_inf_password)){
				$field = "user_inf_password";
				$value = $user_inf_password;
			}
			if(!is_null($user_inf_type)){
				$field = "user_inf_type";
				$value = $user_inf_type;
			}
			$this->objeto = Connector::SelectIn($this->attr_connector, $this->table_name, $field, $value);
		}
		else{
			$this->objeto = null;
		}
	}
	public function getUserInfFullname(){
		$this->users_details['user_inf_full_name'] = $this->objeto['contenido'][0]['user_inf_full_name'];
		return $this->user_inf_full_name['user_inf_full_name'];
	}
	public function setUserInfFullname($user_inf_full_name){
		$this->users_details['user_inf_full_name'] = $user_inf_full_name;
	}
	public function getUserInfId(){
		$this->users_details['user_inf_id'] = $this->objeto['contenido'][0]['user_inf_id'];
		return $this->user_inf_id['user_inf_id'];
	}
	public function setUserInfId($user_inf_id){
		$this->users_details['user_inf_id'] = $user_inf_id;
	}
	public function getUserInfLogin(){
		$this->users_details['user_inf_login'] = $this->objeto['contenido'][0]['user_inf_login'];
		return $this->user_inf_login['user_inf_login'];
	}
	public function setUserInfLogin($user_inf_login){
		$this->users_details['user_inf_login'] = $user_inf_login;
	}
	public function getUserInfMail(){
		$this->users_details['user_inf_mail'] = $this->objeto['contenido'][0]['user_inf_mail'];
		return $this->user_inf_mail['user_inf_mail'];
	}
	public function setUserInfMail($user_inf_mail){
		$this->users_details['user_inf_mail'] = $user_inf_mail;
	}
	public function getUserInfNationalid(){
		$this->users_details['user_inf_national_id'] = $this->objeto['contenido'][0]['user_inf_national_id'];
		return $this->user_inf_national_id['user_inf_national_id'];
	}
	public function setUserInfNationalid($user_inf_national_id){
		$this->users_details['user_inf_national_id'] = $user_inf_national_id;
	}
	public function getUserInfPassword(){
		$this->users_details['user_inf_password'] = $this->objeto['contenido'][0]['user_inf_password'];
		return $this->user_inf_password['user_inf_password'];
	}
	public function setUserInfPassword($user_inf_password){
		$this->users_details['user_inf_password'] = $user_inf_password;
	}
	public function getUserInfType(){
		$this->users_details['user_inf_type'] = $this->objeto['contenido'][0]['user_inf_type'];
		return $this->user_inf_type['user_inf_type'];
	}
	public function setUserInfType($user_inf_type){
		$this->users_details['user_inf_type'] = $user_inf_type;
	}
	public function saveUsersDetails(){
		return Connector::InsertIn($this->attr_connector,$this->table_name,$this->users_details);
	}
	public function updateUsersDetails($user_inf_id){
		$user_inf_id = array("user_inf_id",$user_inf_id);
		return Connector::UpdateIn($this->attr_connector,$this->table_name,$this->users_details,$user_inf_id);
	}
	public function deleteUsersDetails($user_inf_id){
		return Connector::DeleteIn($this->attr_connector,$this->table_name,"user_inf_id",$user_inf_id);
	}
	public function selectAllUsersDetails(){
		return Connector::SelectIn($this->attr_connector,$this->table_name,$this->field,$this->value);
	}
	public function selectOneTypeUsersDetails($field_name){
		return Connector::SelectType($this->attr_connector,$this->table_name,$field_name);
	}
	public function RangeSearchUsersDetail($fields)
	{
		return Connector::RangeSearch($this->attr_connector,$this->table_name,$fields);
	}
}
?>
