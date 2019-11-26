import React, { useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import client from "../../client";
import { ADD_CLICK_EVENT } from "../../graphql/mutations";
import "./ClientPage.css";

const onButtonClickHanler = async (type: String) => {
  const result = await client.mutate({
    mutation: ADD_CLICK_EVENT,
    variables: {
      type
    }
  });

  if (result && result.data) {
    return result.data.addClickEvent;
  }
};

export default function ClientPage() {
  return (
    <Row>
      <Col sm={12}>
        <Button
          className="client-page-btn client-page-btn-add"
          onClick={() => onButtonClickHanler("blue")}
        >
          +
        </Button>
        <Button
          className="client-page-btn client-page-btn-minus"
          onClick={() => onButtonClickHanler("orange")}
        >
          -
        </Button>
      </Col>
    </Row>
  );
}
