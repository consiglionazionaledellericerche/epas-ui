import type { AppProps } from 'next/app'
import { ReactNode } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import Header from './header'
import Footer from './footer'

type Props = {
    children: ReactNode;
    title?: string;
};

export default function Layout ({ children, title }: Props): JSX.Element {
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