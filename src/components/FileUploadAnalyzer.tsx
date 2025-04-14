import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from '@/hooks/use-toast';
import { Loader2, UploadCloud, FileVideo } from 'lucide-react';
import { cn } from '@/lib/utils';
import { analyzeMedia } from '@/utils/apiClient';

export function FileUploadAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    isReal: boolean;
    details?: string;
  } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setResult(null);

    const isVideo = selectedFile.type.startsWith('video/');
    if (!isVideo) {
      toast({
        title: "Invalid file type",
        description: "Please upload a video file (MP4, AVI, MOV)",
        variant: "destructive"
      });
      return;
    }

    if (selectedFile.size > 100 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Maximum file size is 100MB",
        variant: "destructive"
      });
      return;
    }

    setFile(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setPreview(url);
  };

  const analyzeVideo = async () => {
    if (!file) return;

    setIsAnalyzing(true);

    try {
      console.log('Starting analysis for file:', file.name);
      const analysisResult = await analyzeMedia(file, 'video');

      const isReal = analysisResult.prediction === 'REAL';

      setResult({
        isReal,
        details: isReal ? 'Average fake score is below 0.5' : 'Average fake score is above 0.5'
      });

      toast({
        title: "Analysis Complete",
        description: `This video is ${isReal ? 'likely real' : 'likely fake'}.`,
        variant: isReal ? "default" : "destructive"
      });

    } catch (error) {
      console.error('Analysis failed:', error);
      toast({
        title: "Analysis failed",
        description: "An error occurred during analysis. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Card className="glass-card w-full max-w-2xl mx-auto overflow-hidden">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Video Analysis</CardTitle>
        <CardDescription>Upload MP4, AVI, or MOV files (max 100MB)</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50/50 transition-all hover:bg-gray-50/80 hover:border-deepfake">
          <input 
            type="file"
            id="video-upload"
            accept="video/*"
            onChange={handleFileChange}
            className="hidden"
          />
          {!preview ? (
            <label htmlFor="video-upload" className="cursor-pointer flex flex-col items-center justify-center">
              <UploadCloud className="h-12 w-12 text-gray-400 mb-2" />
              <span className="text-sm font-medium text-gray-700">Click to upload video</span>
              <span className="text-xs text-gray-500 mt-1">or drag and drop</span>
            </label>
          ) : (
            <div className="w-full">
              <video 
                src={preview} 
                controls 
                className="rounded-md max-h-64 mx-auto"
              />
              <div className="mt-4 text-center">
                <span className="text-sm font-medium text-gray-700 flex items-center justify-center gap-1.5">
                  <FileVideo className="h-4 w-4" />
                  {file?.name}
                </span>
                <button 
                  className="text-xs text-deepfake mt-1 hover:underline"
                  onClick={() => {
                    setFile(null);
                    setPreview(null);
                    setResult(null);
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          )}
        </div>

        {preview && !isAnalyzing && !result && (
          <div className="text-center">
            <Button 
              className="deepfake-button"
              onClick={analyzeVideo}
            >
              Start Analysis
            </Button>
          </div>
        )}

        {isAnalyzing && (
          <div className="text-center p-4">
            <div className="inline-flex flex-col items-center">
              <Loader2 className="h-8 w-8 animate-spin text-deepfake" />
              <p className="mt-2 text-sm font-medium">Analyzing video for deepfakes...</p>
              <div className="w-60 mt-4 bg-gray-200 rounded-full h-2.5">
                <div className="bg-deepfake h-2.5 rounded-full animate-pulse" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>
        )}

        {result && (
          <div className={cn(
            "rounded-lg p-4 text-center border animate-zoom-in",
            result.isReal ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
          )}>
            <h3 className={cn(
              "text-xl font-bold mb-1",
              result.isReal ? "text-green-700" : "text-red-700"
            )}>
              {result.isReal ? "Authentic Video" : "Potential Deepfake Detected"}
            </h3>

            <p className="text-sm text-gray-600">{result.details}</p>
          </div>
        )}
      </CardContent>

      <CardFooter className="bg-gray-50/50 text-xs text-gray-500 justify-center">
        All processing is done securely. Files are not stored or shared.
      </CardFooter>
    </Card>
  );
}
