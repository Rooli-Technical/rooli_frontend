"use client";

import * as React from "react";
import Cropper from "react-easy-crop";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import getCroppedImg from "@/lib/crop-image";

interface ImageCropperProps {
  imageSrc: string;
  onCropComplete: (croppedFile: File) => void;
  onCancel: () => void;
  open: boolean;
}

const ASPECT_RATIOS = [
  { label: "1:1", value: 1 / 1 },
  { label: "4:5", value: 4 / 5 },
  { label: "1.91:1", value: 1.91 / 1 },
  { label: "9:16", value: 9 / 16 },
];

export function ImageCropper({
  imageSrc,
  onCropComplete,
  onCancel,
  open,
}: ImageCropperProps) {
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);
  const [aspect, setAspect] = React.useState(ASPECT_RATIOS[0].value);
  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState<any>(null);

  React.useEffect(() => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
  }, [imageSrc]);

  const onCropChange = (crop: { x: number; y: number }) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom: number) => {
    setZoom(zoom);
  };

  const onCropCompleteInternal = React.useCallback(
    (croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  const handleCrop = async () => {
    try {
      const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
      if (croppedBlob) {
        const file = new File([croppedBlob], "cropped-image.jpg", {
          type: "image/jpeg",
        });
        onCropComplete(file);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onCancel()}>
      <DialogContent className="max-w-2xl sm:max-w-3xl h-[80vh] flex flex-col p-0 overflow-hidden">
        <DialogHeader className="p-6 border-b">
          <DialogTitle>Crop Image</DialogTitle>
        </DialogHeader>

        <div className="relative flex-1 bg-slate-900">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={onCropChange}
            onCropComplete={onCropCompleteInternal}
            onZoomChange={onZoomChange}
          />
        </div>

        <DialogFooter className="p-6 border-t flex flex-col gap-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {ASPECT_RATIOS.map((ratio) => (
              <Button
                key={ratio.label}
                variant={aspect === ratio.value ? "default" : "outline"}
                size="sm"
                onClick={() => setAspect(ratio.value)}
              >
                {ratio.label}
              </Button>
            ))}
          </div>

          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button onClick={handleCrop}>Crop & Upload</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
