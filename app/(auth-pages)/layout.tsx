export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative overflow-x-hidden z-10 min-w-[100vw] min-h-[100vh]">
            <div className="hidden md:block">
                {/* top left */}
                <span className="absolute -z-10 h-28 w-1/3 bg-gradient-to-t from-pink-500
            top-[30%] left-[5%] -skew-x-12 -skew-y-[20deg] blur-sm
            text-center text-8xl pt-4">
                    2
                </span>
                {/* bottom left */}
                <span className="absolute -z-10 h-28 w-1/3 bg-gradient-to-b from-cyan-700
            top-[calc(30%_+_7rem)] left-[5%] -skew-x-12 -skew-y-[20deg] blur-sm
            text-center text-8xl pt-4 -translate-x-5">
                    7
                </span>
                {/* top right */}
                <span className="absolute -z-10 h-28 w-1/3 bg-gradient-to-t from-pink-500
            top-[30%] right-[5%] skew-x-12 skew-y-[20deg] blur-sm
            text-center text-8xl pt-4">
                    0
                </span>
                {/* bottom right */}
                <span className="absolute -z-10 h-28 w-1/3 bg-gradient-to-b from-cyan-700
            top-[calc(30%_+_7rem)] right-[5%] skew-x-12 skew-y-[20deg] blur-sm
            text-center text-8xl pt-4 translate-x-5">
                    7
                </span>
            </div>
            <div className="md:hidden animate-pulse" style={{animationDuration: "40s"}}>
                <span className="rotate-90 absolute -z-10 h-24 w-[90%] left-[5%] top-[50%] translate-y-[-50%]
                skew-y-[30deg] bg-gradient-to-r bg-pink-600 blur-lg">
                </span>
                <span className="absolute -z-10 h-24 w-[90%] left-[5%] top-[50%] translate-y-[-50%]
                -skew-y-[30deg] bg-gradient-to-l bg-cyan-700 blur-lg">
                </span>
            </div>
            <div className="pt-14">
                {children}
            </div>
        </div>
    );
}