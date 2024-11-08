import useSwr from 'swr';

class CustomError extends Error {
  status: number;
  info: any;

  constructor(message: string, status: number, info: any) {
    super(message);
    this.status = status;
    this.info = info;
  }
}

const baseUrl = '/api/rest/v4';

export const useRequest = (path: string, parameters: string | null = null) => {
    if (!path) {
        throw new Error('Path is required');
    }

    const delim = path.includes('?') ? '&' : '?';
    const url = parameters ? baseUrl + path + delim + parameters : baseUrl + path;
    console.log("SWR URL >>>> ", url);
    const { data, error} = useSwr(url,
                                   {  revalidateIfStale: false,
                                      revalidateOnFocus: false,
                                      revalidateOnReconnect: false,
                                      revalidateOnMount: true, // If false, undefined data gets cached against the key.
                                      dedupingInterval: 3_600_000, // dont duplicate a request w/ same key for 1hr
                                   });
    return { data, error };
};

export const useRequestPost = (path:string, body:any, accessToken:string) => {
    if (!path) {
        throw new Error('Path is required')
    }

    const url = baseUrl + path;
    const { data, error} = useSwr(url, async url => {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body),
            })

            if (!response.ok) {
                let info = await response.json();
                const error = new CustomError('An error occurred while fetching the data.',response.status, info);
                throw error;
            }

            return response.json();
        })

    let result = data;
    return { result, error}
};