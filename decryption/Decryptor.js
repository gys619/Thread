/**
 * JsjiamiV6解密工具
 * @author NXY666
 * @version 2.7.2
 */
const fs = require("fs");
const readline = require("readline");
const Path = require("path");
const vm = require("vm");
let vm2;

/**
 * 获取数组末尾的值。
 * @returns {any | undefined} 返回数组末尾的值。若数组为空，则返回undefined。
 */
Array.prototype.top = function () {
	return this[this.length - 1];
};

/**
 * 使用字符串替换当前字符串中的一段字符。
 * @param {number} st 起始位置。
 * @param {number} en 结束位置。
 * @param {string} str 替换结果字符串。
 */
String.prototype.replaceWithStr = function (st, en, str) {
	return this.slice(0, st) + str + this.slice(en);
};

/**
 * 以一段长度相同的字符串为模板分割当前字符串。
 * @param {string} str 字符串模板。
 * @param {string} separator 分隔符。
 * @returns {string[]} 返回分割后的字符串数组。
 * @throws {Error} 字符串模板长度与当前字符串长度不一致时抛出错误。
 */
String.prototype.splitByOtherStr = function (str, separator) {
	if (this.length !== str.length) {
		throw Error("字符串模板长度与当前字符串长度不一致。");
	}
	let splitRes = str.split(separator);
	let nowPos = 0;
	return splitRes.map(function (item) {
		let res = this.slice(nowPos, nowPos + item.length);
		nowPos += item.length + separator.length;
		return res;
	}.bind(this));
};

/**
 * 使用正则表达式或字符串从某一位置开始搜索字符串。
 * @param {RegExp|string} regexp 正则表达式。若为字符串则等同于 String.indexOf 。
 * @param {number?} position 起始位置。若不指定则从 0 位置开始搜索。
 * @returns {number} 匹配到的索引值。若未匹配成功，则返回 -1。
 */
String.prototype.searchOf = function (regexp, position) {
	if (typeof regexp == "string") {
		return this.indexOf(regexp, position);
	}

	if (position === undefined) {
		position = 0;
	}

	if (position < 0) {
		position = 0;
	} else if (position >= this.length) {
		return -1;
	}

	return position + this.slice(position).search(regexp);
};

/**
 * 使用正则表达式或字符串从字符串末尾的某一位置开始搜索字符串。
 * @param {RegExp|string} regexp 正则表达式。若为字符串则等同于 String.lastIndexOf 。
 * @param {number?} position 起始位置。若不指定则从 +Infinity 位置开始搜索。
 * @returns {number} 匹配到的索引值。若未匹配成功，则返回 -1。
 */
String.prototype.lastSearchOf = function (regexp, position) {
	if (typeof regexp != "object") {
		return this.lastIndexOf(regexp, position);
	} else {
		regexp = new RegExp(regexp.source, regexp.flags + 'g');
	}

	if (position === undefined) {
		position = Number.POSITIVE_INFINITY;
	}

	let thisStr = this;

	if (position < 0) {
		return -1;
	} else if (position < thisStr.length) {
		thisStr = thisStr.slice(0, position + 1);
	}

	let posRes = -1, matchRes;
	while ((matchRes = regexp.exec(thisStr)) != null) {
		posRes = matchRes.index;
	}

	return posRes;
};

// fs.writeFileSync("res.txt", "");

/**
 * 日志工具
 * */
const Logger = (function () {
	function Logger(options) {
		options = options || {};
		this.mergeOptions(this._options, options);
		console.clear();
	}

	Logger.prototype._options = {
		// 进度选项
		content: {
			linePrefix: {
				first: "* ",
				others: "· "
			}
		},
		// 进度选项
		progress: {
			length: 50,
			frequency: 100,
			emptyStr: " ",
			fullStr: "="
		}
	};
	Logger.prototype._data = {
		// 日志数据
		log: {
			content: null,
			lastTime: 0,
			line: 0,
			lastContentLines: 0
		},
		// 进度数据
		progress: {
			enabled: false,
			determine: false,
			finished: false,
			max: 100,
			now: 0
		}
	};

	Logger.prototype.mergeOptions = function (targetOption, newOption) {
		if (!newOption) {
			return targetOption;
		}
		Object.keys(targetOption).forEach(function (key) {
			if (newOption[key] === undefined) {
				return;
			}
			if (typeof targetOption[key] != "object" || Array.isArray(targetOption[key])) {
				targetOption[key] = newOption[key];
			} else {
				targetOption[key] = this.mergeOptions(targetOption[key], newOption[key]);
			}
		}.bind(this));
		return targetOption;
	};

	Logger.prototype.weakUpdate = function () {
		this.updateConsole();
	};
	Logger.prototype.updateConsole = function (forceOutput, stayInline) {
		// 检查更新是否过于频繁
		if (!forceOutput && new Date().getTime() - this._data.log.lastTime < this._options.progress.frequency) {
			return;
		} else {
			this._data.log.lastTime = new Date().getTime();
		}

		// 日志进度
		let now, max, length, percent;
		let progressArr = [], progressStr = "";
		if (this._data.progress.enabled) {
			now = this._data.progress.now;
			max = this._data.progress.max;
			if (now > max) {
				now = max;
			}
			progressArr.length = length = this._options.progress.length;
			if (this._data.progress.determine) {
				percent = Math.floor(now / max * length);
				progressArr.fill(this._options.progress.fullStr, 0, percent);
				progressArr.fill(this._options.progress.emptyStr, percent, length);
				progressStr = `[${progressArr.join("")}] ${(now / max * 100).toFixed(1).padStart(5, " ")}%`;
			} else {
				if (this._data.progress.finished) {
					progressArr.fill(this._options.progress.fullStr, 0, length);
					progressStr = `[${progressArr.join("")}]`;
				} else {
					let progressBarStart = now % length,
						progressBarEnd = progressBarStart + length / 5;
					progressArr.fill(this._options.progress.emptyStr, 0, length);
					progressArr.fill(this._options.progress.fullStr, progressBarStart, progressBarEnd);
					let exceed = progressBarEnd - length;
					if (exceed > 0) {
						progressArr.fill(this._options.progress.fullStr, 0, exceed);
					}
					progressStr = `[${progressArr.join("")}]`;
					this._data.progress.now++;
				}
			}
		}

		let logContents = this._data.log.content.split("\n"), logContentLength = logContents.length;

		// 写入日志
		if (stayInline) {
			this._data.log.line += this._data.log.lastContentLines;
		} else {
			readline.cursorTo(process.stdout, 0, this._data.log.line);
		}
		let lastContentLines = this._data.log.lastContentLines;
		logContents.forEach(function (line, index) {
			console.info((index === 0 ? this._options.content.linePrefix.first : this._options.content.linePrefix.others) + line + (index === logContentLength - 1 ? " " + progressStr : ""));
		}.bind(this));
		if (lastContentLines > logContentLength) {
			for (let i = lastContentLines - logContentLength; i > 0; i--) {
				console.info("\n");
			}
		}
		this._data.log.lastContentLines = logContentLength;
	};

	Logger.prototype.logWithProgress = function (content, now, max) {
		let logChanged = this._data.log.content !== null && this._data.log.content !== content;
		if (logChanged && !this._data.progress.determine) {
			this.logWithoutDetermineFinished();
		}
		this._data.log.content = content;
		this._data.progress.enabled = true;
		this._data.progress.determine = true;
		this._data.progress.now = now;
		this._data.progress.max = max;
		this.updateConsole(true, logChanged);
	};
	Logger.prototype.logWithoutDetermine = function (content) {
		let logChanged = this._data.log.content !== null && this._data.log.content !== content;
		if (logChanged && !this._data.progress.determine) {
			this.logWithoutDetermineFinished();
		}
		this._data.log.content = content;
		this._data.progress.enabled = true;
		this._data.progress.determine = false;
		this._data.progress.finished = false;
		this._data.progress.now = 0;
		this._data.progress.max = Number.POSITIVE_INFINITY;
		this.updateConsole(true, logChanged);
	};
	Logger.prototype.logWithoutDetermineFinished = function () {
		this._data.progress.finished = true;
		this.updateConsole(true);
	};
	Logger.prototype.logWithoutProgress = function (content) {
		let logChanged = this._data.log.content !== null && this._data.log.content !== content;
		if (logChanged && !this._data.progress.determine) {
			this.logWithoutDetermineFinished();
		}
		this._data.log.content = content;
		this._data.progress.enabled = false;
		this.updateConsole(true, logChanged);
	};
	return Logger;
})();
function pause(text) {
	if (config["quietMode"]) {
		return;
	}
	console.warn(`${text !== undefined ? text + "\n" : ""}[请按任意键继续]`);
	let stopTime = new Date().getTime();
	process.stdin.setRawMode(true);
	try {
		fs.readSync(0, Buffer.alloc(1), 0, 1, null);
	} catch (e) {
		if (e.code === 'EAGAIN') {
			// 'resource temporarily unavailable'
			// Happens on OS X 10.8.3 (not Windows 7!)
			throw Error("暂停功能不受支持，请在配置文件中启用安静模式。");
		} else if (e.code === 'EOF') {
			// Happens on Windows 7, but not OS X 10.8.3:
			// simply signals the end of *piped* stdin input.
		} else {
			throw e;
		}
	}
	process.stdin.setRawMode(false);
	PAUSE_TIME += new Date().getTime() - stopTime;
}
/**
 * 代码分析工具
 * */
function transStr(jsStr) {
	let signStack = [], jsArr = jsStr.split("");
	for (let nowPos = 0; nowPos < jsArr.length; nowPos++) {
		switch (jsArr[nowPos]) {
			case '/':
				if (signStack.top() === jsArr[nowPos]) {
					// 结束正则
					signStack.pop();
					continue;
				} else if (signStack.length === 0) {
					// [{( +-* <>=? &|! ~^
					if (jsArr[nowPos + 1] === '*') {
						// 块注释
						let endPos = jsStr.indexOf("*/", nowPos);
						jsArr.fill("C", nowPos + 2, endPos);
						nowPos = endPos + 1;
					} else if (jsArr[nowPos + 1] === '/') {
						// 行注释
						let endPos = jsStr.searchOf(/(\n|\r|\n\r|\r\n)/, nowPos);
						jsArr.fill("C", nowPos + 2, endPos);
						nowPos = endPos - 1;
					} else if (nowPos === 0 || jsArr[jsStr.lastSearchOf(/\S/, nowPos - 1)].match(/[\[{(+\-*<>=?&|!~^:;]/)) {
						// 开始正则
						signStack.push(jsArr[nowPos]);
					}
					continue;
				}
				break;
			case '"':
			case "'":
			case '`':
				if (signStack.top() === jsArr[nowPos]) {
					// 结束字符串
					signStack.pop();
					continue;
				} else if (signStack.length === 0) {
					// 开始字符串
					signStack.push(jsArr[nowPos]);
					continue;
				}
				break;
			case '\\':
				if (signStack.top() === '"' || signStack.top() === "'" || signStack.top() === '/' || signStack.top() === '`') {
					jsArr[nowPos++] = 'S';
				}
				break;
			default:
				break;
		}
		if (signStack.top() === '"' || signStack.top() === "'" || signStack.top() === '/' || signStack.top() === '`') {
			jsArr[nowPos] = 'S';
		}
	}
	return jsArr.join("");
}
function transLayer(jsStr, layer, hasTrans) {
	jsStr = hasTrans ? jsStr : transStr(jsStr);
	if (layer === undefined) {
		layer = 1;
	}

	let signStack = [], jsArr = jsStr.split("");
	for (let nowPos = 0; nowPos < jsArr.length; nowPos++) {
		switch (jsArr[nowPos]) {
			case '[':
			case '{':
			case '(':
				// 开始
				signStack.push(jsArr[nowPos]);
				if (signStack.length > layer) {
					jsArr[nowPos] = 'Q';
				}
				break;
			case ']':
				if (signStack.top() === "[") {
					// 结束
					if (signStack.length > layer) {
						jsArr[nowPos] = 'Q';
					}
					signStack.pop();
				} else {
					throw "ParseError: 尝试关闭不存在的“[]”。";
				}
				break;
			case '}':
				if (signStack.top() === "{") {
					// 结束
					if (signStack.length > layer) {
						jsArr[nowPos] = 'Q';
					}
					signStack.pop();
				} else {
					throw "ParseError: 尝试关闭不存在的“{}”。";
				}
				break;
			case ')':
				if (signStack.top() === "(") {
					// 结束
					if (signStack.length > layer) {
						jsArr[nowPos] = 'Q';
					}
					signStack.pop();
				} else {
					throw "ParseError: 尝试关闭不存在的“()”。";
				}
				break;
			default:
				if (signStack.length > layer - 1) {
					jsArr[nowPos] = 'Q';
				}
				break;
		}
	}
	return jsArr.join("");
}
function escapeEvalStr(str) {
	return "'" + JSON.stringify(str).slice(1, -1).replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
}
function getQuoteEndPos(jsStr, startPos) {
	if (startPos === undefined) {
		startPos = 0;
	}
	jsStr = transStr(jsStr);

	let signStack = [], jsArr = jsStr.split("");
	for (let nowPos = startPos; nowPos < jsArr.length; nowPos++) {
		switch (jsArr[nowPos]) {
			case '[':
			case '{':
			case '(':
				// 开始
				signStack.push(jsArr[nowPos]);
				break;
			case ']':
				if (signStack.top() === "[") {
					// 结束
					signStack.pop();
				} else {
					throw Error("ParseError: 尝试关闭不存在的“[]”。");
				}
				break;
			case '}':
				if (signStack.top() === "{") {
					// 结束
					signStack.pop();
				} else {
					throw Error("ParseError: 尝试关闭不存在的“{}”。");
				}
				break;
			case ')':
				if (signStack.top() === "(") {
					// 结束
					signStack.pop();
				} else {
					throw Error("ParseError: 尝试关闭不存在的“()”。");
				}
				break;
			default:
				break;
		}
		if (signStack.length === 0) {
			return nowPos;
		}
	}
	throw Error("未知错误。");
}
function splitStatements(jsStr, statementType) {
	let transLayerRes = transLayer(jsStr), splitJsArr = [];
	if (statementType === undefined) {
		let tmpStr = transLayerRes.replace(/([0-9a-zA-Z])+/g, "W");
		if (tmpStr === "" || tmpStr === ";") {
			// 空
			statementType = "EMPTY";
		} else if (/^([^,:;]+:[^,:;]+,)*[^,:;]+:[^,:;]+$/.test(tmpStr)) {
			// 对象
			statementType = "OBJECT";
		} else if (/^(case[!"%&'(*+,\-.\/:;<=>?@\[^{|~ ]|default:)/.test(transLayerRes.slice(0, 8))) {
			// case
			statementType = "SWITCH_CASE";
		} else {
			// 普通
			statementType = "COMMON";
		}
	}
	switch (statementType) {
		case "EMPTY": {
			break;
		}
		case "OBJECT": {
			break;
		}
		case "SWITCH_CASE":
		case "COMMON": {
			let startPos = 0, endPos = transLayerRes.indexOf(";", startPos);
			if (endPos === -1) {
				endPos = Number.POSITIVE_INFINITY;
			}
			do {
				let partJsStr = jsStr.slice(startPos, endPos + 1),
					transPartJsStr = transLayerRes.slice(startPos, endPos + 1);
				if (statementType === "SWITCH_CASE") {
					if (/^(case[!"%&'(*+,\-.\/:;<=>?@\[^{|~ ]|(default:))/.test(transPartJsStr.slice(0, 8))) {
						// switch...case
						endPos = transPartJsStr.indexOf(":");
						splitJsArr.push(partJsStr.slice(0, endPos + 1));
						startPos += endPos + 1;
					} else if ((() => {
						let matchRes =
							transLayerRes.slice(startPos).match(/^if\(Q+\){?.*?(};|;|})(else if\(Q+\){?.*?(};|;|}))*(else{?.*?(};|;|}))?/) || // if...else
							transPartJsStr.match(/^(async )?function [^(]+?\(Q*\){Q*};?/) || // function（花括号不可省略，无需判断）
							transPartJsStr.match(/^(for|while)\(Q+\){?.*?(};|;|})/) || // for / while（花括号可省略，需判断）
							transPartJsStr.match(/^do{?.*?[;}]\(Q+\);?/) || // do...while（花括号可省略，需判断）
							transPartJsStr.match(/^try{Q*}catch\(Q+\){Q*};?/) || // try...catch（两个花括号都不能省，所以无需判断）
							transPartJsStr.match(/^switch\(Q+\){Q*};?/); // switch（两个花括号都不能省，所以无需判断）
						return matchRes && (endPos = startPos + matchRes[0].length);
					})()) {
						splitJsArr.push(jsStr.slice(startPos, endPos));
						startPos = endPos;
					} else {
						// 其它
						splitJsArr.push(jsStr.slice(startPos, endPos + 1));
						startPos = endPos + 1;
					}
				} else if ((() => {
					let matchRes =
						transLayerRes.slice(startPos).match(/^if\(Q+\){?.*?(};|;|})(else if\(Q+\){?.*?(};|;|}))*(else{?.*?(};|;|}))?/) || // if...else
						transPartJsStr.match(/^(async )?function [^(]+?\(Q*\){Q*};?/) || // function（花括号不可省略，无需判断）
						transPartJsStr.match(/^(for|while)\(Q+\){?.*?(};|;|})/) || // for / while（花括号可省略，需判断）
						transPartJsStr.match(/^do{?.*?[;}]\(Q+\);?/) || // do...while（花括号可省略，需判断）
						transPartJsStr.match(/^try{Q*}catch\(Q+\){Q*};?/) || // try...catch（两个花括号都不能省，所以无需判断）
						transPartJsStr.match(/^switch\(Q+\){Q*};?/); // switch（两个花括号都不能省，所以无需判断）
					return matchRes && (endPos = startPos + matchRes[0].length);
				})()) {
					splitJsArr.push(jsStr.slice(startPos, endPos));
					startPos = endPos;
				} else {
					// 其它
					splitJsArr.push(jsStr.slice(startPos, endPos + 1));
					startPos = endPos + 1;
				}
			} while ((endPos = transLayerRes.indexOf(";", startPos)) !== -1);
			if (startPos < jsStr.length) {
				splitJsArr.push(jsStr.slice(startPos));
			}
			break;
		}
		default: {
			throw Error(`Error: 包含无法解析的代码块类型“${statementType}”。`);
		}
	}
	splitJsArr.type = statementType;
	return splitJsArr;
}
/**
 * JSON5工具
 */
const JSON5 = {
	parse: function (jsonStr) {
		let transRes = transStr(jsonStr);

		let commentPos = Number.POSITIVE_INFINITY;
		while ((commentPos === Number.POSITIVE_INFINITY || commentPos - 1 >= 0) && (commentPos = Math.max(
			transRes.lastSearchOf(/\/\*C*\*\//, commentPos - 1),
			transRes.lastSearchOf(/\/\/C*(\n|\r|\n\r|\r\n)/, commentPos - 1)
		)) !== -1) {
			switch (transRes[commentPos + 1]) {
				case '*': {
					let blockComment = transRes.slice(commentPos).match(/^\/\*C*\*\//)[0];
					jsonStr = jsonStr.replaceWithStr(commentPos, commentPos + blockComment.length, "");
					break;
				}
				case '/': {
					let lineComment = transRes.slice(commentPos).match(/^\/\/C*(\n|\r|\n\r|\r\n)/)[0];
					jsonStr = jsonStr.replaceWithStr(commentPos, commentPos + lineComment.length, "");
					break;
				}
				default:
					throw Error(`Error: 包含未知的注释类型“/${transRes[commentPos + 1]}”。`);
			}
		}

		return JSON.parse(jsonStr);
	},
	stringify: JSON.stringify
};
/**
 * 虚拟机执行工具
 * */
let globalContext = vm.createContext();
try {
	let {VM} = require("vm2");
	vm2 = new VM({
		allowAsync: false,
		sandbox: globalContext
	});
} catch (e) {
}
function virtualEval(jsStr) {
	return virtualGlobalEval(jsStr);
}
function virtualGlobalEval(jsStr) {
	return vm2 ? vm2.run(String(jsStr)) : vm.runInContext(jsStr, globalContext);
}

let config;
try {
	config = JSON5.parse(fs.readFileSync("config.json").toString());
} catch (e) {
	console.error(e);
	throw Error(`未找到配置文件（config.json），请确认该文件是否存在于当前目录。`);
}

// 开始计时
let START_TIMESTAMP = new Date().getTime(), PAUSE_TIME = 0;

// 初始化日志工具并确认文件路径
let logger = new Logger(config["logger"]);
logger.logWithoutProgress("----====* JsjiamiV6 Decryptor *====----");
let absolutePathStr = Path.resolve(config.target);
logger.logWithoutProgress(`解密文件：${absolutePathStr}`);
logger.logWithoutProgress(`输出目录：${Path.resolve("./")}`);
logger.logWithoutProgress(`模拟模块：${vm2 ? "vm2" : "vm (不安全)"}`);
if (!vm2) {
	console.warn("【安全建议】当前未安装 vm2 模块，该模块支持相对安全地执行 JavaScript 代码。在安装 vm2 模块之前，解密器将使用 Node.js 内建的 vm 模块。因此，请尽量避免解密不可信的 JavaScript 文件。");
}
pause();

let js;
try {
	js = fs.readFileSync(absolutePathStr).toString().trim() + ";";
} catch (e) {
	console.error(e);
	throw Error(`目标脚本不存在或无权访问，请检查后再试。`);
}

logger.logWithoutDetermine("净化代码");
function compressionCode(jsStr) {
	let transRes = transStr(jsStr);

	let commentPos = Number.POSITIVE_INFINITY;
	while ((commentPos === Number.POSITIVE_INFINITY || commentPos - 1 >= 0) && (commentPos = Math.max(
		transRes.lastSearchOf(/\/\*C*\*\//, commentPos - 1),
		transRes.lastSearchOf(/\/\/C*(\n|\r|\n\r|\r\n)/, commentPos - 1)
	)) !== -1) {
		logger.weakUpdate();
		switch (transRes[commentPos + 1]) {
			case '*': {
				let blockComment = transRes.slice(commentPos).match(/^\/\*C*\*\//)[0];
				jsStr = jsStr.replaceWithStr(commentPos, commentPos + blockComment.length, "");
				break;
			}
			case '/': {
				let lineComment = transRes.slice(commentPos).match(/^\/\/C*(\n|\r|\n\r|\r\n)/)[0];
				jsStr = jsStr.replaceWithStr(commentPos, commentPos + lineComment.length, "");
				break;
			}
			default:
				throw Error(`Error: 包含未知的注释类型“${transRes[commentPos + 1]}”。`);
		}
	}

	transRes = transStr(jsStr);

	let spacePos = Number.POSITIVE_INFINITY;
	while ((spacePos === Number.POSITIVE_INFINITY || spacePos - 1 >= 0) && (spacePos = Math.max(
		transRes.lastSearchOf(/\s/, spacePos - 1)
	)) !== -1) {
		logger.weakUpdate();
		if (
			(jsStr[spacePos - 1] == null || jsStr[spacePos - 1].match(/[{}\[\]().,+\-*\/~!%<>=&|^?:;@\s]/)) ||
			(jsStr[spacePos + 1] == null || jsStr[spacePos + 1].match(/[{}\[\]().,+\-*\/~!%<>=&|^?:;@\s]/))
		) {
			jsStr = jsStr.replaceWithStr(spacePos, spacePos + 1, "");
		}
	}

	return jsStr;
}
js = compressionCode(js);
fs.writeFileSync("DecryptResult0.js", js);

logger.logWithoutDetermine("解除全局加密");
const globalDecryptorInfo = {
	signInfo: {
		name: null,
		// _0xod / _0x / iIl / oO0 / abc
		confuseType: null,
		nameRegExp: null,
		hasSignString: null,
		hasMemberArray: null,
		raw: null
	},
	preprocessFunction: {
		raw: null
	},
	verifyFunction: {
		raw: null
	},
	decryptor: {
		// function / var
		type: null,
		name: null,
		raw: null
	}
};
function getStatementsType(jsArr) {
	return jsArr.map(function (jsStr) {
		let transRes = transStr(jsStr);

		/**
		 * 签名信息
		 * @namespace signInfo
		 * @description 用于存放签名以及处理前的解密数据。
		 * 签名命名规则 _?[0-9a-zA-Z$ｉＯ]+?
		 * 变量命名规则 _?[0-9a-zA-Z$]+?
		 * 字符串规则 'S+?'
		 */
		if (globalDecryptorInfo.signInfo.raw == null) {
			if (/^var (_?[0-9a-zA-Z$ｉＯ]+?='S+?',(_?[0-9a-zA-Z$ｉＯ]+?_=\['S+?'],)?)?_?[0-9a-zA-Z$]+?=\[_?[0-9a-zA-Z$ｉＯ']+?(,'S+?')*?];?/.test(transRes)) {
				globalDecryptorInfo.signInfo.name = jsStr.slice(4, transRes.indexOf("=", 4));
				(function (signName) {
					if (/^_0xod[0-9a-zA-Z]$/.test(signName)) {
						globalDecryptorInfo.signInfo.confuseType = "_0xod";
						globalDecryptorInfo.signInfo.nameRegExp = `_0x[0-9a-f]+`;
					} else if (/^_0x[0-9a-f]{4}$/.test(signName)) {
						globalDecryptorInfo.signInfo.confuseType = "_0x";
						globalDecryptorInfo.signInfo.nameRegExp = `_0x[0-9a-f]+`;
					} else if (/^[iｉl]+$/.test(signName)) {
						globalDecryptorInfo.signInfo.confuseType = "iIl";
						globalDecryptorInfo.signInfo.nameRegExp = `[iIl1]+`;
					} else if (/^[OＯ0$]+$/.test(signName)) {
						globalDecryptorInfo.signInfo.confuseType = "oO0";
						globalDecryptorInfo.signInfo.nameRegExp = `[O0Q$]+`;
					} else if (/^[a-z]+$/.test(signName)) {
						globalDecryptorInfo.signInfo.confuseType = "abc";
						globalDecryptorInfo.signInfo.nameRegExp = `[a-z]+`;
					} else {
						throw Error(`Error: 包含未知的混淆模式“${signName}”。`);
					}
				})(globalDecryptorInfo.signInfo.name);
				globalDecryptorInfo.signInfo.hasSignString = /^var _?[0-9a-zA-Z$ｉＯ]+?='S+?',/.test(transRes);
				globalDecryptorInfo.signInfo.hasMemberArray = /_?[0-9a-zA-Z$ｉＯ]+?_=\['S+?'],/.test(transRes);
				globalDecryptorInfo.signInfo.raw = jsStr;
				return {
					type: "SIGN_INFO",
					content: globalDecryptorInfo.signInfo
				};
			}
		} else {
			if (new RegExp(`^${globalDecryptorInfo.signInfo.name}='S+';?$`).test(transRes)) {
				return {
					type: "SIGN_REITERATE",
					content: {
						raw: jsStr
					}
				};
			}
		}

		/**
		 * 预处理函数
		 * @namespace globalDecryptorInfo.preprocessFunction
		 * @description 将签名信息预处理为可用的解密数据。
		 * 变量命名规则 _?[0-9a-zA-Z$]+?
		 * 字符串规则 'S+?'
		 * */
		if (globalDecryptorInfo.signInfo.raw != null && globalDecryptorInfo.preprocessFunction.raw == null) {
			let schemas = {
				// _0x102809='po';var _0x111dc8='shift',_0x47c13d='push'
				"PoShiftPushString": /(_0x[0-9a-f]{4,6}|[a-z0-9]{1,3})='po';var (_0x[0-9a-f]{4,6}|[a-z0-9]{1,3})='shift',(_0x[0-9a-f]{4,6}|[a-z0-9]{1,3})='push'/.test(jsStr),
				// while(--_0x1f4621){
				"DecreasingLoop": /while\(--(_0x[0-9a-f]{4,6}|[a-z0-9]{1,3})\)\{/.test(jsStr),
				// _0x362d54=_0x5845c1,_0x2576f4=_0x2d8f05[_0x4fbc7a+'p']();
				"AddPFunction": /(_0x[0-9a-f]{4,6}|[a-z0-9]{1,3})=(_0x[0-9a-f]{4,6}|[a-z0-9]{1,3}),(_0x[0-9a-f]{4,6}|[a-z0-9]{1,3})=(_0x[0-9a-f]{4,6}|[a-z0-9]{1,3})\[(_0x[0-9a-f]{4,6}|[a-z0-9]{1,3})\+'p']\(\);/.test(jsStr),
				// ['replace'](/[zUrTestTestZTest=]/g,'')
				"ReplaceBase64RegExp": /\['replace']\(\/\[[0-9a-zA-Z]*?=]\/g,''\)/.test(jsStr),
				// c['push'](c['shift']());
				"PushAndShift": /(_0x[0-9a-f]{4,6}|[a-z0-9]{1,3})\['push']\((_0x[0-9a-f]{4,6}|[a-z0-9]{1,3})\['shift']\(\)\)/.test(jsStr),
				// return _0x43c762(++_0x3c2786,_0x2db158)>>_0x3c2786^_0x2db158;
				"ReturnWith++And>>And^": /return (_0x[0-9a-f]{4,6}|[a-z0-9]{1,3})\(\+\+(_0x[0-9a-f]{4,6}|[a-z0-9]{1,3}),(_0x[0-9a-f]{4,6}|[a-z0-9]{1,3})\)>>(_0x[0-9a-f]{4,6}|[a-z0-9]{1,3})\^(_0x[0-9a-f]{4,6}|[a-z0-9]{1,3})/.test(jsStr),
				// var _0xeaaebc={'data':{'key':'cookie','value':'timeout'}
				"CookieTimeoutDataObject": /var (_0x[0-9a-f]{4,6}|[a-z0-9]{1,3})=\{'data':\{'key':'cookie','value':'timeout'}/.test(jsStr),
				// new RegExp\(\'\(\?\:\^\|\;\\x20\)\'\+_0x49a403\[\'replace\'\]\(\/\(\[\.\$\?\*\|\{\}\(\)\[\]\\\/\+\^\]\)\/g\,\'\$1\'\)\+\'\=\(\[\^\;\]\*\)\'\)
				"SignReplaceRegExp": /new RegExp\('\(\?:\^\|;\\x20\)'\+(_0x[0-9a-f]{4,6}|[a-z0-9]{1,3})\['replace']\(\/\(\[\.\$\?\*\|\{}\(\)\[]\\\/\+\^]\)\/g,'\$1'\)\+'=\(\[\^;]\*\)'\)/.test(jsStr),
				// new RegExp('\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*[\x27|\x22].+[\x27|\x22];?\x20*}');
				"EscapedRegExp": /new RegExp\('\\x5cw+\\x20*\\x5c\(\\x5c\)\\x20\*\{\\x5cw\+\\x20\*\[\\x27|\\x22]\.\+\[\\x27|\\x22];\?\\x20*}'\);/.test(jsStr)
			};
			if (
				schemas["PoShiftPushString"] +
				schemas["DecreasingLoop"] +
				schemas["ReplaceBase64RegExp"] +
				schemas["PushAndShift"] +
				schemas["ReturnWith++And>>And^"] +
				schemas["CookieTimeoutDataObject"] +
				schemas["SignReplaceRegExp"] +
				schemas["EscapedRegExp"] >= 3
			) {
				globalDecryptorInfo.preprocessFunction.raw = jsStr;
				return {
					type: "PREPROCESS_FUNCTION",
					content: globalDecryptorInfo.preprocessFunction
				};
			}
		}

		/**
		 * 解密函数
		 * @namespace globalDecryptorInfo.decryptor
		 * @description 使用解密数据完成字符串解密。
		 * 变量命名规则 _?[0-9a-zA-Z$]+?
		 * 字符串规则 'S+?'
		 * */
		if (globalDecryptorInfo.signInfo.raw != null && globalDecryptorInfo.decryptor.raw == null) {
			let isDecryptor = false;
			if (globalDecryptorInfo.preprocessFunction.raw != null) {
				// 有预处理函数
				let schemas = {
					// _0x542044=~~'0x'['concat'](_0x542044
					"DoubleWaveConcat": /(_0x[0-9a-f]{4,6}|[a-z0-9]{1,3})=~~'0x'\['concat']\((_0x[0-9a-f]{4,6}|[a-z0-9]{1,3})/.test(jsStr),
					// Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');')
					"FunctionConstructorString": /Function\('return\\x20\(function\(\)\\x20'\+'\{}\.constructor\(\\x22return\\x20this\\x22\)\(\\x20\)'\+'\);'\)/.test(jsStr),
					// var _0x3ef5fb=typeof window!=='undefined'?window:typeof process==='object'&&typeof require==='function'&&typeof global==='object'?global:this;
					"WhatIsThis": /var (_0x[0-9a-f]{4,6}|[a-z0-9]{1,3})=typeof window!=='undefined'\?window:typeof process==='object'&&typeof require==='function'&&typeof global==='object'\?global:this;/.test(jsStr),
					// var _0x1d2c53='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
					"CharSetString": /var (_0x[0-9a-f]{4,6}|[a-z0-9]{1,3})='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789\+\/=';/.test(jsStr),
					// '%'+('00'+_0x1f82f7['charCodeAt']
					"ZeroPlusCharCodeAt": /'%'\+\('00'\+(_0x[0-9a-f]{4,6}|[a-z0-9]{1,3})\['charCodeAt']/.test(jsStr),
					// _0x53656e['charCodeAt'](_0x578a24%_0x53656e['length']))%0x100;
					"CharCodeAtLength": /(_0x[0-9a-f]{4,6}|[a-z0-9]{1,3})\['charCodeAt']\((_0x[0-9a-f]{4,6}|[a-z0-9]{1,3})%(_0x[0-9a-f]{4,6}|[a-z0-9]{1,3})\['length']\)\)%0x100;/.test(jsStr),
					// +=String['fromCharCode'](
					"PlusStringFromCharCode": /\+=String\['fromCharCode']\(/.test(jsStr)
				};
				// fs.appendFileSync("test.txt", JSON.stringify(schemas) + "\n");
				if (
					schemas["DoubleWaveConcat"] +
					schemas["FunctionConstructorString"] +
					schemas["WhatIsThis"] +
					schemas["CharSetString"] +
					schemas["ZeroPlusCharCodeAt"] +
					schemas["CharCodeAtLength"] +
					schemas["PlusStringFromCharCode"] >= 4
				) {
					isDecryptor = true;
				}
			} else {
				// 无预处理函数
				// function _0x9549(_0x52aa18,_0x1a09ad){_0x52aa18=~~'0x'['concat'](_0x52aa18['slice'](0x0));var _0x4fe032=_0x34a7[_0x52aa18];return _0x4fe032;};
				if (/function (_0x[0-9a-f]{4,6}|[a-z0-9]{1,3})\((_0x[0-9a-f]{4,6}|[a-z0-9]{1,3}),(_0x[0-9a-f]{4,6}|[a-z0-9]{1,3})\)\{(_0x[0-9a-f]{4,6}|[a-z0-9]{1,3})=~~'0x'\['concat']\((_0x[0-9a-f]{4,6}|[a-z0-9]{1,3})\['slice']\(0x0\)\);var (_0x[0-9a-f]{4,6}|[a-z0-9]{1,3})=(_0x[0-9a-f]{4,6}|[a-z0-9]{1,3})\[(_0x[0-9a-f]{4,6}|[a-z0-9]{1,3})];return (_0x[0-9a-f]{4,6}|[a-z0-9]{1,3});};/.test(jsStr)) {
					isDecryptor = true;
				}
			}
			if (isDecryptor) {
				if (jsStr.startsWith("function ")) {
					globalDecryptorInfo.decryptor.type = "function";
					globalDecryptorInfo.decryptor.name = jsStr.slice(9, transRes.indexOf("("));
					globalDecryptorInfo.decryptor.raw = jsStr;
					return {
						type: "DECRYPTOR",
						content: globalDecryptorInfo.decryptor
					};
				} else if (jsStr.startsWith("var ")) {
					globalDecryptorInfo.decryptor.type = "var";
					globalDecryptorInfo.decryptor.name = jsStr.slice(4, transRes.indexOf("="));
					globalDecryptorInfo.decryptor.raw = jsStr;
					return {
						type: "DECRYPTOR",
						content: globalDecryptorInfo.decryptor
					};
				}
			}
		}

		/**
		 * 验证函数
		 * @namespace globalDecryptorInfo.verifyFunction
		 * @description 验证解密数据是否被修改，并去掉头尾多余内容。
		 * 变量命名规则 _?[0-9a-zA-Z$]+?
		 * 字符串规则 'S+?'
		 * */
		if (globalDecryptorInfo.signInfo.raw != null && globalDecryptorInfo.preprocessFunction.raw == null && globalDecryptorInfo.decryptor.raw != null) {
			// for(_0x36eaeb=_0x39941e['shift'](_0x422e9c>>0x2);_0x36eaeb&&_0x36eaeb!==(_0x39941e['pop'](_0x422e9c>>0x3)+'')['replace'](/[ChUlbeWOEtLSnTtk=]/g,'');_0x422e9c++)
			if (/for\((_0x[0-9a-f]{4,6}|[a-z0-9]{1,3})=(_0x[0-9a-f]{4,6}|[a-z0-9]{1,3})\['shift']\((_0x[0-9a-f]{4,6}|[a-z0-9]{1,3})>>0x2\);(_0x[0-9a-f]{4,6}|[a-z0-9]{1,3})&&(_0x[0-9a-f]{4,6}|[a-z0-9]{1,3})!==\((_0x[0-9a-f]{4,6}|[a-z0-9]{1,3})\['pop']\((_0x[0-9a-f]{4,6}|[a-z0-9]{1,3})>>0x3\)\+''\)\['replace']\(\/\[[a-zA-Z]+=?]\/g,''\);(_0x[0-9a-f]{4,6}|[a-z0-9]{1,3})\+\+\)/.test(jsStr)) {
				globalDecryptorInfo.verifyFunction.raw = jsStr;
				return {
					type: "VERIFY_FUNCTION",
					content: globalDecryptorInfo.verifyFunction
				};
			}
		}

		/**
		 * 空语句
		 * @namespace globalDecryptorInfo.empty
		 * @description 空语句。
		 * */
		if (jsStr.trim() === "" || jsStr.trim() === ";") {
			return {
				type: "EMPTY",
				content: {
					raw: jsStr
				}
			};
		}

		/**
		 * 常规语句
		 * @namespace globalDecryptorInfo.common
		 * @description 常规语句。
		 * */
		return {
			type: "COMMON",
			content: {
				raw: jsStr
			}
		};
	});
}
function decryptGlobalJs(js) {
	let transStrRes = transStr(js);
	let boolMarkPos = Number.POSITIVE_INFINITY;
	while ((boolMarkPos === Number.POSITIVE_INFINITY || boolMarkPos - 1 >= 0) && (boolMarkPos = transStrRes.lastIndexOf("![]", boolMarkPos - 1)) !== -1) {
		logger.weakUpdate();
		if (transStrRes[boolMarkPos - 1] === "!") {
			js = js.replaceWithStr(boolMarkPos - 1, boolMarkPos + 3, ((transStrRes[boolMarkPos - 2].match(/[{}\[\]().,+\-*\/~!%<>=&|^?:; @]/) ? "" : " ")) + "true");
		} else {
			js = js.replaceWithStr(boolMarkPos, boolMarkPos + 3, ((transStrRes[boolMarkPos - 1].match(/[{}\[\]().,+\-*\/~!%<>=&|^?:; @]/) ? "" : " ")) + "false");
		}
	}
	let jsArr = splitStatements(js);
	let statementsTypeArr = getStatementsType(jsArr);
	if (globalDecryptorInfo.decryptor.raw === null) {
		pause("【警告】解密函数识别失败，可在 GitHub[https://github.com/NXY666/JsjiamiV6-Decryptor] 上提交 issue 以寻找原因。");
		return jsArr;
	} else {
		if (globalDecryptorInfo.preprocessFunction.raw === null && globalDecryptorInfo.verifyFunction.raw === null) {
			pause("【警告】已发现解密函数，但未发现其对应的预处理函数或验证函数，可能无法正常运行。可在 GitHub[https://github.com/NXY666/JsjiamiV6-Decryptor] 上提交 issue 以寻找原因。");
		}
		virtualGlobalEval(globalDecryptorInfo.signInfo.raw);
		virtualGlobalEval(globalDecryptorInfo.preprocessFunction.raw);
		virtualGlobalEval(globalDecryptorInfo.decryptor.raw);
		virtualGlobalEval(globalDecryptorInfo.verifyFunction.raw);
	}
	return jsArr.filter(function (jsStr, index) {
		return statementsTypeArr[index].type === "COMMON";
	}).map(function (funcJs) {
		logger.weakUpdate();
		transStrRes = transStr(funcJs);

		let decryptorPos = Number.POSITIVE_INFINITY;
		while ((decryptorPos === Number.POSITIVE_INFINITY || decryptorPos - 1 >= 0) && (decryptorPos = transStrRes.lastIndexOf(`${globalDecryptorInfo.decryptor.name}('`, decryptorPos - 1)) !== -1) {
			logger.weakUpdate();
			let endPos = transStrRes.indexOf(")", decryptorPos);
			funcJs = funcJs.replaceWithStr(decryptorPos, endPos + 1, escapeEvalStr(virtualEval(funcJs.slice(decryptorPos, endPos + 1))));
		}

		return funcJs;
	});
}
jsStatementsArr = decryptGlobalJs(js);
fs.writeFileSync("DecryptResult1.js", jsStatementsArr.join("\n"));

logger.logWithoutProgress("解除代码块加密");
/**
 * 获取代码块内加密对象的名称
 * @param jsStr {string} 需解析的代码块
 * @returns {string | boolean} 若传入的代码块包含加密对象则输出加密对象名称，反之则输出false。
 */
function getCodeBlockDecryptorName(jsStr) {
	// jsStr为空或不是以var 开头
	if (!jsStr || jsStr.slice(0, 4) !== "var ") {
		// fs.appendFileSync("res.txt", "初步检查不通过:" + jsStr.slice(0, 100) + "\n");
		// console.log("初步检查不通过:", jsStr.slice(0, 100));
		return false;
	}

	let transStrRes = transStr(jsStr), transLayerRes = transLayer(transStrRes, 2, true);
	let startPos = transLayerRes.indexOf("{") + 1, endPos = transLayerRes.lastIndexOf("}"), strScanLen = 0;

	transStrRes = transStrRes.slice(startPos, endPos);
	let checkRes = transLayerRes.slice(startPos, endPos).split(",").every(function (objectItem) {
		let itemTransRes = transStrRes.slice(strScanLen, strScanLen + objectItem.length);
		let checkRes = objectItem.match(/^'(S)+':('(S)+'|function\((Q)*\)\{(Q)*})$/);
		if (checkRes) {
			if (objectItem.indexOf("function") !== -1) {
				checkRes = itemTransRes.match(/function\([^)]*\)\{return[^;]*;}/);
			}
		}
		strScanLen += objectItem.length + 1;
		return checkRes;
	});
	if (checkRes) {
		// fs.appendFileSync("res.txt", "检查通过:" + jsStr.slice(0, 100) + "\n");
		// console.log("检查通过:", jsStr.slice(0, 100));
		return transLayerRes.slice(4, transLayerRes.indexOf("="));
	} else {
		// fs.appendFileSync("res.txt", "非加密对象:" + jsStr + "\n");
		// console.warn("非加密对象:", jsStr);
		return false;
	}
}
/**
 * 替换代码块中使用加密对象方法加密的内容
 * @param callObjName {string} 所在代码块的加密对象名称
 * @param callFuncName {string} 调用加密对象的方法名称
 * @param callStr {string} 调用加密对象方法的原文
 * @param ignoreQuoteOutside {boolean} 解密完成后是否不使用圆括号包装结果
 * @returns {string} 解密结果
 */
function replaceDecryptorFunc(callObjName, callFuncName, callStr, ignoreQuoteOutside) {
	// 获取加密对象内函数的参数列表
	let callFunc = virtualEval(callObjName + "['" + callFuncName + "']");
	let funcStr = callFunc.toString(), transFuncStr = transStr(funcStr);
	let funcParams = funcStr.slice(transFuncStr.indexOf("(") + 1, transFuncStr.indexOf(")")).splitByOtherStr(transFuncStr.slice(transFuncStr.indexOf("(") + 1, transFuncStr.indexOf(")")), ",");

	// 获取调用解密函数的参数列表
	let transCallStr = transStr(callStr);
	let transCallLayer = transLayer(transCallStr, 1, true), transCallLayer2 = transLayer(transCallStr, 2, true);
	let callParamsStr = callStr.slice(transCallLayer.indexOf("(") + 1, transCallLayer.indexOf(")"));
	let callParams = callParamsStr.splitByOtherStr(transCallLayer2.slice(transCallLayer.indexOf("(") + 1, transCallLayer.indexOf(")")), ",");
	if (funcParams.length !== callParams.length) {
		throw Error(`Error: 加密对象函数调用参数数量(${callParams.length})与实际(${funcParams})不符。`);
	}
	let funcResStr = funcStr.slice(transFuncStr.indexOf("{return ") + 8, transFuncStr.lastIndexOf(";}")),
		replacePos = 0;
	funcParams.forEach(function (param, index) {
		replacePos = transStr(funcResStr).replace(/SQ/g, " ").indexOf(param, replacePos);
		funcResStr = funcResStr.slice(0, replacePos) + funcResStr.slice(replacePos).replace(param, callParams[index].replace(/\$/g, "$$$$"));
		replacePos = replacePos + callParams[index].length;
	});

	if ((funcParams.length === 2 && !transFuncStr.endsWith(");}")) && !ignoreQuoteOutside) {
		return "(" + funcResStr + ")";
	} else {
		return funcResStr;
	}
}
function findAndDecryptCodeBlock(jsArr, isShowProgress) {
	return jsArr.map(function (jsStr, progress) {
		let transLayerRes = transLayer(jsStr);
		let startPos = Number.POSITIVE_INFINITY;
		while ((startPos === Number.POSITIVE_INFINITY || startPos - 1 >= 0) && (startPos = Math.max(
			transLayerRes.lastIndexOf("{", startPos - 1),
			transLayerRes.lastIndexOf("(", startPos - 1),
			transLayerRes.lastIndexOf("[", startPos - 1)
		)) !== -1) {
			let endPos = getQuoteEndPos(jsStr, startPos);
			if (jsStr[startPos] === "{") {
				let splitStatementsRes = splitStatements(jsStr.slice(startPos + 1, endPos));
				if (splitStatementsRes.length) {
					jsStr = jsStr.replaceWithStr(startPos + 1, endPos, decryptCodeBlockArr(splitStatementsRes).join(""));
					continue;
				}
			}
			jsStr = jsStr.replaceWithStr(startPos + 1, endPos, findAndDecryptCodeBlock([jsStr.slice(startPos + 1, endPos)]).join(""));
		}
		if (isShowProgress) {
			logger.logWithProgress("解除代码块加密", progress + 1, jsArr.length);
		}
		return jsStr;
	});
}
function decryptCodeBlockArr(jsArr, isShowProgress) {
	if (isShowProgress) {
		logger.logWithProgress("解除代码块加密", 0, jsArr.length);
	}
	let decryptorObjName = getCodeBlockDecryptorName(jsArr[0]);
	// 代码块解密
	if (decryptorObjName) {
		virtualGlobalEval(jsArr[0]);

		let transStrRes;
		// 识别是否添加括号（二叉树？不！它超出了我的能力范围。）
		jsArr = jsArr.slice(1).map(function (jsStr) {
			transStrRes = transStr(jsStr);

			let decryptorPos = Number.POSITIVE_INFINITY;
			while ((decryptorPos === Number.POSITIVE_INFINITY || decryptorPos - 1 >= 0) && (decryptorPos = transStrRes.lastSearchOf(new RegExp(decryptorObjName.replace(/\$/g, "\\$") + "\\['.+?']"), decryptorPos - 1)) !== -1) {
				let leftSquarePos = transStrRes.indexOf("[", decryptorPos),
					rightSquarePos = transStrRes.indexOf("]", decryptorPos);

				switch (virtualEval("typeof " + decryptorObjName + jsStr.slice(leftSquarePos, rightSquarePos + 1))) {
					case "string": {
						jsStr = jsStr.replaceWithStr(decryptorPos, rightSquarePos + 1, escapeEvalStr(virtualEval(decryptorObjName + jsStr.slice(leftSquarePos, rightSquarePos + 1))));
						break;
					}
					case "function": {
						let transRes = transStr(jsStr);
						let rightRoundPos = getQuoteEndPos(transRes, rightSquarePos + 1);

						let jsStrBehind = transRes.slice(0, decryptorPos),
							jsStrFront = transRes.slice(rightRoundPos + 1);
						let ignoreQuoteOutside =
							(
								( // 所在的区域周围只有一个运算符
									jsStrBehind.endsWith("return ") ||
									jsStrBehind.endsWith(";") ||
									jsStrBehind.endsWith("{")
								) && (
									jsStrFront.startsWith(";")
								)
							) || (
								( // 逗号并列表示周围没有其它运算符
									jsStrBehind.endsWith(",") ||
									jsStrBehind.endsWith("(")
								) && (
									jsStrFront.startsWith(",") ||
									jsStrFront.startsWith(")")
								)
							) || (
								( // 所在的区域周围只有一个运算符
									jsStrBehind.endsWith("[")
								) && (
									jsStrFront.startsWith("]")
								)
							);
						jsStr = jsStr.replaceWithStr(decryptorPos, rightRoundPos + 1, replaceDecryptorFunc(decryptorObjName, jsStr.slice(leftSquarePos + 2, rightSquarePos - 1), jsStr.slice(decryptorPos, rightRoundPos + 1), ignoreQuoteOutside));
						break;
					}
				}
			}
			return jsStr;
		});
	}
	return findAndDecryptCodeBlock(jsArr, isShowProgress);
}
jsStatementsArr = decryptCodeBlockArr(jsStatementsArr, true);
fs.writeFileSync("DecryptResult2.js", jsStatementsArr.join("\n"));

logger.logWithProgress("清理死代码（花指令）");
function simplifyIf(ifJsStr) {
	let conditionStartPos = 2, conditionEndPos = getQuoteEndPos(ifJsStr, conditionStartPos);
	let ifRes = eval(ifJsStr.slice(conditionStartPos, conditionEndPos + 1));
	let elsePos = getQuoteEndPos(ifJsStr, conditionEndPos + 1) + 1, endPos = getQuoteEndPos(ifJsStr, elsePos + 4);

	return ifRes ? ifJsStr.slice(conditionEndPos + 2, elsePos - 1) : ifJsStr.slice(elsePos + 5, endPos);
}
function findAndClearDeadCodes(jsArr, isShowProgress) {
	return jsArr.map(function (jsStr, progress) {
		let transLayerRes = transLayer(jsStr);
		let startPos = Number.POSITIVE_INFINITY;
		while ((startPos === Number.POSITIVE_INFINITY || startPos - 1 >= 0) && (startPos = Math.max(
			transLayerRes.lastIndexOf("{", startPos - 1),
			transLayerRes.lastIndexOf("(", startPos - 1),
			transLayerRes.lastIndexOf("[", startPos - 1)
		)) !== -1) {
			let endPos = getQuoteEndPos(jsStr, startPos);
			if (jsStr[startPos] === "{") {
				let splitStatementsRes = splitStatements(jsStr.slice(startPos + 1, endPos));
				if (splitStatementsRes.length) {
					jsStr = jsStr.replaceWithStr(startPos + 1, endPos, clearDeadCodes(splitStatementsRes).join(""));
					continue;
				}
			}
			jsStr = jsStr.replaceWithStr(startPos + 1, endPos, findAndClearDeadCodes([jsStr.slice(startPos + 1, endPos)]).join(""));
		}
		if (isShowProgress) {
			logger.logWithProgress("清理死代码（花指令）", progress + 1, jsArr.length);
		}
		return jsStr;
	});
}
function clearDeadCodes(jsArr, isShowProgress) {
	if (isShowProgress) {
		logger.logWithProgress("清理死代码（花指令）", 0, jsArr.length);
	}
	if (jsArr.length === 1) {
		// if死代码
		let transStrRes = transStr(jsArr[0]), transLayerRes = transLayer(transStrRes, 1, true);
		if (/^if\('S+'[=!]=='S+'\)/.test(transStrRes)) {
			let transFakeIfStr = transLayerRes.match(/if\(Q*\){Q*}else{Q*}/)[0];
			return clearDeadCodes(splitStatements(simplifyIf(jsArr[0].slice(0, transFakeIfStr.length)), "COMMON"));
		}
	} else if (jsArr.length === 2) {
		// switch死代码
		if (/^var (\S+?)='[0-9|]*?'\['split']\('\|'\),(\S+?)=0x0;/.test(jsArr[0]) && /^while\(true\){switch\((\S+?)\[(\S+?)\+\+]\)/.test(jsArr[1])) {
			let initMatch = jsArr[0].match(/var (\S+?)='[0-9|]*?'\['split']\('\|'\),(\S+?)=0x0;/),
				whileMatch = jsArr[1].match(/while\(true\){switch\((\S+?)\[(\S+?)\+\+]\)/);
			let sequence;
			if ((initMatch && initMatch.length === 3 && whileMatch && whileMatch.length === 3) && ((sequence = initMatch[1]) === whileMatch[1] && initMatch[2] === whileMatch[2])) {
				virtualEval(jsArr[0]);
				let sequenceList = virtualEval(sequence);
				let caseBlock = jsArr[1].slice(whileMatch[0].length + 1, getQuoteEndPos(jsArr[1], whileMatch[0].length));
				let transCaseBlock = transLayer(caseBlock);
				let caseList = [];
				let caseRegexp = /case'S*'/g;

				sequenceList.forEach(function () {
					let regRes = caseRegexp.exec(transCaseBlock);
					let startPos = regRes.index + regRes[0].length + 1, endPos = (() => {
						let casePos = transCaseBlock.indexOf("case'", startPos + 1);
						let continuePos = transCaseBlock.indexOf("continue;", startPos + 1);
						if (casePos === -1) {
							casePos = Number.POSITIVE_INFINITY;
						}
						if (continuePos === -1) {
							continuePos = Number.POSITIVE_INFINITY;
						}
						return Math.min(casePos, continuePos);
					})();
					caseList.push(caseBlock.slice(startPos, endPos).replace("continue;", ""));
				});

				return clearDeadCodes(sequenceList.map(function (index) {
					return caseList[index];
				}));
			}
		}
	} else if (jsArr.length === 3) {
		// switch死代码
		if (/^var (\S+?)='[0-9|]*?'\['split']\('\|'\);/.test(jsArr[0]) && /^var (\S+?)=0x0;/.test(jsArr[1]) && /^while\(true\){switch\((\S+?)\[(\S+?)\+\+]\)/.test(jsArr[2])) {
			let initMatch0 = jsArr[0].match(/^var (\S+?)='[0-9|]*?'\['split']\('\|'\);$/),
				initMatch1 = jsArr[1].match(/^var (\S+?)=0x0;$/),
				whileMatch = jsArr[2].match(/while\(true\){switch\((\S+?)\[(\S+?)\+\+]\)/);
			let sequence;
			if ((initMatch0 && initMatch0.length === 2 && initMatch1 && initMatch1.length === 2 && whileMatch && whileMatch.length === 3) &&
				((sequence = initMatch0[1]) === whileMatch[1] && initMatch1[1] === whileMatch[2])) {
				virtualEval(jsArr[0]);
				virtualEval(jsArr[1]);
				let sequenceList = virtualEval(sequence);
				let caseBlock = jsArr[2].slice(whileMatch[0].length + 1, getQuoteEndPos(jsArr[2], whileMatch[0].length));
				let transCaseBlock = transLayer(caseBlock);
				let caseList = [];
				let caseRegexp = /case'S*'/g;

				sequenceList.forEach(function () {
					let regRes = caseRegexp.exec(transCaseBlock);
					let startPos = regRes.index + regRes[0].length + 1, endPos = (() => {
						let casePos = transCaseBlock.indexOf("case'", startPos + 1);
						let continuePos = transCaseBlock.indexOf("continue;", startPos + 1);
						if (casePos === -1) {
							casePos = Number.POSITIVE_INFINITY;
						}
						if (continuePos === -1) {
							continuePos = Number.POSITIVE_INFINITY;
						}
						return Math.min(casePos, continuePos);
					})();
					caseList.push(caseBlock.slice(startPos, endPos).replace("continue;", ""));
				});

				return clearDeadCodes(sequenceList.map(function (index) {
					return caseList[index];
				}));
			}
		}
	}
	return findAndClearDeadCodes(jsArr, isShowProgress);
}
jsStatementsArr = clearDeadCodes(jsStatementsArr, true);
fs.writeFileSync("DecryptResult3.js", jsStatementsArr.join("\n"));

logger.logWithoutDetermine("提升代码可读性");
function decodeStr(txt) {
	return eval(`(\`${txt.replace(/`/g, "\\`")}\`)`).replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\n/g, "\\n");
}
function decryptFormat(globalJsArr) {
	return globalJsArr.map(function (statement) {
		logger.weakUpdate();

		let transStrRes;

		// 合并串联字符串（'spl'+'it' → 'split'）
		if (config["optionalFunction"]["MergeString"]) {
			transStrRes = transStr(statement);
			let multiStrPos = Number.POSITIVE_INFINITY;
			while ((multiStrPos = transStrRes.lastSearchOf(/S'\+'S/, multiStrPos - 1)) !== -1) {
				logger.weakUpdate();
				statement = statement.replaceWithStr(multiStrPos + 1, multiStrPos + 4, "");
			}
		}

		// 转换十六进制数字（0x1 → 1）
		if (config["optionalFunction"]["ConvertHex"]) {
			transStrRes = transStr(statement);
			let hexNumberPos = Number.POSITIVE_INFINITY;
			while ((hexNumberPos = transStrRes.lastSearchOf(/0x[0-9a-fA-F]*/, hexNumberPos - 1)) !== -1) {
				logger.weakUpdate();
				let activeNumStr = transStrRes.slice(hexNumberPos).match(/0x([0-9a-fA-F])*/)[0];
				// ^~是位运算符，此处排除
				let checkNumberRegexp = /[{}\[\]().,+\-*\/!<>%=&|?:; ]/;
				if (
					transStrRes[hexNumberPos - 1].match(checkNumberRegexp) != null &&
					(transStrRes[hexNumberPos - 1].match(/[&|]/) == null || transStrRes[hexNumberPos - 1] === transStrRes[hexNumberPos - 2]) &&
					(transStrRes[hexNumberPos - 1].match(/[<>]/) == null || transStrRes[hexNumberPos - 1] !== transStrRes[hexNumberPos - 2]) &&
					transStrRes[hexNumberPos + activeNumStr.length].match(checkNumberRegexp) != null &&
					(transStrRes[hexNumberPos + activeNumStr.length].match(/[&|]/) == null || transStrRes[hexNumberPos + activeNumStr.length] === transStrRes[hexNumberPos + activeNumStr.length + 1]) &&
					(transStrRes[hexNumberPos + activeNumStr.length].match(/[<>]/) == null || transStrRes[hexNumberPos + activeNumStr.length] !== transStrRes[hexNumberPos + activeNumStr.length + 1])
				) {
					statement = statement.replaceWithStr(hexNumberPos, hexNumberPos + activeNumStr.length, parseInt(activeNumStr, 16));
				}
			}
		}

		// 替换索引器（Object['keys'] → Object.keys）
		if (config["optionalFunction"]["ReplaceIndexer"]) {
			transStrRes = transStr(statement);
			let objIndexerPos = Number.POSITIVE_INFINITY;
			while ((objIndexerPos = transStrRes.lastSearchOf(/\['S*.']/, objIndexerPos - 1)) !== -1) {
				logger.weakUpdate();
				let activeIndexerStr = transStrRes.slice(objIndexerPos).match(/\['(S)*.']/)[0];
				let leftSplitter, rightSplitter;

				let isAheadRegexp = (() => {
					if (transStrRes[objIndexerPos - 1] !== "/") {
						return false;
					}
					let lastRegExpPos = transStrRes.lastSearchOf(/\/S*\//, objIndexerPos);
					if (lastRegExpPos === -1) {
						return false;
					} else {
						let activeRegExpStr = transStrRes.slice(lastRegExpPos).match(/\/(S)*\//)[0];
						return lastRegExpPos + activeRegExpStr.length === objIndexerPos;
					}
				})();
				if ((() => { // 123['toString']() -×-> 123.toString()
						if (!transStrRes[objIndexerPos - 1].match(/[0-9.]/)) {
							return false;
						}
						let pos = objIndexerPos;
						while (--pos) {
							if (!transStrRes[pos].match(/[0-9.]/)) {
								return !!transStrRes[pos].match(/[{}\[\]().,+\-*\/~!%<>=&|^?:; @]/);
							}
						}
					})() ||
					transStrRes[objIndexerPos - 1].match(/[{}\[(,+\-*~!%<>=&|^?:;@]/) || // [['t']] -×-> [.t] （此时是字符串数组）
					transStrRes[objIndexerPos + activeIndexerStr.length].match(/[`'"]/) || // ['t']"a" -×-> t."a" （忘了为什么了）
					(!isAheadRegexp && transStrRes[objIndexerPos - 1] === '/') || // 1 / ['t'] -×-> 1 /.t （此时是字符串数组）
					!statement.slice(objIndexerPos + 2, objIndexerPos + activeIndexerStr.length - 2).match(/^[^\u0030-\u0039\u00b7\u0300-\u036f\u0387\u0483-\u0487\u0591-\u05bd\u05bf\u05c1-\u05c2\u05c4-\u05c5\u05c7\u0610-\u061a\u064b-\u0669\u0670\u06d6-\u06dc\u06df-\u06e4\u06e7-\u06e8\u06ea-\u06ed\u06f0-\u06f9\u0711\u0730-\u074a\u07a6-\u07b0\u07c0-\u07c9\u07eb-\u07f3\u07fd\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0859-\u085b\u0898-\u089f\u08ca-\u08e1\u08e3-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962-\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7-\u09c8\u09cb-\u09cd\u09d7\u09e2-\u09e3\u09e6-\u09ef\u09fe\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47-\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2-\u0ae3\u0ae6-\u0aef\u0afa-\u0aff\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47-\u0b48\u0b4b-\u0b4d\u0b55-\u0b57\u0b62-\u0b63\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c00-\u0c04\u0c3c\u0c3e-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55-\u0c56\u0c62-\u0c63\u0c66-\u0c6f\u0c81-\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5-\u0cd6\u0ce2-\u0ce3\u0ce6-\u0cef\u0d00-\u0d03\u0d3b-\u0d3c\u0d3e-\u0d44\u0d46-\u0d48\u0d4a-\u0d4d\u0d57\u0d62-\u0d63\u0d66-\u0d6f\u0d81-\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0de6-\u0def\u0df2-\u0df3\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0e50-\u0e59\u0eb1\u0eb4-\u0ebc\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18-\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f3e-\u0f3f\u0f71-\u0f84\u0f86-\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u102b-\u103e\u1040-\u1049\u1056-\u1059\u105e-\u1060\u1062-\u1064\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u1369-\u1371\u1712-\u1715\u1732-\u1734\u1752-\u1753\u1772-\u1773\u17b4-\u17d3\u17dd\u17e0-\u17e9\u180b-\u180d\u180f-\u1819\u18a9\u1920-\u192b\u1930-\u193b\u1946-\u194f\u19d0-\u19da\u1a17-\u1a1b\u1a55-\u1a5e\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1ab0-\u1abd\u1abf-\u1ace\u1b00-\u1b04\u1b34-\u1b44\u1b50-\u1b59\u1b6b-\u1b73\u1b80-\u1b82\u1ba1-\u1bad\u1bb0-\u1bb9\u1be6-\u1bf3\u1c24-\u1c37\u1c40-\u1c49\u1c50-\u1c59\u1cd0-\u1cd2\u1cd4-\u1ce8\u1ced\u1cf4\u1cf7-\u1cf9\u1dc0-\u1dff\u200c-\u200d\u203f-\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2cef-\u2cf1\u2d7f\u2de0-\u2dff\u302a-\u302f\u3099-\u309a\ua620-\ua629\ua66f\ua674-\ua67d\ua69e-\ua69f\ua6f0-\ua6f1\ua802\ua806\ua80b\ua823-\ua827\ua82c\ua880-\ua881\ua8b4-\ua8c5\ua8d0-\ua8d9\ua8e0-\ua8f1\ua8ff-\ua909\ua926-\ua92d\ua947-\ua953\ua980-\ua983\ua9b3-\ua9c0\ua9d0-\ua9d9\ua9e5\ua9f0-\ua9f9\uaa29-\uaa36\uaa43\uaa4c-\uaa4d\uaa50-\uaa59\uaa7b-\uaa7d\uaab0\uaab2-\uaab4\uaab7-\uaab8\uaabe-\uaabf\uaac1\uaaeb-\uaaef\uaaf5-\uaaf6\uabe3-\uabea\uabec-\uabed\uabf0-\uabf9\ufb1e\ufe00-\ufe0f\ufe20-\ufe2f\ufe33-\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f][^\u0000-\u0023\u0025-\u002f\u003a-\u0040\u005b-\u005e\u0060\u007b-\u00a9\u00ab-\u00b4\u00b6\u00b8-\u00b9\u00bb-\u00bf\u00d7\u00f7\u02c2-\u02c5\u02d2-\u02df\u02e5-\u02eb\u02ed\u02ef-\u02ff\u0375\u0378-\u0379\u037e\u0380-\u0385\u038b\u038d\u03a2\u03f6\u0482\u0488-\u0489\u0530\u0557-\u0558\u055a-\u055f\u0589-\u0590\u05be\u05c0\u05c3\u05c6\u05c8-\u05cf\u05eb-\u05ee\u05f3-\u060f\u061b-\u061f\u066a-\u066d\u06d4\u06dd-\u06de\u06e9\u06fd-\u06fe\u0700-\u070f\u074b-\u074c\u07b2-\u07bf\u07f6-\u07f9\u07fb-\u07fc\u07fe-\u07ff\u082e-\u083f\u085c-\u085f\u086b-\u086f\u0888\u088f-\u0897\u08e2\u0964-\u0965\u0970\u0984\u098d-\u098e\u0991-\u0992\u09a9\u09b1\u09b3-\u09b5\u09ba-\u09bb\u09c5-\u09c6\u09c9-\u09ca\u09cf-\u09d6\u09d8-\u09db\u09de\u09e4-\u09e5\u09f2-\u09fb\u09fd\u09ff-\u0a00\u0a04\u0a0b-\u0a0e\u0a11-\u0a12\u0a29\u0a31\u0a34\u0a37\u0a3a-\u0a3b\u0a3d\u0a43-\u0a46\u0a49-\u0a4a\u0a4e-\u0a50\u0a52-\u0a58\u0a5d\u0a5f-\u0a65\u0a76-\u0a80\u0a84\u0a8e\u0a92\u0aa9\u0ab1\u0ab4\u0aba-\u0abb\u0ac6\u0aca\u0ace-\u0acf\u0ad1-\u0adf\u0ae4-\u0ae5\u0af0-\u0af8\u0b00\u0b04\u0b0d-\u0b0e\u0b11-\u0b12\u0b29\u0b31\u0b34\u0b3a-\u0b3b\u0b45-\u0b46\u0b49-\u0b4a\u0b4e-\u0b54\u0b58-\u0b5b\u0b5e\u0b64-\u0b65\u0b70\u0b72-\u0b81\u0b84\u0b8b-\u0b8d\u0b91\u0b96-\u0b98\u0b9b\u0b9d\u0ba0-\u0ba2\u0ba5-\u0ba7\u0bab-\u0bad\u0bba-\u0bbd\u0bc3-\u0bc5\u0bc9\u0bce-\u0bcf\u0bd1-\u0bd6\u0bd8-\u0be5\u0bf0-\u0bff\u0c0d\u0c11\u0c29\u0c3a-\u0c3b\u0c45\u0c49\u0c4e-\u0c54\u0c57\u0c5b-\u0c5c\u0c5e-\u0c5f\u0c64-\u0c65\u0c70-\u0c7f\u0c84\u0c8d\u0c91\u0ca9\u0cb4\u0cba-\u0cbb\u0cc5\u0cc9\u0cce-\u0cd4\u0cd7-\u0cdc\u0cdf\u0ce4-\u0ce5\u0cf0\u0cf3-\u0cff\u0d0d\u0d11\u0d45\u0d49\u0d4f-\u0d53\u0d58-\u0d5e\u0d64-\u0d65\u0d70-\u0d79\u0d80\u0d84\u0d97-\u0d99\u0db2\u0dbc\u0dbe-\u0dbf\u0dc7-\u0dc9\u0dcb-\u0dce\u0dd5\u0dd7\u0de0-\u0de5\u0df0-\u0df1\u0df4-\u0e00\u0e3b-\u0e3f\u0e4f\u0e5a-\u0e80\u0e83\u0e85\u0e8b\u0ea4\u0ea6\u0ebe-\u0ebf\u0ec5\u0ec7\u0ece-\u0ecf\u0eda-\u0edb\u0ee0-\u0eff\u0f01-\u0f17\u0f1a-\u0f1f\u0f2a-\u0f34\u0f36\u0f38\u0f3a-\u0f3d\u0f48\u0f6d-\u0f70\u0f85\u0f98\u0fbd-\u0fc5\u0fc7-\u0fff\u104a-\u104f\u109e-\u109f\u10c6\u10c8-\u10cc\u10ce-\u10cf\u10fb\u1249\u124e-\u124f\u1257\u1259\u125e-\u125f\u1289\u128e-\u128f\u12b1\u12b6-\u12b7\u12bf\u12c1\u12c6-\u12c7\u12d7\u1311\u1316-\u1317\u135b-\u135c\u1360-\u1368\u1372-\u137f\u1390-\u139f\u13f6-\u13f7\u13fe-\u1400\u166d-\u166e\u1680\u169b-\u169f\u16eb-\u16ed\u16f9-\u16ff\u1716-\u171e\u1735-\u173f\u1754-\u175f\u176d\u1771\u1774-\u177f\u17d4-\u17d6\u17d8-\u17db\u17de-\u17df\u17ea-\u180a\u180e\u181a-\u181f\u1879-\u187f\u18ab-\u18af\u18f6-\u18ff\u191f\u192c-\u192f\u193c-\u1945\u196e-\u196f\u1975-\u197f\u19ac-\u19af\u19ca-\u19cf\u19db-\u19ff\u1a1c-\u1a1f\u1a5f\u1a7d-\u1a7e\u1a8a-\u1a8f\u1a9a-\u1aa6\u1aa8-\u1aaf\u1abe\u1acf-\u1aff\u1b4d-\u1b4f\u1b5a-\u1b6a\u1b74-\u1b7f\u1bf4-\u1bff\u1c38-\u1c3f\u1c4a-\u1c4c\u1c7e-\u1c7f\u1c89-\u1c8f\u1cbb-\u1cbc\u1cc0-\u1ccf\u1cd3\u1cfb-\u1cff\u1f16-\u1f17\u1f1e-\u1f1f\u1f46-\u1f47\u1f4e-\u1f4f\u1f58\u1f5a\u1f5c\u1f5e\u1f7e-\u1f7f\u1fb5\u1fbd\u1fbf-\u1fc1\u1fc5\u1fcd-\u1fcf\u1fd4-\u1fd5\u1fdc-\u1fdf\u1fed-\u1ff1\u1ff5\u1ffd-\u200b\u200e-\u203e\u2041-\u2053\u2055-\u2070\u2072-\u207e\u2080-\u208f\u209d-\u20cf\u20dd-\u20e0\u20e2-\u20e4\u20f1-\u2101\u2103-\u2106\u2108-\u2109\u2114\u2116-\u2117\u211e-\u2123\u2125\u2127\u2129\u213a-\u213b\u2140-\u2144\u214a-\u214d\u214f-\u215f\u2189-\u2bff\u2ce5-\u2cea\u2cf4-\u2cff\u2d26\u2d28-\u2d2c\u2d2e-\u2d2f\u2d68-\u2d6e\u2d70-\u2d7e\u2d97-\u2d9f\u2da7\u2daf\u2db7\u2dbf\u2dc7\u2dcf\u2dd7\u2ddf\u2e00-\u3004\u3008-\u3020\u3030\u3036-\u3037\u303d-\u3040\u3097-\u3098\u30a0\u30fb\u3100-\u3104\u3130\u318f-\u319f\u31c0-\u31ef\u3200-\u33ff\u4dc0-\u4dff\ua48d-\ua4cf\ua4fe-\ua4ff\ua60d-\ua60f\ua62c-\ua63f\ua670-\ua673\ua67e\ua6f2-\ua716\ua720-\ua721\ua789-\ua78a\ua7cb-\ua7cf\ua7d2\ua7d4\ua7da-\ua7f1\ua828-\ua82b\ua82d-\ua83f\ua874-\ua87f\ua8c6-\ua8cf\ua8da-\ua8df\ua8f8-\ua8fa\ua8fc\ua92e-\ua92f\ua954-\ua95f\ua97d-\ua97f\ua9c1-\ua9ce\ua9da-\ua9df\ua9ff\uaa37-\uaa3f\uaa4e-\uaa4f\uaa5a-\uaa5f\uaa77-\uaa79\uaac3-\uaada\uaade-\uaadf\uaaf0-\uaaf1\uaaf7-\uab00\uab07-\uab08\uab0f-\uab10\uab17-\uab1f\uab27\uab2f\uab5b\uab6a-\uab6f\uabeb\uabee-\uabef\uabfa-\uabff\ud7a4-\ud7af\ud7c7-\ud7ca\ud7fc-\uf8ff\ufa6e-\ufa6f\ufada-\ufaff\ufb07-\ufb12\ufb18-\ufb1c\ufb29\ufb37\ufb3d\ufb3f\ufb42\ufb45\ufbb2-\ufbd2\ufd3e-\ufd4f\ufd90-\ufd91\ufdc8-\ufdef\ufdfc-\ufdff\ufe10-\ufe1f\ufe30-\ufe32\ufe35-\ufe4c\ufe50-\ufe6f\ufe75\ufefd-\uff0f\uff1a-\uff20\uff3b-\uff3e\uff40\uff5b-\uff65\uffbf-\uffc1\uffc8-\uffc9\uffd0-\uffd1\uffd8-\uffd9\uffdd-\uffff]*$/) // ['1xx'] -×-> .1xx.
				) {
					// 特殊原因，不转换
				} else {
					// 右边要不要加点
					if (transStrRes[objIndexerPos + activeIndexerStr.length].match(/[^{}\[\]().,+\-*\/~!%<>=&|^?:; ]/) != null) {
						// console.log("√ R", objIndexerPos, activeIndexerStr);
						rightSplitter = ".";
					} else {
						// console.log("× R", objIndexerPos, activeIndexerStr, "[", transStrRes[objIndexerPos - 1], ",", transStrRes[objIndexerPos + activeIndexerStr.length], "]");
						rightSplitter = "";
					}
					statement = statement.replaceWithStr(objIndexerPos + activeIndexerStr.length - 2, objIndexerPos + activeIndexerStr.length, rightSplitter);
					transStrRes = transStrRes.replaceWithStr(objIndexerPos + activeIndexerStr.length - 2, objIndexerPos + activeIndexerStr.length, rightSplitter);

					// 左边要不要加点
					if (transStrRes[objIndexerPos - 1] === "/") {
						let lastRegExpPos = transStrRes.lastSearchOf(/\/S*\//, objIndexerPos);
						if (lastRegExpPos === -1) {
							leftSplitter = "";
							// console.log("× E", objIndexerPos, activeIndexerStr);
						} else {
							let activeRegExpStr = transStrRes.slice(lastRegExpPos).match(/\/(S)*\//)[0];
							if (lastRegExpPos + activeRegExpStr.length === objIndexerPos) {
								leftSplitter = ".";
								// console.log("√ E", objIndexerPos, activeIndexerStr);
							} else {
								leftSplitter = "";
								// console.log("× E", objIndexerPos, activeIndexerStr);
							}
						}
					} else if (transStrRes[objIndexerPos - 1].match(/[^{\[(.,+\-*~!%<>=&|^?:; ]/) != null) {
						// console.log("√ L", objIndexerPos, activeIndexerStr);
						leftSplitter = ".";
					} else {
						// console.log("× L", objIndexerPos, activeIndexerStr, "[", transStrRes[objIndexerPos - 1], ",", transStrRes[objIndexerPos + activeIndexerStr.length], "]");
						leftSplitter = "";
					}
					statement = statement.replaceWithStr(objIndexerPos, objIndexerPos + 2, leftSplitter);
					transStrRes = transStrRes.replaceWithStr(objIndexerPos, objIndexerPos + 2, leftSplitter);
				}
			}
		}

		// 转换Unicode字符（\x22 → "）
		if (config["optionalFunction"]["ConvertUnicode"]) {
			transStrRes = transStr(statement);
			let hexCharRes = Number.POSITIVE_INFINITY;
			while ((hexCharRes = transStrRes.lastSearchOf(/'S+'/, hexCharRes - 1)) !== -1) {
				logger.weakUpdate();
				let activeStr = transStrRes.slice(hexCharRes++).match(/'S+'/)[0];
				statement = statement.replaceWithStr(hexCharRes, hexCharRes + activeStr.length - 2, decodeStr(statement.slice(hexCharRes, hexCharRes + activeStr.length - 2)));
			}
		}

		return statement;
	});
}
jsStatementsArr = decryptFormat(jsStatementsArr);
fs.writeFileSync("DecryptResult4.js", jsStatementsArr.join("\n"));

logger.logWithoutProgress("格式化代码");
function findAndFormatCodeBlock(jsArr, layer, isShowProgress) {
	return jsArr.map(function (jsStr, progress) {
		// 特殊情况会在前面添加前缀
		let prefixCount = 0;
		if (jsStr[0] === "\t") {
			prefixCount = layer - /^\t+/.test(jsStr).toString().length + 1;
		}

		let transLayerRes = transLayer(jsStr);
		let startPos = Number.POSITIVE_INFINITY;
		while ((startPos === Number.POSITIVE_INFINITY || startPos - 1 >= 0) && (startPos = Math.max(
			transLayerRes.lastIndexOf("{", startPos - 1),
			transLayerRes.lastIndexOf("(", startPos - 1),
			transLayerRes.lastIndexOf("[", startPos - 1)
		)) !== -1) {
			let endPos = getQuoteEndPos(jsStr, startPos);
			if (jsStr[startPos] === "{") {
				// 拆分代码并顺便清理空语句
				let splitStatementsRes = splitStatements(jsStr.slice(startPos + 1, endPos)).filter(function (statement) {
					return statement !== ";";
				});
				if (splitStatementsRes.length) {
					let isCaseBlock = /^(case[!"%&'(*+,\-.\/:;<=>?@\[^{|~ ]|default:)/.test(transStr(splitStatementsRes[0]).slice(0, 8));
					let padTabs = "\n" + "".padEnd(layer + prefixCount, "\t");
					if (isCaseBlock) {
						splitStatementsRes = splitStatementsRes.map(function (statement) {
							if (!/^(case[!"%&'(*+,\-.\/:;<=>?@\[^{|~ ]|default:)/.test(transStr(statement).slice(0, 8))) {
								return "\t" + statement;
							} else {
								return statement;
							}
						});
					}
					jsStr = jsStr.replaceWithStr(startPos + 1, endPos, padTabs + findAndFormatCodeBlock(splitStatementsRes, layer + 1).join(padTabs) + padTabs.slice(0, -1));
				} else {
					let padTabs = "\n" + "".padEnd(layer + prefixCount, "\t");
					jsStr = jsStr.replaceWithStr(startPos + 1, endPos, findAndFormatCodeBlock([jsStr.slice(startPos + 1, endPos)], layer + 1).join(padTabs));
				}
				continue;
			}
			jsStr = jsStr.replaceWithStr(startPos + 1, endPos, findAndFormatCodeBlock([jsStr.slice(startPos + 1, endPos)], layer).join("\n" + "".padEnd(layer, "\t")));
		}
		if (isShowProgress) {
			logger.logWithProgress("格式化代码", progress + 1, jsArr.length);
		}
		return jsStr;
	});
}
jsStatementsArr = findAndFormatCodeBlock(jsStatementsArr, 1, true);
fs.writeFileSync("DecryptResult5.js", jsStatementsArr.join("\n"));

const END_TIMESTAMP = new Date().getTime();

logger.logWithoutProgress(`解密完成！
耗时：${END_TIMESTAMP - START_TIMESTAMP - PAUSE_TIME}ms`);