import { useState } from "react";

export function useImagePreview() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  function generatePreview(file: File | Blob) {
    const reader = new FileReader();

    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };

    reader.readAsDataURL(file);
  }

  return { previewUrl, generatePreview };
}
