<?php
class NewsType extends Connector{
	public $attr_connector;
	public $table_name;
	public $news_type_avaliable;
	public $news_type_id;
	public $news_type_name;

	public function __construct($news_type_avaliable,$news_type_id,$news_type_name){
		$connector = Connector::ConexionBD();
		$this->attr_connector = $connector['conexion'];
		$this->table_name ="news_type";
		$seleccion;
		if($news_type_avaliable != null || $news_type_id != null || $news_type_name != null ){
			if(!is_null($news_type_avaliable)){
				$seleccion = array("news_type_avaliable",$news_type_avaliable);
			}
			if(!is_null($news_type_id)){
				$seleccion = array("news_type_id",$news_type_id);
			}
			if(!is_null($news_type_name)){
				$seleccion = array("news_type_name",$news_type_name);
			}
			$this->objeto = Connector::SelectIn($this->attr_connector, $this->table_name, $seleccion);
		}
		else{
			$this->objeto = null;
		}
		}
	public function getNewsTypeAvaliable(){
			$this->news_type['news_type_avaliable'] = $this->objeto['contenido'][0]['news_type_avaliable'];
			return $this->news_type_avaliable['news_type_avaliable'];
		}
	public function setNewsTypeAvaliable($news_type_avaliable){
			$this->news_type['news_type_avaliable'] = $news_type_avaliable;
		}
	public function getNewsTypeId(){
			$this->news_type['news_type_id'] = $this->objeto['contenido'][0]['news_type_id'];
			return $this->news_type_id['news_type_id'];
		}
	public function setNewsTypeId($news_type_id){
			$this->news_type['news_type_id'] = $news_type_id;
		}
	public function getNewsTypeName(){
			$this->news_type['news_type_name'] = $this->objeto['contenido'][0]['news_type_name'];
			return $this->news_type_name['news_type_name'];
		}
	public function setNewsTypeName($news_type_name){
			$this->news_type['news_type_name'] = $news_type_name;
		}
	public function saveNewsType(){
			return Connector::InsertIn($this->attr_connector,$this->table_name,$this->news_type);
		}
	public function updateNewsType($news_type_id){
			$news_type_id = array("news_type_id",$news_type_id);
			return Connector::UpdateIn($this->attr_connector,$this->table_name,$this->news_type,$news_type_id);
		}
	public function deleteNewsType($news_type_id){
			return Connector::DeleteIn($this->attr_connector,$this->table_name,"news_type_id",$news_type_id);
		}
	public function selectAllNewsType(){
		 return Connector::SelectIn($this->attr_connector,$this->table_name,false);
}
}
?>