import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

const FilePreviewDialog = ({ isOpen, onClose, fileExtension, fileURL }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        {/* Dialog trigger can be left empty as we're controlling it via parent */}
      </DialogTrigger>
      <DialogContent className="w-full md:min-w-[80vw] p-2 md:p-6 overflow-hidden">
        <div className="w-full h-full">
          <ScrollArea className="w-full max-h-[85vh] md:max-h-[95vh] overflow-y-auto rounded-md border p-2 md:p-4">
            <div className="w-full h-full">
              {fileExtension === "pdf" && (
                <div className="w-full h-full">
                  <iframe
                    src={fileURL}
                    title="File Preview"
                    width="100%"
                    height="100%"
                    className="h-[60vh] md:h-[85vh]"
                  />
                </div>
              )}
              {(fileExtension === "png" ||
                fileExtension === "jpeg" ||
                fileExtension === "jpg" ||
                fileExtension === "jfif") && (
                <div className="w-full h-full flex justify-center items-center">
                  <img
                    src={fileURL}
                    className="max-w-full max-h-[60vh] md:max-h-[85vh] object-contain"
                    alt="Preview"
                  />
                </div>
              )}
              {fileExtension === "docx" && (
                <div
                  className="w-full h-full text-sm md:text-base"
                  dangerouslySetInnerHTML={{ __html: fileURL }}
                />
              )}
              {fileExtension === "txt" && (
                <pre
                  className="text-xs md:text-sm whitespace-pre-wrap break-words"
                  style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
                >
                  {fileURL}
                </pre>
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilePreviewDialog;
