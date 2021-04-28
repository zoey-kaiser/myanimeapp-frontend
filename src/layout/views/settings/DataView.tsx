import SettingsSidebar from "./components/SettingsSidebar";
import React from "react";
import Link from "next/link"

const DataView = () => {

    const handle = (input) => {
        alert(input)
    }

    return (
        <div className="container xl:w-2/3 3xl:w-1/2 mx-auto" style={{minHeight: "70vh"}}>

            <main className="bg-gray-700 rounded-xl -mt-8 md:-mt-20 2xl:-mt-28 relative">
                <div className="lg:flex">
                    <SettingsSidebar page="data" />

                    <div className="w-full">
                        <div className="p-8">

                            <h1 className="font-avenir text-2xl text-white">
                                Our data policy:
                            </h1>
                            <p className="text-gray-300 font-avenir mt-2">
                                We collect only the minimum amount of information needed to power our service. This includes the following information: <br/>
                                <i>Username, Avatar, Email (optional), Join date, Watch Later list, Watched Shows</i><br />
                                If you would like to opt out of certain features you can disable them below. If you do not want us to store any data on you, you may delete your account.
                            </p>
                            <Link href="#">
                                <a className="text-blue-400 font-avenir">
                                    Read full policy
                                </a>
                            </Link>

                            <hr className="my-6 border-gray-400" />

                            <div className="my-4 flex items-center">
                                <button className="bg-blue-500 px-6 mr-3 mt-4 py-3 rounded-md font-avenir text-white focus:outline-none">
                                    Clear Watch Later list
                                </button>
                                <button className="bg-green-500 px-6 mr-3 mt-4 py-3 rounded-md font-avenir text-white focus:outline-none">
                                    Clear Watch history
                                </button>
                                <button className="bg-red-500 px-6 mt-4 py-3 rounded-md font-avenir text-white focus:outline-none">
                                    Delete Account
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </div>
    )
}

export default DataView