export const formDataImage = (inputData) => {
    let formData = new FormData();
    Object.keys(inputData).forEach(fieldName => {
        formData.append(fieldName, inputData[fieldName]);
    })
    return formData
}