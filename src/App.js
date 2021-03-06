import React, { Component } from 'react';
import './App.css';
import cards from './cards.json';
import Wrapper from './components/Wrapper';
import Navpills from './components/Navpills';
import Title from './components/Title';
import Card from './components/Card';

class App extends Component {
  state = {
    message: 'Click an image to begin!',
    topScore: 0,
    curScore: 0,
    cards: cards,
    unselectedcards: cards
  };

  componentDidMount() {}

  shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  selectDog = cardvalue => {
    const findDog = this.state.unselectedcards.find(
      item => item.cardvalue === cardvalue
    );

    if (findDog === undefined) {
      // failure to select a new dog
      this.setState({
        message: 'You guessed incorrectly!',
        topScore:
          this.state.curScore > this.state.topScore
            ? this.state.curScore
            : this.state.topScore,
        curScore: 0,
        cards: cards,
        unselectedcards: cards
      });
    } else {
      // success to select a new dog
      const newcards = this.state.unselectedcards.filter(
        item => item.cardvalue !== cardvalue
      );

      this.setState({
        message: 'You guessed correctly!',
        curScore: this.state.curScore + 1,
        cards: cards,
        unselectedcards: newcards
      });
    }

    this.shuffleArray(cards);
  };

  render() {
    return (
      <Wrapper>
        <Navpills
          message={this.state.message}
          curScore={this.state.curScore}
          topScore={this.state.topScore}
        />
        <Title />
        {this.state.cards.map(dog => (
          <Card
            cardvalue={dog.cardvalue}
            image={dog.image}
            selectDog={this.selectDog}
            curScore={this.state.curScore}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;
