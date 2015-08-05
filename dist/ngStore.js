angular.module("ngStore", [])
.service("ngStore", [
function() {

/* ==========================================================================
   Helper functions
   ========================================================================== */

/**
 * generate random string
 * @param length {Number} desired length of string
 * @returns {String}
 */
function random(length) {
  var
    token = '',
    list = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
      'abcdefghijklmnopqrstuvwxyz0123456789';

  while (token.length < length) {
    token += list.charAt(Math.floor(Math.random() * list.length));
  }

  return token;
};

/* ==========================================================================
   Store Factory
   ========================================================================== */

/**
 * factory for creating instances of Store
 * @return {StoreFactory}
 */
var StoreFactory = function() {
  if (!(this instanceof StoreFactory)) {
    return new StoreFactory();
  }

  this.stores = {};
  return this;
};

/**
 * gets or creates a Store singleton
 * @param prefix {String} namespace for the store
 * @return {Store}
 */
StoreFactory.prototype.get = function(prefix) {
  if (!prefix) {
    prefix = random(10) + '::';
  }

  if (!this.stores[prefix]) {
    this.stores[prefix] = new Store(prefix);
  }

  return this.stores[prefix];
};

/**
 * used to destroy all Store instances
 * @return {StoreFactory}
 */
StoreFactory.prototype.destroy = function() {
  store.clear();
  for (var key in this.stores) {
    this.stores[key].data = {};
    delete this.stores[key];
  }

  return this;
};
/* ==========================================================================
   Store class
   ========================================================================== */

/**
 * wrapper for Store.js
 * @param prefix {String} prefix for keys, allows creating different store instances
 * @return {Store}
 */
var Store = function(prefix) {
  if (!(this instanceof Store)) {
    return new Store(prefix);
  }

  this.prefix = prefix;
  this.data = {};

  // if local storage set,
  // find all data in store, check if has this Store's prefix
  // if so, load it into memory
  if (store.enabled) {
    var queue = store.getAll();
    for (var key in queue) {
      if (key.substr(0, this.prefix.length) === this.prefix) {
        this.data[key] = queue[key];
      }
    }
  }

  return this;
};

/**
 * retrieves a value from the store
 * @param key {String} identifier in store
 * @return {*}
 */
Store.prototype.get = function(key) {
  return this.data[this.prefix + key];
};

/**
 * puts a value into the store
 * @param key {String} identifier for the store
 * @param value {*} value to put into the store
 * @returns {Store}
 */
Store.prototype.set = function(key, value) {
  this.data[this.prefix + key] = value;
  if (store.enabled) {
    store.set(this.prefix + key, value);
  }

  return this;
};

/**
 * removes an item from the store
 * @param key {String} identifier of item to remove
 * @return {Store}
 */
Store.prototype.remove = function(key) {
  delete this.data[this.prefix + key];
  store.remove(this.prefix + key);
  return this;
};

/**
 * gets all the items in the store
 * @return {Object}
 */
Store.prototype.getAll = function() {
  var
    alias = this,
    queue = {};

  for (var key in alias.data) {
    queue[key] = alias.data[key];
  }

  return queue;
};

/**
 * removes all items from the store
 * @return {Store}
 */
Store.prototype.clear = function() {
  var alias = this;

  if (store.enabled) {
    for (var key in alias.data) {
      if (key.substr(0, alias.prefix.length) === alias.prefix) {
        store.remove(key);
      }
    }
  }

  this.data = {};
  return this;
};

return new StoreFactory();

}
]);