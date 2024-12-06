export async function upload(file: File) {
  try {
    const fileBuffer = await file.arrayBuffer();
    const base64File = Buffer.from(fileBuffer).toString("base64");

    const formDataToUpload = new FormData();
    formDataToUpload.append("file", `data:${file.type};base64,${base64File}`);
    formDataToUpload.append(
      "upload_preset",
      process.env.CLOUDINARY_UPLOAD_PRESET!
    );
    formDataToUpload.append("upload_preset", "themirzaliyev-store");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formDataToUpload,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return errorData;
    }

    const cloudinaryData = await response.json();
    return cloudinaryData.secure_url;
  } catch (error) {
    return (error as Error).message;
  }
}
