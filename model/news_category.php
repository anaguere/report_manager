<?php
class NewsCategory extends Connector{
	public $attr_connector;
	public $table_name;
	public $news_cat_avaliable;
	public $news_cat_id;
	public $news_cat_name;

	public function __construct($news_cat_avaliable,$news_cat_id,$news_cat_name){
		$connector = Connector::ConexionBD();
		$this->attr_connector = $connector['conexion'];
		$this->table_name ="news_category";
		$seleccion;
		if($news_cat_avaliable != null || $news_cat_id != null || $news_cat_name != null ){
			if(!is_null($news_cat_avaliable)){
					$field = "news_cat_avaliable";
					$value = $news_cat_avaliable;
			}
			if(!is_null($news_cat_id)){
					$field = "news_cat_id";
					$value = $news_cat_id;
			}
			if(!is_null($news_cat_name)){
					$field = "news_cat_name";
					$value = $news_cat_name;
			}
			$this->objeto = Connector::SelectIn($this->attr_connector, $this->table_name, $field, $value);
		}
		else{
			$this->objeto = null;
		}
		}
	public function getNewsCatAvaliable(){
			$this->news_category['news_cat_avaliable'] = $this->objeto['contenido'][0]['news_cat_avaliable'];
			return $this->news_cat_avaliable['news_cat_avaliable'];
		}
	public function setNewsCatAvaliable($news_cat_avaliable){
			$this->news_category['news_cat_avaliable'] = $news_cat_avaliable;
		}
	public function getNewsCatId(){
			$this->news_category['news_cat_id'] = $this->objeto['contenido'][0]['news_cat_id'];
			return $this->news_cat_id['news_cat_id'];
		}
	public function setNewsCatId($news_cat_id){
			$this->news_category['news_cat_id'] = $news_cat_id;
		}
	public function getNewsCatName(){
			$this->news_category['news_cat_name'] = $this->objeto['contenido'][0]['news_cat_name'];
			return $this->news_cat_name['news_cat_name'];
		}
	public function setNewsCatName($news_cat_name){
			$this->news_category['news_cat_name'] = $news_cat_name;
		}
	public function saveNewsCategory(){
			return Connector::InsertIn($this->attr_connector,$this->table_name,$this->news_category);
		}
	public function updateNewsCategory($news_cat_id){
			$news_cat_id = array("news_cat_id",$news_cat_id);
			return Connector::UpdateIn($this->attr_connector,$this->table_name,$this->news_category,$news_cat_id);
		}
	public function deleteNewsCategory($news_cat_id){
			return Connector::DeleteIn($this->attr_connector,$this->table_name,"news_cat_id",$news_cat_id);
		}
	public function selectAllNewsCategory(){
		 return Connector::SelectIn($this->attr_connector,$this->table_name,$this->field,$this->value);
}
	public function selectOneTypeNewsCategory($field_name){
		 return Connector::SelectType($this->attr_connector,$this->table_name,$field_name);
}
	public function RangeSearchNewsCategory($fields){
		 return Connector::RangeSearch($this->attr_connector,$this->table_name,$fields);
}
}
?>