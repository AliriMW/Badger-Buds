import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";

const BadgerSavedSummary = ({buddy, onUnsave, onAdopt}) => {

  const imageUrl = `https://raw.githubusercontent.com/CS571-F24/hw5-api-static-content/main/cats/${buddy.imgIds[0]}`;

  return (
    <Card style={{margin: "1rem", textAlign: "center", width: "18rem"}}>
      <Card.Img 
        src={imageUrl}
        alt={`A picture of ${buddy.name}`} 
        variant="top" 
        style={{objectFit: "cover", height: "250px", borderRadius: "8px"}}
      />
      <Card.Body>
        <h4>{buddy.name}</h4>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between">
        <Button variant="outline-secondary" onClick={() => {
            onUnsave(buddy.id);
            alert(`${buddy.name} has been removed from your basket!`);
            }}>
            Unselect
            </Button>
        <Button variant="outline-success" onClick={() => {
            onAdopt(buddy.id);
            alert(`${buddy.name} has been adopted!`);
            }}>
            {'\u2763'} Adopt
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default BadgerSavedSummary;