import axios from "axios";
import { useEffect, useState } from "react"

const ProfileVendedor = (props) => {
  const {idPerson} = props;
  const URL_VEND = 'https://marketsystem.herokuapp.com/vendedor?id='

  const VENDEDOR = {
    purchases: 0,
    nome: "",
    saldo: 0,
    cnpj: "",
    toReceive: 0
  }

  const [vendedor, setVendedor] = useState(VENDEDOR)

  useEffect(() => {
    axios
      .get(URL_VEND+idPerson)
      .then(r => setVendedor(r.data))
  }, [idPerson])

  return (
    <div>
      <p>Nome: {vendedor.nome}</p>
      <p>CNPJ: {vendedor.cnpj}</p>
      <p>Saldo: {vendedor.saldo}</p>
      <p>Vendas Realizadas: {vendedor.purchases}</p>
      <p>Valores a Receber: {vendedor.toPay}</p>
    </div>
  )

  
}

export default ProfileVendedor;