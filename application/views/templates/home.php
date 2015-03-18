<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 26/9/14
 * Time: 11:31 AM
 */ ?>

<!DOCTYPE html>
<html>

<head>

    <title> </title>
    <link href="<?php echo base_url()?>Theme/css/bootstrap.css" rel="stylesheet" >
    <link href="<?php echo base_url()?>css/sticky-footer.css" rel="stylesheet" >
    <!--<link rel="stylesheet" href="<?php echo base_url()?>css/bootstrap-theme.css" type="text/css">-->
    <link rel="stylesheet" href="<?php echo base_url()?>css/custom_style.css" type="text/css">
    <link rel="stylesheet" href="<?php echo base_url()?>Theme/css/freelancer.css" type="text/css">
    <link rel="stylesheet" href="<?php echo base_url()?>Theme/font-awesome-4.1.0/css/font-awesome.css" type="text/css">
    <style type="text/css">

        .well{
            background-color:#ffffff;
        }
        .myCarousel .thumbnail {
            margin-bottom: 0;
        }
        .carousel-control.left, .carousel-control.right {
            background-image:none !important;
        }
        .carousel-control {
            top:40%;
            bottom:auto;
            padding-top:4px;
            width:30px;
            height:30px;
            text-shadow:none;
            opacity:1;
        }

        .carousel-control.left, .carousel-control.right {
            background-image:none !important;
        }
        .carousel-control.right {
            left:auto;
            right:-32px;
        }
        .carousel-control.left {
            right:auto;
            left:-32px;
        }

        .carousel-indicators {
            bottom:-30px;
        }
        .carousel-indicators li {
            border-radius:0;
            width:10px;
            height:10px;
            background:#ccc;
            border:1px solid #ccc;
        }
        .carousel-indicators .active {
            width:12px;
            height:12px;
            background:#3276b1;
            border-color:#3276b1;
        }



    </style>
</head>

<body>

<?php echo $navbar; ?>
</div>
</div>
<?php echo $home_suggestion; ?>
<?php echo $home_top_Selling; ?>
<?php echo $home_new_arrival; ?>
<?php echo $footerContent; ?>

</body>

</html>