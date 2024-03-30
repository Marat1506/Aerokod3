
const base_api = "https://dynamic-filter.aerokod.ru/api/v1/flats"


export async function getFats() {

    try {
        const response = await fetch("https://dynamic-filter.aerokod.ru/api/v1/flats", {
            method: 'GET',
            headers: {
                accept: 'application/json'
            }
        });
        const data = await response.json();
        console.log("data = ", data)
        return data
    } catch (error) {
        console.error(error);
        return [];
    }
}


export async function getFilterSquareFats(min: number, max: number) {
    try {
        const url = new URL("https://dynamic-filter.aerokod.ru/api/v1/flats");
        url.searchParams.append("f[square][min]", `${min}`);
        url.searchParams.append("f[square][max]", `${max}`);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                accept: 'application/json'
            }
        });
        const data = await response.json();
        console.log("data = ", data);
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}
export async function getFilterPriceFats(min: number, max: number) {
    try {
        const url = new URL("https://dynamic-filter.aerokod.ru/api/v1/flats");
        url.searchParams.append("f[price][min]", `${min}`);
        url.searchParams.append("f[price][max]", `${max}`);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                accept: 'application/json'
            }
        });
        const data = await response.json();
        console.log("data = ", data);
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}



export async function getFilterFats(filters: any) {
    try {
        const url = new URL("https://dynamic-filter.aerokod.ru/api/v1/flats");
        

        for (const key in filters) {
            
            if (Array.isArray(filters[key])) {
               
                filters[key].forEach((value: any) => {
                    url.searchParams.append(`${key}[]`, value);
                });
            } else {
               
                url.searchParams.append(key, filters[key]);
            }
        }

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                accept: 'application/json'
            }
        });
        const data = await response.json();
        console.log("data = ", data);
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

