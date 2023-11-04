import PlatePresentation from '@/components/plate-presentation'

export default async function Pedidos({ params }) {
    const getData = async (id) => {
        try {
            return await fetch(`http://localhost:5000/pedidos/${id}`).then(res => res.json())
        } catch (err) {
            console.log(err);
        }
    }

    const data = await getData(params.id);

    return (
        <>
            <div className="w-[110%] h-[90%] bg-[#76ed78] rounded-b-[50%] top-[-100px] left-[-5%] absolute z-0"></div>
            <div className="z-20 p-28 pt-14">
                <div className='w-full flex justify-center'>
                    <div className='w-[610px]'>
                        <h2 className="text-2xl w-[610px]">{data.name}</h2>
                        <h3>Deimer Steven Roncancio</h3>
                        <div className="flex w-full justify-center mt-10">
                            <PlatePresentation orderId={params.id} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
