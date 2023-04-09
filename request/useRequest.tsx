import useSwr from 'swr';

const baseUrl = '/api/rest/v4'

export const useRequest = (path, parameters) => {
    if (!path) {
        throw new Error('Path is required')
    }

    const url = parameters ? baseUrl + path + '?' + parameters : baseUrl + path
    const { data, error} = useSwr(url,
                                   {  revalidateIfStale: false,
                                      revalidateOnFocus: false,
                                      revalidateOnReconnect: false,
                                      revalidateOnMount: true, // If false, undefined data gets cached against the key.
                                      dedupingInterval: 3_600_000, // dont duplicate a request w/ same key for 1hr
                                   } )

    return { data, error }
}

export const useRequestPost = (path, body, accessToken) => {
    if (!path) {
        throw new Error('Path is required')
    }

    const url = baseUrl + path
    const { data, error} = useSwr(url, async url => {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: body
            })

            if (!response.ok) {
                const error = new Error('An error occurred while fetching the data.');
                error.info = await response.json();
                error.status = response.status;
                throw error;
            }

            return response.json();
        })

    let result = data;
    return { result, error}

}