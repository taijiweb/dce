var Caret, span;

span = dc.span;

module.exports = Caret = (function() {
  function Caret() {
    var caretAttr, handle, toggleVisibility, visible;
    visible = true;
    caretAttr = {
      style: {
        display: "inline-block",
        backgroundColor: 'blue',
        margin: "2px 3px 0",
        height: '20px',
        width: '2px',
        visibility: function() {
          if (visible) {
            return 'visible';
          } else {
            return 'hidden';
          }
        }
      }
    };
    toggleVisibility = function() {
      visible = !visible;
      return this.update();
    };
    handle = null;
    this.on('beforeAttach', function() {
      return handle = setInterval(toggleVisibility, 500);
    });
    this.on('afterDetach', function() {
      return clearInterval(handle);
    });
    Caret.__super__.constructor.call(this, 'span', caretAttr);
  }

  return Caret;

})();
