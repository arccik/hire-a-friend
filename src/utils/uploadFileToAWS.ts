export default async function uploadFileToAWS({
  fields,
  file,
  url,
}: {
  fields: Record<string, string>;
  file: File;
  url: string;
}): Promise<string | void> {
  const formData = new FormData();
  Object.entries({ ...fields, file }).forEach(([key, value]) => {
    formData.append(key, value);
  });
  try {
    const upload = await fetch(url, {
      method: "POST",
      body: formData,
    });
    if (upload.ok && fields.key) {
      console.log("UPLOAD SUCCESS, file: ", fields);
      return url + fields.key; // return like to uploaded file
    }
  } catch (error) {
    console.log("Was not able to upload file", error);
  }
}
