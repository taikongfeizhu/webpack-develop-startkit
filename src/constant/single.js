function Singleton () {
  this.activedKey = null
  this.namespace = {}
}

Singleton.prototype.getName = function (name, prefix) {
  return `${prefix}_${name}`
}

Singleton.prototype.setName = function (name) {
  const key = this.activedKey
  const item = this.namespace[key]
  if (!item.includes(name)) {
    this.namespace[key] = [...item, name]
  }
  return this
}

Singleton.prototype.make = function (name, ...prefix) {
  // 不走单例配置，按输入返回常量名
  if (prefix.length > 0) {
    const [ pre ] = prefix
    return this.getName(name, pre)
  }
  const nameMerge = this.setName(name)
  if (nameMerge) {
    return nameMerge.getName(name, this.activedKey)
  } else {
    throw new Error('this key exist')
  }
}

Singleton.prototype.setKey = function (key) {
  this.activedKey = key
  this.namespace[key] = []
  return this
}

Singleton.factory = function () {
  if (!global.instance) {
    global.instance = new Singleton()
  } else {
    console.error('instance is created')
  }
  return global.instance
}

export const singleton = Singleton.factory()
