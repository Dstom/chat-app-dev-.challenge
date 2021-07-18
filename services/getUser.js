import { getSession } from "next-auth/client";
import { formDataImage } from "../lib/formDataImage"

export const getUser = async (email) => {
    //const dataUrl = await toDataURL(defaultUrlImage);
    // const image = await dataURLtoFile(dataUrl, 'default.png');

    // const dataToServer = formDataImage({ image });
    const response = await fetch('http://localhost:3000/api/users/editAvatar', {
        method: 'POST',
        body: JSON.stringify({email: email})
    });

    const data = await response.json();
    /*  if (data.ok) {
          const session = await getSession();
          session.user.image = data.avatar; 
          console.log(session);
      }*/



    return data;
}