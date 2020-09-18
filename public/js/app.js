class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };
  }

  handleProductUpVote(productId) {
    console.log(productId + ' was upvoted.');
  }

  render() {
    // Source of data

    /**
     * Calling .sort() on this.state.products will technically mutate that array, which is generally considered bad practice. 
     * We’re cutting a slight corner just to make the example clearer. 
     * A better (but longer) way to do this would be to copy this array when sorting - which we’re going to talk about below (so don’t worry too much about it now).
     */
    const products = this.state.products.sort((a, b) => b.votes - a.votes);
    const productComponents = products.map((product) => (
      <Product
        key={'product-' + product.id}
        id={product.id}
        title={product.title}
        description={product.description}
        url={product.url}
        votes={product.votes}
        submitterAvatarUrl={product.submitterAvatarUrl}
        productImageUrl={product.productImageUrl}
        onVote={this.handleProductUpVote}
      />
    ));
    return <div className="ui unstackable items">{productComponents}</div>;
  }
}

class Product extends React.Component {
  constructor(props) {
    super(props);

    this.handleUpVote = this.handleUpVote.bind(this);
  }

  handleUpVote() {
    this.props.onVote(this.props.id);
  }

  render() {
    return (
      <div className="item">
        <div className="image">
          <img src={this.props.productImageUrl} />
        </div>
        <div className="middle aligned content">
          <div className="header">
            <a onClick={this.handleUpVote}>
              <i className="large caret up icon" />{' '}
            </a>
            {this.props.votes}{' '}
          </div>
          <div className="description">
            <a href={this.props.url}> {this.props.title}</a>{' '}
            <p>{this.props.description} </p>
          </div>
          <div className="extra">
            <span>Submitted by:</span>
            <img
              className="ui avatar image"
              src={this.props.submitterAvatarUrl}
            />{' '}
          </div>
        </div>
      </div>
    );
  }
}
ReactDOM.render(<ProductList />, document.getElementById('content'));
