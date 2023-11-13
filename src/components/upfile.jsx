"use client"

export default function UploadFile() {
    return (
        <div>
            <form>
                <input type="file"
                onChange={(e)=> console.log(e.target.files[0])}></input>
            </form>
            <button>Send</button>
        </div>
    )
}