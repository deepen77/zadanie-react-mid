import { useEffect, useRef, useState } from "react";
import { IFormValues } from "../../../AppTypes/AppTypes.type";

interface IDropZone {
  formValues: IFormValues;
  setFormValues: (value: IFormValues) => void;
}

const DropZone: React.FC<IDropZone> = ({ formValues, setFormValues }) => {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  function handleChange(e: any) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      for (let i = 0; i < e.target.files["length"]; i++) {
        setFiles((prevState) => [...prevState, e.target.files[i]]);
      }
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      for (let i = 0; i < e.dataTransfer.files["length"]; i++) {
        setFiles((prevState) => [...prevState, e.dataTransfer.files[i]]);
      }
    }
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function handleDragEnter(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function removeFile(_fileName: string, idx: number) {
    const newArr = [...files];
    newArr.splice(idx, 1);
    setFiles([]);
    setFiles(newArr);
  }

  function openFileExplorer() {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.click();
    }
  }

  useEffect(() => {
    setFormValues({ ...formValues, files: files[0]?.name });
  }, [files]);

  return (
    <div>
      <label className="block text-sm font-semibold leading-6 text-textColor">
        Photo
      </label>

      <div className="flex items-center justify-center ">
        <form
          className={`${
            dragActive ? "bg-activeBackroundColor" : "bg-defaultBackroundColor"
          }  p-4 rounded-lg  h-[8rem] text-center flex flex-col items-center justify-center w-full border-defaultBorderColor border-2`}
          onDragEnter={handleDragEnter}
          onSubmit={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
        >
          {/* this input element allows us to select files for upload. We make it hidden so we can activate it when the user clicks select files */}
          <input
            placeholder="fileInput"
            className="hidden"
            ref={inputRef}
            type="file"
            multiple={true}
            onChange={handleChange}
            accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
          />

          {files.length === 0 ? (
            <p>
              <span
                className="font-bold text-secondaryTextColor cursor-pointer"
                onClick={openFileExplorer}
              >
                <u>Upload a file</u>
              </span>{" "}
              <span className="text-[#898DA9] text-sm hidden sm:inline ">
                or drag and drop
              </span>
            </p>
          ) : (
            <div>
              {files.map((file, idx: number) => (
                <div key={idx} className="flex-row space-x-5">
                  <span className="text-[15px]">{file.name}</span>
                  <span
                    className="@apply h-[15px] w-[15px] text-[10px] bg-textColor inline-block text-center text-[white] rounded-full cursor-pointer"
                    onClick={() => removeFile(file.name, idx)}
                  >
                    {" "}
                    X
                  </span>
                </div>
              ))}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default DropZone;
