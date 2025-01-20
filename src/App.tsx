import { useEffect, useState } from 'react'
import Header from './components/Header'
import Produtos from './containers/Produtos'

import { GlobalStyle } from './styles'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { store } from './store'
import { add } from './store/reducers/favoritos'
import { RootReducer } from './store' // Importar o RootReducer

export type Produto = {
  id: number
  nome: string
  preco: number
  imagem: string
}

function App() {
  const [produtos, setProdutos] = useState<Produto[]>([])

  const dispatch = useDispatch()

  // Selecionar os favoritos da store
  const favoritos = useSelector((state: RootReducer) => state.favoritos.itens)

  useEffect(() => {
    fetch('https://fake-api-tau.vercel.app/api/ebac_sports')
      .then((res) => res.json())
      .then((res) => setProdutos(res))
  }, [])

  const favoritar = (produto: Produto) => {
    dispatch(add(produto))
  }

  return (
    <Provider store={store}>
      <GlobalStyle />
      <div className="container">
        <Header />
        <Produtos
          produtos={produtos}
          favoritos={favoritos}
          favoritar={favoritar}
        />
      </div>
    </Provider>
  )
}

export default App
