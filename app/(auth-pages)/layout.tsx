export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="mt-14">{children}</div>
    );
}