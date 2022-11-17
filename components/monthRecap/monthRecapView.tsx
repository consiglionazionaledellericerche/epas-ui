import { Accordion, Col, Container, Row } from "react-bootstrap";
import StampingsTable from "../stampings/stampingsTable";
import { MonthRecap } from "../../types/monthRecap";
import HoursRecap from "./hoursRecap";
import MealTicketsRecap from "./mealTicketsRecap";
import { useState } from "react";

interface MonthRecapProps {
    monthRecap: MonthRecap
    month: number
}

const MonthRecapView: React.FC<MonthRecapProps> = ({
    monthRecap, month
  }) => {
    return (
        <>
        <Container fluid>
            <Row>
                <strong>Riepilogo timbrature {month}</strong>
                <Col sm={8}>
                    <StampingsTable monthRecap={monthRecap} />
                </Col>
                <Col sm={4}>
                    <HoursRecap monthRecap={monthRecap} />
                    <MealTicketsRecap monthRecap={monthRecap} />
                </Col>
            </Row>
        </Container>
        </>
    );
}

export default MonthRecapView