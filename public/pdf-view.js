// Inline resume PDF viewer using pdf.js (loaded from CDN, PDF fetched same-origin).
import * as pdfjsLib from "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.min.mjs";

const container = document.getElementById("pdf-viewer");

if (container) {
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.worker.min.mjs";

  const dpr = window.devicePixelRatio || 1;

  try {
    const pdf = await pdfjsLib.getDocument("../resume.pdf").promise;
    container.replaceChildren();

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const base = page.getViewport({ scale: 1 });
      const cssWidth = Math.min(container.clientWidth, 860);
      const viewport = page.getViewport({ scale: (cssWidth / base.width) * dpr });

      const canvas = document.createElement("canvas");
      canvas.className = "pdf-page";
      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      canvas.style.width = `${cssWidth}px`;

      await page.render({
        canvasContext: canvas.getContext("2d"),
        viewport,
      }).promise;

      container.appendChild(canvas);
    }
  } catch (err) {
    // Keep the fallback link visible if rendering fails.
    if (!container.querySelector(".pdf-fallback")) {
      const p = document.createElement("p");
      p.className = "pdf-fallback";
      p.innerHTML = 'Something went wrong rendering the PDF. <a href="../resume.pdf">Download resume.pdf</a> instead.';
      container.appendChild(p);
    }
    console.error("PDF viewer failed:", err);
  }
}
