<?php
////////FILE PHP PER UPLOAD FINALE DEI RISULTATI//////
$servername = "localhost";
$username = "root";
$password = "root";

try {
    $conn = new PDO("mysql:host=$servername;dbname=affectiveimage", $username, $password); //start connection
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);       // error exception

    $Nt= $_GET['Nt'];
    $nom= $_GET['nom'];
    $cog= $_GET['cog'];
    $et = $_GET['et'];
    $ses = $_GET['ses'];
    $mt1= $_GET['mt1'];
    $mt1s= $_GET['mt1s'];
    $mt1r= $_GET['mt1r'];
    $mt2= $_GET['mt2'];
    $mt2s= $_GET['mt2s'];
    $mt2r= $_GET['mt2r'];


    $a = $_GET['a'];
    $b = $_GET['b'];
    $c = $_GET['c'];
    $d = $_GET['d'];
    $e = $_GET['e'];
    $f= $_GET['f'];
    $g= $_GET['g'];
    $h = $_GET['h'];
    $i= $_GET['i'];
    $j= $_GET['j'];
    $k= $_GET['k'];
    $l = $_GET['l'];
    $m = $_GET['m'];
    $n = $_GET['n'];
    $p = $_GET['p'];
    $q = $_GET['q'];
    $r= $_GET['r'];
    $s= $_GET['s'];
    $t = $_GET['t'];
    $u= $_GET['u'];
    $v= $_GET['v'];
    $w= $_GET['w'];
    $x = $_GET['x'];
    $y = $_GET['y'];
    $z = $_GET['z'];

    $a1 = $_GET['a1'];
    $b1 = $_GET['b1'];
    $c1 = $_GET['c1'];
    $d1 = $_GET['d1'];
    $e1 = $_GET['e1'];
    $g1 = $_GET['g1'];
    $h1 = $_GET['h1'];
    $i1 = $_GET['i1'];
    $j1 = $_GET['j1'];
    $k1 = $_GET['k1'];
    $l1 = $_GET['l1'];
    $m1 = $_GET['m1'];
    $n1 = $_GET['n1'];
    $o1 = $_GET['o1'];
    $p1 = $_GET['p1'];
    $q1 = $_GET['q1'];
    $r1 = $_GET['r1'];
    $s1 = $_GET['s1'];
    $t1 = $_GET['t1'];
    $v1 = $_GET['v1'];
    $w1 = $_GET['w1'];
    $x1 = $_GET['x1'];
    $y1 = $_GET['y1'];
    $z1 = $_GET['z1'];

    $a2 = $_GET['a2'];
    $b2 = $_GET['b2'];
    $c2 = $_GET['c2'];
    $d2 = $_GET['d2'];
    $e2 = $_GET['e2'];
    $f2 = $_GET['f2'];
    $g2 = $_GET['g2'];
    $h2 = $_GET['h2'];
    $i2 = $_GET['i2'];
    $j2 = $_GET['j2'];
    $k2 = $_GET['k2'];
    $l2 = $_GET['l2'];
    $m2 = $_GET['m2'];
    $n2 = $_GET['n2'];
    $o2 = $_GET['o2'];
    $p2 = $_GET['p2'];
    $q2 = $_GET['q2'];
    $r2 = $_GET['r2'];
    $s2 = $_GET['s2'];
    $t2 = $_GET['t2'];
    $u2 = $_GET['u2'];
    $v2 = $_GET['v2'];
    $w2 = $_GET['w2'];
    $x2 = $_GET['x2'];
    $y2 = $_GET['y2'];
    $z2 = $_GET['z2'];

    $a3 = $_GET['a3'];
    $b3 = $_GET['b3'];
    $c3 = $_GET['c3'];
    $d3 = $_GET['d3'];
    $e3 = $_GET['e3'];
    $f3 = $_GET['f3'];
    $g3 = $_GET['g3'];
    $h3 = $_GET['h3'];
    $i3 = $_GET['i3'];
    $j3 = $_GET['j3'];
    $k3 = $_GET['k3'];
    $l3 = $_GET['l3'];
    $m3 = $_GET['m3'];
    $n3 = $_GET['n3'];
    $o3 = $_GET['o3'];

    $stmt = $conn->prepare("INSERT INTO risultati (Nt,nom,cog,et,ses,mt1,mt1s,mt1r,mt2,mt2s,mt2r,
    a,b,c,d,e,f,g,h,i,j,k,l,m,n,p,q,r,s,t,u,v,w,x,y,z,a1,b1,c1,d1,e1,g1,h1,i1,j1,k1,l1,m1,n1,o1,p1,q1,r1,s1,t1,v1,w1,x1,y1,z1,
    a2,b2,c2,d2,e2,f2,g2,h2,i2,j2,k2,l2,m2,n2,o2,p2,q2,r2,s2,t2,u2,v2,w2,x2,y2,z2,a3,b3,c3,d3,e3,f3,g3,h3,i3,j3,k3,l3,m3,n3,o3)
    VALUES (:Nt,:nom,:cog,:et,:ses,:mt1,:mt1s,:mt1r,:mt2,:mt2s,:mt2r,
    :a,:b,:c,:d,:e,:f,:g,:h,:i,:j,:k,:l,:m,:n,:p,:q,:r,:s,:t,:u,:v,:w,:x,:y,:z,
    :a1,:b1,:c1,:d1,:e1,:g1,:h1,:i1,:j1,:k1,:l1,:m1,:n1,:o1,:p1,:q1,:r1,:s1,:t1,:v1,:w1,:x1,:y1,:z1,
    :a2,:b2,:c2,:d2,:e2,:f2,:g2,:h2,:i2,:j2,:k2,:l2,:m2,:n2,:o2,:p2,:q2,:r2,:s2,:t2,:u2,:v2,:w2,:x2,:y2,:z2,
    :a3,:b3,:c3,:d3,:e3,:f3,:g3,:h3,:i3,:j3,:k3,:l3,:m3,:n3,:o3)");



    $stmt->bindParam(':Nt',$Nt);
    $stmt->bindParam(':nom',$nom);
    $stmt->bindParam(':cog',$cog);
    $stmt->bindParam(':et',$et);
    $stmt->bindParam(':ses',$ses);
    $stmt->bindParam(':mt1',$mt1);
    $stmt->bindParam(':mt1s',$mt1s);
    $stmt->bindParam(':mt1r',$mt1r);
    $stmt->bindParam(':mt2',$mt2);
    $stmt->bindParam(':mt2s',$mt2s);
    $stmt->bindParam(':mt2r',$mt2r);

    $stmt->bindParam(':a',$a);
    $stmt->bindParam(':b',$b);
    $stmt->bindParam(':c',$c);
    $stmt->bindParam(':d',$d);
    $stmt->bindParam(':e',$e);
    $stmt->bindParam(':f',$f);
    $stmt->bindParam(':g',$g);
    $stmt->bindParam(':h',$h);
    $stmt->bindParam(':i',$i);
    $stmt->bindParam(':j',$j);
    $stmt->bindParam(':k',$k);
    $stmt->bindParam(':l',$l);
    $stmt->bindParam(':m',$m);
    $stmt->bindParam(':n',$n);
    $stmt->bindParam(':p',$p);
    $stmt->bindParam(':q',$q);
    $stmt->bindParam(':r',$r);
    $stmt->bindParam(':s',$s);
    $stmt->bindParam(':t',$t);
    $stmt->bindParam(':u',$u);
    $stmt->bindParam(':v',$v);
    $stmt->bindParam(':w',$w);
    $stmt->bindParam(':x',$x);
    $stmt->bindParam(':y',$y);
    $stmt->bindParam(':z',$z);
    $stmt->bindParam(':a1',$a1);
    $stmt->bindParam(':b1',$b1);
    $stmt->bindParam(':c1',$c1);
    $stmt->bindParam(':d1',$d1);
    $stmt->bindParam(':e1',$e1);
    $stmt->bindParam(':g1',$g1);
    $stmt->bindParam(':h1',$h1);
    $stmt->bindParam(':i1',$i1);
    $stmt->bindParam(':j1',$j1);
    $stmt->bindParam(':k1',$k1);
    $stmt->bindParam(':l1',$l1);
    $stmt->bindParam(':m1',$m1);
    $stmt->bindParam(':n1',$n1);
    $stmt->bindParam(':o1',$o1);
    $stmt->bindParam(':p1',$p1);
    $stmt->bindParam(':q1',$q1);
    $stmt->bindParam(':r1',$r1);
    $stmt->bindParam(':s1',$s1);
    $stmt->bindParam(':t1',$t1);
    $stmt->bindParam(':v1',$v1);
    $stmt->bindParam(':w1',$w1);
    $stmt->bindParam(':x1',$x1);
    $stmt->bindParam(':y1',$y1);
    $stmt->bindParam(':z1',$z1);
    $stmt->bindParam(':a2',$a2);
    $stmt->bindParam(':b2',$b2);
    $stmt->bindParam(':c2',$c2);
    $stmt->bindParam(':d2',$d2);
    $stmt->bindParam(':e2',$e2);
    $stmt->bindParam(':f2',$f2);
    $stmt->bindParam(':g2',$g2);
    $stmt->bindParam(':h2',$h2);
    $stmt->bindParam(':i2',$i2);
    $stmt->bindParam(':j2',$j2);
    $stmt->bindParam(':k2',$k2);
    $stmt->bindParam(':l2',$l2);
    $stmt->bindParam(':m2',$m2);
    $stmt->bindParam(':n2',$n2);
    $stmt->bindParam(':o2',$o2);
    $stmt->bindParam(':p2',$p2);
    $stmt->bindParam(':q2',$q2);
    $stmt->bindParam(':r2',$r2);
    $stmt->bindParam(':s2',$s2);
    $stmt->bindParam(':t2',$t2);
    $stmt->bindParam(':u2',$u2);
    $stmt->bindParam(':v2',$v2);
    $stmt->bindParam(':w2',$w2);
    $stmt->bindParam(':x2',$x2);
    $stmt->bindParam(':y2',$y2);
    $stmt->bindParam(':z2',$z2);
    $stmt->bindParam(':a3',$a3);
    $stmt->bindParam(':b3',$b3);
    $stmt->bindParam(':c3',$c3);
    $stmt->bindParam(':d3',$d3);
    $stmt->bindParam(':e3',$e3);
    $stmt->bindParam(':f3',$f3);
    $stmt->bindParam(':g3',$g3);
    $stmt->bindParam(':h3',$h3);
    $stmt->bindParam(':i3',$i3);
    $stmt->bindParam(':j3',$j3);
    $stmt->bindParam(':k3',$k3);
    $stmt->bindParam(':l3',$l3);
    $stmt->bindParam(':m3',$m3);
    $stmt->bindParam(':n3',$n3);
    $stmt->bindParam(':o3',$o3);

    $stmt->execute();
    }

catch(PDOException $e)
    {
    echo "Connection failed: " . $e->getMessage();
    }
    $conn = null;

?>
