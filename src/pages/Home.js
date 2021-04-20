import axios from "axios"
import { useEffect, useState } from "react"
import Catalog from "../components/Catalog"
import ProfileComprador from "../components/ProfileComprador"
import ProfileVendedor from "../components/ProfileVendedor"

const Home = () => {
  const [listaCompradores, setListaCompradores] = useState([])
  const [listaVendedores, setListaVendedores] = useState([])
  const [selectComprador, setSelectComprador] = useState("11111")
  const [selectVendedor, setSelectVendedor] = useState("4444")

  useEffect(() => {
    axios
      .get('https://marketsystem.herokuapp.com/compradores')
      .then(r => r.data.compradores)
      .then(r => setListaCompradores(r))

      axios
      .get('https://marketsystem.herokuapp.com/vendedores')
      .then(r => r.data.vendedores)
      .then(r => setListaVendedores(r))
  }, [])

  return (
    <div>
      <h1>Market UI</h1>
      <form>
        <h2>Comprador</h2>
        <select name="compradores" id="compradores" value={selectComprador} onChange={({target}) => setSelectComprador(target.value)}>
          {listaCompradores.map(elem => <option value={elem.cpf} key={elem.cpf}>{elem.nome} - {elem.cpf}</option>)}
        </select>
        <h2>Vendedor</h2>
        <select name="vendedores" id="vendedores" value={selectVendedor} onChange={({target}) => setSelectVendedor(target.value)}>
          {listaVendedores.map(elem => <option value={elem.cnpj} key={elem.cnpj}>{elem.nome} - {elem.cnpj}</option>)}
        </select>
      </form>
      <div>
        <h2>Perfil Comprador</h2>
        <ProfileComprador idPerson={selectComprador} />
        <h2>Perfil Vendedor</h2>
        <ProfileVendedor idPerson={selectVendedor} />
        <Catalog cnpj={selectVendedor} cpf={selectComprador}/>
      </div>
    </div>
  )
}

export default Home