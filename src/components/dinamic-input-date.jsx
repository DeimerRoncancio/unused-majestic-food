import EditButton from '@/components/edit-button'

export default function DinamicInputDate({show,clickEdit,value,submit,inputDateName,inputDateValue,putValues}) {
    return (
        <>
            <div className='flex'>
                <h3 className='mr-2 text-green-800'>Fecha de entrega</h3>
                <EditButton onClick={clickEdit} textColor="green-800" hoverTextColor="green-900" />
            </div>
            <h3 className={`text-sm ${show ? 'hidden' : ''}`}>
                {value}
            </h3>
            <form onSubmit={submit} className={`${show ? '' : 'hidden'}`}>
                <input type="datetime-local" name={inputDateName} value={inputDateValue} onChange={putValues} />
                <button>Update</button>
            </form>
        </>
    )
}