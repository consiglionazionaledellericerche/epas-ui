import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import VacationSummaryModalContent from './vacationSummaryModalContent'
import { useRequest } from "../../request/useRequest"

class VacationModal  extends React.Component {
  constructor(props) {
    super(props);
    console.log("VacationModal props", props);
    this.state = { data: [] };
  }

  componentDidUpdate(propsPrecedenti) {
    console.log("1) this.props.show", this.props.show);
    console.log("2) propsPrecedenti.show", propsPrecedenti.show);

    // Utilizzo tipico (non dimenticarti di comparare le props):
    if (this.props.show !== propsPrecedenti.show) {
      //this.fetchData(this.props.idUtente);
      if (this.props.show){
        console.log("3) mettere fetch data");
        const parameters = `personId=12&year=2023&month=1&contractId=12&type=VACATION`
//         const {data, error} = useRequest('', parameters);
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
        //
        }
      console.log("4) e' cambiato il props show", this.props);
    }
  }

 render() {
 console.log('succes', this.state.data);
    return (
              <Modal
                      show={this.props.show}
                      cancel={this.props.close}
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