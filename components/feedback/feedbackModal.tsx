import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import Image from "next/image";
import { useRequest } from "../../request/useRequest"
import { getServerSession } from "next-auth/next"
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import { getSession } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import dotenv from 'dotenv/config';

interface FeedbackModalProps {
  tmpshow: boolean;
  close: () => void;
    screenshot: string;
    dataToSend:any;
    accessToken:string|null;
}
interface FeedbackModalState {
  screenshot: string,
  show: boolean,
  close: () => void,
  url: string,
  selectedCategory:string,
  categories:any,
  dataToSend:any,
  accessToken:string|null,
  title:string|null,
  description:string
}

class FeedbackModal  extends React.Component<FeedbackModalProps,FeedbackModalState>  {
  constructor(props:any) {
    super(props);
    this.state = {screenshot: "",
                  title:"",
                  description:"",
                  close: props.close,
                  show: props.tmpshow,
                  url: process.env.EPAS_HELPDESK_SERVICE+'/send',
                  selectedCategory:"",
                  categories:[{'label':'Problemi Tecnici - Epas', 'value':'Problemi Tecnici - Epas'},
                               {'label':'Problemi Amministrativi - Epas', 'value':'Problemi Amministrativi - Epas'}],
                  dataToSend:{},
                  accessToken:null}
  }

  async componentDidUpdate(propsPrecedenti:any) {

    if (this.props.tmpshow !== propsPrecedenti.tmpshow) {
      this.setState({
      show: this.props.tmpshow,
      title:'',
      screenshot:this.props.screenshot,
      dataToSend:this.props.dataToSend,
      accessToken:this.props.accessToken})
    }
  }

  handleClose = () => {
    this.setState ({'show': false})
    this.props.close();
  }

  handleDescriptionChange = (e:any) => {
    const description = e.target.value;
    this.setState({'description':description});
  }

  handleCategoryChange = (e:any) => {
    const selectedCategory = e.target.value;
    this.setState({'selectedCategory':selectedCategory});
  }

  handleSubmit = () => {
    const { description, selectedCategory } = this.state;
    let img = this.state.screenshot.replace("data:image/png;base64,","");
    let note = this.state.description;
    let category = this.state.selectedCategory;

    let session;

    let headersJson;
    if (this.state.dataToSend.session === null) {
    headersJson = {'Accept': 'application/json',
                   'Content-Type': 'application/json'}
      session = {"user": ""};
    } else {
    let new_session = this.state.dataToSend.session;
      new_session.user = this.state.dataToSend.session.user.name;
      session = new_session;

      headersJson = {'Accept': 'application/json',
                     'Content-Type': 'application/json',
                     'Authorization': 'Bearer '+this.state.accessToken}
    }

    this.setState({'dataToSend':{
                                  'img':img,
                                  'note':note,
                                  'category':category,
                                  'session':session}});

    fetch(this.state.url, {
      method: 'PUT',
      headers: {'Accept': 'application/json',
                 'Content-Type': 'application/json'},
      body: JSON.stringify(this.state.dataToSend) // Converte l'oggetto JavaScript in una stringa JSON
    })
      .then(response => {
        if (!response.ok) {
        console.log("response no ok", response)
          throw new Error('Errore nella richiesta PUT');
        }
      })
      .then(data => {
        console.log('Richiesta PUT completata con successo:', data);
        this.handleClose()
      })
      .catch(error => {
        console.error('Errore durante la richiesta PUT:', error);
      });

  }

 render() {
    return (
              <Modal
                      show={this.state.show}
                      onHide={this.handleClose}
                      cancel={this.state.close}
                      size="lg"
                      aria-labelledby="modal-vacation-info"
                      dialogClassName="centered-modal"
                    >
                      <Modal.Title>
                        <div style={{ display: 'flex', alignItems: 'center', padding:'10px' }}>
                          <FontAwesomeIcon icon={faExclamationTriangle} style={{ color: 'blue', marginRight: '5px' }} size="2x" />
                          <h4 style={{ margin: '0' }}>Segnalazione</h4>
                        </div>
                      </Modal.Title>
                      <Modal.Body>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <h6>Descrizione:</h6>
                        <textarea
                              id="description"
                              name="description" // Aggiungi il nome dell'input
                              value={this.state.description}
                              onChange={this.handleDescriptionChange}
                            ></textarea>
                      </div>
                      <br/>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <h6>Seleziona una categoria:</h6>
                        <select id="category"
                              name="category" // Aggiungi il nome dell'input
                              value={this.state.selectedCategory}
                              onChange={this.handleCategoryChange}
                        >
                          <option value="">Seleziona una categoria</option>

                          {this.state.categories?.map((category:any) => (
                            <option key={category.value} value={category.value}>
                              {category.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <br/>
                      <div>
                        <h6>Screenshot Catturato:</h6>
                        <Image src={this.state.screenshot} alt="Screenshot" style={{ width: '400px', height: '300px' }} />
                      </div>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button onClick={this.handleClose}>Cancel</Button>
                        <Button onClick={this.handleSubmit}>Invia</Button>
                      </Modal.Footer>
                    </Modal>
              );
  }

}

export async function getServerSideProps({ req, res }: { req: NextApiRequest, res: NextApiResponse }) {
  return {
    props: {
      session: await getServerSession(req, res, authOptions),
    },
  };
}
export default FeedbackModal;