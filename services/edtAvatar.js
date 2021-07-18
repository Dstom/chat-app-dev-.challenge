import { getSession } from "next-auth/client";
import { formDataImage } from "../lib/formDataImage"

export const editAvatar = async (image) => {

    const dataToServer = formDataImage({ image });
    const response = await fetch('/api/users/editAvatar', {
        method: 'POST',
        body: dataToServer,
    });

    const data = await response.json();
    console.log("response from edit avatar", data);
    
    return data;
}