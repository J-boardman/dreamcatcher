type FetchOptions = {
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
    body: object
    extras?: object
}

export async function handleFetch(url: string, options: Partial<FetchOptions>) {
    try {
        const response = await fetch(url, {
            method: options.method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(options.body),
            ...options.extras
        })
        return [await response.json(), null]
    } catch (error) {
        return [null, error]
    }
}