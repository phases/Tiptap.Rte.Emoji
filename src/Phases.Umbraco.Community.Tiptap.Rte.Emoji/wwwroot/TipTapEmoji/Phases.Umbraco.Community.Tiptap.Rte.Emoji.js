import { a as e, n as t } from "./constants.js";
//#region src/emoji/emoji-manifests.ts
var n = [{
	type: "tiptapToolbarExtension",
	kind: "button",
	alias: "Demo.Tiptap.Emoji",
	name: "Emoji Toolbar Button",
	js: () => import("./emoji.tiptap-toolbar.js"),
	meta: {
		alias: "emoji",
		label: "Emoji",
		icon: "icon-smiley"
	}
}, {
	type: "modal",
	alias: t,
	name: "Emoji Picker Modal",
	element: () => import("./emoji-modal.element.js")
}];
//#endregion
//#region src/manifest.ts
e();
var r = [...n];
//#endregion
export { r as manifests };
