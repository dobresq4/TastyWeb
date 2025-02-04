import './App.css';
import {useState, useEffect, createContext} from 'react'
import Header from './components/Header/Header'
import Categories from './components/Categories/Categories'
import Modal from './components/Modal/Modal'

export const OrderContext = createContext(false);

function App() {
  const [itemsInCart, setItemsInCart] = useState([])
  const [isModalOpen, setModalOpen] = useState(false)
  const [myOrders, setMyorders] = useState([])


  const addItemsToCart = (item) => {
    const itemAlreadyInCart = itemsInCart.find((it) => it.product.name === item.name)
    if( itemAlreadyInCart ){
      itemAlreadyInCart.count++;
      setItemsInCart(itemsInCart.map((item) => {
        if( item.product.name === item.name ){
          return itemAlreadyInCart;
        }
        return item
      }))
    }else{
      setItemsInCart([...itemsInCart, { count: 1, product: item}])
    }
  }

  return (
    <div className="App">
      <Header itemsInCart={itemsInCart} setModalOpen={setModalOpen}/>
      {isModalOpen ? <Modal itemsInCart={itemsInCart} setModalOpen={setModalOpen} setMyOrder={setMyorders}/> : ""}
      {myOrders.length ? <div className="my-orders">
        TODO: Once you have the orders, you can list it over here, and check for it's status every 10 seconds, 
        until the status is "Done"
      </div> : ""}
      <div className={`container-main ${isModalOpen ? 'blur' : ''}`}>
          <div className="top-image"></div>
          <Categories addItemsToCart={addItemsToCart}/>
          <OrderContext.Provider value={myOrders}>
          <Categories addItemsToCart={addItemsToCart}/>
            </OrderContext.Provider>
      </div>
    </div>
  );
}

export default App;
