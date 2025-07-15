# `dxf-viewer-react` ⚛️

This is a straightforward example project demonstrating how to display and interact with DXF files in a **React application** using the `dxf-viewer` library. `dxf-viewer` is built on top of **Three.js**, allowing you to harness the power of web-based 3D visualization for technical drawings.

---

## 🚀 Project Goal

The primary goal of this project is to provide an easy-to-understand **starting point** for anyone looking to integrate DXF file viewing capabilities into their React applications. It showcases how to use a custom hook to manage state and interact with the DXF viewer effectively.

---

## 💡 Key Capabilities of `dxf-viewer`

This example project highlights several core features of the `dxf-viewer` library:

- **DXF File Loading & Display**: Effortlessly load and render the content of DXF files directly in the browser.
- **Layer Management**: The ability to **toggle the visibility** of individual layers within the DXF drawing. This lets users focus on specific parts of the drawing as needed.
- **State Handling**: The example includes logic to manage **loading and error states**, providing clear feedback to the user during file operations.
- **Font Support**: `dxf-viewer` supports rendering text within DXF files using provided fonts, ensuring accurate visualization of annotations and labels.

---

## ⚡ Extending with Three.js

One of the most powerful advantages of `dxf-viewer` is that it's built directly on **Three.js**. This means you can **access and extend the underlying Three.js scene** with ease.

In this project, our **`viewerRef.current`** object (which is an instance of `DxfViewerType`) provides direct access to core Three.js components like the **`scene`**, **`camera`**, and **`renderer`**. This opens up a world of possibilities for custom functionality and advanced visualizations:

- **Add custom 3D objects**: For instance, you could overlay your own 3D models onto the existing DXF scene.
- **Perform transformations**: Move, rotate, or scale components within the drawing programmatically.
- **Create custom interactions**: Implement unique mouse or keyboard events to control the scene or specific objects.
- **Adjust rendering**: Modify lighting settings, materials, or apply post-processing effects to enhance the visual experience.

This project serves as a solid foundation for you to explore and develop more complex DXF visualization solutions.

---

## 🛠️ Setup & Run

1.  **Clone** this repository:

    ```bash
    git clone https://github.com/vanthuan52/dxf-viewer-react.git
    cd dxf-viewer-react
    ```

2.  **Install** the dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Start** the application:
    ```bash
    npm start
    # or
    yarn start
    ```
    The application will typically run on `http://localhost:3000` (or another port if 3000 is occupied).

---

## 📄 Code Structure

- **`src/modules/three-canvas/hooks/useDxfViewer.ts`**: This is the main **custom hook** that encapsulates the logic for initializing the `dxf-viewer`, loading files, and managing layers. It provides a clean interface for interacting with the viewer.
- **`src/modules/three-canvas/pages/dxf-viewer-page.tsx`**: This component demonstrates how to utilize the `useDxfViewer` hook within a functional React component to create the user interface for file selection and layer controls.
- **`public/fonts/`**: Contains the font files used by `dxf-viewer` to render text within DXF drawings.

---

## 🤝 Contributing

This project is primarily designed as an example. However, if you have suggestions for improvements or bug fixes, feel free to **open an issue** or **submit a pull request**!

---

## 📜 License

[MIT License]
