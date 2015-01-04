// __tests__/CheckboxWithLabel-test.js
'use strict';

jest.dontMock('../../src/Components/ImageWithFallback.jsx');
jest.dontMock('lodash');

describe('Fauxbox', function() {
  var React               = require('react/addons');
  var ImageWithFallback   = require('../../src/Components/ImageWithFallback.jsx');
  var TestUtils           = React.addons.TestUtils;

  it('replaces the src on error event', function() {
    // Render a checkbox with label in the document
    var img = TestUtils.renderIntoDocument(
      <ImageWithFallback
        src='http://www.derp.com/img.jpg'
        fallbackSrc='http://www.derp.com/img2.jpg' />
    );

    TestUtils.Simulate.error(img.getDOMNode());

    expect(img.getDOMNode().getAttribute('src')).toEqual('http://www.derp.com/img2.jpg');
  });

});
