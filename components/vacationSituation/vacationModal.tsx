import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class VacationModal  extends React.Component {
  constructor(props) {
    super(props);
    console.log("VacationModal props", props);
  }

  componentDidUpdate(propsPrecedenti) {
    console.log("1) this.props.show", this.props.show);
    console.log("2) propsPrecedenti.show", propsPrecedenti.show);

    // Utilizzo tipico (non dimenticarti di comparare le props):
    if (this.props.show !== propsPrecedenti.show) {
      //this.fetchData(this.props.idUtente);
      if (this.props.show){
        console.log("3) mettere fetch data");
        }
      console.log("4) e' cambiato il props show");
    }
  }

 render() {
    return (
              <Modal
                      show={this.props.show}
                      cancel={this.props.close}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Modal title</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        I will not close if you click outside me. Don't even try to press
                        escape key.
                      </Modal.Body>
                      <Modal.Footer>
                        <Button onClick={this.props.close}>Cancel</Button>
                      </Modal.Footer>
                    </Modal>
    );
  }

}


export default VacationModal;