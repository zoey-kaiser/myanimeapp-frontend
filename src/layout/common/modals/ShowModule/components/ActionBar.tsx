import React, {useState} from "react"
import {observer} from "mobx-react-lite";
import {FaCheck, FaPlus, FaUsers} from "react-icons/fa";
import {BiLoaderAlt} from "react-icons/bi";
import Link from "next/link"
import {useRouter} from "next/router";
import {roomService} from "../../../../../app/room/RoomFacade";
import {userStore} from "../../../../../app/auth/AuthFacade";
import {showPopupStore} from "../../../../../app/show/ShowFacade";
import {playerStore} from "../../../../../app/player/PlayerFacade";
import styles from "../../../../../styles/module/ShowPopup.module.css"

const ActionBar = observer(() => {
    const [groupWatch, setGroupWatch] = useState("false")
    const router = useRouter()

    // Open a new watchRoom
    const openRoom = () => {
        setGroupWatch("loading")

        roomService.createRoom(userStore.user, showPopupStore.show.name, (response) => {
            if (response) {
                showPopupStore.close()
                router.push("/room/" + response).then(() => {
                })
            }
        })
    }

    // Play the selected Episode
    const playEpisode = (seasonIndex: number, episodeIndex: number) => {
        playerStore.setShow(showPopupStore.show)
        playerStore.changeEpisode(seasonIndex, episodeIndex)
        showPopupStore.close()
    }

    // If the User is not logged In render this
    if (!userStore.isLoggedIn) {
        return (
            <div className={styles.showInfo}>
                <img className="select-none max-h-24 max-w-md md:max-h-40 mx-auto" src={showPopupStore.show.logo}
                     alt=""/>
                <div className="my-1 md:my-5 h-1 rounded">
                </div>
                {showPopupStore.show.seasons.length > 0 && (
                    <div className="flex">
                        <Link href="/watch">
                            <a onClick={() => playEpisode(0, 0)}
                               className="bg-red-500 hover:bg-red-400 py-2 px-8 text-2xl rounded text-white font-oswald uppercase min-h select-none">
                                Play
                            </a>
                        </Link>
                        <button disabled
                                className="bg-gray-800 cursor-not-allowed px-3 ml-4 text-2xl rounded text-white font-oswald uppercase focus:outline-none">
                            <FaPlus/>
                        </button>
                        <button disabled
                                className="bg-gray-800 cursor-not-allowed px-3 ml-4 text-2xl rounded text-white font-oswald uppercase focus:outline-none">
                            <FaUsers/>
                        </button>
                    </div>
                )}
            </div>
        )
    }

    // Get the player progress of the User
    let watchedProgress = userStore.getWatchedShowProgress(showPopupStore.show, false)
    let watchedProgressTotal = userStore.getWatchedShowProgress(showPopupStore.show, true)

    // If the User is LoggedIn Show this
    return (
        <div className={styles.showInfo}>
            <img className="select-none max-h-24 md:max-h-40 max-w-md mx-auto" src={showPopupStore.show.logo}
                 alt=""/>
            <div className={watchedProgressTotal + watchedProgress <= 0 ? "hidden md:block h-1 my-5" : "hidden md:block h-1 bg-gray-500 rounded my-5"}>
                <div style={{width: watchedProgress + "%"}} className="bg-red-500 h-1 rounded relative"/>
            </div>
            {showPopupStore.show.seasons.length > 0 && (
                <div className="flex">
                    <Link href="/watch">
                        <a className="bg-red-500 hover:bg-red-400 py-2 px-8 text-2xl rounded text-white font-oswald uppercase min-h select-none"
                           onClick={() => playEpisode(userStore.getLastWatchedEpisode(showPopupStore.show).seasonIndex, userStore.getLastWatchedEpisode(showPopupStore.show).episodeIndex)}>
                            {watchedProgressTotal <= 0 ? "Play" : "Resume"}
                        </a>
                    </Link>
                    <button
                        onClick={() => userStore.toggleWatchLater(showPopupStore.show, () => {
                        })}
                        className="bg-gray-800 hover:bg-gray-600 px-3 ml-4 text-2xl rounded text-white font-oswald uppercase has-tooltip focus:outline-none">
                        {userStore.isInWatchLater(showPopupStore.show.name) ? (
                            <div>
                                <FaCheck/>
                                <span className="tooltip text-2xl p-5">
                             Remove from list
                            </span>
                            </div>
                        ) : (
                            <div>
                                <FaPlus/>
                                <span className="tooltip text-2xl p-5">
                                Add to Watch later
                            </span>
                            </div>
                        )}
                    </button>
                    <button onClick={() => openRoom()}
                            className="bg-gray-800 hover:bg-gray-600 px-3 ml-4 text-2xl rounded text-white font-oswald uppercase has-tooltip focus:outline-none">
                        {groupWatch === "loading" ? (
                            <BiLoaderAlt className="animate-spin"/>
                        ) : (
                            <FaUsers/>
                        )}
                        <span className="tooltip text-2xl p-5">
                                New Group Watch
                            </span>
                    </button>
                </div>
            )}
        </div>
    )
})

export default ActionBar