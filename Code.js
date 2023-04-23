// Bot Details
const BOT_TOKEN = "nevergonnagiveyouup";
const BOT_USERNAME = "Grp69Bot";

// Commands
const DECIDE_COMMAND_PHRASE = "/decide";
const HELP_COMMAND_PHRASE = "/help";
const FLIP_A_COIN_COMMAND_PHRASE = "/flip";
const MEOW_COMMAND_PHRASE = "/meow";
const WOOF_COMMAND_PHRASE = "/woof";
const ARF_COMMAND_PHRASE = "/arf";
const UWU_COMMAND_PHRASE = "/uwu";
const GRAPEFRUIT_COMMAND_PHRASE = "/grapefruit";
const IS_JASON_GAY_COMMAND_PHRASE = "/isJasonGay";

// Audio URLS
const GRAPEFRUIT_AUDIO_ID = "nevergonnagiveyouup";
const GRAPEFRUIT_AUDIO_FILE_ID = "nevergonnagiveyouup";
const UWU_AUDIO_ID = "nevergonnagiveyouup";
const UWU_AUDIO_FILE_ID = "nevergonnagiveyouup";

function test() {
	// Test here
}

function setWebhook() {
	var token = BOT_TOKEN;
	var url = "https://script.google.com/macros/s/nevergonnagiveyouup/exec";
	// var url = "https://script.google.com/macros/s/nevergonnagiveyouup/dev"
	var response = UrlFetchApp.fetch("https://api.telegram.org/bot" + token + "/setWebhook?url=" + url);
	Logger.log(response.getContentText());
}

function doPost(e) {
	var data = JSON.parse(e.postData.contents);
	var chat_id = data.message.chat.id;
	var message_id = data.message.message_id;
	var text = data.message.text;

	if (text == '/start' || text == `@${BOT_USERNAME}`) {
		sendMessage(chat_id, 'hewwo o(`•ω•)/ what you want');
	}

	else if (text.includes(DECIDE_COMMAND_PHRASE)) {
		text = text.replace(`@${BOT_USERNAME}`, '').replace(/\s+/g, ' ');
		var optionsStartingIndex = text.indexOf(DECIDE_COMMAND_PHRASE) + DECIDE_COMMAND_PHRASE.length + 1;

		if (optionsStartingIndex >= text.length) {
			sendMessage(chat_id, "( ﾉ ﾟｰﾟ)ﾉ the decision list is empty uwu");
			return;
		}

		var optionsString = text.slice(optionsStartingIndex);
		var optionsArray = optionsString.split(' ');
		if (optionsArray.length >= 1) {
			var decision = optionsArray[randomInt(0, optionsArray.length)];
			sendMessage(chat_id, `૮꒰ ˶• ༝ •˶꒱ა i choose <b>${decision}</b>`);
		}
		else
			sendMessage(chat_id, "it's empty uwu");
	}

	else if (text.includes(FLIP_A_COIN_COMMAND_PHRASE)) {
		sendMessage(chat_id, Math.random() < 0.5 ? "heads" : "tails");
	}

	else if (text.includes(MEOW_COMMAND_PHRASE)) {
		sendMessage(chat_id, Math.random() < 0.95 ? "=^._.^= meow" : "=^._.^= nya~ ");
	}

	else if (text.includes(WOOF_COMMAND_PHRASE)) {
		sendMessage(chat_id, Math.random() < 0.95 ? "૮ • ﻌ • ა woof" : "૮ • ﻌ • ა borf");
	}

	else if (text.includes(ARF_COMMAND_PHRASE)) {
		sendMessage(chat_id, "(┛❍ᴥ❍)┛ arf arf arf arf arf arf");
	}

	else if (text.includes(UWU_COMMAND_PHRASE)) {
		try {
			var response = sendVoiceMessageByFileId(chat_id.toString(), UWU_AUDIO_FILE_ID);
		} catch (e) {
			sendVoiceMessage(chat_id, UWU_AUDIO_ID);
		}
	}

	else if (text.includes(GRAPEFRUIT_COMMAND_PHRASE)) {
		try {
			var response = sendVoiceMessageByFileId(chat_id.toString(), GRAPEFRUIT_AUDIO_FILE_ID);
		} catch (e) {
			sendVoiceMessage(chat_id, GRAPEFRUIT_AUDIO_ID);
		}
	}

	else if (text.includes(HELP_COMMAND_PHRASE)) {
		sendMessage(chat_id, "sowwy i cants help you");
	}

	else if (text.includes(IS_JASON_GAY_COMMAND_PHRASE)) {
		var textArray = [
			"i dont know man he looks kinda gay to me",
			"yes",
			"i diagnose jason with big gay",
			"yes he is mega gay",
			"sorry jason, but i must do what i must do...\n\n<b>JASON IS GAY</b>"
		];
		sendMessage(chat_id, textArray[randomInt(0, textArray.length)]);
	}
}

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
