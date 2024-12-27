export const convertFileToBase64 = async (file: File): Promise<string> => {
  const reader = new FileReader();

  return new Promise<string>((resolve, reject) => {
    reader.onload = () => {
      if (reader.result) {
        resolve(reader.result.toString());
      } else {
        reject('FileReader did not return a result.');
      }
    };

    reader.onerror = (error) => reject(`Error reading file: ${error}`);

    reader.readAsDataURL(file);
  });
};
