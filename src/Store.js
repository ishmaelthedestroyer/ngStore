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
  return this;
};

/**
 * retrieves a value from the store
 * @param key {String} identifier in store
 * @return {*}
 */
Store.prototype.get = function(key) {
  return store.get(this.prefix + key);
};

/**
 * puts a value into the store
 * @param key {String} identifier for the store
 * @param value {*} value to put into the store
 * @returns {Store}
 */
Store.prototype.set = function(key, value) {
  store.set(this.prefix + key, value);
  return this;
};

/**
 * removes an item from the store
 * @param key {String} identifier of item to remove
 * @return {Store}
 */
Store.prototype.remove = function(key) {
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

  store.forEach(function(key, value) {
    if (key.substr(0, alias.prefix.length) === alias.prefix) {
      queue[key] = value;
    }
  });

  return queue;
};

/**
 * removes all items from the store
 * @return {Store}
 */
Store.prototype.clear = function() {
  var
    alias = this,
    queue = store.getAll();

  for (var key in queue) {
    if (key.substr(0, alias.prefix.length) === alias.prefix) {
      store.remove(key);
    }
  }

  return this;
};