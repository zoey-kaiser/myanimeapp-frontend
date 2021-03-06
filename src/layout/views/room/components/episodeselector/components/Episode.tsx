import {AiOutlinePlayCircle} from "react-icons/ai"
import {roomStore} from "../../../../../../app/room/RoomFacade"
import styles from "../../../../../../styles/module/ShowPopup.module.css"

const Episode = (props) => {
    const playEpisode = () => {
        roomStore.setEpisode(roomStore.popupSelectedSeason, props.index)
        roomStore.toggleEpisodePopup()
    }

    return (
        <div className="flex items-center mb-4 rounded">
            <div className="mr-4">
                <div onClick={() => playEpisode()}
                     className={"w-24 h-16 md:h-28 md:w-48 bg-gray-900 rounded bg-cover relative " + styles.episodeSelector}
                     style={{backgroundImage: `url(${props.episode.thumbnail})`}}>
                    <button>
                        <div className={"rounded w-24 h-16 md:h-28 md:w-48 " + styles.overlay}>
                                    <span>
                                         <AiOutlinePlayCircle color="white" size="3rem"/>
                                    </span>
                        </div>
                    </button>
                </div>
            </div>

            <div className="w-full">
                <h4 className="text-md pr-3 md:p-0 md:text-2xl text-white font-bold font-avenir">{props.episode.name}</h4>
                <h5 className="hidden md:block text-md text-gray-100 font-avenir">
                    {props.episode.shortDescription}
                </h5>
            </div>
            <div className="mr-5 hidden lg:block">
                <p className="lg:text-right text-md text-gray-400">
                    {Math.round(props.episode.length / 60)}m
                </p>
            </div>
        </div>
    )
}

export default Episode