import axios from "axios";
import React from "react";
import { render } from "react-dom";

class App extends React.Component {
  constructor() {
    super();
    this.state = { gifUrlList: [] };
  }

  componentDidMount() {
    this.giphyApi();
  }

  render() {
    console.log(this.state.gifUrlList);
    return <div>App</div>;
  }

  giphyApi() {
    const search = "cat";
    const key = "xjLtTu9xPUGfMhremUE3wChPThc9PglN";
    const limit = 3;
    const url = `https://api.giphy.com/v1/gifs/search?q=${search}&api_key=${key}&limit=${limit}`;
    axios.get(url).then(res => {
      const data = res.data.data;
      const imageUrlList = data.map(item => item.images.downsized.url);
      this.setState({ gifUrlList: imageUrlList });
    });
  }
}

render(<App />, document.getElementById("root"));
