import { useState, useEffect } from "react";

//If user goes back a page, you don't want to call the entire API again
const localCache = {}

export const useBreedList = (animal) => {
    const [breedList, setBreedList] = useState([]);
    const [status, setStatus] = useState("unloaded");

    useEffect(() => {
        if(!animal) {
            setBreedList([]);
        } else if (localCache[animal]) {
            setBreedList(localCache[animal])
        } else {
            requestBreedList();
        }

        async function requestBreedList() {
            setBreedList([]);
            setStatus("loading");

            const res = await fetch(`http://pets-v2.dev-apis.com/breeds?animal=${animal}`);
            const json = await res.json();
            localCache[animal] = json.breeds || [];
            setBreedList(localCache[animal]);
            setStatus('loaded');

        }

    }, [animal])

    return [breedList, status];
}
