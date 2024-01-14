import { Loader } from "lucide-react"

interface LoadingVideoProps {
    label: string
}
const LoadingVideo = ({ label }: LoadingVideoProps) => {
    return (
        <div className="h-full flex flex-col space-y-4 justify-center items-center text-muted-foreground">
            <Loader className="h-10 w-10 animate-spin" />
            <p>{label}</p>
        </div>
    )
}

export default LoadingVideo