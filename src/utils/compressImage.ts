import Compressor from "compressorjs";

const IMAGE_QUALITY = 0.6; // 60% of original quality

export default function compressImage(
  file: File,
): Promise<File | Blob | Error> {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      quality: IMAGE_QUALITY,
      success: resolve,
      error: reject,
    });
  });
}
