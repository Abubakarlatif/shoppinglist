import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faChevronLeft, faChevronRight, faCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function App() {
  const [items, setItems] = useState([
    { itemName: 'item1', itemQuantity: 1, isSelected: false },
    { itemName: 'item2', itemQuantity: 4, isSelected: true },
    { itemName: 'item3', itemQuantity: 2, isSelected: false },
  ]);
  const [input, setInput] = useState('');
  const [totalitems ,settotalitems] = useState(7);

  const handleClick = () => {
    const newItem = {
      itemName: input,
      itemQuantity: 1,
      isSelected: true
    };
    const newItems = [...items, newItem];
    setItems(newItems);
    setInput('');
  };

  const quantityIncrease = (index) => {
    const newItems = [...items];
    newItems[index].itemQuantity++;
    setItems(newItems);
    calculateTotal();
  };

  const quantityDecrease = (index) => {
    const newItems = [...items];
    newItems[index].itemQuantity--;
    setItems(newItems);
    calculateTotal();
  };

  const toggleItem = (index) => {
    const newItems = [...items];
    newItems[index].isSelected = !newItems[index].isSelected;
    setItems(newItems);
  };
  const calculateTotal = ()=>{
      const totalitems = items.reduce((total,items)=>{
        return (total + items.itemQuantity)
      },0)
      settotalitems(totalitems)
  }

  return (
    <div className="App-background">
      <div className='main-container'>
        <div className='add-item-box'>  
          <input value={input} onChange={(e) => setInput(e.target.value)} className='add-item-input' placeholder='Add Items'/>
          <FontAwesomeIcon icon={faPlus} onClick={handleClick} className='icn'/>
        </div>
        <div className='item-list'>
          {items.map((item, index) => (
            <div className='item-container' key={index}>
              <div className='item-name' onClick={() => toggleItem(index)}>
                {item.isSelected ? (
                  <>
                    <FontAwesomeIcon icon={faCircleCheck} />
                    <span><del>{item.itemName}</del></span>
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faCircle} />
                    <span>{item.itemName}</span>
                  </>
                )}
              </div>
              <div className='quantity'>
                <button className='ar-tag' onClick={() => quantityDecrease(index)}>
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <span>{item.itemQuantity}</span>
                <button className='ar-tag' onClick={() => quantityIncrease(index)}>
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className='total'>Total: {totalitems}</div>
      </div>
    </div>
  );
}

export default App;

