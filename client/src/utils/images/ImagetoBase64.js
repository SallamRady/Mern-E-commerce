/**
 *
 * @param {*} file uploded file
 * @returns url based 64 for image
 */
export default async function ImagetoBase64(file) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  const data = new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
  });
  return data;
}
