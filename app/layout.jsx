import Nav from '@components/Nav'
import '@styles/globals.css'

export const metadata = {
    title: 'Promptopia',
    description: 'Discover & Share Ai Prompts'
}

export default function RootLayout({ children }) 
{
    return (
        <html lang='en'>
            <body>
                <div className="main">
                    <div className="gradient" />
                </div>

                <main className='app'>
                    <Nav />
                    {children}
                </main>
            </body>
        </html>
    )
}
