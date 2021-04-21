import Head from "next/head";
import Navbar from "../layout/common/navbar/Navbar";

export default function Home() {

    return (
        <div className="min-h-screen w-full">
            <Head>
                <title>MyAnimeAPP</title>
                <link rel="icon" href={"/favicon.ico"} />
            </Head>

            <main>
                <Navbar />
            </main>
        </div>
    )
}