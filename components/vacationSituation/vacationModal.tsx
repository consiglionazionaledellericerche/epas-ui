import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import VacationSummaryModalContent from './vacationSummaryModalContent'
import { useRequest } from "../../request/useRequest"
import { getServerSession } from "next-auth/next"
import { getSession } from 'next-auth/react';

class VacationModal  extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [], show:false};
  }

  async componentDidUpdate(propsPrecedenti) {
    if (this.props.tmpshow !== propsPrecedenti.tmpshow) {
      if (this.props.tmpshow){
        const parameters = this.props.parameters
        const session = await getSession();

        const accessToken = session.accessToken

        console.log("session", session, accessToken);
        const url = '/api/rest/v4/vacations/summary?'+parameters;

        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer '+accessToken
            }
        }).then(response => response.json())
          .catch(error => console.error("unable to achive this", error))
            .then(data => {
            console.log('data.vacationSummary',data);
                this.setState({'data': data.vacationSummary, 'show':true})
            });
        }
        else {
          this.setState({'data': [], 'show':false})
        }
    }
  }

 render() {
    return (
              <Modal
                      tmpshow= {this.props.tmpshow}
                      show={this.state.show}
                      cancel={this.props.close}
                      size="lg"
                      aria-labelledby="modal-vacation-info"
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Modal title</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                         {this.state.show ? <VacationSummaryModalContent  data={this.state.data}/> : ''}
                      </Modal.Body>
                      <Modal.Footer>
                        <Button onClick={this.props.close}>Cancel</Button>
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

export default VacationModal;