import Link from 'next/link'

export const metadata = {
    title: 'About'
}

export default function AboutLayout({ children }) {
    return (
        <>
            <nav>
                <h2>MavBar</h2>
                <ul>
                    <li>
                        <Link href='/about'>Home</Link>
                    </li>
                    <li>
                        <Link href='/about/other-about'>About</Link>
                    </li>
                </ul>
            </nav>
            {children}
        </>
    )
}