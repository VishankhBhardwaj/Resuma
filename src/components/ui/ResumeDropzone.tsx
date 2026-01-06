"use client";

import {
  Dropzone,
  DropZoneArea,
  DropzoneDescription,
  DropzoneFileList,
  DropzoneFileListItem,
  DropzoneFileMessage,
  DropzoneTrigger,
  DropzoneMessage,
  DropzoneRemoveFile,
  DropzoneRetryFile,
  InfiniteProgress,
  useDropzone,
} from "@/components/ui/dropzone";

export default function ResumeDropzone() {
  const dropzone = useDropzone<string>({
    onDropFile: async (file) => {
      // 🔹 REQUIRED LOGIC
      await new Promise((r) => setTimeout(r, 1000));

      return {
        status: "success",
        result: "uploaded",
      };
    },

    validation: {
      maxFiles: 1,
      maxSize: 5 * 1024 * 1024,
      accept: {
        "application/pdf": [".pdf"],
        "text/plain": [".txt"],
      },
    },
  });

  return (
    <Dropzone {...dropzone}>
      <DropzoneDescription>
        These will be uploaded to the server.
      </DropzoneDescription>

      <DropzoneMessage />

      <DropZoneArea className="border-dashed p-6">
        <DropzoneTrigger>
          Click here or drag and drop files to upload them
        </DropzoneTrigger>

        <DropzoneFileList>
          {dropzone.fileStatuses.map((file) => (
            <DropzoneFileListItem key={file.id} file={file}>
              <InfiniteProgress status={file.status} />

              <div className="flex gap-2">
                <DropzoneRetryFile>Retry</DropzoneRetryFile>
                <DropzoneRemoveFile>Remove</DropzoneRemoveFile>
              </div>

              <DropzoneFileMessage />
            </DropzoneFileListItem>
          ))}
        </DropzoneFileList>
      </DropZoneArea>
    </Dropzone>
  );
}
