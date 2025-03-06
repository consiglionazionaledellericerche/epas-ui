import { useRouter } from 'next/router'
import React, { useContext, useState, useEffect } from 'react'
import { Col, Container, Row } from "react-bootstrap";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useRequest } from "../request/useRequest"
import { Spinner } from 'react-bootstrap'
import { useSession } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from './api/auth/[...nextauth]'
import PersonEditTab from '../components/person/personEditTab'

const Breadcrumbs = ({ fullname }) => {
  return (
    <Breadcrumb className="breadcrumb breadcrumb-no-margin">
      <Breadcrumb.Item href="/peopleList">Lista Persone</Breadcrumb.Item>
      <Breadcrumb.Item active>{fullname}</Breadcrumb.Item>
    </Breadcrumb>
  );
};


function PersonEdit() {
  const router = useRouter()
  let personId = router.query["personId"]

  const { data: session, status } = useSession()

  const officeId=1;
  const name="";
  const url = `?endpoint=people%2F${personId}`

  const {data, error} = useRequest(url);
  if (error) return (<div>Impossibile caricare la situazione annuale</div>);
  if (!data) return <React.Suspense fallback={<Spinner />} />

  return (
      <>
      <Container fluid>
          <Row>
              <Col sm={2}></Col>
              <Col sm={8}>
                  <Breadcrumbs fullname={data.fullname}/>
              </Col>
              <Col sm={2}></Col>
          </Row>
          <Row>
              <Col sm={2}></Col>
              <Col sm={8}>
                  <div className="page-header">
          	        <h2>Configura Dati {data.fullname}</h2>
          	        <br/>
                  </div>
              </Col>
              <Col sm={2}></Col>
          </Row>
          <Row>
              <Col sm={2}></Col>
              <Col sm={8}>
                  <PersonEditTab data={data}/>
              </Col>
              <Col sm={2}></Col>
          </Row>
      </Container>
      </>
  )

}

export async function getServerSideProps({ req, res }) {
  return {
    props: {
      session: await getServerSession(req, res, authOptions)
    }
  }
}
export default PersonEdit