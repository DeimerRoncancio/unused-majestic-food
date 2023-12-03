import EditButton from '@/components/edit-button'

export default function DinamicTextArea({show,value,clickEdit,areaName,areaValue,putValues,submit}) {
    return (
        <>
            <div className='flex'>
                <h3 className='mt-2 text-green-800 mr-2'>Descripción</h3>
                <EditButton onClick={clickEdit} textColor="green-800" hoverTextColor="green-900" />
            </div>
            <p className={`text-sm ${show ? 'hidden' : ''}`}>{value}</p>
            <form onSubmit={submit} className={`${show ? '' : 'hidden'}`}>
                <textarea name={areaName} value={areaValue}
                    onChange={putValues} placeholder={value}></textarea>
                <button>Update</button>
            </form>
        </>
    )
}