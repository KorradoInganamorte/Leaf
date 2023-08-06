import React from "react"
import { Link } from "react-router-dom"

function Header() {
    return (
        <div className="header flex justify-end w-full absolute top-0">
            <Link className="py-5 pr-20 text-black text-3xl font-bold">Support the author</Link>
        </div>
    )
}

export default Header