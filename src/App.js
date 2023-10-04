import './App.css';
import React, { Component } from 'react';
import Items from './components/item/items';
import AddItem from './components/addItem/addItem';
import Total from './components/total/total';

class App extends Component {
  state = {
    items: [
      { id: 1, product: 'Pen', price: 2, quantity: 1 },
      { id: 2, product: 'Book', price: 10, quantity: 2 },
    ],
  };

  deleteItem = id => {
    let items = this.state.items;
    let i = items.findIndex(item => item.id === id);
    items.splice(i, 1);
    this.setState({ items: items });
  };

  addItem = item => {
    this.state.items.length > 0
      ? (item.id = this.state.items[this.state.items.length - 1].id + 1)
      : (item.id = 1);
    console.log(item.id);
    let items = this.state.items;
    items.push(item);
    this.setState({ items: items });
  };

  increaseQuantity = id => {
    this.setState({
      items: this.state.items.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      ),
    });
  };

  decreaseQuantity = id => {
    const currentItem = this.state.items.find(item => item.id === id);
    currentItem.quantity -= 1;
    if (currentItem.quantity === 0) this.deleteItem(id);
    else {
      this.setState({
        items: this.state.items.map(item =>
          item.id === id ? currentItem : item
        ),
      });
    }
  };
  render() {
    return (
      <div className="container">
        <h1>Product List React App</h1>
        <div className="table">
          <Items
            items={this.state.items}
            del={this.deleteItem}
            increase={this.increaseQuantity}
            decrease={this.decreaseQuantity}
          />
          <AddItem add={this.addItem} />
          <Total items={this.state.items} />
        </div>
      </div>
    );
  }
}

export default App;
