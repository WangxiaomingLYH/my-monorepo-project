export function utilsDownloadBlob(blob: Blob, filename?: string) {
    const name = filename || Date.now().toString()
    const url = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement("a"), {
        href: url,
        download: name,
        style: "display: none",
    });
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}