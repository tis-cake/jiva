<?php
  $name = $_POST[NAME];
  $rating = $_POST[RATING];
  // print_r($_POST);
  print_r(
    'Имя пользователя: ' . $name . '<br>' .
    'Рейтинг: ' . $rating
  );
  // print_r($_POST[NAME]);
?>
