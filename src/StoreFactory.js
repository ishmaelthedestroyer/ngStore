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
    delete this.stores[key];
  }

  return this;
};