import axios from "axios";
import { useEffect, useState } from "react"

const ProfileComprador = (props) => {
  const {idPerson} = props;
  const URL_COMP = 'https://marketsystem.herokuapp.com/comprador?id='

  const COMPRADOR = {
    purchases: 0,
    nome: "",
    saldo: 0,
    cpf: "",
    toPay: 0
  }

  const [comprador, setComprador] = useState(COMPRADOR)

  useEffect(() => {
    axios
      .get(URL_COMP+idPerson)
      .then(r => setComprador(r.data))
  }, [idPerson])

  return (
    <div>
      <p>Nome: {comprador.nome}</p>
      <p>CPF: {comprador.cpf}</p>
      <p>Saldo: {comprador.saldo}</p>
      <p>Compras Realizadas: {comprador.purchases}</p>
      <p>Valores a Pagar: {comprador.toPay}</p>
    </div>
  )

  
}

export default ProfileComprador;