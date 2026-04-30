import React, { useRef, useState } from "react";
import { toJpeg } from "html-to-image";
import jsPDF from "jspdf";

export default function App() {
  const ref = useRef();

  const [title, setTitle] = useState("FRESH");
  const [hook, setHook] = useState(
    "What starts as a promising connection quickly turns into a nightmare."
  );

  const [story, setStory] = useState(
    "After quitting dating apps, Noa meets Steve, a charming man who seems different. Their spontaneous weekend getaway feels like the start of something real—until unsettling truths begin to surface."
  );

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
    });

    const pdf = new jsPDF({ unit: "px", format: [600, 750] });
    pdf.addImage(dataUrl, "JPEG", 0, 0, 600, 750);
    pdf.save("movie-card.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
      <div
        ref={ref}
        className="w-[600px] h-[750px] bg-[#F2EFE9] shadow-xl relative overflow-hidden"
      >
        {/* GRAIN */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {/* MAIN GRID */}
        <div className="grid grid-cols-[220px_1fr] gap-5 p-6 h-[80%]">
          
          {/* FILM STRIP */}
          <div className="flex flex-col gap-3 border-l-8 border-black border-r-8 border-black pl-2 pr-2">
            {[0, 1, 2].map((i) => (
              <label
                key={i}
                className="flex-1 border-4 border-black relative cursor-pointer overflow-hidden"
              >
                {images[i] ? (
                  <img
                    src={images[i]}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-xs text-gray-500">
                    CLICK TO UPLOAD
                  </div>
                )}

                {/* film holes */}
                <div className="absolute left-[-10px] top-0 h-full flex flex-col justify-between py-2">
                  {[...Array(6)].map((_, idx) => (
                    <div key={idx} className="w-2 h-2 bg-black" />
                  ))}
                </div>

                <input
                  type="file"
                  hidden
                  onChange={(e) =>
                    handleUpload(i, e.target.files[0])
                  }
                />
              </label>
            ))}
          </div>

          {/* RIGHT CONTENT */}
          <div className="flex flex-col gap-4">
            <div className="text-xs tracking-widest">
              MOVIE OVERVIEW
            </div>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-6xl font-bold text-[#8B2E16] bg-transparent outline-none"
            />

            <div className="text-sm">
              2022 • THRILLER / HORROR • 114 MIN
            </div>

            <div>
              <div className="text-[#8B2E16] font-bold">
                HOOK LINE
              </div>
              <textarea
                value={hook}
                onChange={(e) => setHook(e.target.value)}
                className="w-full bg-transparent outline-none text-sm"
              />
            </div>

            <div>
              <div className="text-[#8B2E16] font-bold">
                STORY PREVIEW
              </div>
              <textarea
                value={story}
                onChange={(e) => setStory(e.target.value)}
                className="w-full bg-transparent outline-none text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <ul className="text-sm list-disc ml-4">
                <li>Strong performances</li>
                <li>Tense atmosphere</li>
                <li>Unexpected twists</li>
                <li>Social commentary</li>
              </ul>

              <div className="flex flex-wrap gap-2">
                {[
                  "DARK",
                  "INTENSE",
                  "TWISTED",
                  "PSYCHOLOGICAL",
                  "SLOW BURN",
                ].map((v) => (
                  <span
                    key={v}
                    className="border px-2 py-1 text-xs rounded-full"
                  >
                    {v}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* TORN EDGE */}
        <div
          className="absolute bottom-[110px] w-full h-6"
          style={{
            background: "#F2EFE9",
            clipPath:
              "polygon(0 40%, 5% 60%, 10% 50%, 15% 70%, 20% 40%, 25% 60%, 30% 45%, 35% 65%, 40% 50%, 45% 70%, 50% 40%, 55% 60%, 60% 50%, 65% 70%, 70% 45%, 75% 65%, 80% 50%, 85% 70%, 90% 45%, 95% 60%, 100% 40%, 100% 100%, 0 100%)",
          }}
        />

        {/* BOTTOM */}
        <div className="absolute bottom-0 w-full p-6 grid grid-cols-3 text-center">
          <div>
            <div className="text-xs">DIRECTED BY</div>
            <div className="text-[#8B2E16] font-bold">
              MIMI CAVE
            </div>
          </div>

          <div>
            <div className="text-xs">RATING</div>
            ★★★★☆
          </div>

          <div>
            <div className="text-xs">REWATCH</div>
            ★★★☆☆
          </div>
        </div>

        {/* LOGO */}
        <img
          src="/logo.png"
          className="absolute bottom-4 right-4 w-20 opacity-90"
        />
      </div>

      {/* BUTTONS */}
      <div className="fixed bottom-6 flex gap-4">
        <button
          onClick={downloadJPEG}
          className="bg-black text-white px-4 py-2 rounded"
        >
          JPEG
        </button>

        <button
          onClick={downloadPDF}
          className="bg-[#8B2E16] text-white px-4 py-2 rounded"
        >
          PDF
        </button>
      </div>
    </div>
  );
}      pixelRatio: 2,
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
