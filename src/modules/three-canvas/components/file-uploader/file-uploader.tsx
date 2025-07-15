import React, { useRef } from "react";
import styles from "./file-uploader.module.scss";

interface FileUploaderProps {
  onFileSelected: (file: File | null) => void;
  isFileLoading: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onFileSelected,
  isFileLoading,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    onFileSelected(selectedFile);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0] || null;
    onFileSelected(droppedFile);
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
      className={styles.fileUploaderContainer}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        className={styles.fileInput}
        onChange={handleFileChange}
        accept=".dxf"
        disabled={isFileLoading}
      />
      <span className={styles.labelText}>Select a file</span>
    </div>
  );
};

export default FileUploader;
