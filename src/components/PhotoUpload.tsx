import { useImagePreview } from "../hooks/useImagePreview";
import { Avatar, Button, Stack } from "@mui/material";

interface PhotoUploadProps {
    onChange: (file: File | null) => void;
    label?: string;
    initialUrl?: string | null;
}

export function PhotoUpload({ onChange, label = "Choose Photo", initialUrl }: PhotoUploadProps) {
    const { previewUrl, generatePreview } = useImagePreview();

    function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];

        if (!file) return;

        if (file.size > 3 * 1024 * 1024) {
            alert("File size exceeds 3 MB");
            return;
        }
        //added jpg as well
        if (!["image/png", "image/jpeg", "image/jpg", "image/webp"].includes(file.type)) {
            alert("Unsupported file type, please uplaod jpeg or jpg or png or webp");
            return;
        }

        generatePreview(file);
        onChange(file);


    }

    const displayImage = previewUrl || initialUrl || null;

    return (
        <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
                src={displayImage || undefined}
                sx={{ width: 80, height: 80 }}
            />

            <Button variant="outlined" component="label">
                {label}
                <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleFileSelect}
                />
            </Button>
        </Stack>
    );
}
