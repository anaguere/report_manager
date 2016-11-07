<?php
class NewsFilesnews extends Connector{
	public $attr_connector;
	public $table_name;
	public $news_files_id;
	public $news_files_news_id;
	public $news_news_id;

	public function __construct($news_files_id,$news_files_news_id,$news_news_id){
		$connector = Connector::ConexionBD();
		$this->attr_connector = $connector['conexion'];
		$this->table_name ="news_files_news";
		$seleccion;
		if($news_files_id != null || $news_files_news_id != null || $news_news_id != null ){
			if(!is_null($news_files_id)){
					$field = "news_files_id";
					$value = $news_files_id;
			}
			if(!is_null($news_files_news_id)){
					$field = "news_files_news_id";
					$value = $news_files_news_id;
			}
			if(!is_null($news_news_id)){
					$field = "news_news_id";
					$value = $news_news_id;
			}
			$this->objeto = Connector::SelectIn($this->attr_connector, $this->table_name, $field, $value);
		}
		else{
			$this->objeto = null;
		}
		}
	public function getNewsFilesId(){
			$this->news_files_news['news_files_id'] = $this->objeto['contenido'][0]['news_files_id'];
			return $this->news_files_id['news_files_id'];
		}
	public function setNewsFilesId($news_files_id){
			$this->news_files_news['news_files_id'] = $news_files_id;
		}
	public function getNewsFilesNewsid(){
			$this->news_files_news['news_files_news_id'] = $this->objeto['contenido'][0]['news_files_news_id'];
			return $this->news_files_news_id['news_files_news_id'];
		}
	public function setNewsFilesNewsid($news_files_news_id){
			$this->news_files_news['news_files_news_id'] = $news_files_news_id;
		}
	public function getNewsNewsId(){
			$this->news_files_news['news_news_id'] = $this->objeto['contenido'][0]['news_news_id'];
			return $this->news_news_id['news_news_id'];
		}
	public function setNewsNewsId($news_news_id){
			$this->news_files_news['news_news_id'] = $news_news_id;
		}
	public function saveNewsFilesnews(){
			return Connector::InsertIn($this->attr_connector,$this->table_name,$this->news_files_news);
		}
	public function updateNewsFilesnews($news_news_id){
			$news_news_id = array("news_news_id",$news_news_id);
			return Connector::UpdateIn($this->attr_connector,$this->table_name,$this->news_files_news,$news_news_id);
		}
	public function deleteNewsFilesnews($news_news_id){
			return Connector::DeleteIn($this->attr_connector,$this->table_name,"news_news_id",$news_news_id);
		}
	public function selectAllNewsFilesnews(){
		 return Connector::SelectIn($this->attr_connector,$this->table_name,$this->field,$this->value);
}
	public function selectOneTypeNewsFilesnews($field_name){
		 return Connector::SelectType($this->attr_connector,$this->table_name,$field_name);
}
	public function RangeSearchNewsFilesnews($fields){
		 return Connector::RangeSearch($this->attr_connector,$this->table_name,$fields);
}
}
?>