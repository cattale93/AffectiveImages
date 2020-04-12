<?php
////////FILE PHP PER UPLOAD SPECIFIHE DI TEST//////
$servername = "localhost";
$username = "root";
$password = "root";

try {
    $conn = new PDO("mysql:host=$servername;dbname=affectiveimage", $username, $password); //start connection
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);       // error exception
    $sql = "DELETE FROM Test WHERE id=0";
    $conn->exec($sql);
    $Nt= $_GET['Nt'];
    $ltest= $_GET['ltest'];
    $ripet= $_GET['ripet'];
    $nNeutre = $_GET['nNeutre'];
    $timer = $_GET['timer'];
    $groupA= $_GET['groupA'];
    $groupH= $_GET['groupH'];
    $groupN= $_GET['groupN'];
    $groupP= $_GET['groupP'];
    $groupS= $_GET['groupS'];

    $stmt = $conn->prepare("INSERT INTO test (Nt,ltest,ripet,nNeutre,timer,groupA,groupH,groupN,groupP,groupS)
    VALUES (:Nt,:ltest,:ripet,:nNeutre,:timer,:groupA,:groupH,:groupN,:groupP,:groupS)");

    $stmt->bindParam(':Nt',$Nt);
    $stmt->bindParam(':ltest',$ltest);
    $stmt->bindParam(':ripet',$ripet);
    $stmt->bindParam(':nNeutre',$nNeutre);
    $stmt->bindParam(':timer',$timer);
    $stmt->bindParam(':groupA',$groupA);
    $stmt->bindParam(':groupH',$groupH);
    $stmt->bindParam(':groupN',$groupN);
    $stmt->bindParam(':groupP',$groupP);
    $stmt->bindParam(':groupS',$groupS);

    $stmt->execute();
    }

catch(PDOException $e)
    {
    echo "Connection failed: " . $e->getMessage();
    }
    $conn = null;


?>
