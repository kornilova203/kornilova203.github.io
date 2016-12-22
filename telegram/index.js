// 1. Создаём новый объект XMLHttpRequest
var xhr = new XMLHttpRequest();

// 2. Конфигурируем его: GET-запрос на URL 'phones.json'
xhr.open('GET', 'https://api.telegram.org/bot321375343:AAET-7j3Pz0WJtTSrpLY60KDl0NTfChxGQI/getMe', false);
xhr.open('GET', 'https://api.telegram.org/bot321375343:AAET-7j3Pz0WJtTSrpLY60KDl0NTfChxGQI/sendmessage?chat_id=52331883&text=hi, lusi', false);


// 3. Отсылаем запрос
xhr.send();

// 4. Если код ответа сервера не 200, то это ошибка
if (xhr.status != 200) {
  // обработать ошибку
  alert( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
} else {
  // вывести результат
  alert( xhr.responseText ); // responseText -- текст ответа.
}
