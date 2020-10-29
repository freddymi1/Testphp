<div class="row">
        <div class="col-lg-6">
            <div class="card">
                <div class="card-header">
                    <div class="row">
                        <div class="col-lg-8">
                        <h4>Liste des proprietaires</h4>
                        </div>
                        <div class="col-lg-4">
                            <a href="index.php?page=proprietaire" class="btn btn-success btn-sm" style="float: right;">Ajou de voiture</a>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                <?php
                    $props = getProprietaires();
                ?>
                    <table class="table table-bordered table-hover">
                        <thead>
                            <th>Nom et prenoms</th>
                            <th>Adresse</th>
                            <th>Date de naissance</th>
                            <th>Sexe</th>
                        </thead>
                        <tbody>
                            <?php
                        if(!empty($props)) {
                            foreach ($props as $prop) {
                            ?>
                                <tr>
                                    <td><?= $prop->nom_prenoms ?></td>
                                    <td><?= $prop->adresse ?></td>
                                    <td><?= $prop->date_naissance ?></td>
                                    <td><?= $prop->sexe ?></td>
                                </tr>
                                <?php
                            }
                        }
                        ?>
                        </tbody>
                        
                    </table>
                </div>
                <div class="card-footer">
                    <a href="index.php?page=proprietaire" class="btn btn-primary btn-sm" style="float: right;">Voir la liste complets</a>
                </div>
            </div>
        </div>
        <div class="col-lg-6">
            <div class="card">
                <div class="card-header">
                    <div class="row">
                        <div class="col-lg-8">
                        <h4>Liste des Voitures</h4>
                        </div>
                        <div class="col-lg-4">
                            <a href="index.php?page=voiture" class="btn btn-success btn-sm" style="float: right;">Ajou de voiture</a>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    
                </div>
                <div class="card-footer">
                    <a href="index.php?page=voiture" class="btn btn-primary btn-sm" style="float: right;">Voir la liste complets</a>
                </div>
            </div>
        </div>
    </div>