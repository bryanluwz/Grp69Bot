function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function sendMessage(chat_id, text) {
	var token = BOT_TOKEN;
	var url = 'https://api.telegram.org/bot' + token + '/sendMessage';
	var payload = {
		'chat_id': chat_id,
		'text': text,
		'parse_mode': 'HTML'
	};
	var options = {
		'method': 'post',
		'contentType': 'application/json',
		'payload': JSON.stringify(payload)
	};
	return UrlFetchApp.fetch(url, options);
}

function sendVoiceMessage(chat_id, audioId) {
	var token = BOT_TOKEN;
	var url = 'https://api.telegram.org/bot' + token + "/sendVoice";
	var file = DriveApp.getFileById(audioId);
	var blob = file.getBlob();

	var payload = {
		"chat_id": chat_id,
		"voice": blob
	};

	var options = {
		'method': 'post',
		'payload': payload
	};
	return UrlFetchApp.fetch(url, options);
}

function sendVoiceMessageByFileId(chat_id, audioFileId) {
	var token = BOT_TOKEN;
	var url = 'https://api.telegram.org/bot' + token + "/sendVoice";

	var payload = {
		"chat_id": chat_id,
		"voice": encodeURI(audioFileId)
	};

	var options = {
		'method': 'post',
		'payload': payload
	};

	return UrlFetchApp.fetch(url, options);
}

function sendGifByFileId(chat_id, gifFileId) {
	var token = BOT_TOKEN;
	var url = 'https://api.telegram.org/bot' + token + "/sendDocument";

	var payload = {
		"chat_id": chat_id,
		"document": encodeURI(gifFileId)
	};

	var options = {
		'method': 'post',
		'payload': payload
	};

	return UrlFetchApp.fetch(url, options);
}

function isCommandInText(command_phrase, text) {
	return new RegExp("(^|\\W)" + command_phrase + "(\\W|$)").test(text);
}
