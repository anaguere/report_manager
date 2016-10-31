<?php
require('connector.php');
class  extends Connector{
	public $attr_connector;
	public $table_name;
	public $;

	public function __construct($){
		$connector = Connector::ConexionBD();
		$this->attr_connector = $connector['conexion'];
		$this->table_name ="";
		$seleccion;
		if($ != null ){
			if(!is_null($)){
				$seleccion = array("",$);
			}
			$this->objeto = Connector::SelectIn($this->attr_connector, $this->table_name, $seleccion);
		}
		else{
			$this->objeto = null;
		}
		}
	public function get(){
			$this->[''] = $this->objeto['contenido'][0][''];
			return $this->[''];
		}
	public function set($){
			$this->[''] = $;
		}
	public function save(){
			return Connector::InsertIn($this->attr_connector,$this->table_name,$this->);
		}
	public function update($){
			$ = array("",$);
			return Connector::UpdateIn($this->attr_connector,$this->table_name,$this->,$);
		}
	public function delete($){
			return Connector::DeleteIn($this->attr_connector,$this->table,"",$);
		}
}
?>