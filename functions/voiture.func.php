<?php

function get_Voitures(){

    global $db;
    $conn=$db->query("
        SELECT  voitures.id,
                voitures.matricule,
                voitures.marque,
                voitures.annee,
                proprietaires.nom_prenoms
        FROM voitures
        JOIN proprietaires
        ON voitures.proprietaire=proprietaires.nom_prenoms
        ORDER BY annee
    ");
    $results = array();

    while($rows = $conn->fetchObject()){
        $results[] = $rows;
    }

    return $results;
}
function get_Voiture(){

    global $db;
    $conn=$db->query("
        SELECT  voitures.id,
                voitures.matricule,
                voitures.marque,
                voitures.annee,
                proprietaires.nom_prenoms
        FROM voitures
        JOIN proprietaires
        ON voitures.proprietaire=proprietaires.nom_prenoms
        ORDER BY annee
    ");
    $results = array();

    while($rows = $conn->fetchObject()){
        $results[] = $rows;
    }

    return $results;
}
function voitures($matricule,$marque, $annee, $proprietaire){

    global $db;

    $c = array(
        'matricule'       => $matricule,
        'marque'           => $marque,
        'annee'    => $annee,
        'proprietaire'              => $proprietaire
    );

    $sql = "INSERT INTO voitures(matricule, marque, annee, proprietaire, date)
            VALUES(:matricule, :marque, :annee, :proprietaire, NOW())";
    $req = $db->prepare($sql);
    $req->execute($c);

}