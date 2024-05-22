"use client";

import { useTestActions } from "@/contexts/testContext";
import testAction from "@/core/testAction";
import { useListData } from "@/hooks/useListData";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Button, Row, Spinner } from "reactstrap";

const tableColumns = [
  {
    name: "First name",
    selector: (row) => `${row.firstName}`,
    sortable: false,
  },
  {
    name: "Last name",
    selector: (row) => `${row.lastName}`,
    sortable: false,
  },
];

export default function UserList() {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { state, dispatch } = useTestActions();

  const { getData, loading, data } = useListData(
    `user/get-page-list?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`
  );

  useEffect(() => {
    getData(
      `user/get-page-list?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`
    );
  }, [pageSize, pageNumber]);

  const handlePageChange = async (page) => {
    setPageNumber(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setPageNumber(page);
    setPageSize(newPerPage);
  };


  return (
    <>
      <Row>
        <h5>Email: {state.email}</h5>
        <Button
          type="button"
          className="btn btn-success"
          onClick={() => {
            dispatch({
              type: testAction.CHANGE_EMAIL,
              payload: "testpromena@gmail.com",
            });
          }}
        >
          Change email
        </Button>
      </Row>
      {data != null && (
        <DataTable
          data={data.users}
          columns={tableColumns}
          striped={true}
          noHeader={true}
          pagination
          paginationServer
          progressPending={loading}
          paginationTotalRows={data.totalElements}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handlePerRowsChange}
          progressComponent={<Spinner color="danger">Ocitavanje...</Spinner>}
          highlightOnHover
        />
      )}
    </>
  );
}
