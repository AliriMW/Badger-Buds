import React, { useState } from "react";
import { Card, Button, Carousel } from "react-bootstrap";

// written with the help of ChatGPT
const BadgerBudSummary = ({buddy, onSave}) => {

  const [status,setStatus] = useState(0);

  const imageUrls = buddy.imgIds.map(
    (imgId) =>
      `https://raw.githubusercontent.com/CS571-F24/hw5-api-static-content/main/cats/${imgId}`
  );

  function toggle() {
    setStatus(prev => !prev)
  }

  return (
    <Card style={{margin: "1rem", textAlign: "center", width: "18rem"}}>
        {status? (
          <Carousel>
            {imageUrls.map((url, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={url}
                  alt={`Number ${index + 1} picture of ${buddy.name}`}
                  style={{ height: "250px", objectFit: "cover", borderRadius: "8px" }}
                />
              </Carousel.Item>
              ))
            }
          </Carousel>
        ) : (
          // Single image when "Show Less" is active
          <Card.Img
            src={imageUrls[0]}
            alt={`A picture of ${buddy.name}`}
            variant="top"
            style={{ objectFit: "cover", height: "250px", borderRadius: "8px" }}
          />
        )}
      <Card.Body>
        <h4>{buddy.name}</h4>
        {
            status?
            <>
                <p>{buddy.gender}</p>
                <br/>
                <p>{buddy.breed}</p>
                <br/>
                <p>{buddy.age}</p>
                <br/>
                <p>{buddy.description? buddy.description : null}</p>
            </>
            : null
        }
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between">
        <Button variant="outline-primary" onClick={() => toggle()}>{status? "Show Less" : "Show More"}</Button>
        <Button variant="outline-success" onClick={() => {
            onSave(buddy.id);
            alert(`${buddy.name} has been added to your basket!`);
            }}>
            {'\u2764'} Save
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default BadgerBudSummary;