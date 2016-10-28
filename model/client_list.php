<?php
class ClientList extends Connector
{
    public $attr_connector;
    public $table_name;
    public $cli_lis_avaliable;
    public $cli_lis_id;
    public $cli_lis_name;

    public function __construct($cli_lis_avaliable, $cli_lis_id, $cli_lis_name)
    {
        $connector            = Connector::ConexionBD();
        $this->attr_connector = $connector['conexion'];
        $this->table_name     = "client_list";
        $seleccion;
        if ($cli_lis_avaliable != null || $cli_lis_id != null || $cli_lis_name != null) {
            if (!is_null($cli_lis_avaliable)) {
                $seleccion = array("cli_lis_avaliable", $cli_lis_avaliable);
            }
            if (!is_null($cli_lis_id)) {
                $seleccion = array("cli_lis_id", $cli_lis_id);
            }
            if (!is_null($cli_lis_name)) {
                $seleccion = array("cli_lis_name", $cli_lis_name);
            }
            $this->objeto = Connector::SelectIn($this->attr_connector, $this->table_name, $seleccion);
        } else {
            $this->objeto = null;
        }
    }
    public function getCliLisAvaliable()
    {
        $this->client_list['cli_lis_avaliable'] = $this->objeto['contenido'][0]['cli_lis_avaliable'];
        return $this->cli_lis_avaliable['cli_lis_avaliable'];
    }
    public function setCliLisAvaliable($cli_lis_avaliable)
    {
        $this->client_list['cli_lis_avaliable'] = $cli_lis_avaliable;
    }
    public function getCliLisId()
    {
        $this->client_list['cli_lis_id'] = $this->objeto['contenido'][0]['cli_lis_id'];
        return $this->cli_lis_id['cli_lis_id'];
    }
    public function setCliLisId($cli_lis_id)
    {
        $this->client_list['cli_lis_id'] = $cli_lis_id;
    }
    public function getCliLisName()
    {
        $this->client_list['cli_lis_name'] = $this->objeto['contenido'][0]['cli_lis_name'];
        return $this->cli_lis_name['cli_lis_name'];
    }
    public function setCliLisName($cli_lis_name)
    {
        $this->client_list['cli_lis_name'] = $cli_lis_name;
    }
    public function saveClientList()
    {
        return Connector::InsertIn($this->attr_connector, $this->table_name, $this->client_list);
    }
    public function updateClientList($cli_lis_id)
    {
        $cli_lis_id = array("cli_lis_id", $cli_lis_id);
        return Connector::UpdateIn($this->attr_connector, $this->table_name, $this->client_list, $cli_lis_id);
    }
    public function deleteClientList($cli_lis_id)
    {
        return Connector::DeleteIn($this->attr_connector, $this->table, "cli_lis_id", $cli_lis_id);
    }
}

