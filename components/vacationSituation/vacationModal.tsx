import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import VacationSummaryModalContent from './vacationSummaryModalContent'
import { useRequest } from "../../request/useRequest"
import { getServerSession } from "next-auth/next"
import { getSession } from 'next-auth/react';
import { CustomSession } from "../../types/customSession";
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from '../../pages/api/auth/[...nextauth]';

interface VacationModalProps {
  title: string,
  tmpshow: boolean,
  close: Function,
  parameters: string
}

interface VacationModalState {
  title: string,
  show: boolean,
  data: any,
  close: boolean
}

class VacationModal extends React.Component<VacationModalProps, VacationModalState> {
  constructor(props:VacationModalProps) {
    super(props);
    this.state = { data: [], show:false, title: "", close:true};
  }

  async componentDidUpdate(propsPrecedenti: VacationModalProps) {
    if (this.props.tmpshow !== propsPrecedenti.tmpshow) {
      if (this.props.tmpshow){
        const parameters = this.props.parameters
        const session = await getSession() as CustomSession;
        let accessToken = null;
        if (session) {
          accessToken = session.accessToken;
        }

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

                this.setState({'data': data, 'show':true, 'title':data.vacationSummary.title})
            });
        }
        else {
          this.setState({'data': [], 'show':false, 'title':""})
        }
    }
  }

  handleClose = () => {
    this.setState ({'show': false})
    this.props.close();
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
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>{this.state.title}</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                         {this.state.show ? <VacationSummaryModalContent data={this.state.data} parameters={this.props.parameters} /> : ''}
                      </Modal.Body>
                      <Modal.Footer>
                        <Button onClick={this.handleClose}>Cancel</Button>
                      </Modal.Footer>
                    </Modal>
    );
  }

}

export async function getServerSideProps({ req, res }: { req: NextApiRequest, res: NextApiResponse }) {
  return {
    props: {
      session: await getServerSession(req, res, authOptions)
    },
  };
}

export default VacationModal;