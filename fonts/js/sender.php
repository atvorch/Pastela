<?php 

$to = $_POST['email']; // this is your Email address
$from = "keeperando@yandex.ru"; // this is the sender's Email address
$name = $_POST['name'];
$subject = "Заявка на дисконтную карту с Лендинга";
$subject2 = "Bart flowers and decor";
$message = "Имя " . $name . "\n\n" ."Почтовый адрес: ". $_POST['email']. "\n\n" . "Комментарий: " . $_POST['comment'];
$message2 = "Мы получили вашу заявку на получение дисконтной карты, ждем вас в нашем магазине!";

$headers = "From:" . $from;
$headers2 = "From:" . $to;
mail($to,$subject2,$message2,$headers2);
mail($from,$subject1,$message1,$headers1); // sends a copy of the message to the sender
// You can also use header('Location: thank_you.php'); to redirect to another page.

?>