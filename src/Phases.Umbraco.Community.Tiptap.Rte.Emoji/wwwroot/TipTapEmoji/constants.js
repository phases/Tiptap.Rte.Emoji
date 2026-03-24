//#region src/emoji/emoji-data.ts
var e = 127462, t = 127487;
function n(n) {
	let r = Array.from(n);
	if (r.length !== 2) return !1;
	let i = r[0].codePointAt(0) ?? 0, a = r[1].codePointAt(0) ?? 0;
	return i >= e && i <= t && a >= e && a <= t;
}
function r(e) {
	return n(e.native) ? !0 : e.id.length === 2 && /^[a-z]{2}$/i.test(e.id);
}
var i = {
	frequent: "Frequently Used",
	people: "Smileys & People",
	nature: "Animals & Nature",
	foods: "Food & Drink",
	activity: "Activity",
	places: "Travel & Places",
	objects: "Objects",
	symbols: "Symbols",
	flags: "Flags"
}, a = {
	categories: [
		{
			id: "frequent",
			name: "Frequently Used",
			emojis: []
		},
		{
			id: "people",
			name: "Smileys & People",
			emojis: [
				"grinning",
				"smiley",
				"smile",
				"grin",
				"sweat_smile",
				"joy",
				"rofl",
				"relaxed",
				"blush",
				"innocent",
				"slight_smile",
				"upside_down",
				"wink",
				"relieved",
				"heart_eyes",
				"kissing_heart",
				"kissing",
				"yum",
				"stuck_out_tongue",
				"zany",
				"raised_hands",
				"clap",
				"thumbsup",
				"wave",
				"pray"
			]
		},
		{
			id: "nature",
			name: "Animals & Nature",
			emojis: /* @__PURE__ */ "see_no_evil.hear_no_evil.speak_no_evil.monkey_face.dog.cat.rabbit.fox.bear.panda.lion.tiger.wolf.pig.cow.boar.unicorn.dragon.bee.butterfly.sunny.cloud.rainbow.star.fire.snowflake.cherry_blossom.rose.tulip.tree.leaf".split(".")
		},
		{
			id: "foods",
			name: "Food & Drink",
			emojis: [
				"grape",
				"melon",
				"watermelon",
				"tangerine",
				"lemon",
				"banana",
				"apple",
				"pear",
				"peach",
				"cherries",
				"strawberry",
				"hamburger",
				"pizza",
				"taco",
				"burrito",
				"cake",
				"cookie",
				"chocolate_bar",
				"coffee",
				"tea",
				"beer",
				"champagne",
				"wine_glass"
			]
		},
		{
			id: "activity",
			name: "Activity",
			emojis: [
				"soccer",
				"basketball",
				"football",
				"baseball",
				"tennis",
				"golf",
				"running",
				"surfing",
				"swimming",
				"cycling",
				"weight_lifting",
				"dart",
				"bowling",
				"video_game",
				"slot_machine",
				"musical_score",
				"guitar",
				"drum",
				"saxophone",
				"trumpet",
				"art",
				"microphone",
				"headphones",
				"movie_camera"
			]
		},
		{
			id: "places",
			name: "Travel & Places",
			emojis: [
				"car",
				"taxi",
				"bus",
				"train",
				"airplane",
				"rocket",
				"bicycle",
				"house",
				"office",
				"hospital",
				"school",
				"hotel",
				"church",
				"stadium",
				"statue_of_liberty",
				"fountain",
				"mountain",
				"beach",
				"camping",
				"sunrise",
				"cityscape",
				"night_with_stars"
			]
		},
		{
			id: "objects",
			name: "Objects",
			emojis: /* @__PURE__ */ "bulb.flashlight.battery.electric_plug.computer.keyboard.desktop.printer.lock.key.wrench.hammer.gear.scissors.envelope.email.inbox_tray.package.calendar.bookmark.books.notebook.pencil2.paintbrush.crayon.paperclip.pushpin".split(".")
		},
		{
			id: "symbols",
			name: "Symbols",
			emojis: [
				"heart",
				"orange_heart",
				"yellow_heart",
				"green_heart",
				"blue_heart",
				"purple_heart",
				"black_heart",
				"broken_heart",
				"star2",
				"sparkles",
				"zap",
				"checkmark",
				"cross",
				"question",
				"exclamation",
				"plus",
				"minus",
				"divide",
				"hash",
				"arrow_right",
				"arrow_left",
				"recycle",
				"tm",
				"copyright",
				"registered"
			]
		}
	],
	emojis: {}
}, o = {
	grinning: "😀",
	smiley: "😃",
	smile: "😄",
	grin: "😁",
	sweat_smile: "😅",
	joy: "😂",
	rofl: "🤣",
	relaxed: "😌",
	blush: "😊",
	innocent: "😇",
	slight_smile: "🙂",
	upside_down: "🙃",
	wink: "😉",
	relieved: "😌",
	heart_eyes: "😍",
	kissing_heart: "😘",
	kissing: "😗",
	yum: "😋",
	stuck_out_tongue: "😛",
	zany: "🤪",
	raised_hands: "🙌",
	clap: "👏",
	thumbsup: "👍",
	wave: "👋",
	pray: "🙏",
	see_no_evil: "🙈",
	hear_no_evil: "🙉",
	speak_no_evil: "🙊",
	monkey_face: "🐵",
	dog: "🐕",
	cat: "🐱",
	rabbit: "🐰",
	fox: "🦊",
	bear: "🐻",
	panda: "🐼",
	lion: "🦁",
	tiger: "🐯",
	wolf: "🐺",
	pig: "🐷",
	cow: "🐮",
	boar: "🐗",
	unicorn: "🦄",
	dragon: "🐉",
	bee: "🐝",
	butterfly: "🦋",
	sunny: "☀️",
	cloud: "☁️",
	rainbow: "🌈",
	star: "⭐",
	fire: "🔥",
	snowflake: "❄️",
	cherry_blossom: "🌸",
	rose: "🌹",
	tulip: "🌷",
	tree: "🌳",
	leaf: "🍃",
	grape: "🍇",
	melon: "🍈",
	watermelon: "🍉",
	tangerine: "🍊",
	lemon: "🍋",
	banana: "🍌",
	apple: "🍎",
	pear: "🍐",
	peach: "🍑",
	cherries: "🍒",
	strawberry: "🍓",
	hamburger: "🍔",
	pizza: "🍕",
	taco: "🌮",
	burrito: "🌯",
	cake: "🍰",
	cookie: "🍪",
	chocolate_bar: "🍫",
	coffee: "☕",
	tea: "🍵",
	beer: "🍺",
	champagne: "🍾",
	wine_glass: "🍷",
	soccer: "⚽",
	basketball: "🏀",
	football: "🏈",
	baseball: "⚾",
	tennis: "🎾",
	golf: "⛳",
	running: "🏃",
	surfing: "🏄",
	swimming: "🏊",
	cycling: "🚴",
	weight_lifting: "🏋️",
	dart: "🎯",
	bowling: "🎳",
	video_game: "🎮",
	slot_machine: "🎰",
	musical_score: "🎼",
	guitar: "🎸",
	drum: "🥁",
	saxophone: "🎷",
	trumpet: "🎺",
	art: "🎨",
	microphone: "🎤",
	headphones: "🎧",
	movie_camera: "🎬",
	car: "🚗",
	taxi: "🚕",
	bus: "🚌",
	train: "🚂",
	airplane: "✈️",
	rocket: "🚀",
	bicycle: "🚲",
	house: "🏠",
	office: "🏢",
	hospital: "🏥",
	school: "🏫",
	hotel: "🏨",
	church: "⛪",
	stadium: "🏟️",
	statue_of_liberty: "🗽",
	fountain: "⛲",
	mountain: "⛰️",
	beach: "🏖️",
	camping: "🏕️",
	sunrise: "🌅",
	cityscape: "🏙️",
	night_with_stars: "🌃",
	bulb: "💡",
	flashlight: "🔦",
	battery: "🔋",
	electric_plug: "🔌",
	computer: "💻",
	keyboard: "⌨️",
	desktop: "🖥️",
	printer: "🖨️",
	lock: "🔒",
	key: "🔑",
	wrench: "🔧",
	hammer: "🔨",
	gear: "⚙️",
	scissors: "✂️",
	envelope: "✉️",
	email: "📧",
	inbox_tray: "📥",
	package: "📦",
	calendar: "📅",
	bookmark: "🔖",
	books: "📚",
	notebook: "📓",
	pencil2: "✏️",
	paintbrush: "🖌️",
	crayon: "🖍️",
	paperclip: "📎",
	pushpin: "📌",
	heart: "❤️",
	orange_heart: "🧡",
	yellow_heart: "💛",
	green_heart: "💚",
	blue_heart: "💙",
	purple_heart: "💜",
	black_heart: "🖤",
	broken_heart: "💔",
	star2: "🌟",
	sparkles: "✨",
	zap: "⚡",
	checkmark: "✔️",
	cross: "❌",
	question: "❓",
	exclamation: "❗",
	plus: "➕",
	minus: "➖",
	divide: "➗",
	hash: "#️⃣",
	arrow_right: "➡️",
	arrow_left: "⬅️",
	recycle: "♻️",
	tm: "™️",
	copyright: "©️",
	registered: "®️"
};
function s() {
	let e = {};
	for (let [t, n] of Object.entries(o)) e[t] = {
		id: t,
		name: t.replace(/_/g, " "),
		native: n,
		keywords: [t]
	};
	return e;
}
a.emojis = s();
var c = null;
function l(e) {
	if (!e?.categories?.length || !e?.emojis || Object.keys(e.emojis).length === 0) return null;
	let t = [{
		id: "frequent",
		name: i.frequent,
		emojis: []
	}, ...e.categories.filter((e) => e.id !== "flags").map((e) => ({
		id: e.id,
		name: i[e.id] ?? e.id.replace(/_/g, " "),
		emojis: e.emojis || []
	}))], n = {};
	for (let [t, i] of Object.entries(e.emojis)) {
		let e = i.skins?.[0]?.native ?? "";
		if (!e) continue;
		let a = {
			id: i.id,
			name: i.name ?? t,
			native: e,
			keywords: i.keywords
		};
		r(a) || (n[t] = a);
	}
	return {
		categories: t,
		emojis: n
	};
}
async function u() {
	try {
		let e = "/App_Plugins/TipTapEmoji/emoji-picker-data.json".replace(/\/{2,}/g, "/"), t = await fetch(e, { cache: "force-cache" });
		if (!t.ok) throw Error(`HTTP ${t.status}`);
		let n = l(await t.json());
		if (n) return n;
	} catch {}
	return a;
}
async function d() {
	return c ??= u(), c;
}
function f() {
	d();
}
//#endregion
//#region src/emoji/constants.ts
var p = "Umb.Modal.Tiptap.Emoji", m = "umbraco-tiptap-emoji-recent";
//#endregion
export { f as a, d as i, p as n, r, m as t };
