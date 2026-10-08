import { asset } from "@/lib/assets";

export async function saveExample(
  imageName: string,
  ratio: string,
  format: string,
) {
  const image = new Image();
  image.src = asset(`/images/${imageName}.webp`);
  await image.decode();
  const [x, y] = ratio.split(":").map(Number);
  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = Math.round((1200 * y) / x);
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Image export is unavailable in this browser.");
  const sourceRatio = image.naturalWidth / image.naturalHeight;
  const cropWidth =
    sourceRatio > x / y ? (image.naturalHeight * x) / y : image.naturalWidth;
  const cropHeight =
    sourceRatio > x / y ? image.naturalHeight : (image.naturalWidth * y) / x;
  context.drawImage(
    image,
    (image.naturalWidth - cropWidth) / 2,
    (image.naturalHeight - cropHeight) / 2,
    cropWidth,
    cropHeight,
    0,
    0,
    canvas.width,
    canvas.height,
  );
  const blob = await new Promise<Blob>((resolve, reject) =>
    canvas.toBlob(
      (value) =>
        value
          ? resolve(value)
          : reject(new Error("Could not prepare the example.")),
      format === "PNG" ? "image/png" : "image/jpeg",
      0.92,
    ),
  );
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `prism-${imageName}-${ratio.replace(":", "x")}.${format === "PNG" ? "png" : "jpg"}`;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 2000);
}
