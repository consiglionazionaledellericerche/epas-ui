import React, { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import FeedbackModal from "./feedbackModal";
import { getSession } from 'next-auth/react';
import { CustomSession } from "../../types/customSession";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const FeedbackButton = () => {
  const [screenshot, setScreenshot] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [dataToSend, setDataToSend] = useState<any>({});
  const [accessToken, setAccessToken] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession() as CustomSession;
      const token = session ? session.accessToken : "";
      setAccessToken(token);

      const navigatorData = navigator;
      let plugins = Array.from(navigator.plugins).map(plugin => plugin.name);

      const data = {
        'session': session,
        'url': window.location.href,
        'html': document.documentElement.outerHTML,
        'browser': {
          "appCodeName": navigatorData.appCodeName,
          "appName": navigatorData.appName,
          "appVersion": navigatorData.appVersion,
          "cookieEnabled": navigatorData.cookieEnabled,
          "onLine": navigatorData.onLine,
          "platform": navigatorData.platform,
          "userAgent": navigatorData.userAgent,
          "plugins": plugins
        },
        'img': null
      };

      setDataToSend(data);
    };

    fetchData();
  }, []);

  const captureScreenshot = async () => {
    const bodyScreen = await html2canvas(document.body);
    const screenshotData64 = bodyScreen.toDataURL('image/png');
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
          setScreenshot(""); // Resetta lo screenshot quando la modale viene chiusa
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
