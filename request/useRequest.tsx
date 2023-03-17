import useSwr from 'swr'

const baseUrl = '/api/rest/v4'

export const useRequest = (path, parameters) => {
    if (!path) {
        throw new Error('Path is required')
    }

    const url = parameters ? baseUrl + path + '?' + parameters : baseUrl + path

    console.log("useRequest", url);

    const { data, error} = useSwr(url,
                                   {  revalidateIfStale: false,
                                      revalidateOnFocus: false,
                                      revalidateOnReconnect: false,
                                      revalidateOnMount: true, // If false, undefined data gets cached against the key.
                                      dedupingInterval: 3_600_000, // dont duplicate a request w/ same key for 1hr
                                   } )

    return { data, error }
}