import React, { useRef, useState } from "react";
import { toJpeg } from "html-to-image";
import jsPDF from "jspdf";

export default function App() {
  const ref = useRef();
  const [title, setTitle] = useState("FRESH");

  const downloadJPEG = async () => {
    const dataUrl = await toJpeg(ref.current, {
      quality: 1,
      pixelRatio: 3,
      backgroundColor: "#F2EFE9",
    });

    const link = document.createElement("a");
    link.download = "movie-card.jpeg";
    link.href = dataUrl;
    link.click();
  };

  const downloadPDF = async () => {
    const dataUrl = await toJpeg(ref.current, {
      quality: 1,
      pixelRatio: 3,
      backgroundColor: "#F2EFE9",
    });

    const pdf = new jsPDF({
      unit: "px",
      format: [600, 750],
    });

    pdf.addImage(dataUrl, "JPEG", 0, 0, 600, 750);
    pdf.save("movie-card.pdf");
  };

  return (
    <div style={{ padding: 20 }}>
      <div
        ref={ref}
        style={{
          width: 600,
          height: 750,
          background: "#F2EFE9",
          padding: 20,
        }}
      >
        <h1 style={{ color: "#8B2E16", fontSize: 60 }}>{title}</h1>
        <p>Clean working version (we'll style again after build works)</p>
        <img src="/logo1.png" width="80" />
      </div>

      <div style={{ marginTop: 20 }}>
        <button onClick={downloadJPEG}>JPEG</button>
        <button onClick={downloadPDF}>PDF</button>
      </div>
    </div>
  );
}
