const fetchDataId = async(url,id)=> {
    try {
        const data = await fetch(`${url}/${id}`).then(res => res.json())
        return {
            data,
            isLoading: false,
            error: false
        }
    } catch (err) {
        return {
            error: true
        }
    }
}

export default fetchDataId