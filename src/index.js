import axios from "axios";
import React from "react";
import { render } from "react-dom";
import "./App.css";
import { Search } from "./components/Search";

class App extends React.Component {
  constructor() {
    super();
    // imageのurlのリストを持つ
    this.state = { gifUrlList: [] };
  }

  renderImagelist(list) {
    const imageList = list.map(url => {
      return (
        <li className="item">
          <img className="image" src={url} />
        </li>
      );
    });

    return <ul className="list">{imageList}</ul>;
  }

  render() {
    console.log(this.state.gifUrlList);
    return (
      <div>
        <Search search={this.giphyApi} />
        {this.renderImagelist(this.state.gifUrlList)}
      </div>
    );
  }

  giphyApi = target => {
    const search = target;
    const key = "xjLtTu9xPUGfMhremUE3wChPThc9PglN";
    const limit = 100;
    const url = `https://api.giphy.com/v1/gifs/search?q=${search}&api_key=${key}&limit=${limit}`;
    axios.get(url).then(res => {
      const data = res.data.data;
      const imageUrlList = data.map(item => item.images.downsized.url);
      this.setState({ gifUrlList: imageUrlList });
    });
  };
}

render(<App />, document.getElementById("root"));
