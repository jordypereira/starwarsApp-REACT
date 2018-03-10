export const get = (id) => {
  return fetch(`https://swapi.co/api/people/${id}`, {
    cache: 'force-cache',
  }).then(response => response.json())
}

export const getFromUrl = (url) => {
  return fetch(`${url}`, {
    cache: 'force-cache',
  }).then(response => response.json())
}