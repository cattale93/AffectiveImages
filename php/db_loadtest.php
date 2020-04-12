<?php
////////FILE PHP PER DOWNLOAD SPECIFICHE TEST IN CORSO//////
    $servername = "localhost";
    $username = "root";
    $password = "root";
    $dbname="affectiveimage";
    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT Nt,ltest,ripet,nNeutre,timer,groupA,groupH,groupN,groupP,groupS FROM test";
    $result = $conn->query($sql);
    $row = mysqli_fetch_assoc($result);

    class Obj {
      function Obj() {
        $this->Nt= "";
        $this->ltest= 0;
        $this->ripet= 0;
        $this->nNeutre= 0;
        $this->timer= 0;
        $this->groupA= 0;
        $this->groupH= 0;
        $this->groupN= 0;
        $this->groupP= 0;
        $this->groupS= 0;
      }
    }

    $myObj = new Obj();
    $myObj->Nt=$row["Nt"];
    $myObj->ltest=$row["ltest"];
    $myObj->ripet=$row["ripet"];
    $myObj->nNeutre=$row["nNeutre"];
    $myObj->timer=$row["timer"];
    $myObj->groupA=$row["groupA"];
    $myObj->groupH=$row["groupH"];
    $myObj->groupN=$row["groupN"];
    $myObj->groupP=$row["groupP"];
    $myObj->groupS=$row["groupS"];

    $myJSON = json_encode($myObj);

    echo $myJSON;

    $conn->close();

?>
