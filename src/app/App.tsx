import React, { useState } from "react";
import { useDXFLoader } from "@/hooks/useDXFLoader";
import { DXFCanvas } from "@/components/DXFCanvas";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

function App() {
  const [dxfContent, setDxfContent] = useState("");
  const parsedData = useDXFLoader(dxfContent);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      setDxfContent(evt.target?.result as string);
    };
    reader.readAsText(file);
  };

  return (
    // <div className="p-4">
    //   <input type="file" accept=".dxf" onChange={handleFileChange} />
    //   {parsedData && <DXFCanvas dxfData={parsedData} />}
    // </div>

    <React.Fragment>
      <RouterProvider router={router}></RouterProvider>
    </React.Fragment>
  );
}

export default App;
