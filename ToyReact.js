class ElementWrapper {
  constructor(type) {
    this.root = document.createElement(type)
  }
  setAttribute(name, value) {
    this.root.setAttribute(name, value)
  }
  appendChild(vchild) {
    console.log('appendChild', vchild)
    vchild.mountTo(this.root)
  }
  mountTo(parent) {
    console.log('mountTo', parent)
    parent.appendChild(this.root)
  }
}

class TextWrapper {
  constructor(content) {
    this.root = document.createTextNode(content)
  }
  mountTo(parent) {
    console.log('mountTo', parent)
    parent.appendChild(this.root)
  }
}

export class Component {
  setAttribute(name, value) {
    this[name] = value
  }
  mountTo(parent) {
    let vdom = this.render()
    vdom.mountTo(parent)
  }
}

export let ToyReact = {
  createElement(type, attributes, ...children) {
    console.log(arguments)
    let element
    if (typeof type === 'string') {
      element = new ElementWrapper(type)
    } else {
      element = new type()
    }
    for (let name in attributes) {
      element.setAttribute(name, attributes[name])
    }
    for (let child of children) {
      if (typeof child === 'string') child = new TextWrapper(child)
      element.appendChild(child)
    }
    return element
  },
  render(vdom, element) {
    vdom.mountTo(element)
  }
}