var React = require('react');
var $ = require('jquery');

var Dispatcher = require('./dispatcher');

var CellComponent = React.createClass({
    getInitialState: function() {
        return {
            editing: this.props.editing
        };
    },

    render: function() {
        var selected = (this.props.selected) ? 'selected' : '',
            ref = 'input_' + this.props.uid.join('_'),
            cellContent;

        if (this.props.selected && this.props.editing) {
            cellContent = (
                <input className="mousetrap"
                       onBlur={this.handleBlur}
                       ref={ref}
                       defaultValue={this.props.value} />
            )
        }

        return (
            <td className={selected} ref={this.props.uid.join('_')}>
                <div>
                    {cellContent}
                    <span onDoubleClick={this.handleDoubleClick} onClick={this.handleClick}>
                        {this.props.value}
                    </span>
                </div>
            </td>
        );
    },

    componentDidUpdate: function() {
        if (this.props.editing && this.props.selected) {
            var node = React.findDOMNode(this.refs['input_' + this.props.uid.join('_')]);
            node.focus();
        }
    },

    handleClick: function (e) {
        var cellElement = React.findDOMNode(this.refs[this.props.uid.join('_')]);
        this.props.handleSelectCell(this.props.uid, cellElement);
    },

    handleDoubleClick: function (e) {
        e.preventDefault();
        this.props.handleDoubleClickOnCell(this.props.uid);
    },

    handleBlur: function (e) {
        var newValue = React.findDOMNode(this.refs['input_' + this.props.uid.join('_')]).value;

        this.props.onCellValueChange(this.props.uid, newValue, e);
        Dispatcher.publish('cellBlurred', this.props.uid);
    }
});

module.exports = CellComponent;