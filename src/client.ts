export const baseUrl = 'https://localhost:7052/';

export const postJsonAsync = (resource: string, payload: any)=> 
  fetch(
    baseUrl + resource, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }
    )
    .then((response) => response.json());

export const deleteAsync = (resource: string) =>
  fetch(baseUrl + resource, { method: 'DELETE' });