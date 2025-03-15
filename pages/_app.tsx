import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'
import '../styles/epas.css'

import { SessionProvider } from "next-auth/react"

import type { AppProps } from 'next/app'
import Layout from '../components/layout/layout'
import { useRouter } from 'next/router'
import React, {useEffect} from 'react'
import { SWRConfig } from 'swr'
import { useSession} from "next-auth/react"
import {createTranslator, NextIntlClientProvider} from 'next-intl';
import { ToastContainer } from "react-toastify";
import itMessages from '../public/locales/it.json';

// import { CurrentDateContext } from '../contexts/currentDateContext'
const currentDate = new Date()

import dynamic from "next/dynamic";

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

const CurrentDateProvider = dynamic(
  () => import("../contexts/currentDateContext").then((ctx) => ctx.CurrentDateProvider),
  {
    ssr: false,
  }
);


//const fetcher = (...args) => fetch(...args).then((res) => res.json())
const fetcher = async (url: RequestInfo, init?: RequestInit) => {
  const res = await fetch(url, {
    ...init,
    headers: {
      ...init?.headers,
      'Content-Type': 'application/json'
    },
  });
  return res.json();
};

export default function App({ Component, pageProps: { session, ...pageProps }}: AppProps) {

  return (
  <SessionProvider session={session}>
  <NextIntlClientProvider messages={itMessages} locale="it">
    <SWRConfig value={{
                       fetcher: async (url) => {
                           const res = await fetch(url, {
                               headers: {
                                   'Content-Type': 'application/json',
                                   Authorization: `Bearer ${session.accessToken}`,
                               },
                           });
                           return res.json();
                       },
                   }}>
      <CurrentDateProvider>
        <ToastContainer position="top-right" autoClose={3000} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CurrentDateProvider>
    </SWRConfig>
    </NextIntlClientProvider>
  </SessionProvider>
  )
}