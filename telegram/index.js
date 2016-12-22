var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.telegram.org/bot321375343:AAET-7j3Pz0WJtTSrpLY60KDl0NTfChxGQI/getupdates?offset=70969895', false);
xhr.send();

var json = '{"ok":true,"result":{"id":321375343,"first_name":"lusinda","username":"lusindaBot"}}';
obj = JSON.parse(xhr.responseText);
alert( obj.result[0].message.text);

if (obj.result[0].message.text == 'hi') {
	alert('say hi');
    	var answer = new XMLHttpRequest();
	answer.open('GET', 'https://api.telegram.org/bot321375343:AAET-7j3Pz0WJtTSrpLY60KDl0NTfChxGQI/sendmessage?chat_id=52331883&text=hilusi', false);
	answer.send();
}
