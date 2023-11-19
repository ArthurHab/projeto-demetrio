import React from "react";
import axios from 'axios';
import MaterialTable from "material-table";

const GerenciamentoEnderecos = props => {
  const { useState, useEffect } = React;

  const [data, setData] = useState([
  ]);

  useEffect(() => {
    handleClick();
  }, []);

  function handleClick() {
    axios
      .get("http://demo2095023.mockable.io/endereco")
      .then(response => {
        const projetos = response.data.lista.map(c => {
          return {
            id: c.id,
            nomeRua: c.nomeRua
          };
        });
        setData(projetos);
      })
      .catch(error => console.log(error));
  }

  function handleCreate(newData) {
    axios
      .post("http://demo2095023.mockable.io/endereco", {
        "id": newData.id,
        "tituloProjeto": newData.tituloProjeto,
        "areaProjeto": newData.areaProjeto,
        "resumo": newData.resumo,
        "url": newData.url
      })
      .then(function (response) {
        console.log('Salvo com sucesso.')
      });
  }

  function handleUpdate(newData) {
    axios
      .put("http://demo2095023.mockable.io/endereco", {
        "id": newData.id,
        "tituloProjeto": newData.tituloProjeto,
        "areaProjeto": newData.areaProjeto,
        "resumo": newData.resumo,
        "url": newData.url
      })
      .then(function (response) {
        console.log('Atualizado com sucesso.')
      });
  }

  function handleDelete(newData) {
    axios
      .delete("http://demo2095023.mockable.io/endereco", {
        "id": newData.id
      })
      .then(function (response) {
        console.log('Deletado com sucesso.')
      });
  }

  return (
    [

      <MaterialTable
        title="Gerenciamento de Endereços"
        columns={[
          { title: 'Id', field: 'id' },
          { title: 'Rua', field: 'nomeRua' }
        ]}
        data={data}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                handleCreate(newData)

                const dataCreate = [...data];

                setData([...dataCreate, newData]);

                resolve();
              }, 1000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);

                resolve();
              }, 1000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                handleDelete(oldData)
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);

                resolve()
              }, 1000)
            }),
        }}
      />]
  )
}

export default GerenciamentoEnderecos;
