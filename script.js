async function get() {
    const response = await fetch(
        "https://corsproxy.io/?https://github-readme-stats.vercel.app/api?username=roblnet13"
    );
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const tcText = doc.querySelector(
        "svg > g:nth-child(6) > svg > g:nth-child(2) > g > text:nth-child(1)"
    ).innerHTML;
    const ts = doc.querySelector(
        "svg > g:nth-child(6) > svg > g:nth-child(1) > g > text:nth-child(2)"
    ).innerHTML;
    const tc = doc.querySelector(
        "svg > g:nth-child(6) > svg > g:nth-child(2) > g > text:nth-child(2)"
    ).innerHTML;
    const tp = doc.querySelector(
        "svg > g:nth-child(6) > svg > g:nth-child(3) > g > text:nth-child(2)"
    ).innerHTML;
    const ti = doc.querySelector(
        "svg > g:nth-child(6) > svg > g:nth-child(4) > g > text:nth-child(2)"
    ).innerHTML;
    const ct = doc.querySelector(
        "svg > g:nth-child(6) > svg > g:nth-child(5) > g > text:nth-child(2)"
    ).innerHTML;

    document.querySelector("#ts").innerHTML = "Total Stars Earned: " + ts;
    document.querySelector("#tc").innerHTML = tcText + " " + tc;
    document.querySelector("#tp").innerHTML = "Total PRs: " + tp;
    document.querySelector("#ti").innerHTML = "Total Issues: " + ti;
    document.querySelector("#ct").innerHTML = "Contributed to (last year): " + ct;
}
get();
