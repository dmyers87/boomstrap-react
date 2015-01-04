// __tests__/CheckboxWithLabel-test.js

jest.dontMock('../../src/Components/Fauxbox.jsx');

describe('Fauxbox', function() {
  var React     = require('react/addons');
  var Fauxbox   = require('../../src/Components/Fauxbox.jsx');
  var TestUtils = React.addons.TestUtils;

  it('is not checked when checked is passed in as false', function() {
    // Render a checkbox with label in the document
    var fauxbox = TestUtils.renderIntoDocument(
      <Fauxbox id='test-fauxbox' checked={false} />
    );

    // Verify that it's Off by default
    var input = TestUtils.findRenderedDOMComponentWithTag(
      fauxbox, 'input'
    );

    expect(input.getDOMNode().getAttribute('checked')).toBeNull();
  });

  it('is checked when checked is passed in as true', function() {

    // Render a checkbox with label in the document
    var fauxbox = TestUtils.renderIntoDocument(
      <Fauxbox id='test-fauxbox' checked={true} />
    );

    // Verify that it's Off by default
    var input = TestUtils.findRenderedDOMComponentWithTag(
      fauxbox, 'input'
    );

    expect(input.getDOMNode().getAttribute('checked')).toEqual('');
  });

  it('has the inline class when inline is passed in as true', function() {
    // Render a checkbox with label in the document
    var fauxbox = TestUtils.renderIntoDocument(
      <Fauxbox id='test-fauxbox' checked={true} inline={true} />
    );

    var fauxboxClasses = fauxbox.getDOMNode().className.split(' ').sort();

    expect(fauxboxClasses[1]).toEqual('fauxbox-inline');
  });

  it('calls the onClick event when clicked', function() {
    var clicked = false;
    function onClickEvent() {
      clicked = true;
    }
    // Render a checkbox with label in the document
    var fauxbox = TestUtils.renderIntoDocument(
      <Fauxbox id='test-fauxbox' checked={true} inline={true} onClick={onClickEvent} />
    );

    // Verify that it's Off by default
    var input = TestUtils.findRenderedDOMComponentWithTag(
      fauxbox, 'input'
    );

    TestUtils.Simulate.click(input);

    expect(clicked).toEqual(true);
  });
});
