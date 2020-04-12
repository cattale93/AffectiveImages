<?php
////////FILE PHP PER UPLOAD STATO SESSIONE DI TEST//////

$servername = "localhost";
$username = "root";
$password = "root";

try {
    $conn = new PDO("mysql:host=$servername;dbname=affectiveimage", $username, $password); //start connection
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);       // error exception
    $sql = "DELETE FROM state WHERE id=0";          //eliminazione stato precedente (svuoto db)
    $conn->exec($sql);

    $nImgTOT= $_GET['nImgTOT'];         //get delle variabili dall'url creato con file js
    $nImgA= $_GET['nImgA'];
    $nImgH= $_GET['nImgH'];
    $nImgN= $_GET['nImgN'];
    $nImgP= $_GET['nImgP'];
    $nImgS= $_GET['nImgS'];
    $nImgNvar= $_GET['nImgNvar'];
    
    $stmt = $conn->prepare("INSERT INTO state (nImgTOT,nImgA,nImgH,nImgN,nImgP,nImgS,nImgNvar)
    VALUES (:nImgTOT,:nImgA,:nImgH,:nImgN,:nImgP,:nImgS,:nImgNvar)");

    $stmt->bindParam(':nImgTOT',$nImgTOT);
    $stmt->bindParam(':nImgA',$nImgA);
    $stmt->bindParam(':nImgH',$nImgH);
    $stmt->bindParam(':nImgN',$nImgN);
    $stmt->bindParam(':nImgP',$nImgP);
    $stmt->bindParam(':nImgS',$nImgS);
    $stmt->bindParam(':nImgNvar',$nImgNvar);

    $stmt->execute();
    }

catch(PDOException $e)
    {
    echo "Connection failed: " . $e->getMessage();
    }
    $conn = null;


?>
