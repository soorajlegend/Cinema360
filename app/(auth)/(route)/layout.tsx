import Logo from "../_components/logo"

export default function AuthLayput({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className="h-full flex flex-col gap-y-5 justify-center items-center">
            <Logo />
            {children}
        </div>
    )
}