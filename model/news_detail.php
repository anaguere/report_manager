<?php
class NewsDetail extends Connector{
	public $attr_connector;
	public $table_name;
	public $news_det_category;
	public $news_det_client;
	public $news_det_date;
	public $news_det_id;
	public $news_det_image;
	public $news_det_priority;
	public $news_det_source;
	public $news_det_text;
	public $news_det_text_en;
	public $news_det_tit;
	public $news_det_tit_en;
	public $news_det_type;

	public function __construct($news_det_category,$news_det_client,$news_det_date,$news_det_id,$news_det_image,$news_det_priority,$news_det_source,$news_det_text,$news_det_text_en,$news_det_tit,$news_det_tit_en,$news_det_type){
		$connector = Connector::ConexionBD();
		$this->attr_connector = $connector['conexion'];
		$this->table_name ="news_detail";
		$seleccion;
		if($news_det_category != null || $news_det_client != null || $news_det_date != null || $news_det_id != null || $news_det_image != null || $news_det_priority != null || $news_det_source != null || $news_det_text != null || $news_det_text_en != null || $news_det_tit != null || $news_det_tit_en != null || $news_det_type != null ){
			if(!is_null($news_det_category)){
					$seleccion = array("news_det_category",$news_det_category);
			}
			if(!is_null($news_det_client)){
					$seleccion = array("news_det_client",$news_det_client);
			}
			if(!is_null($news_det_date)){
					$seleccion = array("news_det_date",$news_det_date);
			}
			if(!is_null($news_det_id)){
					$seleccion = array("news_det_id",$news_det_id);
			}
			if(!is_null($news_det_image)){
					$seleccion = array("news_det_image",$news_det_image);
			}
			if(!is_null($news_det_priority)){
					$seleccion = array("news_det_priority",$news_det_priority);
			}
			if(!is_null($news_det_source)){
					$seleccion = array("news_det_source",$news_det_source);
			}
			if(!is_null($news_det_text)){
					$seleccion = array("news_det_text",$news_det_text);
			}
			if(!is_null($news_det_text_en)){
					$seleccion = array("news_det_text_en",$news_det_text_en);
			}
			if(!is_null($news_det_tit)){
					$seleccion = array("news_det_tit",$news_det_tit);
			}
			if(!is_null($news_det_tit_en)){
					$seleccion = array("news_det_tit_en",$news_det_tit_en);
			}
			if(!is_null($news_det_type)){
					$seleccion = array("news_det_type",$news_det_type);
			}
			$this->objeto = Connector::SelectIn($this->attr_connector, $this->table_name, $seleccion);
		}
		else{
			$this->objeto = null;
		}
		}
	public function getNewsDetCategory(){
			$this->news_detail['news_det_category'] = $this->objeto['contenido'][0]['news_det_category'];
			return $this->news_det_category['news_det_category'];
		}
	public function setNewsDetCategory($news_det_category){
			$this->news_detail['news_det_category'] = $news_det_category;
		}
	public function getNewsDetClient(){
			$this->news_detail['news_det_client'] = $this->objeto['contenido'][0]['news_det_client'];
			return $this->news_det_client['news_det_client'];
		}
	public function setNewsDetClient($news_det_client){
			$this->news_detail['news_det_client'] = $news_det_client;
		}
	public function getNewsDetDate(){
			$this->news_detail['news_det_date'] = $this->objeto['contenido'][0]['news_det_date'];
			return $this->news_det_date['news_det_date'];
		}
	public function setNewsDetDate($news_det_date){
			$this->news_detail['news_det_date'] = $news_det_date;
		}
	public function getNewsDetId(){
			$this->news_detail['news_det_id'] = $this->objeto['contenido'][0]['news_det_id'];
			return $this->news_det_id['news_det_id'];
		}
	public function setNewsDetId($news_det_id){
			$this->news_detail['news_det_id'] = $news_det_id;
		}
	public function getNewsDetImage(){
			$this->news_detail['news_det_image'] = $this->objeto['contenido'][0]['news_det_image'];
			return $this->news_det_image['news_det_image'];
		}
	public function setNewsDetImage($news_det_image){
			$this->news_detail['news_det_image'] = $news_det_image;
		}
	public function getNewsDetPriority(){
			$this->news_detail['news_det_priority'] = $this->objeto['contenido'][0]['news_det_priority'];
			return $this->news_det_priority['news_det_priority'];
		}
	public function setNewsDetPriority($news_det_priority){
			$this->news_detail['news_det_priority'] = $news_det_priority;
		}
	public function getNewsDetSource(){
			$this->news_detail['news_det_source'] = $this->objeto['contenido'][0]['news_det_source'];
			return $this->news_det_source['news_det_source'];
		}
	public function setNewsDetSource($news_det_source){
			$this->news_detail['news_det_source'] = $news_det_source;
		}
	public function getNewsDetText(){
			$this->news_detail['news_det_text'] = $this->objeto['contenido'][0]['news_det_text'];
			return $this->news_det_text['news_det_text'];
		}
	public function setNewsDetText($news_det_text){
			$this->news_detail['news_det_text'] = $news_det_text;
		}
	public function getNewsDetTexten(){
			$this->news_detail['news_det_text_en'] = $this->objeto['contenido'][0]['news_det_text_en'];
			return $this->news_det_text_en['news_det_text_en'];
		}
	public function setNewsDetTexten($news_det_text_en){
			$this->news_detail['news_det_text_en'] = $news_det_text_en;
		}
	public function getNewsDetTit(){
			$this->news_detail['news_det_tit'] = $this->objeto['contenido'][0]['news_det_tit'];
			return $this->news_det_tit['news_det_tit'];
		}
	public function setNewsDetTit($news_det_tit){
			$this->news_detail['news_det_tit'] = $news_det_tit;
		}
	public function getNewsDetTiten(){
			$this->news_detail['news_det_tit_en'] = $this->objeto['contenido'][0]['news_det_tit_en'];
			return $this->news_det_tit_en['news_det_tit_en'];
		}
	public function setNewsDetTiten($news_det_tit_en){
			$this->news_detail['news_det_tit_en'] = $news_det_tit_en;
		}
	public function getNewsDetType(){
			$this->news_detail['news_det_type'] = $this->objeto['contenido'][0]['news_det_type'];
			return $this->news_det_type['news_det_type'];
		}
	public function setNewsDetType($news_det_type){
			$this->news_detail['news_det_type'] = $news_det_type;
		}
	public function saveNewsDetail(){
			return Connector::InsertIn($this->attr_connector,$this->table_name,$this->news_detail);
		}
	public function updateNewsDetail($news_det_id){
			$news_det_id = array("news_det_id",$news_det_id);
			return Connector::UpdateIn($this->attr_connector,$this->table_name,$this->news_detail,$news_det_id);
		}
	public function deleteNewsDetail($news_det_id){
			return Connector::DeleteIn($this->attr_connector,$this->table_name,"news_det_id",$news_det_id);
		}
	public function selectAllNewsDetail(){
		 return Connector::SelectIn($this->attr_connector,$this->table_name,false);
}
	public function selectOneTypeNewsDetail($field_name){
		 return Connector::SelectType($this->attr_connector,$this->table_name,$field_name);
}
}
?>