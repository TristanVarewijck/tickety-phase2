import Link from "next/link";

const NoAcces = () => {
    return <div>
        <h1>You have no acces to this page</h1>
        <p>Please contact a project developer / manager for information why...</p>
        <Link href="/">Back to Home</Link>
    </div>
}

export default NoAcces;