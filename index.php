<?php
include 'functions/_inc.php';

$pages = scandir('pages/');
if(isset($_GET['page']) && !empty($_GET['page'])){
    if(in_array($_GET['page'].'.php',$pages)){
        $page = $_GET['page'];
    }else{
        $page = "error";
    }
}else{
    $page = "home";
}

$pages_functions = scandir('functions/');
if(in_array($page.'.func.php',$pages_functions)){
    include 'functions/'.$page.'.func.php';
}
?>
<?php
include 'includes/topbar.php';
?>

<div class="container-fluid">
    <?php
        include 'pages/'.$page.'.php';
    ?>
    
</div>


<?php
include 'includes/footer.php';
?>
