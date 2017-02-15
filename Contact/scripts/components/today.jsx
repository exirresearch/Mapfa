import React from 'react';
import ReactDOM from 'react-dom';

const Today = React.createClass({
  getInitialState() {
    return {
      today: ""
    };
  },

  componentWillMount() {
    const $this = this;
    $.ajax({
      url: $this.props.url,
      timeout: 10000,
      cache: true,
      success: (data, status) => {
          $this.setState({today: data});
      }
    });
  },

  render() {
    return (
      <span>
        {this.state.today}
      </span>
    );
  }
});

export default Today;

$('[data-component=today]').each((i, comp) => {
    const url = $(comp).data('url');
    ReactDOM.render(<Today url={url} />, comp);
});
