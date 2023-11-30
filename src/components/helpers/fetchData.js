const fetchData = async(url)=> {
    try {
        const data = await fetch(`${url}`).then(res => res.json());
        return {
            data,
            isLoading: false,
            error: false
        }
    } catch(err) {
        return {
            data,
            isLoading: false,
            error: true
        }
    }
}

export default fetchData