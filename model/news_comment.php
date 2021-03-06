<?php
class NewsComment extends Connector{
	public $attr_connector;
	public $table_name;
	public $news_com_comment;
	public $news_com_comment_en;
	public $news_com_date;
	public $news_com_id;
	public $news_com_news_id;
	public $news_com_user_id;

	public function __construct($news_com_comment,$news_com_comment_en,$news_com_date,$news_com_id,$news_com_news_id,$news_com_user_id){
		$connector = Connector::ConexionBD();
		$this->attr_connector = $connector['conexion'];
		$this->table_name ="news_comment";
		$seleccion;
		if($news_com_comment != null || $news_com_comment_en != null || $news_com_date != null || $news_com_id != null || $news_com_news_id != null || $news_com_user_id != null ){
			if(!is_null($news_com_comment)){
					$field = "news_com_comment";
					$value = $news_com_comment;
			}
			if(!is_null($news_com_comment_en)){
					$field = "news_com_comment_en";
					$value = $news_com_comment_en;
			}
			if(!is_null($news_com_date)){
					$field = "news_com_date";
					$value = $news_com_date;
			}
			if(!is_null($news_com_id)){
					$field = "news_com_id";
					$value = $news_com_id;
			}
			if(!is_null($news_com_news_id)){
					$field = "news_com_news_id";
					$value = $news_com_news_id;
			}
			if(!is_null($news_com_user_id)){
					$field = "news_com_user_id";
					$value = $news_com_user_id;
			}
			$this->objeto = Connector::SelectIn($this->attr_connector, $this->table_name, $field, $value);
		}
		else{
			$this->objeto = null;
		}
		}
	public function getNewsComComment(){
			$this->news_comment['news_com_comment'] = $this->objeto['contenido'][0]['news_com_comment'];
			return $this->news_com_comment['news_com_comment'];
		}
	public function setNewsComComment($news_com_comment){
			$this->news_comment['news_com_comment'] = $news_com_comment;
		}
	public function getNewsComCommenten(){
			$this->news_comment['news_com_comment_en'] = $this->objeto['contenido'][0]['news_com_comment_en'];
			return $this->news_com_comment_en['news_com_comment_en'];
		}
	public function setNewsComCommenten($news_com_comment_en){
			$this->news_comment['news_com_comment_en'] = $news_com_comment_en;
		}
	public function getNewsComDate(){
			$this->news_comment['news_com_date'] = $this->objeto['contenido'][0]['news_com_date'];
			return $this->news_com_date['news_com_date'];
		}
	public function setNewsComDate($news_com_date){
			$this->news_comment['news_com_date'] = $news_com_date;
		}
	public function getNewsComId(){
			$this->news_comment['news_com_id'] = $this->objeto['contenido'][0]['news_com_id'];
			return $this->news_com_id['news_com_id'];
		}
	public function setNewsComId($news_com_id){
			$this->news_comment['news_com_id'] = $news_com_id;
		}
	public function getNewsComNewsid(){
			$this->news_comment['news_com_news_id'] = $this->objeto['contenido'][0]['news_com_news_id'];
			return $this->news_com_news_id['news_com_news_id'];
		}
	public function setNewsComNewsid($news_com_news_id){
			$this->news_comment['news_com_news_id'] = $news_com_news_id;
		}
	public function getNewsComUserid(){
			$this->news_comment['news_com_user_id'] = $this->objeto['contenido'][0]['news_com_user_id'];
			return $this->news_com_user_id['news_com_user_id'];
		}
	public function setNewsComUserid($news_com_user_id){
			$this->news_comment['news_com_user_id'] = $news_com_user_id;
		}
	public function saveNewsComment(){
			return Connector::InsertIn($this->attr_connector,$this->table_name,$this->news_comment);
		}
	public function updateNewsComment($news_com_id){
			$news_com_id = array("news_com_id",$news_com_id);
			return Connector::UpdateIn($this->attr_connector,$this->table_name,$this->news_comment,$news_com_id);
		}
	public function deleteNewsComment($news_com_id){
			return Connector::DeleteIn($this->attr_connector,$this->table_name,"news_com_id",$news_com_id);
		}
	public function selectAllNewsComment(){
		 return Connector::SelectIn($this->attr_connector,$this->table_name,$this->field,$this->value);
}
	public function selectOneTypeNewsComment($field_name){
		 return Connector::SelectType($this->attr_connector,$this->table_name,$field_name);
}
}
?>