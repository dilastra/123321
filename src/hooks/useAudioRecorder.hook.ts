import { useAsyncEffect } from "ahooks";
import { useEffect, useState } from "react";
//@ts-ignore
import MediaRecorder from "opus-media-recorder";

const workerOptions = {
  encoderWorkerFactory: function () {
    return new Worker(process.env.PUBLIC_URL + "/encoderWorker.umd.js");
  },
  OggOpusEncoderWasmPath: process.env.PUBLIC_URL + "/OggOpusEncoder.wasm",
  WebMOpusEncoderWasmPath: process.env.PUBLIC_URL + "/WebMOpusEncoder.wasm",
};

export const useAudioRecorder: () => {
  startRecord: () => void;
  stopRecord: () => void;
  result: Blob | undefined;
} = () => {
  const [result, setResult] = useState<Blob>();
  const [chunks, setChunks] = useState<Blob[]>([]);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();
  useAsyncEffect(async () => {
    const stream = await navigator?.mediaDevices?.getUserMedia({
      audio: true,
    });
    const mediaRecorder = new MediaRecorder(
      stream,
      { mimeType: "audio/ogg" },
      workerOptions
    );
    setMediaRecorder(mediaRecorder);

    mediaRecorder.ondataavailable = (e: BlobEvent) => {
      setChunks((prev) => {
        return [...prev, e.data];
      });
    };
  }, []);

  useEffect(() => {
    if (chunks.length > 0) {
      const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
      setResult(blob);
    }
  }, [chunks]);

  const startRecord = () => {
    if (mediaRecorder) {
      mediaRecorder.start();
    }
  };

  const stopRecord = () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
      setChunks([]);
    }
  };

  return { startRecord, stopRecord, result };
};
