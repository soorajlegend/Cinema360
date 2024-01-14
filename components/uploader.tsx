"use client"

import { UploadDropzone } from "@/lib/uploadthing"
import { ourFileRouter } from "@/app/api/uploadthing/core"
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface FileUploadProps {
    onChange: (url: string) => void;
    endpoint: keyof typeof ourFileRouter,
    onComplete?: () => void;
};

export const FileUploader = ({
    onChange,
    endpoint,
    onComplete
}: FileUploadProps) => {

    const router = useRouter();

    return (
        <UploadDropzone
            className="ut-label:text-lg ut-label:text-blue-500 ut-button:ut-uploading:text-blue-600 ut-button:bg-blue-600 upload-indicator ut-allowed-content:text-muted-foreground ut-upload-icon:text-blue-500 "
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0]?.url);
                router.refresh();
                if (onComplete) {
                    onComplete();
                }
            }}
            onUploadError={(error: Error) => {
                toast.error(`${error?.message}`)
            }}
        />
    )
}