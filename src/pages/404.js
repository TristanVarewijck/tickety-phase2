import Link from "next/link"

const Custom404 = () => {
    return <div>
        <h1>Page not found</h1>
        <Link href="/"><p>Back to homepage</p></Link>
    </div>
}

export default Custom404;