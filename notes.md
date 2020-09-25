## 1. What's a component

#### #1.1. THERE ARE TWO TYPES OF COMPONENTS

**1. ES6 class**

```js
// An example of using an ES6 class:
class HelloWorld extends React.Component {
  render() {
    return <p>Hello, world!</p>;
  }
}
```

**2. Functional component**

```javascript
//The same component written in a “functional component” style:
function HelloWorld() {
  return <p>Hello, world!</p>;
}
```

---

#### #1.2. JSX

- **JSX** was created to make this JavaScript representation of HTML **more HTML-like**.
- To understand the difference between HTML and JSX, consider this JavaScript syntax:

```javascript
// Example 1
React.createElement(
    'div',
    {className: 'ui items'},
    'Hello, friend! I am a basic React component.'
)

// Which can be represented in JSX as:
   <div className='ui items'>
        Hello, friend! I am a basic React component.
   </div>
```

```javascript
// Example 2
React.createElement(
    'div',
    {className: 'ui items'},
    React.createElement(
          'p',
           null,
          'Hello, friend! I am a basic React component.'\
    )
)

// In JSX:
   <div className='ui items'>
     <p>Hello, friend! I am a basic React component.</p>
   </div>
```

---

#### #1.3. BABEL

- Babel is a **JavaScript transpiler**.
- Babel turns **ES6** code into **ES5** code.
- We call this process **transpiling**.
- Another handy feature of Babel is that it **understands JSX**.

```javascript
<head>
<!-- ... -->
<script src="vendor/babel-standalone.js"></script>
<!-- ... -->
</head>

```

---

#### #1.4. ReactDOM.render()

- **ReactDOM** is from the r**eact-dom** library that we also include in index.html.
- We pass in t**wo arguments** to the ReactDOM.render() method.
- The **first argument** is what **we’d like to render**.
- The **second argument** is **where to render** it:

```javascript
//ReactDOM.render([what], [where]);
ReactDOM.render(<ProductList />, document.getElementById('content'));

// Here, for the “what,” we’re passing in a reference to our React component ProductList in JSX.
// For the “where,” you might recall index.html contains a div tag with an id of content:
<div id="content"></div>;
```

---

## 2. Building Product

#### #2.1. PARENT-CHILD COMPONENT RELATIONSHIP

```jsx
// PARENT COMPONENT
class ProductList extends React.Component {
  render() {
    return (
      <div className="ui unstackable items">
        <Product />
      </div>
    );
  }
}

// CHILD COMPONENT
class Product extends React.Component {
  // ....
}

// RENDER TO THE SCREEN
ReactDOM.render(<ProductList />, document.getElementById('content'));
```

Commit: https://github.com/ionescuflorin/basic_react_app/commit/761df4079b48fa5cff13b725f7286911840aeaba

---

#### #2.2. MAKE THE CHILD COMPONENT DATA-DRIVEN USING PROPS

- The way **data flows** from parent to child in React is through **props**.
- When a **parent renders a child**, it can **send along props** the child depends on.
- While **the child can read its props**, **it can’t modify them**.
- A **child does not own its props**.
- **In our app, the parent component ProductList owns the props given to Product.**
- React favors the idea of **one-way data flow**. This means that **data changes come** from the **“top”** of the app and are propagated **“downwards”** through its various components.

![Data Model Props](ss/1.data_model_props.png)

```javascript
// --- DATA SOURCE ---
// main_folder/public/js/seed.js

const products = [
{
    id: 1,
    title: 'Yellow Pail',
    description: 'On-demand sand castle construction expertise.', url: '#',
    votes: generateVoteCount(),
    submitterAvatarUrl: 'images/avatars/daniel.jpg', productImageUrl: 'images/products/image-aqua.png',
},

```

Commit: https://github.com/ionescuflorin/basic_react_app/commit/7ac2964f2cdfc5f05d43f0db66ad13d067e76376

---

#### #2.3. RENDERING MULTIPLE COMPONENTS USING ARRAY.MAP()

- the use of the key={'product-' + product.id} prop. React uses this special property to create unique bindings for each instance of the Product component.

```javascript
class ProductList extends React.Component {
  render() {
    // Source of data
    const productComponents = Seed.products.map((product) => (
      <Product
        key={'product-' + product.id}
        id={product.id}
        title={product.title}
        description={product.description}
        url={product.url}
        votes={product.votes}
        submitterAvatarUrl={product.submitterAvatarUrl}
        productImageUrl={product.productImageUrl}
      />
    ));
    return <div className="ui unstackable items">{productComponents}</div>;
  }
}
```

Commit: https://github.com/ionescuflorin/basic_react_app/commit/ae948dcaa96906e56056aff611476af96d6eb0f6

---

#### #2.4. SORTING BY THE NUMBER OF VOTES USING ARRAY.SORT()

```javascript
class ProductList extends React.Component {
  render() {
    // Source of data
    const products = Seed.products.sort((a, b) => b.votes - a.votes);
    const productComponents = products.map((product) => (
      <Product .../>

```

Commit: https://github.com/ionescuflorin/basic_react_app/commit/4a15679a1fa57f1443faa5d3e93ecbb841654f41

---

## 3. React the vote (first interaction)
Data Flow Breakdown
* *when we click on upvote, we expect the the 'votes attribute' to be updated for that 'Product'*
- but *'Product' component can't modify its votes* because **this.props is immutable**
  
> While the child **can read its props, it can’t modify them**. <br>\
> A child **does not own its props**, **parent component own the props** of child components

-  In our app, the parent component ProductList owns the props given to Product. 
-  React favors the idea of **one-way data flow**. This means that *data changes come from the “top” of the app and are propagated “downwards”* through its various components.

> **(i)** In JavaScript, if we treat an array or object as **immutable** it means we cannot or should not make modifications to it.

#### #3.1. PROPAGATING THE EVENT

- We know that **parents** communicate data to **children** through **props**.
- Because **props are immutable**, children need some way to communicate events to parents.
- We can **pass down functions as props** too. We can have the **ProductList** component give each **Product** component **a function to call** when the **up-vote button is clicked**.

> When the user clicks the up-vote icon, it will trigger a chain of function calls:
> 1. User clicks the up-vote icon.
> 2. React invokes Productcomponent’s handleUpVote. 
> 3. handleUpVote invokes its prop onVote. This function lives inside the parent ProductList and logs a message to the console.

Commit: https://github.com/ionescuflorin/basic_react_app/commit/37e25073c5c7b4dca0bb8634b822245373cf8088

---

#### #3.2. BINDING CUSTOM COMPONENT METHODS

- In JavaScript, the special **'this' variable** has a different binding depending on the context.
- For instance, inside **render()** we say that this is “bound” to the component. Put another way, **this “references”** the component.
- In short, we want **this** inside **handleUpVote()** to reference the component, *just like it does inside render().*

> But why does this inside render() reference the component while this inside handleUpVote() does not?
> 
> For the **render() function**, React binds this to the component for us. React specifies a default set of special API methods. render() is one such method. As we’ll see at the end of the chapter, componentDidMount() is another. For each of these special React methods, React will bind the this variable to the component automatically.
>
> **So, any time we define our own custom component methods, we have to manually bind this to the component ourselves. There’s a pattern that we use to do so.**

- **constructor()** is a special function in a JavaScript class. 
- JavaScript invokes constructor() whenever an object is created via a class. React invokes constructor() with the component’s props.
- Because constructor() is called when initializing our component, we’ll use it for a couple different types of situations in the book. For our current purposes, it’s enough to know that whenever we want to bind custom component methods to a React component class, we can use this **pattern**:

```javascript
class MyReactComponent extends React.Component {
     constructor(props) {
     super(props); // always call this first

     // custom method bindings here
     this.someFunction = this.someFunction.bind(this); }
}
```

>TAKEAWAY 
>------------
>When defining custom methods on our React component classes, we must perform the binding pattern inside constructor() so that this references our component.

Commit: https://github.com/ionescuflorin/basic_react_app/commit/808c6b8ecbdfc00d918986abafd2e370ac9a5dfe

---

#### #3.3. BINDING IN CONSTRUCTOR

- The **first thing** we do **in constructor()** is call **super(props)**.
- The React.Component class that our Product class is extending defines its own constructor(). By calling super(props), *we’re invoking that constructor() function first.*
- Importantly, the constructor() function defined by React.Component **will bind this inside our constructor() to the component**.
- Because of this, **it’s a good practice to always call super() first** whenever you declare a constructor() for your component.
- After calling super(), we call bind() on our custom component method:
  **this.handleUpVote = this.handleUpVote.bind(this);**
- Function’s **bind() method** **allows you to specify what the this variable inside a function body should be set to**.
- What we’re doing here is a **common JavaScript pattern**. We’re redefining the component method handleUpVote(), setting it to the same function but bound to this (the component)
- Now, whenever **handleUpVote() executes**, this **will reference the component** as **opposed to null**.

- Does this bind() pattern feel a little weird? It turns out, you **don’t have to do it when you use “functional” components**. Perhaps you’ve heard of **React Hooks**. This bind() pattern is unnecessary with functional components and Hooks.

---

#### #3.4. USING STATE

- Whereas props are immutable and owned by a component’s parent, **state is owned by the component**. **this.state is private** to the component and as we’ll see can be **updated** with **this.setState()**.
- Critically, **when the state or props of a component update, the component will re-render itself.**

```javascript
class ProductList extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        products: [],
    };
  }

```

Commit: https://github.com/ionescuflorin/basic_react_app/commit/a0f9a09ffe47822f9156d35709415999b484140d


---

#### #3.5. SETTING STATE WITH THIS.SETSTATE()

- React specifies a set of **lifecycle methods**. 
- React invokes one lifecycle method, **componentDidMount()**, after our **component has mounted to the page**. We’ll seed the state for ProductList inside this method.
- Never modify state outside of this.setState(). This function has important hooks around state modification that we would be bypassing.

```javascript
class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        products: [],
    };
}

  // after mounting the with an empty state and then populate with data from Seed
  componentDidMount() {
    this.setState({ products: Seed.products });
}

```

Commit: https://github.com/ionescuflorin/basic_react_app/commit/d5c2dadb09f1862f80c3f3f7d86c535ba6d070ca

---

#### #3.5. UPDATING STATE AND IMMUTABILITY

- We can only make state modifications using **this.setState()**. 
- So while a component can update its state, we should treat the **this.state object as immutable**.
- As touched on earlier, **if we treat an array or object as immutable we never make modifications to it**. 
- For example, let’s say we have an array of numbers in state:
- **this.setState({ nums: [ 1, 2, 3 ]});**
- If we want to update the state’s nums array to include a 4, we might be tempted to
  use push() like this: **this.setState({ nums: (this.state.nums.push(4), this.state.nums) });**
- On the surface, it might appear as though we’ve treated this.state as immutable. However, the push() method modifies the original array:
```javascript
console.log(this.state.nums);
// [ 1, 2, 3 ]
this.state.nums.push(4);
// 4 <-- the length of the array
console.log(this.state.nums);
// [ 1, 2, 3, 4] <-- Uh-oh!
```

- Part of the reason this is bad practice is because **setState() is actually asynchronous**. There is no guarantee when React will update the state and re-render our component.

- Treat the state object as immutable. It’s important to understand which Array and Object methods modify the objects they are called on.

>If an array is passed in as an argument to **concat()**, its elements are appended to the new array. 
>
>For example:
> [ 1, 2, 3 ].concat([ 4, 5 ]); => [ 1, 2, 3, 4, 5 ]

- Let’s see what a handleProductUpVote() implementation looks like that treats state as **immutable**.
1. we use *map()* to traverse the products array. Importantly, **map() returns a new array** as opposed to modifying the array this.state.products.
2. Next, we check if the **current product matches productId**. 
- If it does, we create a new object, copying over the properties from the original product object. 
- We then overwrite the votes property on our new product object. We set it to the incremented vote count. We do this using Object’s assign() method:
- If the current product is not the one specified by productId, we return it unmodified
3. Finally, we use setState() to update the state.

```jsx
// Inside `ProductList`
handleProductUpVote(productId) {
  const nextProducts = this.state.products.map((product) => {
      if (product.id === productId) {
      return Object.assign({}, product, {
        votes: product.votes + 1,
        });
      } else {
       return product;
     }
  });
    this.setState({
     products: nextProducts,
     });
    }
```

---

## 4.1. REFACTORING WITH THE BABEL PLUGIN

##### 4.1. BABEL PLUGIN AND PRESETS

- There’s a few ways to integrate Babel into your project. We’ve been using babel-standalone which allows us to setup Babel quickly for use directly in the browser.
- **babel-standalone** by default **uses two presets**.
- In Babel, **a preset** is a **set of plugins used to support particular language features**. The two presets Babel has been using by default:

- **es201527: Adds support for ES2015 (or ES6) JavaScript**
- **react28: Adds support for JSX**

- **Beyond ES7**, proposed JavaScript features can exist in various stages. **A feature can be an experimental proposal, one that the community is still working out the details for (“stage 1”)**.

- **Experimental** proposals are at **risk of being dropped or modified at any time.**
- Or **a feature might already be “ratified,” which means it will be included in the next release of JavaScript (“stage 4”)**.

We can customize Babel with presets and plugins to take advantage of these upcoming or experimental features.
In this book, we generally avoid features that are experimental. However, there is one feature that looks to be ratified that we make an exception for: **property initializers**.
https://babeljs.io/docs/en/plugins/

- Using ES6/ES7 with additional presets or plugins is sometimes referred to by the community as “ES6+/ES7+.”

---

##### 4.2. PROPERTY INITIALIZERS

- Property initializers are detailed in the proposal “**ES Class Fields & Static Properties.**”
- Property initializers are available in the Babel plugin transform-class-properties. Recall that we specified this plugin for app.js inside index.html:

```html
<script 
    type="text/babel" 
    data-plugins="transform-class-properties" 
    src="./js/app.js"
></script>
```

In sum, we can use property initializers to make two refactors to our React components:

1. We can use arrow functions for custom component methods (and avoid having to bind this)
2. We can define the initial state outside of constructor()

---

## #5 Summarize

1. We think about and organize our React apps as components 2. Using JSX inside the render method
2. Data flows from parent to children through props
3. Event flows from children to parent through functions
4. Utilizing React lifecycle methods
5. Stateful components and how state is different from props 7. How to manipulate state while treating it as immutable

### !!React framework for developing a React app from scratch:
1. Break the app into components
2. Build a static version of the app
3. Determine what should be stateful
4. Determine in which component each piece of state should live 5. Hard-code initial states
6. Add inverse data flow
7. Add server communication

### How we used this framework in this app
We followed this pattern in the last project:
**1. Break the app into components**
- We looked at the desired UI and determined we wanted ProductList and Product components.

**2. Build a static version of the app**
- Our components started off without using state. Instead, we had ProductList pass down static props to Product.

**3. Determine what should be stateful**
- In order for our application to become interactive, we had to be able to modify the vote property on each product.
- Each product had to be mutable and therefore stateful.

**4. Determine in which component each piece of state should live**
- ProductList managed the voting state using React component class methods.
  
**5. Hard-code initial state**
- When we re-wrote ProductList to use this.state, we seeded it from Seed.products. 

**6. Add inverse data flow**
- We defined the handleUpVote function in ProductList and passed it down in props so that each Product could inform ProductList of up-vote events.

**7. Add server communication**
- We did not add a server component to our last app, but we will be doing so in this one.

---
---