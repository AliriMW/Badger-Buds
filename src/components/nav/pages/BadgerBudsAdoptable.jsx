import { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext";
import BadgerBudSummary from "./BadgerBudSummary"


export default function BadgerBudsAdoptable(props) {
    
    const buddies = useContext(BadgerBudsDataContext);
    const [availableBuddies, setAvailableBuddies] = useState([]);

    const adoptCatIds = JSON.parse(sessionStorage.getItem("adoptCatIds")) || [];
    const [adoptIds, setAdoptIds] = useState(
        adoptCatIds ? adoptCatIds : []);

    useEffect(() => {
        const savedCatIds = JSON.parse(sessionStorage.getItem("savedCatIds")) || [];

        const filteredBuddies = buddies.filter(buddy => !savedCatIds.includes(buddy.id)); // exculde saved Ids
        const updatedFilteredBuddies = filteredBuddies.filter(buddy => !adoptIds.includes(buddy.id)); // exclude adopted Ids
        setAvailableBuddies(updatedFilteredBuddies);
    }, [buddies, adoptIds]);

    const handleSaveBuddy = (buddyId) => {
        const savedCatIds = JSON.parse(sessionStorage.getItem("savedCatIds")) || [];
        savedCatIds.push(buddyId);
        sessionStorage.setItem("savedCatIds", JSON.stringify(savedCatIds));
        setAvailableBuddies(availableBuddies.filter(buddy => buddy.id !== buddyId));
    }

    return <div>
        <Container fluid>
            <Row>
                <h1>Available Badger Buds</h1>
                <p>The following cats are looking for a loving home! Could you help?</p>
                {
                    // written with the help of ChatGPT
                    availableBuddies.length !== 0?
                    availableBuddies.map(buddy => {
                        return <Col key={buddy.id} xs={12} sm={6} md={4} xl={3}>
                             <BadgerBudSummary buddy={buddy} onSave={handleSaveBuddy} />
                        </Col>
                    })
                    : <p>No buds are available for adoption!</p>
                }
            </Row>
        </Container>
    </div>
}