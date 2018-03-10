export const getAll = () => {
  return fetch('https://swapi.co/api/planets/', {
    cache: 'force-cache',
  }).then(response => response.json())
}



export const getFromUrl = (url) => {
  return fetch(url, {
    cache: 'force-cache'
  }).then(response => response.json())
}

export const get = (id) => {
  return fetch(`https://swapi.co/api/planets/${id}`).then((response) => {
      if(response.statusText === 'OK') {
          return response.json();
      }
      throw new Error('Network response was not ok.');
  })
}

// export const update = (id, student) => {
//   return fetch(`http://localhost:1337/students/${id}`, { 
//       method: 'PUT', 
//       body: JSON.stringify(student),
//       mode: 'cors', 
//       headers: new Headers({
//           'Content-Type': 'application/json',
//       })
//   }).then((response) => {
//       if(response.statusText === 'OK') {
//           return response.json();
//       }
//       throw new Error('Network response was not ok.');
//   })
// }

// export const del = (id) => {
//   return fetch(`http://localhost:1337/students/${id}`, { 
//       method: 'DELETE',
//   }).then((response) => {
//       if(response.statusText === 'OK') {
//           return response.json();
//       }
//       throw new Error('Network response was not ok.');
//   })
// }

// export const add = (student) => {
//   return fetch('http://localhost:1337/students/add', { 
//       method: 'POST',
//       body: JSON.stringify(student),
//       mode: 'cors', 
//       headers: new Headers({
//           'Content-Type': 'application/json',
//       })
//   }).then((response) => {
//       if(response.statusText === 'OK') {
//           return response.json();
//       }
//       throw new Error('Network response was not ok.');
//   })
// }