import React, { useRef, useState } from "react";
import { toJpeg } from "html-to-image";
import jsPDF from "jspdf";

export default function App() {
  const ref = useRef();

  const [title, setTitle] = useState("FRESH");
  const [images, setImages] = useState([null, null, null]);

  const handleUpload = (i, file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const copy = [...images];
      copy[i] = reader.result;
      setImages(copy);
    };
    reader.readAsDataURL(file);
  };

  const downloadJPEG = async () => {
    const dataUrl = await toJpeg(ref.current, {
      quality: 1,
      pixelRatio: 2,
      backgroundColor: "#F2EFE9",
    });

    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "card.jpeg";
    a.click();
  };

  const downloadPDF = async () => {
    const dataUrl = await toJpeg(ref.current, {
      quality: 1,
      pixelRatio: 2,
    });

    const pdf = new jsPDF({ unit: "px", format: [600, 750] });
    pdf.addImage(dataUrl, "JPEG", 0, 0, 600, 750);
    pdf.save("card.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-6">
      <div
        ref={ref}
        className="w-[600px] h-[750px] bg-[#F2EFE9] p-6 shadow-xl grid grid-cols-2 gap-4"
      >
        {/* LEFT IMAGES */}
        <div className="flex flex-col gap-3">
          {[0, 1, 2].map((i) => (
            <label key={i} className="flex-1 border-4 border-black cursor-pointer">
              {images[i] ? (
                <img src={images[i]} className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full text-xs">
                  Upload
                </div>
              )}
              <input
                type="file"
                hidden
                onChange={(e) => handleUpload(i, e.target.files[0])}
              />
            </label>
          ))}
        </div>

        {/* RIGHT */}
        <div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-6xl font-bold text-[#8B2E16] w-full bg-transparent outline-none"
          />

          <p className="mt-4 text-sm">
            Editable movie card — now styled correctly.
          </p>
        </div>

        {/* LOGO */}
        <img
          src="/logo.png"
          className="absolute bottom-4 right-4 w-20"
        />
      </div>

      {/* BUTTONS */}
      <div className="fixed bottom-6 flex gap-4">
        <button onClick={downloadJPEG} className="bg-black text-white px-4 py-2">
          JPEG
        </button>
        <button onClick={downloadPDF} className="bg-red-700 text-white px-4 py-2">
          PDF
        </button>
      </div>
    </div>
  );
}
