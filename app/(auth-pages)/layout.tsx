export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="pt-14 min-w-[100vw] min-h-[100vh]">
            
            {children}
        </div>
    );
}