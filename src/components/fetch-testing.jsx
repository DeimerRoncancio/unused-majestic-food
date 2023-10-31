"use client"

export default function FetchTesting() {

    const fetching = async(evt)=> {
        evt.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/pedidos",{
                method: 'POST',
                headers: {"content-type":"application/json"},
                body: JSON.stringify({
                    nombre:"Deimer"
                })
            });
            console.log(response);
        } catch(err) {
            console.log(err);
        }
    }
    
    const callFetch = async() => {
        fetching();
    }

    return (
        <>
            <form onSubmit={fetching}>
                <button>
                    Click
                </button> 
            </form>
        </>
    )
}
