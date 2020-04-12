<?php
////////FILE PHP PER DOWNLOAD STATO SESSIONE DI TEST//////
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
    //selezione dei dati da scaricare
    $sql = "SELECT nImgTOT,nImgA,nImgH,nImgN,nImgP,nImgS,nImgNvar FROM state";
    $result = $conn->query($sql);
    $row = mysqli_fetch_assoc($result);
    //creazione di un oggetto da passare al file js
    class Obj {
      function Obj() {
        $this->nImgTOT= 0;
        $this->nImgA= 0;
        $this->nImgH= 0;
        $this->nImgN= 0;
        $this->nImgP= 0;
        $this->nImgS= 0;
        $this->nImgNvar= 0;
      }
    }
//istanza dell'oggetto creato sopra con associazione dei parametri scaricati dal db
    $myObj = new Obj();
    $myObj->nImgTOT=$row["nImgTOT"];
    $myObj->nImgA=$row["nImgA"];
    $myObj->nImgH=$row["nImgH"];
    $myObj->nImgN=$row["nImgN"];
    $myObj->nImgP=$row["nImgP"];
    $myObj->nImgS=$row["nImgS"];
    $myObj->nImgNvar=$row["nImgNvar"];
//invio dell'oggetto
    $myJSON = json_encode($myObj);

    echo $myJSON;

    $conn->close();

?>
