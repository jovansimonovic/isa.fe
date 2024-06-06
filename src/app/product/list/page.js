"use client";

import useListDataWithoutAuth from "@/hooks/useListDataWithoutAuth";
import { useEffect } from "react";
import { Card, CardBody, CardFooter, CardText, CardTitle } from "reactstrap";

export default function ProductList() {
  const { getData, data } = useListDataWithoutAuth(`product/get-list`);

  useEffect(() => {
    getData(`product/get-list`);
  }, []);

  return (
    <>
      <div className="d-flex flex-wrap justify-content-center">
        {data?.map((product) => (
          <Card
            key={product.id}
            className="m-2"
            style={{
              width: "18rem",
            }}
          >
            <img alt="Sample image" src="https://picsum.photos/300/200" />
            <CardBody>
              <CardTitle tag="h2">{product.name}</CardTitle>
              <CardText>
                <span className="h5">Category:</span>
                <br />
                category name
              </CardText>
            </CardBody>
            <CardFooter>
              <span className="h5">${product.price}</span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
