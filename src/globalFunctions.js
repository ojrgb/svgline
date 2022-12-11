import _ from 'lodash'

const { trace } = require("utils")

window._ = _

Object.defineProperty(Array.prototype, 'findById', {
    value: function(_id) { return [].concat(this).find(v => v._id===_id) }
});

