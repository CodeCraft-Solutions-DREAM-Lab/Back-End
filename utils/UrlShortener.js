import axios from "axios";

export default async function shortenURL(longUrl) {
    try {
        const response = await axios.get(
            `http://tinyurl.com/api-create.php?url=${longUrl}`
        );
        return response.data;
    } catch (error) {
        console.error("Error shortening URL:", error);
        // En caso de que haya un error, devolvemos la URL original
        return longUrl;
    }
}
