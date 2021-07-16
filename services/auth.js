import { dataURLtoFile, toDataURL } from "../lib/urlToFile";

const defaultUrlImage = "https://res.cloudinary.com/dvrqeszak/image/upload/v1624706217/default_mprgsi.png";
export const createUser = async (email, password, username) => {

    const dataUrl = await toDataURL(defaultUrlImage);
    const image = await dataURLtoFile(dataUrl, 'default.png');

    const dataToServer = formDataImage({ email, password, image, username });
    const response = await fetch('/api/auth/signup', {
        method: 'POST',
        body: dataToServer,
    });

    const data = await response.json();
    console.log(data);
    if (!response.ok) {
        console.log(data.message);
        throw new Error(data.message || 'Something went wrong');
    }

    return data;
}

function formDataImage(inputData) {
    let formData = new FormData();
    Object.keys(inputData).forEach(fieldName => {
        formData.append(fieldName, inputData[fieldName]);
    })
    return formData
}