<h2>Liste des vahicules</h2>
<div class="row">
    <div class="col-lg-4">
        <div class="card">
            <div class="card-header">
                Ajout des vahicules
            </div>
            <div class="card-body">
                <?php
                if(isset($_POST['submit'])){
                    
                    $matricule = htmlspecialchars(trim($_POST['matricule']));
                    $marque = htmlspecialchars(trim($_POST['marque']));
                    $annee = htmlspecialchars(trim($_POST['annee']));
                    $proprietaire = htmlspecialchars(trim($_POST['proprietaire']));
                    
                    $errors = [];

                    if(empty($matricule) || empty($marque) || empty($annee) || empty($proprietaire)){
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
                        voitures($matricule,$marque, $annee, $proprietaire);
                        ?>

                        <?php
                    }

                }

                ?>

                <form method="post">
                    <div class="form-group">
                        <label for="numero">Numero matricule</label>
                        <input type="text" name="matricule" id="" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="marque">Marque</label>
                        <input type="text" name="marque" id="" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="annee">Annee</label>
                        <select class="form-control" name="annee">
                            <option value="2015">2015</option>
                            <option value="2016">2016</option>
                            <option value="2017">2017</option>
                            <option value="2018">2018</option>
                            <option value="2019">2019</option>
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                        </select>
                    </div>
                    
                    
        
                        
                        
                    <div class="form-group">
                        <label for="nom">Proprietaire</label>
                        <select name="proprietaire" id="prop" class="form-control">
                            <?php
                        $propriet = get_Voitures();
                        foreach ($propriet as $p){
                        ?>
                            <option value="$p->id"><?= $p->proprietaire ?></option>
                            <?php
                        }
                        ?>
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
                $props = get_Voitures();
            ?>
                <table class="table table-bordered table-hover">
                    <thead>
                        <th>Numero matricule</th>
                        <th>Marque</th>
                        <th>Annee</th>
                        <th>Proprietaire</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                        <?php
                        if(!empty($props)) {
                            foreach ($v as $vo) {
                            ?>
                                <tr>
                                    <td><?= $vo->matricule ?></td>
                                    <td><?= $vo->marque ?></td>
                                    <td><?= $vo->annee ?></td>
                                    <td><?= $vo->proprietaire ?></td>
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