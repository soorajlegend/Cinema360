import { WifiOff } from "lucide-react"

interface OfflineProps {
    username: string
}
const OfflineVideo = ({ username }: OfflineProps) => {
    return (
        <div className="h-full flex flex-col space-y-4 justify-center items-center text-muted-foreground capitalize">
            <WifiOff className="h-10 w-10" />
            <p>{username} is offline</p>
        </div>
    )
}

export default OfflineVideo