<?php
class NewsDetail extends Connector{
	public $attr_connector;
	public $table_name;
	public $news_det_category;
	public $news_det_date;
	public $news_det_file;
	public $news_det_id;
	public $news_det_image;
	public $news_det_priority;
	public $news_det_source;
	public $news_det_text;
	public $news_det_text_en;
	public $news_det_tit;
	public $news_det_tit_en;

	public function __construct($news_det_category,$news_det_date,$news_det_file,$news_det_id,$news_det_image,$news_det_priority,$news_det_source,$news_det_text,$news_det_text_en,$news_det_tit,$news_det_tit_en){
		$connector = Connector::ConexionBD();
		$this->attr_connector = $connector['conexion'];
		$this->table_name ="news_detail";
		$seleccion;
		if($news_det_category != null || $news_det_date != null || $news_det_file != null || $news_det_id != null || $news_det_image != null || $news_det_priority != null || $news_det_source != null || $news_det_text != null || $news_det_text_en != null || $news_det_tit != null || $news_det_tit_en != null ){
			if(!is_null($news_det_category)){
					$field = "news_det_category";
					$value = $news_det_category;
			}
			if(!is_null($news_det_date)){
					$field = "news_det_date";
					$value = $news_det_date;
			}
			if(!is_null($news_det_file)){
					$field = "news_det_file";
					$value = $news_det_file;
			}
			if(!is_null($news_det_id)){
					$field = "news_det_id";
					$value = $news_det_id;
			}
			if(!is_null($news_det_image)){
					$field = "news_det_image";
					$value = $news_det_image;
			}
			if(!is_null($news_det_priority)){
					$field = "news_det_priority";
					$value = $news_det_priority;
			}
			if(!is_null($news_det_source)){
					$field = "news_det_source";
					$value = $news_det_source;
			}
			if(!is_null($news_det_text)){
					$field = "news_det_text";
					$value = $news_det_text;
			}
			if(!is_null($news_det_text_en)){
					$field = "news_det_text_en";
					$value = $news_det_text_en;
			}
			if(!is_null($news_det_tit)){
					$field = "news_det_tit";
					$value = $news_det_tit;
			}
			if(!is_null($news_det_tit_en)){
					$field = "news_det_tit_en";
					$value = $news_det_tit_en;
			}
			$this->objeto = Connector::SelectIn($this->attr_connector, $this->table_name, $field, $value);
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
	public function getNewsDetDate(){
			$this->news_detail['news_det_date'] = $this->objeto['contenido'][0]['news_det_date'];
			return $this->news_det_date['news_det_date'];
		}
	public function setNewsDetDate($news_det_date){
			$this->news_detail['news_det_date'] = $news_det_date;
		}
	public function getNewsDetFile(){
			$this->news_detail['news_det_file'] = $this->objeto['contenido'][0]['news_det_file'];
			return $this->news_det_file['news_det_file'];
		}
	public function setNewsDetFile($news_det_file){
			$this->news_detail['news_det_file'] = $news_det_file;
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
		 return Connector::SelectIn($this->attr_connector,$this->table_name,$this->field,$this->value);
}
	public function selectOneTypeNewsDetail($field_name){
		 return Connector::SelectType($this->attr_connector,$this->table_name,$field_name);
}
	public function RangeSearchNewsDetail($fields){
		 return Connector::RangeSearch($this->attr_connector,$this->table_name,$fields);
}
}
?>
