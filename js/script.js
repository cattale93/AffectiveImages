//Titolo: affectiveimage
//Corso: Elaborazione Trasmissione d'Immagini
//Docenti: Francesco De Natale, Andrea Rosani
//Autori: Alessandro Cattoi, Andrea Silli


////////////////VARIABILI GLOBALI/////////////////////

//variabili utilizzate per cambiare pagina web all'interno del file js
//attenzione ad adattarle al proprio path
var path = "http://localhost:8200/affectiveimage/page/";
var gotoref1 = path + "pausa.html";
var gotoref2 = path + "impostazioni.html";
var gotoref3 = path + "stop.html";
var gotoref5 = path + "stop1.html";
var gotoref4 = path + "resoconto.html";
var gotoref6 = path + "page0.html";

var limit = 4; //numero di immagini massimo utilizzabile per gruppo di immagine
var numImgA = limit; //gruppo A immagini cruente
var numImgH = limit; //gruppo H immagini tristi
var numImgN = limit; //gruppo N immagini neutre
var numImgP = limit; //gruppo P immagini piacevoli
var numImgSp = (limit / 2); //gruppo Sp serpenti
var numImgSn = (limit / 2); //gruppo Sn ragni
var numImgS = numImgSn + numImgSp; // i gruppi di serpenti e ragni sono stati uniti per semplicità

//array contenete l'informazione riguardante quali gruppi testare
//group=[ 0:1 , 1:2 , 2:3 , 3:4 , 4:5 ] esempio di test su tutti i gruppi
/*
Local storage è contenitore di sessione che vive fin che il browser è aperto, è necessario per poter
inizializare correttamente le variabili tra il passaggio tra una pagina e l'altra
I valori vengono inizializzati al valore di localStorage dove ci sono salvati i valori scaricati dal db
Il localStorage salva ogni valore sotto forma di testo quindi a volte è necessario trasformarli in numero.
*/
var group = new Array();
group[0] = Number(localStorage.getItem("groupA"));
group[1] = Number(localStorage.getItem("groupH"));
group[2] = Number(localStorage.getItem("groupN"));
group[3] = Number(localStorage.getItem("groupP"));
group[4] = Number(localStorage.getItem("groupS"));
var Nt = localStorage.getItem("Nt"); //Nome Test
var nNeutral = Number(localStorage.getItem("nNeutre")); //Livello di smorzameto tra un immagine e l'altra
var ltest = Number(localStorage.getItem("ltest")); //lunghezza di un signolo test [numero di immagini visualizzate]
var ripet = Number(localStorage.getItem("ripet")); //Numero di ripetizoni delle immagini di ogni gruppo per test
var nImgTOT = Number(localStorage.getItem("nImgTOT")); // numero immagini totali visualizzate nella sessione di test in corso
//contatori del numero di immagini di un certo gruppo visualizzate nell'arco di un singolo test
var nImgA = Number(localStorage.getItem("nImgA"));
var nImgH = Number(localStorage.getItem("nImgH"));
var nImgN = Number(localStorage.getItem("nImgN"));
var nImgP = Number(localStorage.getItem("nImgP"));
var nImgS = Number(localStorage.getItem("nImgS"));
var timer = Number(localStorage.getItem("timer"));

//contatore numero di immagini smorzatrici mostrato nell'arco della sessione di test
var nImgNvar = Number(localStorage.getItem("nImgNvar"));

//creazione di un array per il controllo della generazione casuale del gruppo a cui aoppartiene
//l'immagine da visualizzare
var buffer = new Array();
for (i = 0; i < 5; ++i) {
  buffer[i] = null;
}

//generazione di una variabile per conteggiare quanti gruppi si è scelto di testare
var temp = 0;
for (i = 0; i < 5; ++i) {
  if (group[i] != 0) {
    temp = temp + 1;
  }
}

var actnNeutral = 0; //contatore delle immagini di smorzamento visualizzate tra un'immagine e l'altra sotto test
var stato = false; //variabile di stato utilizzata per il controllo di flusso
var gruppo = 0; //variabile utilizzata per la scelta del gruppo

/*Le immagini totali da visualizzare nell'arco di una sessione di test sono calcolate prendendo
la dimensione del gruppo più grande da testare e moltiplicandolo per il numero di gruppi
e il numero di ripetizioni*/
var ImgTOT = Math.max(numImgA * group[0], numImgH * (group[1] / 2), numImgN * (group[2] / 3), numImgP * (group[3] / 4), numImgS * (group[4] / 5));
var ImgTOTripet = ImgTOT * ripet * temp;


////////////////NOTIFICA/////////////////////
//funzione per generare la notifica di avviso di fine sessione di test

function notifica() {
  var notifica = document.getElementById('new'); //elemento a cui viene passata l'immagine con o senza notifica

  group[0] = Number(localStorage.getItem("groupA"));
  group[1] = Number(localStorage.getItem("groupH"));
  group[2] = Number(localStorage.getItem("groupN"));
  group[3] = Number(localStorage.getItem("groupP"));
  group[4] = Number(localStorage.getItem("groupS"));
  ripet = Number(localStorage.getItem("ripet"));
  nImgTOT = Number(localStorage.getItem("nImgTOT"));
  ImgTOT = Math.max(numImgA * group[0], numImgH * (group[1] / 2), numImgN * (group[2] / 3), numImgP * (group[3] / 4), numImgS * (group[4] / 5));
  ImgTOTripet = ImgTOT * ripet * temp;

  //controllo se il test si è esaurito al netto delle immagini di smorzamento mostrate
  if (ImgTOTripet <= (nImgTOT - nImgNvar)) {
    notifica.innerHTML = '<img src="../img/Img_generali/notifica.png" class="img-responsive" onclick="goto1()" style="width:40%;height:40%;" role="button"/>';
  } else {
    notifica.innerHTML = '<img src="../img/Img_generali/impostazioni.png" class="img-responsive" onclick="goto()" style="width:40%;height:40%;" role="button"/>';
  }
}


////////////////RESOCONTO/////////////////////
//Questa funzione genera un resconto una volta finta la sessione di test

function resoconto() {

  //elementi html a cui vengono associati i valori del test in corso
  var Ntest = document.getElementById('Ntest');
  var Imgpt = document.getElementById('Imgpt');
  var Imgn = document.getElementById('Imgn');
  var Imgrip = document.getElementById('Imgrip');
  var gruppi = document.getElementById('gruppi');
  var Ttimer = document.getElementById('Ttimer');
  //associazione effettiva dei valori
  Ntest.innerHTML = Nt;
  Imgpt.innerHTML = ltest;
  Imgn.innerHTML = nNeutral;
  Imgrip.innerHTML = ripet;
  //in base al valore dell'array group viene associata la lettera del gruppo corrispondente
  var grouplist = "";
  for (i = 0; i < 5; ++i) {
    switch (group[i]) {
      case 1:
        grouplist = grouplist + "A";
        break;
      case 2:
        grouplist = grouplist + "H";
        break;
      case 3:
        grouplist = grouplist + "N";
        break;
      case 4:
        grouplist = grouplist + "P";
        break;
      case 5:
        grouplist = grouplist + "S";
        break;
    }
  }
  gruppi.innerHTML = grouplist;
  Ttimer.innerHTML = timer;
  //elementi html a cui vengono associati i valori del test compiuto
  var Ntestese = document.getElementById('Ntestese');
  var ImgTOT = document.getElementById('ImgTOT');
  var ImgA = document.getElementById('ImgA');
  var ImgH = document.getElementById('ImgH');
  var ImgN = document.getElementById('ImgN');
  var ImgP = document.getElementById('ImgP');
  var ImgS = document.getElementById('ImgS');
  Ntestese.innerHTML = nImgTOT / ltest; //numero di test eseguiti
  ImgTOT.innerHTML = nImgTOT;
  ImgA.innerHTML = nImgA + ((ripet * numImgA) * (group[0]));
  ImgH.innerHTML = nImgH + ((ripet * numImgH) * (group[1] / 2));
  ImgN.innerHTML = nImgN + ((ripet * numImgN) * (group[2] / 3)) + nImgNvar;
  ImgP.innerHTML = nImgP + ((ripet * numImgP) * (group[3] / 4));
  ImgS.innerHTML = nImgS + ((ripet * numImgS) * (group[4] / 5));
}


////////////////GENERAZIONI IMMAGINI RANDOM/////////////////////
//Questa funzione genera l'immagine da mostrare a video
//la variaile num che viene passata alla funzione indica un valore incrementale
//che tiene conto dell numero di immagini visualizzate fino a quel punto
//quindi il se num=1 si sta generando la prima immagine del test in esecuzione

function generaImmaginiRandom(num) {

  //condizione che verifica se visualizzare un'immagine smorzatrice o un immagine sotto test
  if ((nNeutral == 0) || (actnNeutral == nNeutral)) {
    rand = Math.random() * 5;
    rand = Math.floor(rand); //generazione valore random tra 0 e 4
    for (i = 0; i < 5; ++i) { //ciclo iterativo di controllo del gruppo a cui appartiengono le immagine da visualizzare
      if ((rand == buffer[i]) || (group[rand] == 0)) {
        /*se il gruppo non appartiene a quelli da visualizzare o è già stato visualizzato,
        si rigenera il numero random fino a quando non se ne trova uno adeguato*/
        rand = Math.random() * 5;
        rand = Math.floor(rand);
        i = -1;
      }
    }
    var stato = true;
    //ciclo di gestione del buffer di gruppi da visualizzare
    for (i = 0; i < temp; ++i) {
      if ((buffer[i] == null) && (stato)) { //si cerca il primo spazio libero nel buffer
        buffer[i] = rand; //memorizzazione dato
        stato = false; //fa in modo di non memorizzare due volte lo stesso dato
        if (i == (temp - 1)) { //se il buffer è pieno lo si svuota
          for (j = 0; j < 5; ++j) {
            buffer[j] = null;
          }
        }
      }
    }
    gruppo = rand + 1;
    actnNeutral = 0; //azzeramento numero di immagini di smorzamento
  } else {
    gruppo = 6; //gruppo "speciale" per la generazione di immagini del tipo N (smorzatrici)
    actnNeutral = actnNeutral + 1;
  }

  var cnt = document.getElementById('A'); //riferimento del file html per mostrare l'immagine generata

  nImgTOT += 1;
  localStorage.setItem('nImgTOT', nImgTOT);
  //il valore della variabile gruppo, scelto nel ciclo precedente controlla qeusto switch
  switch (gruppo) {
    case 1:
      nImgA += 1;
      /*generazione del path che pesca in base al "case" un certo gruppo, e in base alla variabile
      incrementale nImg* l'immagine precisa.*/
      img = '../img/A/A (' + nImgA + ').bmp';
      localStorage.setItem('n' + num, "A" + nImgA);
      /*Per visualizzare più volte un gruppo nella stessa sessione una volta raggiunta l'ultima immagine
      si azzera il contatore incrementale di gruppo*/
      if (nImgA == numImgA) {
        nImgA = 0;
      }
      localStorage.setItem('nImgA', nImgA);
      break;

    case 2:
      nImgH += 1;
      img = '../img/H/H (' + nImgH + ').bmp';
      localStorage.setItem('n' + num, "H" + nImgH);
      if (nImgH == numImgH) {
        nImgH = 0;
      }
      localStorage.setItem('nImgH', nImgH);
      break;
    case 3:
      nImgN += 1;
      img = '../img/N/N (' + nImgN + ').bmp';
      localStorage.setItem('n' + num, "N" + nImgN);
      if (nImgN == numImgN) {
        nImgN = 0;
      }
      localStorage.setItem('nImgN', nImgN);
      break;

    case 4:
      nImgP += 1;
      img = '../img/P/P (' + nImgP + ').bmp';
      localStorage.setItem('n' + num, "P" + nImgP);
      if (nImgP == numImgP) {
        nImgP = 0;
      }
      localStorage.setItem('nImgP', nImgP);
      break;

    case 5:
      nImgS += 1;
      img = '../img/S/S (' + nImgS + ').bmp';
      localStorage.setItem('n' + num, "S" + nImgS);
      if (nImgS == numImgS) {
        nImgS = 0;
      }
      localStorage.setItem('nImgS', nImgS);
      break;

      /////////SMORZATORE////////
      /*qui si generano immagini completamente casuali senza alcun controllo
      sono immagini del gruppo N e in questo caso fungono solo da smorzatori */
    case 6:
      nImgNvar += 1
      var rand = Math.random() * numImgN;
      rand = Math.floor(rand) + 1;
      img = '../img/N/N (' + rand + ').bmp';
      localStorage.setItem('n' + num, "N" + rand);
      localStorage.setItem("nImgNvar", nImgNvar);
      break;
  }
  cnt.innerHTML = '<div><img src=" ' + img + ' " /></div><span class="label label-primary">'; //carico limmagine sulla pagina
}


////////////////SAVESTATE/////////////////////
/*Questa funzione memorizza sul db "state" lo stato della sessione dei test attuale
La variabile stato che gli viene passata serve a specificare da che pagina è stato chiamato
in modo da poterlo azzerare all'inizio di una nuova sessione*/
function saveState(stato) {
  if (stato) {
    nImgTOT = 0;
    nImgA = 0;
    nImgH = 0;
    nImgN = 0;
    nImgP = 0;
    nImgS = 0;
    nImgNvar = 0;
    localStorage.clear(); //svuota il localStorage
  } else {
    nImgTOT = Number(localStorage.getItem("nImgTOT"));
    nImgA = Number(localStorage.getItem("nImgA"));
    nImgH = Number(localStorage.getItem("nImgH"));
    nImgN = Number(localStorage.getItem("nImgN"));
    nImgP = Number(localStorage.getItem("nImgP"));
    nImgS = Number(localStorage.getItem("nImgS"));
    nImgNvar = Number(localStorage.getItem("nImgNvar"));
  }
  //la riga sotto allega all'url che effettua la chiamata al db tutte le variabili che bisogna passargli
  var url = "../php/db_setstate.php?nImgTOT=" + nImgTOT + "&nImgA=" + nImgA + "&nImgH=" + nImgH + "&nImgN=" + nImgN + "&nImgP=" + nImgP + "&nImgS=" + nImgS + "&nImgNvar=" + nImgNvar;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

////////////////SAVESETTINGS/////////////////////
/*Questa funzione memorizza nel db "test" tutti i paramentri del test in corso*/
function saveSettings() {
  /*estrazione dei valori inseriti nella pagina html
  i valori "checked" sono true e false quindi è necessario effettuare un addattamento*/
  var Nt = document.getElementById('NomeTest').value,
    ltest = document.getElementById('ltest').value,
    ripet = document.getElementById('NumRipetizioni').value,
    nNeutre = document.getElementById('nNeutre').value,
    timer = document.getElementById('timer').value,
    groupA = document.getElementById('groupA').checked,
    groupH = document.getElementById('groupH').checked,
    groupN = document.getElementById('groupN').checked,
    groupP = document.getElementById('groupP').checked,
    groupS = document.getElementById('groupS').checked;

  if (groupA) {
    groupA = 1;
  } else {
    groupA = 0;
  }
  if (groupH) {
    groupH = 2;
  } else {
    groupH = 0;
  }
  if (groupN) {
    groupN = 3;
  } else {
    groupN = 0;
  }
  if (groupP) {
    groupP = 4;
  } else {
    groupP = 0;
  }
  if (groupS) {
    groupS = 5;
  } else {
    groupS = 0;
  }

  var url = "../php/db_settest.php?Nt=" + Nt + "&ltest=" + ltest + "&ripet=" + ripet + "&ripet=" + ripet;
  url = url + "&nNeutre=" + nNeutre + "&timer=" + timer + "&groupA=" + groupA;
  url = url + "&groupH=" + groupH + "&groupN=" + groupN + "&groupP=" + groupP + "&groupS=" + groupS;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", url, true); //punto di domanda per passare variabile via url
  xmlhttp.send();

}


///////////////LOADSTATE/////////////////////
/*Questa funzione scrarica i dati dal db "state" */

function loadState() {

  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myObj = JSON.parse(this.responseText);
      localStorage.setItem('nImgTOT', myObj.nImgTOT); //memorizzo i valori scaricati
      localStorage.setItem('nImgA', myObj.nImgA);
      localStorage.setItem('nImgH', myObj.nImgH);
      localStorage.setItem('nImgN', myObj.nImgN);
      localStorage.setItem('nImgP', myObj.nImgP);
      localStorage.setItem('nImgS', myObj.nImgS);
      localStorage.setItem('nImgNvar', myObj.nImgNvar);
    }
  };
  xmlhttp.open("GET", "../php/db_loadstate.php", true);
  xmlhttp.send();
}


///////////////LOADTEST/////////////////////
/*Questa funzione scrarica i dati dal db "test" */

function loadTest() {

  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myObj = JSON.parse(this.responseText);
      localStorage.setItem('Nt', myObj.Nt);
      localStorage.setItem('ltest', myObj.ltest);
      localStorage.setItem('ripet', myObj.ripet);
      localStorage.setItem('nNeutre', myObj.nNeutre);
      localStorage.setItem('timer', myObj.timer);
      localStorage.setItem('groupA', myObj.groupA);
      localStorage.setItem('groupH', myObj.groupH);
      localStorage.setItem('groupN', myObj.groupN);
      localStorage.setItem('groupP', myObj.groupP);
      localStorage.setItem('groupS', myObj.groupS);
    }
  };
  xmlhttp.open("GET", "../php/db_loadtest.php", true);
  xmlhttp.send();
}


///////////////SALVATAGGIO DATI PERSONALI/////////////////////
/*Questa funzione memorizza i dati inseriti nel browser nel localStorage per un successivo
caricamento nel db*/

function savePersonalData() {

  var nome = document.getElementById('testoNome').value,
    cognome = document.getElementById('testoCognome').value,
    eta = document.getElementById('testoEta').value;
  var sesso = "";
  var m = document.getElementById("testosesso1").checked,
    f = document.getElementById("testosesso2").checked;

  if (m == true) {
    sesso = "M";
  } else if (f == true) {
    sesso = "F";
  } else {
    sesso = "Dato mancante";
  }

  localStorage.setItem('nome', nome);
  localStorage.setItem('cognome', cognome);
  localStorage.setItem('eta', eta);
  localStorage.setItem('sesso', sesso);
}


///////////////SALVATAGGIO INDICE DI GRADIMENTO/////////////////////
/*Questa funzione memorizza nel localStorage il valore di gradimento associato
all'immagine mostrata, inoltre si occupa di proseguire ai quesiti matematici
in caso di test terminato o di dare il via alla nuova generazione di un'immagine
in caso contrario
Gli indici di gradimento in base al numero premuto alla funzione viene passato tramite
la variabile result il valore corretto*/

function saveValueResult(result) {

  var cnt1 = document.getElementById('C');
  /*questa variabile tiene conto di quante immagini sono state visualizzate durante
  il test in corso in modo da poter associare le valutazioni all'immagine corretta*/
  var enter = localStorage.getItem("count");
  if (enter == null) { //inizializzazione della variabile al primo ciclo
    localStorage.setItem("count", "1");
    enter = localStorage.getItem("count");
  }
  enter = Number(enter);

  /*nel localStorage i valori degli smile si chiamano "Val*", mentre i valori dell'indice di
  gradimento si chiamano "Valg*", la riga di codice sotto estrare il valore dello smile alla
  corrispondente alla pagina corrente e viene verificato se è stato scelto uno smile
  in caso affermativo si procede a salvare l'indice di gradimento selezionato (result)
  in caso contrario viene mostrato un alert che invita a scegliere prima lo smile*/
  var k = localStorage.getItem("Val" + enter);
  if (k == null) {
    alert("Scegliere prima lo smile e poi scegliere l'indice di gradimento");
  } else {
    localStorage.setItem('Valg' + (enter), result); //salvataggio indice di gradimento
    enter += 1;
    localStorage.setItem('count', enter);
    cnt1.innerHTML = '<img src = "../img/Img_generali/white.png" class="img-responsive" alt="Responsive image" style="width:70%;height:70%">';
    if (enter <= ltest) { //check di fine test
      generaImmaginiRandom(enter); //se falso nuova immagine
    } else {
      localStorage.setItem("count", "1"); // se vero reset di count e passaggio a un'altra pagina
      location.replace(gotoref1);
    }
  }
}


///////////////SALVATAGGIO DATI SMILE/////////////////////
/*Questa funzione memorizza nel localStorage lo smile selezionato dall'utente
per ogni immagine visualizzata
Gli smile sono categorizzati da sinistra verso destra rispettivamente da 1 a 4
Infatti in base allo smile premuto alla funzione viene passato tramite
la variabile result il valore corretto*/

function saveFaceResult(result) {

  var x = localStorage.getItem("count");
  if (x == null) {
    localStorage.setItem("count", "1");
    x = localStorage.getItem("count");
  }
  x = Number(x);
  var cnt1 = document.getElementById('C');
  localStorage.setItem('Val' + x, result);
  cnt1.innerHTML = '<img src = "../img/Img_generali/ok.png" class="img-responsive" alt="Responsive image" style="width:70%;height:70%">';
}


///////////////SALVATAGGIO DI TUTTI I RISULTATI SUL DB/////////////////////
/*Questa funzione salva tutti i risultati sui db "risultati" come ultima azione di
ogni singolo test*/

function Save() {

  var a = localStorage.getItem("n1");
  var b = localStorage.getItem("Val1");
  var c = localStorage.getItem("Valg1");
  var d = localStorage.getItem("n2");
  var e = localStorage.getItem("Val2");
  var f = localStorage.getItem("Valg2");
  var g = localStorage.getItem("n3");
  var h = localStorage.getItem("Val3");
  var i = localStorage.getItem("Valg3");
  var j = localStorage.getItem("n4");
  var k = localStorage.getItem("Val4");
  var l = localStorage.getItem("Valg4");
  var m = localStorage.getItem("n5");
  var n = localStorage.getItem("Val5");
  var p = localStorage.getItem("Valg5");
  var q = localStorage.getItem("n6");
  var r = localStorage.getItem("Val6");
  var s = localStorage.getItem("Valg6");
  var t = localStorage.getItem("n7");
  var u = localStorage.getItem("Val7");
  var v = localStorage.getItem("Valg7");
  var w = localStorage.getItem("n8");
  var x = localStorage.getItem("Val8");
  var y = localStorage.getItem("Valg8");
  var z = localStorage.getItem("n9");
  var a1 = localStorage.getItem("Val9");
  var b1 = localStorage.getItem("Valg9");
  var c1 = localStorage.getItem("n10");
  var d1 = localStorage.getItem("Val10");
  var e1 = localStorage.getItem("Valg10");
  var g1 = localStorage.getItem("n11");
  var h1 = localStorage.getItem("Val11");
  var i1 = localStorage.getItem("Valg11");
  var j1 = localStorage.getItem("n12");
  var k1 = localStorage.getItem("Val12");
  var l1 = localStorage.getItem("Valg12");
  var m1 = localStorage.getItem("n13");
  var n1 = localStorage.getItem("Val13");
  var o1 = localStorage.getItem("Valg13");
  var p1 = localStorage.getItem("n14");
  var q1 = localStorage.getItem("Val14");
  var r1 = localStorage.getItem("Valg14");
  var s1 = localStorage.getItem("n15");
  var t1 = localStorage.getItem("Val15");
  var v1 = localStorage.getItem("Valg15");
  var w1 = localStorage.getItem("n16");
  var x1 = localStorage.getItem("Val16");
  var y1 = localStorage.getItem("Valg16");
  var z1 = localStorage.getItem("n17");
  var a2 = localStorage.getItem("Val17");
  var b2 = localStorage.getItem("Valg17");
  var c2 = localStorage.getItem("n18");
  var d2 = localStorage.getItem("Val18");
  var e2 = localStorage.getItem("Valg18");
  var f2 = localStorage.getItem("n19");
  var g2 = localStorage.getItem("Val19");
  var h2 = localStorage.getItem("Valg19");
  var i2 = localStorage.getItem("n20");
  var j2 = localStorage.getItem("Val20");
  var k2 = localStorage.getItem("Valg20");
  var l2 = localStorage.getItem("n21");
  var m2 = localStorage.getItem("Val21");
  var n2 = localStorage.getItem("Valg21");
  var o2 = localStorage.getItem("n22");
  var p2 = localStorage.getItem("Val22");
  var q2 = localStorage.getItem("Valg22");
  var r2 = localStorage.getItem("n23");
  var s2 = localStorage.getItem("Val23");
  var t2 = localStorage.getItem("Valg23");
  var u2 = localStorage.getItem("n24");
  var v2 = localStorage.getItem("Val24");
  var w2 = localStorage.getItem("Valg24");
  var x2 = localStorage.getItem("n25");
  var y2 = localStorage.getItem("Val25");
  var z2 = localStorage.getItem("Valg25");
  var a3 = localStorage.getItem("n26");
  var b3 = localStorage.getItem("Val26");
  var c3 = localStorage.getItem("Valg26");
  var d3 = localStorage.getItem("n27");
  var e3 = localStorage.getItem("Val27");
  var f3 = localStorage.getItem("Valg27");
  var g3 = localStorage.getItem("n28");
  var h3 = localStorage.getItem("Val28");
  var i3 = localStorage.getItem("Valg28");
  var j3 = localStorage.getItem("n29");
  var k3 = localStorage.getItem("Val29");
  var l3 = localStorage.getItem("Valg29");
  var m3 = localStorage.getItem("n30");
  var n3 = localStorage.getItem("Val30");
  var o3 = localStorage.getItem("Valg30");

  var nom = localStorage.getItem("nome");
  var cog = localStorage.getItem("cognome");
  var et = localStorage.getItem("eta");
  var ses = localStorage.getItem("sesso");
  var mt1 = localStorage.getItem("mat1");
  var mt1s = localStorage.getItem("mat1s");
  var mt1r = localStorage.getItem("mat1r");
  var mt2 = localStorage.getItem("mat2");
  var mt2s = localStorage.getItem("mat2s");
  var mt2r = localStorage.getItem("mat2r");
  var Nt = localStorage.getItem("Nt");

  var url = "../php/db_upload.php?Nt=" + Nt + "&nom=" + nom + "&cog=" + cog + "&et=" + et + "&ses=" + ses + "&mt1=" + mt1 + "&mt1s=" + mt1s + "&mt1r=" + mt1r + "&mt2=" + mt2 + "&mt2s=" + mt2s + "&mt2r=" + mt2r;

  url = url + "&a=" + a + "&b=" + b + "&c=" + c + "&d=" + d + "&e=" + e + "&f=" + f + "&g=" + g + "&h=" + h + "&i=" + i + "&j=" + j + "&k=" + k + "&l=" + l;
  url = url + "&m=" + m + "&n=" + n + "&p=" + p + "&q=" + q + "&r=" + r + "&s=" + s + "&t=" + t + "&u=" + u + "&v=" + v + "&w=" + w + "&x=" + x;
  url = url + "&y=" + y + "&z=" + z;

  url = url + "&a1=" + a1 + "&b1=" + b1 + "&c1=" + c1 + "&d1=" + d1 + "&e1=" + e1 + "&g1=" + g1 + "&h1=" + h1 + "&i1=" + i1 + "&j1=" + j1 + "&k1=" + k1 + "&l1=" + l1;
  url = url + "&m1=" + m1 + "&n1=" + n1 + "&o1=" + o1 + "&p1=" + p1 + "&q1=" + q1 + "&r1=" + r1 + "&s1=" + s1 + "&t1=" + t1 + "&v1=" + v1 + "&w1=" + w1 + "&x1=" + x1;
  url = url + "&y1=" + y1 + "&z1=" + z1;

  url = url + "&a2=" + a2 + "&b2=" + b2 + "&c2=" + c2 + "&d2=" + d2 + "&e2=" + e2 + "&f2=" + f2 + "&g2=" + g2 + "&h2=" + h2 + "&i2=" + i2 + "&j2=" + j2 + "&k2=" + k2 + "&l2=" + l2;
  url = url + "&m2=" + m2 + "&n2=" + n2 + "&o2=" + o2 + "&p2=" + p2 + "&q2=" + q2 + "&r2=" + r2 + "&s2=" + s2 + "&t2=" + t2 + "&u2=" + u2 + "&v2=" + v2 + "&w2=" + w2 + "&x2=" + x2;
  url = url + "&y2=" + y2 + "&z2=" + z2;

  url = url + "&a3=" + a3 + "&b3=" + b3 + "&c3=" + c3 + "&d3=" + d3 + "&e3=" + e3 + "&f3=" + f3 + "&g3=" + g3 + "&h3=" + h3 + "&i3=" + i3 + "&j3=" + j3 + "&k3=" + k3 + "&l3=" + l3;
  url = url + "&m3=" + m3 + "&n3=" + n3 + "&o3=" + o3;

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", url, true); //punto di domanda per passare variabile via url
  xmlhttp.send();

  //Alla fine del test viene mostrato un alert che ringrazia l'utente e mostra una % di avanzamento indicativa
  alert("Grazie alla tua collaborazione abbiamo svolto il " + Math.floor(((nImgTOT - nImgNvar) / ImgTOTripet) * 100) + " % " + "dei nostri Test.");
  localStorage.clear();
}


///////////////GENERA UN'EQUAZIONE "SEMPLICE"/////////////////////

function generaSemplice() {

  var piumeno = Math.random() * 2; //numero random tra 0 e 1 per scegliere il primo operando
  var rand1 = Math.random() * 10; //numero random tra 0 e 9 per scegliere il primo addendo
  var ris = 0;
  rand1 = Math.floor(rand1);
  var rand2 = Math.random() * 10; //numero random tra 0 e 9 per scegliere il secondo addendo
  rand2 = Math.floor(rand2);
  var rand3 = Math.random() * 10; //numero random tra 0 e 9 per scegliere il terzo addendo
  rand3 = Math.floor(rand3);
  var espressione;
  if (piumeno < 1) {
    espressione = rand1 + " + ";
    piumeno = Math.random() * 2; //numero random tra 0 e 1 per scegliere il secondo operando
    if (piumeno < 1) {
      espressione = espressione + rand2 + ' + ' + rand3;
      ris = rand1 + rand2 + rand3;
    } else {
      espressione = espressione + rand2 + ' - ' + rand3;
      ris = rand1 + rand2 - rand3;
    }
  } else {
    espressione = rand1 + ' - ';
    piumeno = Math.random() * 2;
    if (piumeno < 1) {
      espressione = espressione + rand2 + ' + ' + rand3;
      ris = rand1 - rand2 + rand3;
    } else {
      espressione = espressione + rand2 + ' - ' + rand3;
      ris = rand1 - rand2 - rand3;
    }
  }
  espressione = espressione + ' = '; //stringa contente l'operazione che viene poi restituita al file html
  var cnt2 = document.getElementById('text');
  localStorage.setItem('mat1', espressione);
  localStorage.setItem('mat1s', ris); //risultato dell'operazione calcolato in precedenza
  cnt2.innerHTML = '<font style="color: #DF0101" face="Helvetica " size="8">' + espressione + ' </font>';
}


///////////////GENERA UN'EQUAZIONE "COMPLESSA"/////////////////////

function generaComplesso() {
  var cnt2 = document.getElementById('text');
  var ris = 0;
  var piumeno = Math.random() * 3; //numero random tra 0 e 2 per scegliere il primo operando
  piumeno = Math.floor(piumeno);
  var rand1 = Math.random() * 100;
  rand1 = Math.floor(rand1) + 16; //numero random tra 16 e 115 per scegliere il primo addendo
  var rand2 = Math.random() * 147;
  rand2 = Math.floor(rand2) + 16; //numero random tra 16 e 162 per scegliere il secondo addendo
  var rand3 = Math.random() * 100;
  rand3 = Math.floor(rand3) + 16; //numero random tra 16 e 115 per scegliere il terzo addendo
  if (piumeno == 0) {
    espressione = rand1 + ' + ';
    piumeno = Math.random() * 3; //numero random tra 0 e 2 per scegliere il secondo operando
    piumeno = Math.floor(piumeno);
    if (piumeno == 0) {
      espressione = espressione + rand2 + ' / ' + rand3;
      ris = rand1 + (rand2 / rand3);
    } else if (piumeno == 1) {
      espressione = espressione + rand2 + ' / ' + rand3;
      ris = rand1 + (rand2 / rand3);
    } else {
      espressione = espressione + rand2 + ' * ' + rand3;
      ris = rand1 + (rand2 * rand3);
    }
  } else if (piumeno == 1) {
    espressione = rand1 + ' - ';
    piumeno = Math.random() * 3;
    piumeno = Math.floor(piumeno);
    if (piumeno == 0) {
      espressione = espressione + rand2 + ' / ' + rand3;
      ris = rand1 - (rand2 / rand3);
    } else if (piumeno == 1) {
      espressione = espressione + rand2 + ' / ' + rand3;
      ris = rand1 - (rand2 / rand3);
    } else {
      espressione = espressione + rand2 + ' * ' + rand3;
      ris = rand1 - (rand2 * rand3);
    }
  } else {
    espressione = rand1 + ' - ';
    piumeno = Math.random() * 3;
    piumeno = Math.floor(piumeno);
    if (piumeno == 0) {
      espressione = espressione + rand2 + ' / ' + rand3;
      ris = rand1 - (rand2 / rand3);
    } else if (piumeno == 1) {
      espressione = espressione + rand2 + ' / ' + rand3;
      ris = rand1 - (rand2 / rand3);
    } else {
      espressione = espressione + rand2 + ' * ' + rand3;
      ris = rand1 - (rand2 * rand3);
    }
  }
  espressione = espressione + ' = ';
  var cnt2 = document.getElementById('text');
  localStorage.setItem('mat2', espressione);
  localStorage.setItem('mat2s', ris);
  cnt2.innerHTML = '<font style="color: #DF0101" face="Helvetica " size="8">' + espressione + ' </font>';
}


///////////////SALVA IL VALORE INSERITO COME RISPOSTA ALL'EQUAZIONE "SEMPLICE"/////////////////////

function savemat1() {

  var rx = document.getElementById('rx').value;
  localStorage.setItem('mat1r', rx);

}


///////////////SALVA IL VALORE INSERITO COME RISPOSTA ALL'EQUAZIONE "COMPLESSA"/////////////////////
var n1 = 0;
var deci = 0;
var deci1 = 0;

function savemat2() {

  var rx = document.getElementById('rx').value;
  localStorage.setItem('mat2r', rx);

}


///////////////TIMER/////////////////////
// La funzione genera un timer che scorre all' indietro di durata stabilita dal game-master

// funzione orologio
function clock(pageact) {
  localStorage.setItem("pageact", pageact);
  var tdes = 0;
  tdes = Number(localStorage.getItem("timer") - 1);
  var a = true;
  var x = setInterval(seconds, tdes);
  var b = false;


  window.setTimeout(temposcaduto, (tdes * 1000));

  function seconds() {

    var d = new Date();
    var n = d.getSeconds();
    var milli = d.getMilliseconds();
    milli = milli / 100;
    milli = 10 - milli;
    milli = Math.floor(milli);

    if (a) {
      a = false;
      localStorage.setItem("t", n);
    }

    mem = Number(localStorage.getItem("t"));

    if ((n == 0) || (b)) {
      b = true;
      n = n + 60;
    }
    var t = tdes + mem - n;
    var x = t.toString();
    x = x + "." + milli.toString();
    document.getElementById("demo").innerHTML = x;
  }
}
///////////////FUNZIONE CHE CAMBIA PAGINA UNA VOLTA SCADUTO IL TIMER EQUAZIONI/////////////////////
/*In base alla al valore di page act una volta scaduto il tempo si opassa a due pagine differenti*/

function temposcaduto() {
  var pageact = Number(localStorage.getItem("pageact"));
  if (pageact == 2) {
    location.replace(gotoref3);
  } else {
    location.replace(gotoref5);
  }

}


///////////////FUNZIONE CHE PERMETTE DI ACEDERE ALLA PAGINA IMPOSTAZIONI SONO VIA PASSWORD/////////////////////

function goto() {
  var yourPassword = "Password1"
  var password = prompt("Immettere password amministratore");

  if (password == yourPassword) {
    location.replace(gotoref2);
  }
}


///////////////FUNZIONE CHE PERMETTE DI ACEDERE ALLA PAGINA IMPOSTAZIONI SONO VIA PASSWORD/////////////////////
/*Come prima ma sta volta con la differenza è finita e quidni è attiva la notifica
infatti vengono chiamate le funzioni di download dei dati dal db*/

function goto1() {
  var yourPassword = "Password1"
  var password = prompt("Immettere password amministratore");
  loadState();
  loadTest();
  if (password == yourPassword) {
    location.replace(gotoref4);
  }
}


///////////////FUNZIONE PER AVANZAMENTO AUTOMATICO/////////////////////
/*La pagina loading dopo aver scaricato i dati dal db avanza automaticamente, e lo fa
richiamando questa funzuione*/

function gotostart() {
  location.replace(gotoref6);
}
