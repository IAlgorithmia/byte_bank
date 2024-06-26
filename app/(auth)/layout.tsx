import Image from 'next/image';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    
    return (
        <main className="flex min-h-screen w-full justify-between font-inter">
            {children}
            <div className="auth-asset">
                <div>
                    <Image
                        src="/icons/myimage.jpg"
                        alt="Auth Image"
                        height={700}
                        width={700}
                        style={{
                            borderRadius: '15px',
                            border: '5px solid black'
                        }}
                    />
                </div>
            </div>
        </main>
    );
}
