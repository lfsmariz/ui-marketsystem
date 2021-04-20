import axios from "axios";
import { useEffect, useState } from "react";

const Catalog = (props) => {
  const { cnpj, cpf } = props;
  const [catalogo, setCatalogo] = useState([]);
  const [saldo, setSaldo] = useState(0)

  const URL_COMP = 'https://marketsystem.herokuapp.com/comprador?id='

  useEffect(() => {
    axios
      .get(`https://marketsystem.herokuapp.com/produtos-vendedor?id=${cnpj}`)
      .then((r) => r.data.produtos)
      .then((r) => r.map(elem => ({...elem, quantidade: 0})))
      .then((r) => setCatalogo(r));

    axios
      .get(URL_COMP + cpf)
      .then(r => r.data.saldo)
      .then(r => setSaldo(r))
  }, [cnpj, cpf]);

  const handleQuantity = ({id, value}) => {
    const newCatalog = [...catalogo];
    newCatalog.map(elem => {
      if(elem.codigo === id) elem.quantidade = value
      return elem;      
    })

    setCatalogo(newCatalog)
  }

  return (
    <div>
      <h1>Catálogo</h1>
      <h2>Saldo: R${saldo}</h2>
      {catalogo.map((elem) => {
        return (
          <div key={elem.codigo}>
            <p>{`Nome - ${elem.nome}`}</p>
            <p>{`Codigo - ${elem.codigo}`}</p>
            <p>{`Preco - ${elem.preco}`}</p>
            <input type="text" value={elem.quantidade} id={elem.codigo} onChange = {(e) => handleQuantity(e.target)}/>
          </div>
        );
      })}

      <h2>Total - R$ {catalogo.reduce((acc, act) => acc + (+act.preco * +act.quantidade), 0)}</h2>
    </div>
  );
};

export default Catalog;
