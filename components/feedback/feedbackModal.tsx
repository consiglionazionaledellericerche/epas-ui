import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useRequest } from "../../request/useRequest"
import { getServerSession } from "next-auth/next"
import { getSession } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import dotenv from 'dotenv/config';

class FeedbackModal  extends React.Component {
  constructor(props) {
    super(props);
    this.state = {screenshot: [],
                  show:false,
                  title: "",
                  url: process.env.EPAS_HELPDESK_SERVICE,
                  selectedCategory:"",
                  categories:[{'label':'Problemi Tecnici - Epas', 'value':'Problemi Tecnici - Epas'},
                               {'label':'Problemi Amministrativi - Epas', 'value':'Problemi Amministrativi - Epas'}],
                  dataToSend:{}}
  }

  async componentDidUpdate(propsPrecedenti) {
    if (this.props.tmpshow !== propsPrecedenti.tmpshow) {
      this.setState({'data': null,
      'show':true,
      'title':'',
      'screenshot':this.props.screenshot,
      'dataToSend':this.props.dataToSend})
    }
  }

  handleClose = () => {
    this.setState ({'show': false})
  }

  handleDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState({'description':description});
  }

  handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    this.setState({'selectedCategory':selectedCategory});
  }

  handleSubmit = () => {
    const { description, selectedCategory } = this.state;
    this.state.dataToSend.screenshot = [this.state.screenshot]
    this.state.dataToSend.note = this.state.description
    this.state.dataToSend.category = this.state.selectedCategory

    fetch(this.state.url, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.dataToSend) // Converte l'oggetto JavaScript in una stringa JSON
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Errore nella richiesta PUT');
        }
        return response.json();
      })
      .then(data => {
        console.log('Richiesta PUT completata con successo:', data);
      })
      .catch(error => {
        console.error('Errore durante la richiesta PUT:', error);
      });

  }

 render() {
    return (
              <Modal
                      tmpshow= {this.props.tmpshow.toString()}
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
                          {this.state.categories?.map((category) => (
                            <option key={category.value} value={category.value}>
                              {category.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <br/>
                      <div>
                        <h6>Screenshot Catturato:</h6>
                        <img src={this.state.screenshot} alt="Screenshot" style={{ width: '400px', height: '250px' }} />
                      </div>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button onClick={this.props.close}>Cancel</Button>
                        <Button onClick={this.handleSubmit}>Invia</Button>
                      </Modal.Footer>
                    </Modal>
              );
  }

}

export async function getServerSideProps({ req, res }) {
  return {
    props: {
      session: await getServerSession(req, res, authOptions)
    }
  }
}

export default FeedbackModal;