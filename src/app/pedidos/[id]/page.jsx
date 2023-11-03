import PlatePresentation from '@/components/plate-presentation'

export default async function Pedidos({ params }) {
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
            <div className="w-[110%] h-[90%] bg-[#76ed78] rounded-b-[50%] top-[-100px] left-[-5%] absolute z-0"></div>
            <div className="z-20 p-28 pt-14">
                <h2 className="text-2xl">{data.name}</h2>
                <h3>Deimer Steven Roncancio</h3>
                <div className="flex w-full justify-center mt-10">
                    <PlatePresentation />
                </div>
            </div>
        </>
    )
}
