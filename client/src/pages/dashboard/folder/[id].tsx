import { useRouter } from "next/dist/client/router"
import { FolderProps } from "../../../utils/types"

const CurrentFolder = () => {

    const router = useRouter()
    console.log(router.query)

    return (
        <>
            
        </>
    )
}

export default CurrentFolder