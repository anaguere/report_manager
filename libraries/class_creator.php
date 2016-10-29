<?php
require ('../model/connector.php');

$connector      = new Connector();
$conn           = $connector::ConexionBD();
$data_structure = $connector::DataBaseIn($conn['conexion'], 'public');
$cant_rows      = count($data_structure['contenido']);
$act            = null;
for ($i = 0; $i < $cant_rows; $i++) {
    if ($data_structure['contenido'][$i]['table_name'] != $act) {
        $j = 0;

        $json_db[$data_structure['contenido'][$i]['table_name']] = array();
        $act                                                     = $data_structure['contenido'][$i]['table_name'];
    }
    $j++;
    $json_db[$data_structure['contenido'][$i]['table_name']][$data_structure['contenido'][$i]['column_name']] = array('type' => $data_structure['contenido'][$i]['type'], 'key_type' => $data_structure['contenido'][$i]['keys']);

}
$bl           = "\r\n";#Break line
$class        = null;
$class_id     = null;
$class_define = null;
foreach ($json_db as $clave => $valor) {
    $class_define = "<?php".$bl;
    #$class_define .= "require('connector.php');".$bl;
    $class_name    = explode("_", $clave);
    $class_name[0] = ucfirst($class_name[0]);
    $class_name[1] = ucfirst($class_name[1]);
    $class_name    = implode("", $class_name);
    $class_define .= "class ".$class_name." extends Connector{".$bl;
    $class_define .= "\tpublic \$attr_connector;".$bl;
    $class_define .= "\tpublic \$table_name;".$bl;
    foreach ($valor as $attr => $detail) {
        $class_define .= "\tpublic \$".$attr.";".$bl;
        #     echo $detail['type'];
    }
    $class_define .= $bl;
    $class_define .= "\tpublic function __construct(";
    $attr_cant = count($valor);
    foreach ($valor as $const_def => $const_val) {
        $class_define .= "\$".$const_def;
        $attr_cant--;
        if ($attr_cant > 0) {
            $class_define .= ",";
        }
    }
    $class_define .= "){".$bl;
    $class_define .= "\t\t\$connector = Connector::ConexionBD();".$bl;
    $class_define .= "\t\t\$this->attr_connector = \$connector['conexion'];".$bl;
    $class_define .= "\t\t\$this->table_name =\"".$clave."\";".$bl;
    $class_define .= "\t\t\$seleccion;".$bl;
    $class_define .= "\t\tif(";
    $attr_cant = count($valor);
    foreach ($valor as $const_def => $const_val) {
        $class_define .= "\$".$const_def." != null ";
        $attr_cant--;
        if ($attr_cant > 0) {
            $class_define .= "|| ";
        }
    }
    $class_define .= "){".$bl;
    foreach ($valor as $const_def => $const_val) {
        $class_define .= "\t\t\tif(!is_null(\$".$const_def.")){".$bl;
        $class_define .= "\t\t\t\t\$seleccion = array(\"".$const_def."\",\$".$const_def.");".$bl;
        $class_define .= "\t\t\t}".$bl;
    }
    $class_define .= "\t\t\t\$this->objeto = Connector::SelectIn(\$this->attr_connector, \$this->table_name, \$seleccion);".$bl;
    $class_define .= "\t\t}".$bl;
    $class_define .= "\t\telse{".$bl;
    $class_define .= "\t\t\t\$this->objeto = null;".$bl;
    $class_define .= "\t\t}".$bl;
    $class_define .= "\t\t}".$bl;
    foreach ($valor as $const_def => $const_val) {
        $attr_name    = explode("_", $const_def);
        $attr_name[0] = ucfirst($attr_name[0]);
        $attr_name[1] = ucfirst($attr_name[1]);
        $attr_name[2] = ucfirst($attr_name[2]);
        if ($attr_name[2] == 'Id') {
            $class_id = $const_def;
        }
        $attr_name = implode("", $attr_name);
        $class_define .= "\tpublic function get".$attr_name."(){".$bl;
        $class_define .= "\t\t\t\$this->".$clave."['".$const_def."'] = \$this->objeto['contenido'][0]['".$const_def."'];".$bl;
        $class_define .= "\t\t\treturn \$this->".$const_def."['".$const_def."'];".$bl;
        $class_define .= "\t\t}".$bl;
        $class_define .= "\tpublic function set".$attr_name."(\$".$const_def."){".$bl;
        $class_define .= "\t\t\t\$this->".$clave."['".$const_def."'] = \$".$const_def.";".$bl;
        $class_define .= "\t\t}".$bl;
    }
    $class_define .= "\tpublic function save".$class_name."(){".$bl;
    $class_define .= "\t\t\treturn Connector::InsertIn(\$this->attr_connector,\$this->table_name,\$this->".$clave.");".$bl;
    $class_define .= "\t\t}".$bl;
    $class_define .= "\tpublic function update".$class_name."(\$".$class_id."){".$bl;
    $class_define .= "\t\t\t\$".$class_id." = array(\"".$class_id."\",\$".$class_id.");".$bl;
    $class_define .= "\t\t\treturn Connector::UpdateIn(\$this->attr_connector,\$this->table_name,\$this->".$clave.",\$".$class_id.");".$bl;
    $class_define .= "\t\t}".$bl;
    $class_define .= "\tpublic function delete".$class_name."(\$".$class_id."){".$bl;
    $class_define .= "\t\t\treturn Connector::DeleteIn(\$this->attr_connector,\$this->table_name,\"".$class_id."\",\$".$class_id.");".$bl;
    $class_define .= "\t\t}".$bl;
    $class_define .= "\tpublic function selectAll".$class_name."(){".$bl;
    $class_define .= "\t\t return Connector::SelectIn(\$this->attr_connector,\$this->table_name,false);".$bl;
    $class_define .= "}".$bl;
    $class_define .= "}".$bl;
    $class_define .= "?>";
    $class = fopen("../model/".$clave.".php", "w");
    fwrite($class, $class_define);
    #echo "<pre>".$class_define;
    #exit;
}

