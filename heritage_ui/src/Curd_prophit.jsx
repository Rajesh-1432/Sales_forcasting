import React, { useState } from "react";
import logo from "./assets/logo.png";
import { Form, Input, Button } from "antd";

const Curd_prophit = () => {
  const [apiResponse, setApiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState(null);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      setFormValues(values);

      const response = await fetch(
        "http://13.211.237.57:5000/predict_sales_quantity",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            target_date: values.Target_Date,
            material_code: values.Meterial_Code,
            sales_office_id: values.Sales_Office_Id,
          }),
        }
      );

      const data = await response.json();
      setApiResponse(data);

      console.log("API Response:", data);
    } catch (error) {
      setLoading(false);
      console.error("Error calling API:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatValue = (response, formValues) => {
        const bold = (text) => {
      const parts = text.split("is");
      return (
        <span>
          {parts[0]}is
          <strong>{parts[1]}</strong>
        </span>
      );
    };
  
    return (
      <div>
        
        <div style={{ fontSize: "18px", fontWeight: "bold"}}>Report</div>
        <br />
        <br />
        <div style={{ fontSize: "18px" }}>
          <b>Targeted Date:</b> {formValues && formValues.Target_Date}
        </div><br />
        <div style={{ fontSize: "18px" }}>
         <b> Material Code:</b> {formValues && formValues.Meterial_Code}
        </div><br />
        <div style={{ fontSize: "18px" }}>
         <b> Sales Office ID:</b> {formValues && formValues.Sales_Office_Id}
        </div>
        <br />
        <br />
        <div style={{ fontSize: "18px" }}>
         <b> Result:</b> {response ? bold  (response.sales_quantity) : ""}
        </div>
      </div>
    );
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "150px",
          margin: "-8px",
          padding: "0px",
          backgroundColor: "yellow",
        }}
      >
        <img src={logo} alt="Your Logo" />
      </div>
      <div style={{ display: "flex" }}>
        <div
          style={{
            width: "400px",
            margin: "0 auto",
            marginTop: "50px",
            padding: "50px",
            border: "0.5px solid #fff",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1), 0 0 6px #E03FD8",
            backgroundColor: "#fff",
            textAlign: "center",
          }}
        >
          <h2>Curd Prophet</h2>
          <br />
          <Form
            name="curdProphet"
            labelCol={{ span: 7, offset: 3 }}
            wrapperCol={{ span: 10, offset: 0 }}
            onFinish={handleSubmit}
            labelAlign="left"
          >
            <Form.Item
              label="Target Date"
              name="Target_Date"
              rules={[
                { required: true, message: "Please enter the Target Date" },
              ]}
            >
              <Input type="date" />
            </Form.Item>
            <Form.Item
              label="Material Code"
              name="Meterial_Code"
              rules={[
                { required: true, message: "Please enter the Material Code" },
              ]}
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              label="Sales Office ID"
              name="Sales_Office_Id"
              rules={[
                { required: true, message: "Please enter the Sales Office ID" },
              ]}
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div
        style={{
          width: "400px",
          margin: "0 auto",
          marginTop: "50px",
          paddingTop: "150px",
          padding: "50px",
          border: "0.5px solid #fff",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1), 0 0 6px #E03FD8",
          backgroundColor: "#fff",
          textAlign: "left",
          fontFamily: "roboto",
        }}
      >
        {loading ? (
          <div style={{alignContent:"center", fontFamily:'roboto',fontWeight:'bold'}}> Loading...</div>
        ) : (
          <div>{formatValue(apiResponse, formValues)}</div>
        )}
      </div>
      </div>
    </div>
  );
};

export default Curd_prophit;
