import { getAPIUrl } from "./database"

export function goToRandomArticle() {
    fetch(`${getAPIUrl()}/api/v1/wiki?random=true`)
    .then(async (data) => {
        const result = await data.json();
        window.location.href = "/wiki/" + result["article"];
    })
    .catch((error) => console.error(error));
}