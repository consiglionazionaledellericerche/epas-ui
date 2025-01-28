import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useTranslations } from 'next-intl';

const roleDescriptions: Record<
  'personnelAdmin' | 'personnelAdminMini' | 'seatSupervisor' | 'employee' | 'shiftManager' | 'reperibilityManager' | 'groupManager' | 'registryManager' | 'mealTicketManager' | 'technicalAdmin' | 'badgeReader',
  string[]
> = {
  personnelAdmin: [
    "Può inserire, modificare, cancellare timbrature nei cartellini dei dipendenti",
    "Può inserire, modificare, cancellare codici di assenza nei cartellini dei dipendenti",
    "Può vedere le assenze del personale su base mensile e annuale",
    "Può inserire, modificare, cancellare competenze accessorie",
    "Può vedere la situazione delle ferie e dei permessi dei dipendenti",
    "Può vedere i calendari di turni e reperibilità, se configurati",
    "Può definire la configurazione della sede (orari di apertura/chiusura ecc...)",
    "Può stampare i cartellini dei dipendenti",
    "Può inviare i dati mensili alla piattaforma <strong>Attestati</strong>",
    "Può definire gli orari di lavoro particolari che devono essere assegnati ai dipendenti della sede (part time orizzontali, verticali).",
  ],
  personnelAdminMini: [
    "Può vedere le timbrature nei cartellini dei dipendenti",
    "Può vedere i codici di assenza nei cartellini dei dipendenti",
    "Può vedere le competenze accessorie",
    "Può vedere le assenze del personale su base mensile e annuale",
  ],
  seatSupervisor: [
    "Può vedere le timbrature nei cartellini dei dipendenti",
    "Può vedere i codici di assenza nei cartellini dei dipendenti",
    "Può approvare/respingere le richieste di assenza dei dipendenti",
    "Può vedere la situazione delle ferie e dei permessi dei dipendenti",
  ],
  employee: [
    "Accede al sistema con le proprie credenziali",
    "Può vedere il proprio cartellino mensile",
    "Può vedere la situazione delle proprie ferie",
    "Può vedere la situazione delle proprie assenze su base mensile/annuale",
    "Può vedere la situazione delle competenze accessorie assegnate",
    "Può stampare il proprio cartellino mensile",
    "Può effettuare richieste di ferie/riposi compensativi",
    "Può inserire le proprie timbrature per lavoro fuori sede (se abilitato dalla configurazione)",
    "Può inserire alcuni tipi di assenza (se abilitato dalla configurazione)",
  ],
  shiftManager: [
    "Può assegnare, rimuovere una persona in turno in un certo giorno (visualizzando le eventuali assenze dei turnisti ma senza poter vedere la tipologia di assenza)",
    "Può approvare/respingere il calendario dei turni",
    "Può stampare il prospetto del calendario dei turni",
  ],
  reperibilityManager: [
    "Può assegnare, rimuovere una persona in reperibilità in un certo giorno (visualizzando le eventuali assenze dei reperibili ma senza poter vedere la tipologia di assenza)",
    "Può approvare/respingere il calendario della reperibilità",
    "Può stampare il prospetto del calendario della reperibilità.",
  ],
  groupManager: [
    "Può vedere le timbrature dei dipendenti appartenenti al proprio gruppo di lavoro (eventualmente modificabile se dovesse creare problemi)",
    "Può inserire/rimuovere persone dal proprio gruppo di lavoro",
    "Può approvare/respingere le ferie/riposi compensativi dei dipendenti del proprio gruppo di lavoro",
  ],
  registryManager: [
    "Può inserire, modificare il personale afferente alla sede",
    "Può inserire, modificare, cancellare i contratti del personale dipendente",
    "Può inserire, modificare, cancellare gli orari di lavoro sul contratto dei dipendenti",
    "Può inserire, modificare cancellare i piani ferie dei dipendenti",
    "Può inserire, modificare, cancellare le fasce di presenza obbligatoria dei dipendenti",
    "Può inserire, modificare, cancellare le inizializzazioni orarie e dei buoni pasto dei dipendenti in fase di avvio dell’utilizzo del programma",
    "Può scaricare da “Attestati” le assenze pregresse dei dipendenti in fase di avvio dell’utilizzo del programma.",
  ],
  mealTicketManager: [
    "Può vedere la situazione dei buoni pasto assegnati ai dipendenti",
    "Può inserire, modificare, cancellare i blocchetti di buoni pasto per ciascun dipendente",
    "Può spostare i blocchetti di buoni pasto da un contratto ad un altro dello stesso dipendente.",
  ],
  technicalAdmin: [
    "Può definire e configurare le sorgenti delle timbrature",
    "Può definire e configurare il gruppo badge della sede (ovvero il pool di badge assegnato ai dipendenti della propria sede)",
    "Può configurare degli indirizzi ip per l’autorizzazione alla timbratura via web",
    "Può configurare dei ruoli operativi nella sede di appartenenza",
  ],
  badgeReader: [
    "È il ruolo assegnato all’utente con cui il client che rileva le timbrature localmente sulle singole sedi si autentica sul sistema ePAS e consente l’inserimento delle timbrature sui cartellini dei singoli dipendenti appartenenti alle stesse sedi.",
  ],
};


interface DescriptionModalProps {
  tmpshow: boolean;
  closeModal: () => void;
  role: string;
}

const DescriptionModal: React.FC<DescriptionModalProps> = ({ tmpshow, closeModal, role }) => {
    const [show, setShow] = useState(tmpshow);
    const [title, setTitle] = useState(`Ruolo: ${role}`);
    const trans = useTranslations('Message');
    const descriptions = roleDescriptions[role as keyof typeof roleDescriptions] || [];

    useEffect(() => {
      setShow(tmpshow);
    }, [tmpshow]);

    useEffect(() => {
      if(role) {
        setTitle(`Azioni eseguibili dal ruolo: ${trans(role)}`);
      }
    }, [role]);

    return (
      <Modal
        show={show}
        onHide={closeModal}
        size="xl"
        aria-labelledby="modalViewRole"
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {descriptions.length > 0 ? (
          <div className="alert alert-info  text-dark ">
            <ul className="list-group">
              {descriptions.map((desc, index) => (
                <li key={index} className="list-group-item clearfix">
                  {desc}
                </li>
              ))}
            </ul>
          </div>
          ) : (
            <p>Nessun dato disponibile.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeModal}>Chiudi</Button>
        </Modal.Footer>
      </Modal>
    );
  };

  export default DescriptionModal;