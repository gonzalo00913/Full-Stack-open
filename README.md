# Full Stack Open
Profundización en el desarrollo web moderno.


import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
} from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import {FaBan, FaCheck } from "react-icons/fa";
import "./TableUserBan.css";


const TableUserBan = ({columns, data, handleActivateDeactivate}) => {
    
    const [page, setPage] = React.useState(1);

    const rowsPerPage = 10;
  
  
    const pages = Math.ceil(data.length / rowsPerPage);
  
    const items = React.useMemo(() => {
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;
  
      return data.slice(start, end);
    }, [page, data]);
    
    const getIcon = (type) => {
        switch (type) {
          case "activar":
            return <FaBan />;
          case "desactivar":
            return <FaCheck />;
        }
      };

    const pagination = (
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      );

  return (
<div>
      <Table
        aria-label="Example table with dynamic content"
        classNames={{ wrapper: "min-h-[222px]" }}
        bottomContent={pagination}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell className={columnKey === "actions" ? "actions-cont" : item.isActive ? "active-cell" : "inactive-cell"}>
  {columnKey === "actions"
    ? (
      <>
        <Button
          size="sm"
          className="action-buttons"
          onClick={() => handleActivateDeactivate(item.id, 'activar')}
        >
          {getIcon('activar')}
      
        </Button>
        <Button
          size="sm"
          className="action-buttons"
          onClick={() => handleActivateDeactivate(item.id, 'desactivar')}
        >
          {getIcon('desactivar')}
         
        </Button>
      </>
    )
    : columnKey === "isActive"
    ? item.isActive
      ? "Activo"
      : "Inactivo"
    : item[columnKey]}
</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableUserBan;








import NavigationBar from "../../components/NavBar/NavigationBar";
import TableUserBan from "../../components/TableUserBan/TableUserBan";
import { useState, useEffect } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);

  async function getUsers() {
    try {
      const { data } = await axios.get("http://localhost:3001/management/user/");
      setUsers(data);
    } catch (error) {
      console.error("Error al obtener la lista de usuarios", error);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);



  const columns = [
    {
      key: "name",
      label: "NOMBRE DE USUARIO",
    },
    {
      key: "email",
      label: "EMAIL",
    },
    {
      key: "isActive",
      label: "ESTADO",
    },
    {
      key: "actions",
      label: "ACCIONES",
    },
  ];

  const handleActivateDeactivate = async (userId, action, getUsers) => {
    try {
      const actionUrl = `http://localhost:3001/management/user/status/${userId}/`;

      await axios.put(actionUrl, {
        action: action,
      });

      getUsers();
    } catch (error) {
      console.error("Error al activar o desactivar usuario", error);
    }
  };

  return (
    <div>
      <NavigationBar />
      <h1>Lista de usuarios</h1>
      <TableUserBan
  columns={columns}
  data={users}
  getUsers={getUsers} 
  handleActivateDeactivate={(userId, action) =>
    handleActivateDeactivate(userId, action, getUsers)
  }
/>
    </div>
  );
};

export default Users;





  .inactive-cell {
    color: red;




  }



  .ban-button-users {
    background-color: #e8bc71 !important;
    float: right;
    margin-right: 1rem;
}