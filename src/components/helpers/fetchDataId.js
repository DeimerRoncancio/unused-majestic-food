const fetchDataId = (url, id) => {
  return fetch(`${url}/${id}`)
    .then(data => data)
}

export default fetchDataId
