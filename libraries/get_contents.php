<?php
#Class to load request data
class GetContents
{
    public function GetPostContent($variable)
    {
        return $_POST[$variable];
    }
}

