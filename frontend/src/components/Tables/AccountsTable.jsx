import React, { useState } from "react";
import Button from "antd/es/button";
import Popconfirm from "antd/es/popconfirm";
import Table from "antd/es/table";
import Typography from "antd/es/typography";
import { EditableCell } from "./EditableCell.jsx";
import { EditableRow } from "./EditableRow.jsx";
import { useAccounts } from "../../hooks/useAccounts.js";
import {
  formatAccountsData,
  parseToCurrency,
  renderCurrency,
} from "./utils.js";
import { COLORS } from "../../constants/colors.js";
import { ToastContainer } from "react-toastify";
import { toastifyError } from "../../toastify/error.js";

const { Text } = Typography;
export const AccountsTable = () => {
  const [count, setCount] = useState(0);
  const {
    accounts,
    setAccounts,
    registerAccount,
    updateAccount,
    deleteAccount,
    error,
  } = useAccounts({
    formatter: formatAccountsData,
    setCount,
  });

  if (error) {
    return <p className="text-green">Error</p>;
  }

  const handleDelete = ({ key, username }) => {
    try {
      deleteAccount({ username });
      const newData = accounts.filter((item) => item.key !== key);
      setAccounts(newData);
      setCount(count - 1);
    } catch (error) {
      console.error(error);
      return toastifyError({ message: "Error al eliminar la cuenta" });
    }
  };

  const defaultColumns = [
    {
      title: "Cuenta",
      dataIndex: "cuenta",
      width: "35%",
      editable: true,
    },
    {
      title: "Betano",
      dataIndex: "betano",
      editable: true,
      render: renderCurrency,
    },
    {
      title: "Bet365",
      dataIndex: "bet365",
      editable: true,
      render: renderCurrency,
    },
    {
      dataIndex: "operation",
      render: (_, record) =>
        accounts.length >= 1 ? (
          <Popconfirm
            okButtonProps={{ color: "danger", variant: "solid" }}
            cancelButtonProps={{ color: "primary", variant: "solid" }}
            title="Eliminar?"
            cancelText="Cancelar"
            onConfirm={() => {
              console.log({ record });

              handleDelete({ key: record.key, username: record.cuenta });
            }}
            color="#444"
          >
            <a style={{ color: "#ff3434" }}>Eliminar</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleAdd = () => {
    const username = `Cuenta ${count + 1}`;
    const newData = {
      key: count + 1,
      cuenta: username,
      betano: 0,
      bet365: 0,
    };
    try {
      registerAccount({ account: { username } });
      setAccounts([...accounts, newData]);
      setCount(count + 1);
    } catch (error) {
      console.error(error);
      return toastifyError({ message: "Error al registrar la cuenta" });
    }
  };

  const handleSave = (row) => {
    console.log({ row });

    const account = {
      username: row.cuenta,
      amounts: {
        betano: row.betano,
        bet365: row.bet365,
      },
    };

    try {
      updateAccount({ account, username: row.prevUsername });
    } catch (error) {
      console.error(error);
      return toastifyError({ message: "Error al guardar los cambios" });
    }

    const newData = [...accounts];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setAccounts(newData);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    col.align = "center";
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  return (
    <div>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
          backgroundColor: COLORS.BACKGROUND,
          color: COLORS.GREEN,
          border: `.05rem solid ${COLORS.GREEN}`,
        }}
      >
        Agregar cuenta
      </Button>
      <Table
        components={components}
        size="large"
        rowClassName={() => "editable-row"}
        bordered
        dataSource={accounts}
        columns={columns}
        pagination={{ hideOnSinglePage: true }}
        summary={renderSummary}
      />
      <ToastContainer />
    </div>
  );
};
function renderSummary(data) {
  let total = 0;
  data.forEach(({ betano, bet365 }) => {
    total += Number(betano) + Number(bet365);
  });
  return (
    <>
      <Table.Summary.Row>
        <Table.Summary.Cell className="text-white" index={0}>
          Total
        </Table.Summary.Cell>
        <Table.Summary.Cell index={1}>
          <Text style={{ color: COLORS.WHITE }} type="danger">
            {parseToCurrency(total)}
          </Text>
        </Table.Summary.Cell>
      </Table.Summary.Row>
    </>
  );
}
