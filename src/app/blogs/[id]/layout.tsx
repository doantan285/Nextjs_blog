

export const metadata = {
    title: 'Blog Detail',
    description: 'Generated by Doan Tan',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            {children}
        </>
    )
}
