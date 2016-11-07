<?php
class LawType extends Connector{
	public $attr_connector;
	public $table_name;
	public $law_type_avaliable;
	public $law_type_id;
	public $law_type_name;

	public function __construct($law_type_avaliable,$law_type_id,$law_type_name){
		$connector = Connector::ConexionBD();
		$this->attr_connector = $connector['conexion'];
		$this->table_name ="law_type";
		$seleccion;
		if($law_type_avaliable != null || $law_type_id != null || $law_type_name != null ){
			if(!is_null($law_type_avaliable)){
					$field = "law_type_avaliable";
					$value = $law_type_avaliable;
			}
			if(!is_null($law_type_id)){
					$field = "law_type_id";
					$value = $law_type_id;
			}
			if(!is_null($law_type_name)){
					$field = "law_type_name";
					$value = $law_type_name;
			}
			$this->objeto = Connector::SelectIn($this->attr_connector, $this->table_name, $field, $value);
		}
		else{
			$this->objeto = null;
		}
		}
	public function getLawTypeAvaliable(){
			$this->law_type['law_type_avaliable'] = $this->objeto['contenido'][0]['law_type_avaliable'];
			return $this->law_type_avaliable['law_type_avaliable'];
		}
	public function setLawTypeAvaliable($law_type_avaliable){
			$this->law_type['law_type_avaliable'] = $law_type_avaliable;
		}
	public function getLawTypeId(){
			$this->law_type['law_type_id'] = $this->objeto['contenido'][0]['law_type_id'];
			return $this->law_type_id['law_type_id'];
		}
	public function setLawTypeId($law_type_id){
			$this->law_type['law_type_id'] = $law_type_id;
		}
	public function getLawTypeName(){
			$this->law_type['law_type_name'] = $this->objeto['contenido'][0]['law_type_name'];
			return $this->law_type_name['law_type_name'];
		}
	public function setLawTypeName($law_type_name){
			$this->law_type['law_type_name'] = $law_type_name;
		}
	public function saveLawType(){
			return Connector::InsertIn($this->attr_connector,$this->table_name,$this->law_type);
		}
	public function updateLawType($law_type_id){
			$law_type_id = array("law_type_id",$law_type_id);
			return Connector::UpdateIn($this->attr_connector,$this->table_name,$this->law_type,$law_type_id);
		}
	public function deleteLawType($law_type_id){
			return Connector::DeleteIn($this->attr_connector,$this->table_name,"law_type_id",$law_type_id);
		}
	public function selectAllLawType(){
		 return Connector::SelectIn($this->attr_connector,$this->table_name,$this->field,$this->value);
}
	public function selectOneTypeLawType($field_name){
		 return Connector::SelectType($this->attr_connector,$this->table_name,$field_name);
}
	public function RangeSearchLawType($fields){
		 return Connector::RangeSearch($this->attr_connector,$this->table_name,$fields);
}
}
?>