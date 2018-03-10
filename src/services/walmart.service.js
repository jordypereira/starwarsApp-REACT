// export const getAll = () => {
//   return fetch('http://www.recipepuppy.com/api/').then((response) => {
//       if(response.statusText === 'OK') {
//           return response.json();
//       }
//       throw new Error('Network response was not ok.');
//   })
// }

export const get = () => {
  return fetch(`http://api.walmartlabs.com/v1/items/12417832?format=json&apiKey=2hk4zs8mdydbhf3d94v8wc4d`, {
    mode: 'no-cors',
    headers: new Headers({
        'X-Originating-Ip': '109.131.18.22',
        'content-type': 'application/json',
    })
  })
  .then(response => {
    if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
  })
  .catch(error => console.log('Looks like there was a problem: \n', error));
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