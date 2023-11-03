import PlatePresentation from '@/components/plate-presentation'

export default async function Pedidos({params}) {
    const getData = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/pedidos/${id}`)
            const res = await response.json();
            return res;
        } catch (err) {
            console.log(err);
        }
    }

    const data = await getData(params.id);

    return (
        <>
            <div className="w-full h-[70px] bg-[#3da443] absolute z-0"></div>
            <div className="z-20">
                <h2>Holaaa {data.description}</h2>
            </div>
            <PlatePresentation />
        </>
    )
}
