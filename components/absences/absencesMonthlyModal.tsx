import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { getServerSession } from "next-auth/next";
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import { getSession } from 'next-auth/react';
import DateUtility from "../../utils/dateUtility";
import { AbsenceInMonth } from "../../types/absenceInMonth";
import { CustomSession } from "../../types/customSession";

interface AbsencesMonthlyModalProps {
  tmpshow: boolean;
  close: () => void;
  parameters: string;
}
interface AbsencesMonthlyModalState {
  data: AbsenceInMonth | null;
  show: boolean;
  title: string
}
class AbsencesMonthlyModal  extends React.Component<AbsencesMonthlyModalProps,AbsencesMonthlyModalState> {
  constructor(props:any) {
    super(props);
    this.state = { data: null, show:false, title: ""};
  }

  async componentDidUpdate(propsPrecedenti:any) {
    if (this.props.tmpshow !== propsPrecedenti.tmpshow) {
      if (this.props.tmpshow){
        const parameters = this.props.parameters
        const session = await getSession() as CustomSession;
        let accessToken = null;
        if (session) {
          accessToken = session.accessToken;
          const url = '/api/rest/v4?endpoint=absences%2FabsenceInMonth?'+parameters;

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
                  this.setState({'data':data, 'show':true, 'title':"Date in cui è stata effettuata l'assenza "+data.code})
            });
        }
        else {
               this.setState({'data':null,'show':false, 'title':""})
        }
      }
      else {
        this.setState({'data':null,'show':false, 'title':""})
        }
    }
  }

  handleClose = () => {
    this.setState ({'show': false})
  }

 render() {

    let dateList = this.state.data ? this.state.data.dateAbsences?.map((date) => <li key={DateUtility.formatDate(date)}>{DateUtility.formatDate(date)}</li>) : ""

    return (
              <Modal
                      tmpshow= {this.props.tmpshow.toString()}
                      show={this.state.show}
                      onHide={this.handleClose}
                      cancel={this.handleClose}
                      size="lg"
                      aria-labelledby="modal-absencemonth-info"
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>{this.state.title}</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                         {this.state.show ? dateList : ''}
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
      session: await getServerSession(req, res, authOptions),
    },
  };
}
export default AbsencesMonthlyModal;