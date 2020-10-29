<?php

function get_Proprietaires(){
    global $db;
    $conn = $db->query("
        SELECT  proprietaires.id,
                proprietaires.nom_prenoms,
                proprietaires.adresse,
                proprietaires.date_naissance,
                proprietaires.sexe
        FROM proprietaires
        ORDER BY id
    ");
    $results = array();

    while($rows = $conn->fetchObject()){
        $results[] = $rows;
    }

    return $results;
}

function proprietaires($nom_prenoms,$date_naissance, $adresse, $sexe){

    global $db;

    $c = array(
        'nom_prenoms'       => $nom_prenoms,
        'adresse'           => $adresse,
        'date_naissance'    => $date_naissance,
        'sexe'              => $sexe
    );

    $sql = "INSERT INTO proprietaires(nom_prenoms, adresse, date_naissance, sexe)
            VALUES(:nom_prenoms, :adresse, :date_naissance, :sexe)";
    $req = $db->prepare($sql);
    $req->execute($c);

}