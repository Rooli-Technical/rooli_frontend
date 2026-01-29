"use client";

import * as React from "react";
import { Upload, X, FileText, Film, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import mediaService from "@/services/media.service";
import { toast } from "sonner";
import useToast from "../app-toast";
import { useMutation } from "@tanstack/react-query";
import { UploadedFileType } from "@/types";
import { ImageCropper } from "./image-cropper";

interface MediaUploadProps {
  value?: string[];
  onChange?: (value: string[]) => void;
  workspaceId: string;
  maxFiles?: number;
}

export function MediaUpload({
  value = [],
  onChange,
  workspaceId,
  maxFiles = 5,
}: MediaUploadProps) {
  const showToast = useToast();

  const [previews, setPreviews] = React.useState<UploadedFileType[]>([]);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [croppingQueue, setCroppingQueue] = React.useState<
    { src: string; file: File }[]
  >([]);
  const [currentCroppingIndex, setCurrentCroppingIndex] =
    React.useState<number>(0);
  const [pendingFiles, setPendingFiles] = React.useState<File[]>([]);

  const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8MB
  const MAX_FILES = maxFiles || 5;

  const { isPending, mutateAsync } = useMutation({
    mutationKey: ["upload-medias"],
    mutationFn: async (files: File[]) => {
      const response = await mediaService.uploadMultipleMedia(
        workspaceId,
        files,
        "",
      );
      return response?.data;
    },
    onSuccess: (data: UploadedFileType[]) => {
      const newMediaIds = data.map((item: any) => item.id);
      const updatedValue = [...value, ...newMediaIds];
      if (onChange) {
        onChange(updatedValue);
      }
      setPreviews((prev) => [...prev, ...data]);
      showToast("Media uploaded successfully.", "success");
    },
    onError: (error: any) => {
      showToast(
        error.message ||
          error?.response?.data?.message ||
          "Failed to upload media.",
        "error",
      );
    },
  });

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    if (value.length + files.length > MAX_FILES) {
      showToast(
        `You can only upload a maximum of ${MAX_FILES} files.`,
        "error",
      );
      return;
    }

    // Validate file sizes and types
    const imagesToCrop: { src: string; file: File }[] = [];
    const otherFiles: File[] = [];

    for (const file of files) {
      if (file.size > MAX_FILE_SIZE) {
        showToast(`${file.name} exceeds the 8MB size limit.`, "error");
        continue;
      }

      if (file.type.startsWith("image/")) {
        const src = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
        imagesToCrop.push({ src, file });
      } else {
        otherFiles.push(file);
      }
    }

    if (imagesToCrop.length > 0) {
      setPendingFiles(otherFiles);
      setCroppingQueue(imagesToCrop);
      setCurrentCroppingIndex(0);
    } else if (otherFiles.length > 0) {
      mutateAsync(otherFiles);
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleCropComplete = (croppedFile: File) => {
    const updatedPending = [...pendingFiles, croppedFile];
    const nextIndex = currentCroppingIndex + 1;

    if (nextIndex < croppingQueue.length) {
      setPendingFiles(updatedPending);
      setCurrentCroppingIndex(nextIndex);
    } else {
      mutateAsync(updatedPending);
      resetCroppingState();
    }
  };

  const handleCropCancel = () => {
    const nextIndex = currentCroppingIndex + 1;

    if (nextIndex < croppingQueue.length) {
      setCurrentCroppingIndex(nextIndex);
    } else {
      if (pendingFiles.length > 0) {
        mutateAsync(pendingFiles);
      }
      resetCroppingState();
    }
  };

  const resetCroppingState = () => {
    setCroppingQueue([]);
    setCurrentCroppingIndex(0);
    setPendingFiles([]);
  };

  const handleDelete = async (id: string) => {
    try {
      await mediaService.deleteMedia(workspaceId, id);
      const updatedValue = value.filter((vId) => vId !== id);
      if (onChange) {
        onChange(updatedValue);
      }
      setPreviews((prev) => prev.filter((p) => p.id !== id));
      toast.success("Media deleted successfully.");
    } catch (error: any) {
      toast.error(error.message || "Failed to delete media.");
    }
  };

  const currentCroppingImage = croppingQueue[currentCroppingIndex];

  return (
    <div className="space-y-4">
      <div className=" w-full   gap-3">
        {value.length < MAX_FILES && (
          <div
            onClick={() => !isPending && fileInputRef.current?.click()}
            className={cn(
              "flex bg-input flex-col items-center justify-center w-full h-[100px]  rounded-lg border border-dashed border-primary bg hover:border-primary cursor-pointer transition-all",
              isPending && "cursor-not-allowed opacity-50",
            )}
          >
            {isPending ? (
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            ) : (
              <>
                <Upload className="w-8 h-8 text-muted-foreground" />
                <span className="text-xs text-muted-foreground mt-2">
                  Upload Media
                </span>
              </>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              multiple
              accept="image/*,video/*"
              className="hidden"
            />
          </div>
        )}
        <div className="w-full flex flex-row flex-wrap gap-4 mt-3">
          {previews.map((file) => (
            <div
              key={file.id}
              className="relative group w-[100px] h-[100px] rounded-lg border border-border overflow-hidden bg-accent"
            >
              {file.mimeType.startsWith("image") ? (
                <img
                  src={file.url}
                  alt="Uploaded media"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-slate-900">
                  <Film className="w-8 h-8 text-white" />
                </div>
              )}
              <button
                type="button"
                onClick={() => handleDelete(file.id)}
                className="absolute top-1 right-1 p-1 bg-destructive text-white rounded-full  transition-opacity z-1-30"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
      <p className="text-[10px] text-muted-foreground">
        Max {MAX_FILES} files. Images and videos up to 8MB each.
      </p>

      {currentCroppingImage && (
        <ImageCropper
          imageSrc={currentCroppingImage.src}
          open={!!currentCroppingImage}
          onCropComplete={handleCropComplete}
          onCancel={handleCropCancel}
        />
      )}
    </div>
  );
}
