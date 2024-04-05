import React, { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import FeedbackModal from "./feedbackModal";
import { useSession } from "next-auth/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const FeedbackButton = () => {
  const [screenshot, setScreenshot] = useState('');
  const [showModal, setShowModal] = useState(false);

  const navigatorData = navigator;
  const { data: session, status } = useSession()
  const accessToken:string  = session != null ? session.accessToken || '' : "";

  let plugins = [];
  for (const plugin of navigator.plugins) {
    plugins.push(plugin.name);
  }

  let dataToSend = {'session':session,
                    'url':window.location.href,
                    'html':document.documentElement.outerHTML,
                    'browser':{ "appCodeName": navigatorData.appCodeName,
                                "appName": navigatorData.appName,
                                "appVersion": navigatorData.appVersion,
                                "cookieEnabled": navigatorData.cookieEnabled,
                                "onLine": navigatorData.onLine,
                                "platform": navigatorData.platform,
                                "userAgent": navigatorData.userAgent,
                                "plugins": plugins},
                    'img':null}

  const captureScreenshot = async () => {
    const bodyScreen = await html2canvas(document.body);
    const screenshotData64 = bodyScreen.toDataURL('image/png')
    setScreenshot(screenshotData64);
    setShowModal(true);
  };

  const handleFeedbackClick = () => {
    captureScreenshot();
  };

  return (
  <>
    <FeedbackModal
    tmpshow={showModal}
    close={() => {
                    setShowModal(false);
                    setScreenshot(''); // Resetta lo screenshot quando la modale viene chiusa
                  }}
    screenshot={screenshot}
    dataToSend={dataToSend}
    accessToken={accessToken}
    />
    &nbsp;&nbsp;
    <button onClick={handleFeedbackClick}><FontAwesomeIcon icon={faEnvelope} /> Invia segnalazione</button>
    </>
  );
};

export default FeedbackButton;
