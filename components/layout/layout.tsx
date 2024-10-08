import { ReactNode, useState } from 'react'
import Header from './header'
import Footer from './footer'

type Props = {
    children: ReactNode;
    title?: string;
};

export default function Layout ({ children, title }: Props): JSX.Element {
    return (
        <>
            <Header title={title}/>
            <main className="flex-shrink-0">
                {children}
            </main>
            <Footer />
        </>
    )
}