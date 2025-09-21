import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, File, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  title: string;
  description: string;
  acceptedFormats: string[];
  onFileSelect: (file: File) => void;
  className?: string;
}

export const FileUpload = ({ 
  title, 
  description, 
  acceptedFormats, 
  onFileSelect, 
  className 
}: FileUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setUploadedFile(file);
    setUploadStatus("uploading");
    
    // Simulate upload process
    setTimeout(() => {
      setUploadStatus("success");
      onFileSelect(file);
    }, 2000);
  };

  const getStatusIcon = () => {
    switch (uploadStatus) {
      case "uploading":
        return <Upload className="h-8 w-8 text-primary animate-pulse" />;
      case "success":
        return <CheckCircle className="h-8 w-8 text-risk-low" />;
      case "error":
        return <AlertCircle className="h-8 w-8 text-risk-high" />;
      default:
        return <Upload className="h-8 w-8 text-muted-foreground" />;
    }
  };

  const getStatusMessage = () => {
    switch (uploadStatus) {
      case "uploading":
        return "Processing file...";
      case "success":
        return `Successfully uploaded: ${uploadedFile?.name}`;
      case "error":
        return "Upload failed. Please try again.";
      default:
        return "Drag and drop your file here, or click to browse";
    }
  };

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent>
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer",
            dragActive 
              ? "border-primary bg-primary/5" 
              : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50",
            uploadStatus === "success" && "border-risk-low bg-risk-low-light"
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            className="hidden"
            id={`file-upload-${title}`}
            accept={acceptedFormats.join(",")}
            onChange={handleFileInput}
          />
          <label htmlFor={`file-upload-${title}`} className="cursor-pointer">
            <div className="flex flex-col items-center gap-4">
              {getStatusIcon()}
              <div>
                <p className="text-sm font-medium">{getStatusMessage()}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Supported formats: {acceptedFormats.join(", ")}
                </p>
              </div>
              {uploadStatus === "idle" && (
                <Button variant="outline" size="sm">
                  Choose File
                </Button>
              )}
            </div>
          </label>
        </div>
        
        {uploadStatus === "success" && uploadedFile && (
          <div className="mt-4 p-3 bg-risk-low-light rounded-lg border border-risk-low">
            <div className="flex items-center gap-2">
              <File className="h-4 w-4 text-risk-low" />
              <span className="text-sm font-medium">{uploadedFile.name}</span>
              <span className="text-xs text-muted-foreground">
                ({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};