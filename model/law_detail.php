<?php
class LawDetail extends Connector
{
    public $attr_connector;
    public $table_name;
    public $law_det_date;
    public $law_det_id;
    public $law_det_name;
    public $law_det_type;
    public $law_file_id;
    public $law_gaceta_number;

    public function __construct($law_det_date, $law_det_id, $law_det_name, $law_det_type, $law_file_id, $law_gaceta_number)
    {
        $connector            = Connector::ConexionBD();
        $this->attr_connector = $connector['conexion'];
        $this->table_name     = "law_detail";
        $seleccion;
        if ($law_det_date != null || $law_det_id != null || $law_det_name != null || $law_det_type != null || $law_file_id != null || $law_gaceta_number != null) {
            if (!is_null($law_det_date)) {
                $field = "law_det_date";
                $value = $law_det_date;
            }
            if (!is_null($law_det_id)) {
                $field = "law_det_id";
                $value = $law_det_id;
            }
            if (!is_null($law_det_name)) {
                $field = "law_det_name";
                $value = $law_det_name;
            }
            if (!is_null($law_det_type)) {
                $field = "law_det_type";
                $value = $law_det_type;
            }
            if (!is_null($law_file_id)) {
                $field = "law_file_id";
                $value = $law_file_id;
            }
            if (!is_null($law_gaceta_number)) {
                $field = "law_gaceta_number";
                $value = $law_gaceta_number;
            }
            $this->objeto = Connector::SelectIn($this->attr_connector, $this->table_name, $field, $value);
        } else {
            $this->objeto = null;
        }
    }
    public function getLawDetDate()
    {
        $this->law_detail['law_det_date'] = $this->objeto['contenido'][0]['law_det_date'];
        return $this->law_det_date['law_det_date'];
    }
    public function setLawDetDate($law_det_date)
    {
        $this->law_detail['law_det_date'] = $law_det_date;
    }
    public function getLawDetId()
    {
        $this->law_detail['law_det_id'] = $this->objeto['contenido'][0]['law_det_id'];
        return $this->law_det_id['law_det_id'];
    }
    public function setLawDetId($law_det_id)
    {
        $this->law_detail['law_det_id'] = $law_det_id;
    }
    public function getLawDetName()
    {
        $this->law_detail['law_det_name'] = $this->objeto['contenido'][0]['law_det_name'];
        return $this->law_det_name['law_det_name'];
    }
    public function setLawDetName($law_det_name)
    {
        $this->law_detail['law_det_name'] = $law_det_name;
    }
    public function getLawDetType()
    {
        $this->law_detail['law_det_type'] = $this->objeto['contenido'][0]['law_det_type'];
        return $this->law_det_type['law_det_type'];
    }
    public function setLawDetType($law_det_type)
    {
        $this->law_detail['law_det_type'] = $law_det_type;
    }
    public function getLawFileId()
    {
        $this->law_detail['law_file_id'] = $this->objeto['contenido'][0]['law_file_id'];
        return $this->law_file_id['law_file_id'];
    }
    public function setLawFileId($law_file_id)
    {
        $this->law_detail['law_file_id'] = $law_file_id;
    }
    public function getLawGacetaNumber()
    {
        $this->law_detail['law_gaceta_number'] = $this->objeto['contenido'][0]['law_gaceta_number'];
        return $this->law_gaceta_number['law_gaceta_number'];
    }
    public function setLawGacetaNumber($law_gaceta_number)
    {
        $this->law_detail['law_gaceta_number'] = $law_gaceta_number;
    }
    public function saveLawDetail()
    {
        return Connector::InsertIn($this->attr_connector, $this->table_name, $this->law_detail);
    }
    public function updateLawDetail($law_file_id)
    {
        $law_file_id = array("law_file_id", $law_file_id);
        return Connector::UpdateIn($this->attr_connector, $this->table_name, $this->law_detail, $law_file_id);
    }
    public function deleteLawDetail($law_file_id)
    {
        return Connector::DeleteIn($this->attr_connector, $this->table_name, "law_file_id", $law_file_id);
    }
    public function selectAllLawDetail()
    {
        return Connector::SelectIn($this->attr_connector, $this->table_name, $this->field, $this->value);
    }
    public function selectOneTypeLawDetail($field_name)
    {
        return Connector::SelectType($this->attr_connector, $this->table_name, $field_name);
    }
    public function RangeSearchLawDetail($fields)
    {
      $i = count($fields);
      $query = "select * from ".$this->table_name." where ";
      foreach ($fields as $key => $value) {
      if (!$value == "") {
        if (is_array($value)) {
          $query .= $key." >= '".$value[0]."' and ".$key." <= '".$value[1]."'";
        }else{
          $query .= $key."='".$value."'";
        }
        if($i > 1){
          $query .= " and ";
        }
      }
      $i--;
      }
      $query .= ";";
       return Connector::Querys($this->attr_connector,$query);
    }
}
