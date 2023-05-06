function setWebhook() {
	var token = BOT_TOKEN;
	var url = `https://script.google.com/macros/s/${WEBHOOK_ID}/exec`;
	var response = UrlFetchApp.fetch("https://api.telegram.org/bot" + token + "/setWebhook?url=" + url);
	Logger.log(response.getContentText());
}

function doPost(e) {
	var data = JSON.parse(e.postData.contents);
	var chat_id = data.message.chat.id;
	var user_id = data.message["from"].id;
	var message_id = data.message.message_id;
	var text = data.message.text;

	// Init / ping bot
	if (text == '/start' || text == `@${BOT_USERNAME}`) {
		sendMessage(chat_id, 'hewwo o(`•ω•)/ what you want');
		return;
	}
	else {
		text = text.replace(`@${BOT_USERNAME}`, '');
	}

	// Decision making
	if (isCommandInText(DECIDE_COMMAND_PHRASE, text)) {
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

	// Coin flipping
	else if (isCommandInText(FLIP_A_COIN_COMMAND_PHRASE, text)) {
		sendMessage(chat_id, Math.random() < 0.5 ? "heads" : "tails");
	}

	// Cat meowing
	else if (isCommandInText(MEOW_COMMAND_PHRASE, text)) {
		sendMessage(chat_id, Math.random() < 0.95 ? "=^._.^= meow" : "=^._.^= nya~ ");
	}

	// Dog barking
	else if (isCommandInText(WOOF_COMMAND_PHRASE, text)) {
		sendMessage(chat_id, Math.random() < 0.95 ? "૮ • ﻌ • ა woof" : "૮ • ﻌ • ა borf");
	}

	// Arf arfing
	else if (isCommandInText(ARF_COMMAND_PHRASE, text)) {
		sendMessage(chat_id, "(┛❍ᴥ❍)┛ arf arf arf arf arf arf");
	}

	// Anon uwuing
	else if (isCommandInText(UWU_COMMAND_PHRASE, text)) {
		try {
			var response = sendVoiceMessageByFileId(chat_id.toString(), UWU_AUDIO_FILE_ID);
		} catch (e) {
			sendVoiceMessage(chat_id, UWU_AUDIO_ID);
		}
	}

	// Anon grapefruiting
	else if (isCommandInText(GRAPEFRUIT_COMMAND_PHRASE, text)) {
		try {
			var response = sendVoiceMessageByFileId(chat_id.toString(), GRAPEFRUIT_AUDIO_FILE_ID);
		} catch (e) {
			sendVoiceMessage(chat_id, GRAPEFRUIT_AUDIO_ID);
		}
	}

	// Anon auughhhing
	else if (isCommandInText(AUUGHHH_COMMAND_PHRASE, text)) {
		try {
			var response = sendVoiceMessageByFileId(chat_id.toString(), AUUGHHH_AUDIO_FILE_ID);
		} catch (e) {
			sendVoiceMessage(chat_id, AUUGHHH_AUDIO_ID);
		}
	}

	// Anon ducking
	else if (isCommandInText(DONALD_DICK_COMMAND_PHRASE, text)) {
		try {
			var response = sendVoiceMessageByFileId(chat_id.toString(), DONALD_DICK_AUDIO_FILE_ID);
		} catch (e) {
			sendVoiceMessage(chat_id, DONALD_DICK_AUDIO_ID);
		}
	}

	// Anon hamiguaing
	else if (isCommandInText(HAMIGUA_COMMAND_PHRASE, text)) {
		try {
			var response = sendVoiceMessageByFileId(chat_id.toString(), HAMIGUA_AUDIO_FILE_ID);
		} catch (e) {
			sendVoiceMessage(chat_id, HAMIGUA_AUDIO_ID);
		}
	}

	// Anon chilling
	else if (isCommandInText(DADDY_CHILL_COMMAND_PHRASE, text)) {
		try {
			var response = sendVoiceMessageByFileId(chat_id.toString(), DADDY_CHILL_AUDIO_FILE_ID);
		} catch (e) {
			sendVoiceMessage(chat_id, DADDY_CHILL_AUDIO_ID);
		}
	}

	// Anon heckin
	else if (isCommandInText(WTH_COMMAND_PHRASE, text)) {
		try {
			var response = sendVoiceMessageByFileId(chat_id.toString(), WTH_AUDIO_FILE_ID);
		} catch (e) {
			sendVoiceMessage(chat_id, WTH_AUDIO_ID);
		}
	}

	// Bible versing
	else if (isCommandInText(RANDOM_BIBLE_VERSE_COMMAND_PHRASE, text)) {
		var response = UrlFetchApp.fetch("https://labs.bible.org/api/?passage=random&type=json");
		var json = response.getContentText();
		var data = JSON.parse(json);
		var book = data[0].bookname;
		var chapter = data[0].chapter;
		var verse = data[0].verse;
		var text = data[0].text;
		var quote = book + " " + chapter + ":" + verse + " - " + text;
		sendMessage(chat_id, quote);
	}

	// God praying
	else if (isCommandInText(PRAY_COMMAND_PHRASE, text)) {
		if (Math.random() < 0.7) {
			sendMessage(chat_id, PRAY_TEXT_ARRAY[randomInt(0, PRAY_TEXT_ARRAY.length)]);
		}
		else {
			try {
				sendGifByFileId(chat_id.toString(), PRAY_GIF_ARRAY[randomInt(0, PRAY_GIF_ARRAY.length)]);
			} catch (e) {
				sendMessage(chat_id, "something went wrong :(");
			}
		}
	}

	// Group reminding
	else if (isCommandInText(REMIND_COMMAND_PHRASE, text)) {
		// This can be used for either group or single user, just record chat id in spreadsheet
		var [datetime, reminder_text] = parseReminderTimeMessage(text);
		if (datetime && reminder_text) {
			var success = addRemindersToSpreadsheet(datetime, chat_id, reminder_text, REMINDER_SPREADSHEET_ID);
			if (!success) {
				sendMessage(chat_id, "o((  &gt;ω&lt;))o  somethin went wong");
			} else {
				sendMessage(chat_id, `Reminder set sucessfuwwy:\nTitle: ${reminder_text}\nDate: ${datetime}`);
			}
		}
		else {
			sendMessage(chat_id, "wopsies, be in this fowmat\n/remind YYYYMMDD HHmm (reminder text) or \n/remind ?d?h?m[either optional] (reminder text) ");
		}
	}

	// Self reminding
	else if (isCommandInText(REMIND_ME_COMMAND_PHRASE, text)) {
		// If use this in a group, record user id, but if user not started yet, send alert message
		var [datetime, reminder_text] = parseReminderTimeMessage(text);
		if (datetime && reminder_text) {
			var success = addRemindersToSpreadsheet(datetime, user_id, reminder_text, REMINDER_SPREADSHEET_ID);
			if (!success) {
				sendMessage(chat_id, "o((  &gt;ω&lt;))o  somethin went wong");
			} else {
				try {
					sendMessage(user_id, `Reminder set sucessfuwwy:\nTitle: ${reminder_text}\nDate: ${datetime}`);
				} catch (e) {
					sendMessage(chat_id, "（⊙ｏ⊙） has you added me yets, you cants receive reminders from me if you didnt start mes?");
				}
			}
		} else {
			sendMessage(chat_id, "wopsies, be in this fowmat\n/remindme YYYYMMDD HHmm (reminder text) or \n/remindme ?d?h?m[either optional] (reminder text) ");
		}
	}

	// Delete reminding
	else if (isCommandInText(UNREMIND_ME_COMMAND_PHRASE, text)) {
		var message = deleteReminder(REMINDER_SPREADSHEET_ID, chat_id, text);
		sendMessage(chat_id, message);
	}

	// Ask helping
	else if (isCommandInText(HELP_COMMAND_PHRASE, text)) {
		sendMessage(chat_id, HELP_MESSAGE);
	}

	// Jason gaying
	else if (isCommandInText(IS_JASON_GAY_COMMAND_PHRASE, text)) {
		sendMessage(chat_id, IS_JASON_GAY_TEXT_ARRAY[randomInt(0, IS_JASON_GAY_TEXT_ARRAY.length)]);
	}
}

// Every minute triggering
function remindUsers() {
	var sheet = SpreadsheetApp.openById(REMINDER_SPREADSHEET_ID).getSheets()[0];
	var data = sheet.getDataRange().getValues();
	var now = new Date();

	for (var i = 1; i < data.length; i++) {
		if (now.getTime() > data[i][SPREADSHEET_INDEX.DATETIME]) {
			var message = `Reminder: ${data[i][SPREADSHEET_INDEX.REMINDER_TEXT]}\n${data[i][SPREADSHEET_INDEX.DATETIME]}`;
			sendMessage(data[i][SPREADSHEET_INDEX.CHAT_ID], message);
			sheet.getRange(i + 1, SPREADSHEET_INDEX.DONE + 1).setValue(true);
		}
	}

	trimRemindersFromSpreadsheet(REMINDER_SPREADSHEET_ID);
}
