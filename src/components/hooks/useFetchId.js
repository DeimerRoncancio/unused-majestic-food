export const useFetchId = async ({id}) => {
    try {
        const data = await fetch(`http://localhost:5000/pedidos/${id}`).then(res => res.json())
        console.log(data)
        return data
    } catch (err) {
        console.log(err);
    }
}
