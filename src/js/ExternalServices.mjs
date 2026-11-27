const baseURL = import.meta.env.VITE_SERVER_URL;
const postURL = "https://wdd330-backend-osp8.onrender.com/checkout";

function convertToJson(res) {
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Bad Response");
    }
}

export default class ExternalServices {
    async getData(category) {
        const response = await fetch(`${baseURL}products/search/${category}`);
        const data = await convertToJson(response);
        return data.Result;
    }

    async findProductById(id) {
        const response = await fetch(`${baseURL}product/${id}`);
        const product = await convertToJson(response);
        return product.Result;
    }


    async checkout(payload) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }
        const response = await fetch(postURL, options)
        // console.log("IM the response", response)
        return await convertToJson(response)

    }


}
