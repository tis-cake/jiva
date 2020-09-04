<?php

if(!empty($_REQUEST)) {

  $massage = 'Позвоните мне' . "\r\n\n"
    . 'Номер телефона: '. $_REQUEST['PHONE']. "\r\n\n"
    . 'Сообщение: '. $_REQUEST['TEXT']. "\r\n\n";

  $to = 'тест@gmail.ru';

  $subject = 'Анонимная заявка';

  mail($to, $subject, $massage);

  echo json_encode("Сообщение отправлено");
}
else {
  echo json_encode("Заполните все поля");
}

die();
?>
