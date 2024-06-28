// src/components/PaymentPage.js
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Input, Button } from "antd";
import "../styles/PaymentPage.css";

const PaymentPage = () => {
  const { id } = useParams(); // Extract the payment ID from the URL
  const navigate = useNavigate();

  const handlePaymentSubmit = (values) => {
    console.log("Payment Details:", values);
    alert("Payment processed successfully! This is a dummy page.");

    // Redirect to home page after 5 seconds
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="payment-container">
      <h1>Payment Page</h1>
      <p>Payment for record ID: {id}</p>
      <p>Please enter your payment details below:</p>

      <Form
        layout="vertical"
        onFinish={handlePaymentSubmit}
        className="payment-form"
      >
        <Form.Item
          label="Card Number"
          name="cardNumber"
          rules={[
            { required: true, message: "Please enter your card number!" },
          ]}
        >
          <Input placeholder="Card Number" />
        </Form.Item>

        <Form.Item
          label="Card Holder Name"
          name="cardHolder"
          rules={[
            { required: true, message: "Please enter the card holder name!" },
          ]}
        >
          <Input placeholder="Card Holder Name" />
        </Form.Item>

        <Form.Item
          label="Expiry Date"
          name="expiryDate"
          rules={[{ required: true, message: "Please enter the expiry date!" }]}
        >
          <Input placeholder="MM/YY" />
        </Form.Item>

        <Form.Item
          label="CVV"
          name="cvv"
          rules={[{ required: true, message: "Please enter the CVV!" }]}
        >
          <Input placeholder="CVV" />
        </Form.Item>

        <Form.Item
          label="Billing Address"
          name="billingAddress"
          rules={[
            { required: true, message: "Please enter your billing address!" },
          ]}
        >
          <Input.TextArea placeholder="Billing Address" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit Payment
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PaymentPage;
