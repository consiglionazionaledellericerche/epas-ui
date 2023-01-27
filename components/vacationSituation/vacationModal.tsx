import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import VacationSummaryModalContent from './vacationSummaryModalContent'
import { useRequest } from "../../request/useRequest"

class VacationModal  extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: []};
    console.log("props", props);
  }

  componentDidUpdate(propsPrecedenti) {
    if (this.props.show !== propsPrecedenti.show) {
      if (this.props.show){
        const parameters = this.props.parameters
        const url = '/api/rest/v4/vacations/summary?'+parameters;
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
          .catch(error => console.error("unable to achive this", error))
            .then(data => {
                console.log('succes', data);
                this.state.data = data;
            });
        }
    }
  }

 render() {
 console.log('succes', this.state.data);
    return (
              <Modal
                      show={this.props.show}
                      cancel={this.props.close}
                      size="lg"
                      aria-labelledby="modal-vacation-info"
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Modal title</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                          <VacationSummaryModalContent data={this.state.data}/>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button onClick={this.props.close}>Cancel</Button>
                      </Modal.Footer>
                    </Modal>
    );
  }

}


export default VacationModal;