<?php

function getProprietaires(){
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

function getVoitures(){
    global $db;
    $conn=$db->query("
        SELECT  voitures.id,
                voitures.matricule,
                voitures.marque,
                voitures.annee,
                proprietaires.proprietaire
        FROM voitures
        JOIN proprietaires
        ON voitures.proprietaire=proprietaires.nom
        ORDER BY annee
    ");
    $results = array();

    while($rows = $conn->fetchObject()){
        $results[] = $rows;
    }

    return $results;
}