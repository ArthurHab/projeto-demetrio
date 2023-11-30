import React from "react";
import axios from 'axios';
import MaterialTable from "material-table";

const GerenciamentoProjetos = props => {
  const { useState, useEffect } = React;

  const [data, setData] = useState([
  ]);

  useEffect(() => {
    handleClick();
  }, []);
  
  function getProfessores(){
    return new Promise(resolve => {
      axios
      .get("http://demo1481267.mockable.io/professores")
      .then((response) => {
        resolve(response.data.lista)
      })
    })
  }

  function getAlunos(){
    return new Promise(resolve => {
      axios
      .get("http://demo1481267.mockable.io/alunos")
      .then((response) => {
        resolve(response.data.lista)
      })
    })
  }

  function handleClick() {
    getAlunos().then((alunos) => {
      getProfessores().then((professores) => {
        axios
        .get("http://demo2095023.mockable.io/projetos")
        .then(response => {
          const projetos = response.data.lista.map(c => {
            return {
              id: c.id,
              tituloProjeto: c.tituloProjeto,
              areaProjeto: c.areaProjeto,
              resumo: c.resumo,
              url: c.url,
              idProfessorResponsavel: c.idProfessorResponsavel,
              idAlunoParticipante: c.idAlunoParticipante,
              objProfessorResponsavel: professores.filter(professores => professores.id == c.idProfessorResponsavel)[0].nome,
              objAlunoParticipante: alunos.filter(alunos => alunos.id == c.idAlunoParticipante)[0].nome
            };
          });
          setData(projetos);
        })
        .catch(error => console.log(error));
      })
    })
  }

  function handleCreate(newData) {
    axios
      .post("http://demo2095023.mockable.io/projetos", {
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
      .put("http://demo2095023.mockable.io/projetos", {
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
      .delete("http://demo2095023.mockable.io/projetos", {
        "id": newData.id
      })
      .then(function (response) {
        console.log('Deletado com sucesso.')
      });
  }

  return (
    [

      <MaterialTable
        title="Gerenciamento de Projetos"
        columns={[
          { title: 'Id', field: 'id' },
          { title: 'Titulo Projeto', field: 'tituloProjeto' },
          { title: 'Area Projeto', field: 'areaProjeto'},
          { title: 'Resumo', field: 'resumo' },
          { title: 'ID Professor responsável ', field: 'idProfessorResponsavel'},
          { title: 'Professor responsável', field: 'objProfessorResponsavel'},
          { title: 'ID Aluno participante', field: 'idAlunoParticipante'},
          { title: 'Aluno participante', field: 'objAlunoParticipante'},
          { title: 'URL', field: 'url' },
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

export default GerenciamentoProjetos;
