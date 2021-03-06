import RoomView from "../../layout/views/room/RoomView";
import {observer} from "mobx-react-lite";
import mainStore from "../../layout/common/store/MainStore";
import Preloader from "../../layout/common/PreloaderComponent";
import SEOModel from "../../app/utils/models/SEOModel";
import SEO from "../../layout/common/SEO";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {RoomModel, roomStore} from "../../app/room/RoomFacade";
import {toast} from "react-toastify";
import {api, userStore} from "../../app/auth/AuthFacade";
import LoginPage from "../../layout/views/login/LoginPage";

// @ts-ignore
const Room = observer(({data}) => {

    const router = useRouter()
    const {roomName} = router.query

    useEffect(() => {
        if (mainStore.loaded) {
            roomStore.openConnection(roomName, (status) => {
                if (!status) {
                    router.push("/").then(() => {
                        toast.error("The room was not found.")
                    })
                }
            })
        }

        return function cleanup() {
            roomStore.disconnect()
        }
    }, [mainStore.loaded])

    const SEOData = new SEOModel(
        data.owner.user.name + " invited you to watch " + data.roomShow.show.displayName + " together!",
        "#1E90FF",
        data.owner.user.name + " invited you to join their room and watch " + data.roomShow.show.displayName + "!",
        data.roomShow.show.background,
        "https://anime.necrocloud.eu"
    )

    return (
        <div className="min-h-screen w-full">
            <SEO data={SEOData}/>

            {mainStore.loaded ? (
                <main>
                    {userStore.isLoggedIn ? (
                        <RoomView/>
                    ) : (
                        <LoginPage/>
                    )}
                </main>
            ) : (
                <Preloader/>
            )}

        </div>
    )
})

// This gets called on every request
export async function getServerSideProps(context) {
    let data: RoomModel = null
    const {roomName} = context.query

    await api.get("/room/find/" + roomName)
        .then((response) => {
            data = response.data
        })

    return {props: {data}}
}

export default Room