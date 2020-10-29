<h2>Liste des proprietaires</h2>
<div class="row">
    <div class="col-lg-4">
        <div class="card">
            <div class="card-header">
                Ajout des proprietaires
            </div>
            <div class="card-body">
                <?php
                if(isset($_POST['submit'])){
                    
                    $nom_prenoms = htmlspecialchars(trim($_POST['nom_prenoms']));
                    $adresse = htmlspecialchars(trim($_POST['adresse']));
                    $date_naissance = htmlspecialchars(trim($_POST['date_naissance']));
                    $sexe = htmlspecialchars(trim($_POST['sexe']));
                    
                    $errors = [];

                    if(empty($nom_prenoms) || empty($adresse) || empty($date_naissance) || empty($sexe)){
                        $errors['empty'] = "Tous les champs n'ont pas été remplis";
                    }


                    if(!empty($errors)){
                        ?>
                        <div class="alert alert-danger">
                            <?php
                            foreach($errors as $error){
                                echo $error."<br/>";
                            }
                            ?>
                        </div>
                        <?php
                    }else{
                        proprietaires($nom_prenoms,$date_naissance, $adresse, $sexe);
                        ?>

                        <?php
                    }

                }

                ?>

                <form method="post">
                    <div class="form-group">
                        <label for="nom">Nom et Prenoms</label>
                        <input type="text" name="nom_prenoms" id="" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="adr">Adresse</label>
                        <input type="text" name="adresse" id="" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="daten">Date de naissance</label>
                        <input type="date" name="date_naissance" id="" class="form-control">
                    </div>
                    
                    
                    <div class="form-group">
                        <label for="nom">Sexe</label>
                        <select name="sexe" id="sexe" class="form-control">
                            <option value="Homme">Homme</option>
                            <option value="Femme">Femme</option>
                        </select>
                    </div>
                    <button type="submit" name="submit" class="btn btn-success">Enregistrer</button>
                </form>
            </div>
        </div>
    </div>
    <div class="col-lg-8">
        <div class="card">
            <div class="card-header">
                List des proprietaires
            </div>
            <div class="card-body">
            <?php
                $props = get_Proprietaires();
            ?>
                <table class="table table-bordered table-hover">
                    <thead>
                        <th>Nom et prenoms</th>
                        <th>Adresse</th>
                        <th>Date de naissance</th>
                        <th>Sexe</th>
                        <th>Action</th>
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
                                    <td>
                                <a href="#" class="btn btn-success btn-sm"><i class="fa fa-edit"></i></a>
                                <a href="#" class="btn btn-danger btn-sm"><i class="fa fa-trash"></i></a>
                                </td>
                                </tr>
                                <?php
                            }
                        }
                        ?>
                            
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>