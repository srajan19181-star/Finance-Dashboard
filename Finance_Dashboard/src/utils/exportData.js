/**
 * Export transactions as a downloadable CSV file.
 * @param {Array}  transactions - filtered list to export
 * @param {string} filename     - filename without extension
 */
export function exportAsCSV(transactions, filename = "transactions") {
  if (!transactions.length) return;

  const headers = ["Date", "Title", "Category", "Type", "Amount (INR)"];

  const rows = transactions.map((t) => [
    t.date,
    // Escape double-quotes inside the title
    `"${String(t.title).replace(/"/g, '""')}"`,
    `"${String(t.category).replace(/"/g, '""')}"`,
    t.type,
    t.amount,
  ]);

  const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  triggerDownload(csv, `${filename}.csv`, "text/csv;charset=utf-8;");
}

/**
 * Export transactions as a downloadable JSON file.
 * @param {Array}  transactions - filtered list to export
 * @param {string} filename     - filename without extension
 */
export function exportAsJSON(transactions, filename = "transactions") {
  if (!transactions.length) return;
  const json = JSON.stringify(transactions, null, 2);
  triggerDownload(json, `${filename}.json`, "application/json");
}

/** Internal helper — creates a temporary <a> tag and clicks it */
function triggerDownload(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
