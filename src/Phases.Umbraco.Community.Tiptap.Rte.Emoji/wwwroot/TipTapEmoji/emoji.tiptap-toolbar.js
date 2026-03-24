import { a as e, n as t } from "./constants.js";
import { UMB_MODAL_MANAGER_CONTEXT as n, UmbModalToken as r } from "@umbraco-cms/backoffice/modal";
import { UmbTiptapToolbarElementApiBase as i } from "@umbraco-cms/backoffice/tiptap";
//#region src/emoji/emoji-modal.token.ts
var a = new r(t, { modal: { type: "dialog" } });
//#endregion
//#region src/emoji/emoji.tiptap-toolbar.ts
e();
var o = class extends i {
	async execute(e) {
		if (!e) return;
		let t = await this.getContext(n);
		if (!t) return;
		let r = t.open(this, a);
		if (!r) return;
		let i = await r.onSubmit().catch(() => void 0);
		if (i == null || i === "" || typeof i != "string") return;
		let o = String(i);
		setTimeout(() => {
			e.chain().focus().insertContent(o).run();
		}, 0);
	}
};
//#endregion
export { o as default };
