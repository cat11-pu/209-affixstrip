// ui.js：操作面板与视图（原生 DOM，无弹窗）
import { render } from "./app.js";

export function mount(spec, parts) {
  parts.log.textContent = "文本长度 " + String(spec.text || "").length + "，前缀 " + spec.prefix + " 后缀 " + spec.suffix + "。";

  function draw() {
    let view = null;
    try {
      view = render(spec);
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
      parts.log.textContent = "跑不动：" + String(error && error.message ? error.message : error);
      return;
    }
    parts.out.textContent = JSON.stringify(view, null, 1);
    parts.stage.textContent = "";
    const row = document.createElement("div");
    row.className = "row";
    const head = document.createElement("span");
    head.textContent = "剥完";
    row.appendChild(head);
    const mark = document.createElement("span");
    mark.className = "chip ok";
    mark.textContent = view.body === "" ? "（空）" : view.body;
    row.appendChild(mark);
    parts.stage.appendChild(row);
    const row2 = document.createElement("div");
    row2.className = "row";
    row2.textContent = "原长度 " + view.original + "，剥离后 " + view.length + "，剥掉 " + view.removed;
    parts.stage.appendChild(row2);
    parts.legend.textContent = "前缀是否命中 " + view.prefix_hit + "，后缀是否命中 " + view.suffix_hit;
    parts.log.textContent = "拼回是否一致 " + view.restored;
  }

  const runButton = document.createElement("button");
  runButton.className = "primary";
  runButton.textContent = "剥前后缀";
  runButton.addEventListener("click", draw);
  parts.controls.appendChild(runButton);

  const addButton = document.createElement("button");
  addButton.textContent = "末尾加一个字符";
  addButton.addEventListener("click", function () {
    spec.text = String(spec.text || "") + "z";
    draw();
  });
  parts.controls.appendChild(addButton);

  const dropButton = document.createElement("button");
  dropButton.textContent = "去掉最后一个字符";
  dropButton.addEventListener("click", function () {
    spec.text = String(spec.text || "").slice(0, -1);
    draw();
  });
  parts.controls.appendChild(dropButton);

  const label = document.createElement("label");
  label.textContent = "试一段文本";
  parts.controls.appendChild(label);

  const box = document.createElement("input");
  box.type = "text";
  box.value = "xxcoreyy";
  box.addEventListener("input", function () {
    try {
      const view = render(Object.assign({}, spec, { text: box.value }));
      parts.out.textContent = box.value + " 剥完是 " + (view.body === "" ? "空" : view.body);
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
    }
  });
  parts.controls.appendChild(box);

  const readButton = document.createElement("button");
  readButton.textContent = "只看剥掉几个字符";
  readButton.addEventListener("click", function () {
    const view = render(spec);
    parts.out.textContent = "剥掉 " + view.removed + " 个字符";
  });
  parts.controls.appendChild(readButton);

  draw();
}
