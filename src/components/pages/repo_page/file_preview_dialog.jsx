import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

const FilePreviewDialog = ({ isOpen, onClose, fileURL }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        {/* Dialog trigger can be left empty as we're controlling it via parent */}
      </DialogTrigger>
      <DialogContent className="w-full md:min-w-[80vw]  h-[80vh] p-2 md:p-6 ">
        <div className="w-full h-full px-2">
          <iframe
            className="overflow-auto h-full w-full"
            src={fileURL}
          ></iframe>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilePreviewDialog;
