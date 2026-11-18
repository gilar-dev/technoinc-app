import { getAPIUrl } from "./database"

export function goToRandomArticle() {
    fetch(`${getAPIUrl()}/api/v1/wiki?field=random`)
    .then(async (data) => {
        const result = await data.json();
        if (result["status"] === "Success") window.location.href = "/wiki/" + result["data"];
    })
    .catch((error) => console.error(error));
}