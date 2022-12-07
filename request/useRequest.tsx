import useSwr from 'swr'

const baseUrl = '/api/rest/v4'

export const useRequest = (path, parameters) => {
    if (!path) {
        throw new Error('Path is required')
    }

    const url = parameters ? baseUrl + path + '?' + parameters : baseUrl + path
    const { data, error} = useSwr(url)

    console.log("call url", url)
    return { data, error }
}