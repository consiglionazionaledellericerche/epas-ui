import React, { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import FeedbackModal from "./feedbackModal";
import { useSession } from "next-auth/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const FeedbackButton = () => {
  const [screenshot, setScreenshot] = useState(null);
  const [titleModal, setTitleModal] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [parameters, setParameters] = useState("");

  let feedbackInstance = null;

  const navigatorData = navigator;
  const { data: session, status } = useSession()

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
                                "plugins": navigatorData.plugins},
                    'screenshot':""}

  const captureScreenshot = async () => {
    const bodyScreen = await html2canvas(document.body);
    const screenshotData = bodyScreen.toDataURL()
    const screenshotData64 = bodyScreen.toDataURL('image/png')
    setScreenshot(screenshotData);
    setShowModal(true);
  };

  const handleFeedbackClick = () => {
    captureScreenshot();
  };

  return (
  <>
    <FeedbackModal title={titleModal}
    tmpshow={showModal}
    close={() => setShowModal(false)}
    parameters={parameters}
    screenshot={screenshot}
    dataToSend={dataToSend} />
    &nbsp;&nbsp;
    <button onClick={handleFeedbackClick}><FontAwesomeIcon icon={faEnvelope} /> Invia segnalazione</button>
    </>
  );
};

export default FeedbackButton;
