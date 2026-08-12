import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(new URL("..", import.meta.url).pathname);
const inputPath = path.join(root, "index.html");
const distPath = path.join(root, "dist");
const outputPath = path.join(distPath, "tilda-chakra-t123.html");
const githubBase = "https://ny06981-lang.github.io/humn-chakra-tantra-dao/";

const html = await readFile(inputPath, "utf8");
const style = html.match(/<style>([\s\S]*?)<\/style>/)?.[1] ?? "";
const body = html.match(/<body>([\s\S]*?)<\/body>/)?.[1] ?? "";

if (!style || !body) {
  throw new Error("Could not extract style/body from index.html");
}

const rewriteAssets = (value) =>
  value
    .replaceAll('url("assets/', `url("${githubBase}assets/`)
    .replaceAll("url('assets/", `url('${githubBase}assets/`)
    .replaceAll('src="assets/', `src="${githubBase}assets/`)
    .replaceAll("src='assets/", `src='${githubBase}assets/`);

const embeddedStyle = rewriteAssets(style);
const embeddedBody = rewriteAssets(body);

const tildaHtml = `<style>
/* Human Chakra retreat injected via Tilda T123. */
.t-rec:not(:has(.chakra-tilda-root)),
.r:not(:has(.chakra-tilda-root)) { display: none !important; }
.chakra-tilda-root,
.chakra-tilda-root * { box-sizing: border-box; }
${embeddedStyle}
</style>
<div class="chakra-tilda-root">
${embeddedBody}
</div>
<script>
(function () {
  function activateHumanRetreatPage() {
    var root = document.querySelector('.chakra-tilda-root');
    if (!root) return;
    var hostRecord = root.closest('.t-rec, .r');
    if (hostRecord) hostRecord.classList.add('human-retreat-record');
    document.querySelectorAll('.t-rec, .r').forEach(function (record) {
      if (record !== hostRecord && !record.contains(root)) {
        record.style.setProperty('display', 'none', 'important');
      }
    });
  }
  activateHumanRetreatPage();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', activateHumanRetreatPage);
  }
  window.addEventListener('load', activateHumanRetreatPage);
})();
</script>
`;

await mkdir(distPath, { recursive: true });
await writeFile(outputPath, tildaHtml);
console.log(outputPath);
