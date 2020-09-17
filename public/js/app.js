class ProductList extends React.Component {
  // 1. creating the function with desired logic
  handleProductUpVote(productId) {
    console.log(productId + ' was upvoted.');
  }

  render() {
    // Source of data
    const products = Seed.products.sort((a, b) => b.votes - a.votes);
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
        // 2. passing down the function as prop to be sended to the child
        onVote={this.handleProductUpVote}
      />
    ));
    return <div className="ui unstackable items">{productComponents}</div>;
  }
}

class Product extends React.Component {
  
  // 3. create a method that takes parent props
  /**
   * Here’s the odd part: When working inside render(), we’ve witnessed that this is always bound to the component. 
   * But inside our custom component method handleUpVote(), this is actually null.
   */
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
            {/* 4. executing that function when the desired interaction occurs */}
            {/* we'll have an eror: cannot read property of props of undefined due to not binding the method */}
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
