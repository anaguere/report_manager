<?php
class NewsFiles extends Connector{
	public $attr_connector;
	public $table_name;
	public $news_file_archive;
	public $news_file_id;
	public $news_file_name;

	public function __construct($news_file_archive,$news_file_id,$news_file_name){
		$connector = Connector::ConexionBD();
		$this->attr_connector = $connector['conexion'];
		$this->table_name ="news_files";
		$seleccion;
		if($news_file_archive != null || $news_file_id != null || $news_file_name != null ){
			if(!is_null($news_file_archive)){
					$field = "news_file_archive";
					$value = $news_file_archive;
			}
			if(!is_null($news_file_id)){
					$field = "news_file_id";
					$value = $news_file_id;
			}
			if(!is_null($news_file_name)){
					$field = "news_file_name";
					$value = $news_file_name;
			}
			$this->objeto = Connector::SelectIn($this->attr_connector, $this->table_name, $field, $value);
		}
		else{
			$this->objeto = null;
		}
		}
	public function getNewsFileArchive(){
			$this->news_files['news_file_archive'] = $this->objeto['contenido'][0]['news_file_archive'];
			return $this->news_file_archive['news_file_archive'];
		}
	public function setNewsFileArchive($news_file_archive){
			$this->news_files['news_file_archive'] = $news_file_archive;
		}
	public function getNewsFileId(){
			$this->news_files['news_file_id'] = $this->objeto['contenido'][0]['news_file_id'];
			return $this->news_file_id['news_file_id'];
		}
	public function setNewsFileId($news_file_id){
			$this->news_files['news_file_id'] = $news_file_id;
		}
	public function getNewsFileName(){
			$this->news_files['news_file_name'] = $this->objeto['contenido'][0]['news_file_name'];
			return $this->news_file_name['news_file_name'];
		}
	public function setNewsFileName($news_file_name){
			$this->news_files['news_file_name'] = $news_file_name;
		}
	public function saveNewsFiles(){
			return Connector::InsertIn($this->attr_connector,$this->table_name,$this->news_files);
		}
	public function updateNewsFiles($news_file_id){
			$news_file_id = array("news_file_id",$news_file_id);
			return Connector::UpdateIn($this->attr_connector,$this->table_name,$this->news_files,$news_file_id);
		}
	public function deleteNewsFiles($news_file_id){
			return Connector::DeleteIn($this->attr_connector,$this->table_name,"news_file_id",$news_file_id);
		}
	public function selectAllNewsFiles(){
		 return Connector::SelectIn($this->attr_connector,$this->table_name,$this->field,$this->value);
}
	public function selectOneTypeNewsFiles($field_name){
		 return Connector::SelectType($this->attr_connector,$this->table_name,$field_name);
}
	public function RangeSearchNewsFiles($fields){
		 return Connector::RangeSearch($this->attr_connector,$this->table_name,$fields);
}
}
?>