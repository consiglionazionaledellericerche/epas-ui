import { ReactNode, useState } from 'react'
import Header from './header'
import Footer from './footer'

type Props = {
    children: ReactNode;
    title?: string;
};

export default function Layout ({ children, title }: Props): JSX.Element {
    const [currentYear, setCurrentYear] = useState(2022)
    const [currentMonth, setCurrentMonth] = useState(1)
    return (
        <>
            <Header />
            <main className="flex-shrink-0">
                {children}
            </main>
            <Footer />
        </>
    )
}