import React from "react";
import "./Home.css";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";



export default function Home() {
  const nav= useNavigate()
  return (
    <div className="Home">
      <div className="row">
        <div className="col-lg-6 col-md-6 col-xs-6"></div>
        <div className="col-lg-6 col-md-6 col-xs-6">
          <div className="Welcome">
            <div style={{height:"400px"}}></div>
            <Card
            style={{
              maxWidth: 500,
              width: "40%",
              height: "200px",
              margin: "auto",
              backgroundColor: "#D6AF86",
              maxHeight: "400px",
              border: "#8D5818 5px solid",
              boxShadow: "10px 10px 10px #402D1D",
            }}
            >
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <strong>Welcome...</strong>
                  </Typography>
                  {/* <Typography variant="body2">
                  A payment method refers to the various options available for
                  customers to make payments when purchasing a product or
                  service. Whether in a physical or online store, payment
                  methods cover a range of choices.
                </Typography> */}
                </CardContent>
              </CardActionArea>
              <CardActions style={{ display: "flex", justifyContent: "end" }}>
                <Button
                  size="small"
                  style={{ backgroundColor: "#573414", color: "white" }}
                  variant="contained"
                  onClick={() => {
                    nav("/Crud");
                  }}
                >
                  Continue...
                </Button>
               
              </CardActions>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
