import styles from "../../../styles/module/Register.module.css";
import AnimatedBackground from "../register/components/AnimatedBackground";
import {Player} from "@lottiefiles/react-lottie-player";
import LottieOffline from "../../../../public/lottiefiles/offline.json";
import Head from "next/head";

const OfflineView = () => {

    return (
        <main>
            <Head>
                <title>MyAnimeApp - Offline</title>
            </Head>
            <div className={styles.register}>
                <AnimatedBackground />

                <div className="rounded absolute top-1/3 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                    <div className="xl:flex items-center">
                        <Player className="hidden xl:block mr-5" autoplay style={{width: "300px", height: "300px"}} loop src={LottieOffline} />

                        <div className="ml-5">
                            <h1 className="font-bebas tracking-wider navLink text-7xl pt-1 uppercase">
                                <span className="text-red-500">My</span>
                                <span className="text-gray-100">anime</span>
                            </h1>
                            <h2 className="text-3xl text-red-400 font-avenir mt-3">
                                You are currently offline.
                            </h2>

                            <div className="text-md text-gray-300 font-avenir mt-1">
                                <p>
                                    No secure connection could be established to our servers. <br />
                                    Please try to reconnect to your internet and then reload this page.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default OfflineView