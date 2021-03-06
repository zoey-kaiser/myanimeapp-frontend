interface UserModel {

    name: string
    avatar: string
    group: string
    joined: number
    token: string
    mail: string
    watchLater: Array<string>
    watchedShows: [
        {
            name: string
            currentEpisode: {
                episodeIndex: number
                seasonIndex: number
                timestamp: number
            }
            seasons: [
                episodes: [
                    timestamp: number
                ]
            ]
        }
    ],
    currentWatchedEpisode: {
        showName: string
        seasonIndex: number
        episodeIndex: number
    }
    settings : Map<string, object>
}

export default UserModel