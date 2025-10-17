import { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext";
import BadgerSavedSummary from "./BadgerSavedSummary";

export default function BadgerBudsBasket(props) {

    const buddies = useContext(BadgerBudsDataContext);
    const [savedBuddies, setSavedBuddies] = useState([]);

    useEffect(() => {
        const savedCatIds = JSON.parse(sessionStorage.getItem("savedCatIds")) || [];
        const adoptCatIds = JSON.parse(sessionStorage.getItem("adoptCatIds")) || [];

        const filteredBuddies = buddies.filter(buddy => savedCatIds.includes(buddy.id));
        const updatedFilteredBuddies = filteredBuddies.filter(buddy => !adoptCatIds.includes(buddy.id));
        setSavedBuddies(updatedFilteredBuddies);
    }, [buddies]);

    const handleUnsaveBuddy = (buddyId) => {
        const savedCatIds = JSON.parse(sessionStorage.getItem("savedCatIds")) || [];
        const updatedCatIds = savedCatIds.filter(id => id !== buddyId);
        sessionStorage.setItem("savedCatIds", JSON.stringify(updatedCatIds));
        setSavedBuddies(savedBuddies.filter(buddy => buddy.id !== buddyId));
    }

    const handleAdopt = (buddyId) => {
        const savedCatIds = JSON.parse(sessionStorage.getItem("savedCatIds")) || [];
        const updatedCatIds = savedCatIds.filter(id => id !== buddyId);
        sessionStorage.setItem("savedCatId", JSON.stringify(updatedCatIds));
        setSavedBuddies(savedBuddies.filter(buddy => buddy.id !== buddyId));

        const adoptCatIds = JSON.parse(sessionStorage.getItem("adoptCatIds")) || [];
        adoptCatIds.push(buddyId);
        sessionStorage.setItem("adoptCatIds", JSON.stringify(adoptCatIds));
    }

    return <div>
        <Container fluid>
            <Row>
                <h1>Badger Buds Basket</h1>
                <p>These cute cats could be all yours!</p>
                { 
                    savedBuddies.length !== 0?
                    savedBuddies.map(buddy => {
                        return <Col key={buddy.id} xs={12} sm={6} md={4} xl={3}>
                             <BadgerSavedSummary buddy={buddy} onUnsave={handleUnsaveBuddy} onAdopt={handleAdopt} />
                        </Col>
                    })
                    : <p>You have no buds in your basket!</p>
                }
            </Row>
        </Container>
    </div>
}