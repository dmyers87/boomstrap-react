0.5.0 / 2015-09-08
==================

  * bumped to 0.5.0
  * Merge pull request [#37](https://github.com/BoomTownROI/boomstrap-react/issues/37) from BoomTownROI/leadcat-nouveau
    Leadcats, Lead Types and Lead Category By Type
  * played with docs comments and having issues getting docs to render properly.
  * added proptypes for LeadCategoryByType and fixed docs.
  * updated leadcat component to reflect new changes. only default, square and small square now.
  * updated lead category to reflect recent changes: no outline, only abbr, equal width. dropped a bunch of props.

0.4.0 / 2015-09-01
==================

  * Merge pull request [#36](https://github.com/BoomTownROI/boomstrap-react/issues/36) from BoomTownROI/fauxdio_group
    Fauxdio Group
  * bump version
  * use es6 autobinding for onClick prop
  * update doc info
  * add ability to add whatever fauxdio props you want/need to the fauxdios
  * update Fauxdio to allow strings as values
  * Add FuaxdioGroup for all your fauxdio grouping needs
  * Merge pull request [#34](https://github.com/BoomTownROI/boomstrap-react/issues/34) from BoomTownROI/ESLintUpgrade
    Updating ESLint, babel-eslint, and eslint-plugin-react
  * Fixing line endings
  * Updating ESLint, babel-eslint, and eslint-plugin-react, with minor fixes for changed rules

0.3.3 / 2015-08-18
==================

  * Incrementing version
  * Merge pull request [#33](https://github.com/BoomTownROI/boomstrap-react/issues/33) from BoomTownROI/DistBeGone
    Dist be gone
  * Ensuring that the docs task is run before the website is published
  * Merge branch 'master' of github.com:BoomTownROI/boomstrap-react into DistBeGone
  * fix index.js
  * Deleting dist directory and adding it to the gitignore.  Adding postpublish task to build the website

0.3.2 / 2015-08-18
==================

  * fix docs
  * Merge pull request [#31](https://github.com/BoomTownROI/boomstrap-react/issues/31) from BoomTownROI/deprecate-ficon
    Remove Ficon
  * increment version
  * changed svgicon references to icon references, remover svgicon from docs, replaced ficon Icon with svg Icon
  * I am good at git...
  * renamed svgicon Icon component and file to icon
  * rename ficon Icon file, and component
  * Craig - update Icon instances to SvgIcon
  * Craig - add SvgIcon to index and build

0.3.1 / 2015-08-13
==================

  * Craig - kill scrolling on CodeMirror by setting height to auto

0.3.0 / 2015-08-11
==================

  * Merge pull request [#30](https://github.com/BoomTownROI/boomstrap-react/issues/30) from BoomTownROI/bichromatic
    Buyer/Seller ProfilePic
  * typo in example
  * merge and regen
  * updated version
  * added buyer/seller options to profile pic component.
  * Adding and updating npm scripts, dont run gulp anymore
  * Merge pull request [#29](https://github.com/BoomTownROI/boomstrap-react/issues/29) from BoomTownROI/svg-icons
    Svg Icons
  * increment version
  * get boomsvgloader working in the docs
  * Craig - spacing fix in switcher
  * Craig - svgicon update
  * Craig - add icon prefix to svgicon component
  * Craig - add boomsvgloader to index.html for docs, remove bower install of boomstrap, update svgicon component, update docs
  * Craig - svgicon
  * Craig - add SvgIcon component and revert Icon component
  * Craig - pull in master and build

0.2.13 / 2015-07-24
===================

  * Incrementing version
  * Merge pull request [#27](https://github.com/BoomTownROI/boomstrap-react/issues/27) from BoomTownROI/ComponentsOnRoot
    Moving all components, mixins, and constants to the root
  * Moving all components, mixins, and constants to the root of boomstrap react.  They still exist in the same place for backwards-compatibility
  * Craig - icon converted to svg

0.2.12 / 2015-07-20
===================

  * Incrementing boomstrap version
  * Merge pull request [#25](https://github.com/BoomTownROI/boomstrap-react/issues/25) from BoomTownROI/LeadType-LeadCategoryByType
    Adding new Lead Type and Lead Category by Type components
  * Regen after merge
  * Merge from master
  * Merge pull request [#26](https://github.com/BoomTownROI/boomstrap-react/issues/26) from BoomTownROI/fauxdio-fix
    Fauxdio fixes and improvements
  * Craig - fix linting errors that were revealed through travis
  * Craig - add radioName property and change checked so that it is not required
  * Fixing linter errors
  * Adding new Lead Type and Lead Category by Type components

0.2.11 / 2015-07-17
===================

  * Updating package.json version
  * Merge pull request [#24](https://github.com/BoomTownROI/boomstrap-react/issues/24) from BoomTownROI/UITypeaheadSelectDeprecationFix
    Adding example, docs, and removing deprecation usage from the UITypea…
  * Adding example, docs, and removing deprecation usage from the UITypeaheadSelect

0.2.10 / 2015-07-09
===================

  * converted package.json reference to index.js
  * incremented package.json
  * ran npm run build

0.2.8 / 2015-07-09
==================

  * Merge branch 'master' of https://github.com/BoomTownROI/boomstrap-react
  * added data-initials to profile pic div
  * Updating autoprefixer-loader to kill warnings

0.2.7 / 2015-06-24
==================

  * Craig - update version
  * Craig - include card, cardsmall, sash, and circle components in build
  * Merge pull request [#22](https://github.com/BoomTownROI/boomstrap-react/issues/22) from BoomTownROI/Issue14
    Renaming App.js files to index.js
  * Updating eslint-plugin-react, turning on react/sort-comp in linter
  * Removing distributables from before
  * Addressing Issue 14 by renaming all App.js as index.js.  This gives us the added benefit of not needing to require by name in src/index.js
  * Craig - match renderSash in Card component with CardSmall component

0.2.6 / 2015-06-10
==================

  * Version bump for UITypeaheadSelect fix
  * Merge pull request [#20](https://github.com/BoomTownROI/boomstrap-react/issues/20) from BoomTownROI/UITypeaheadSelectPerfFix
    UITypeaheadSelect Performance Fix
  * Regen after merge
  * Merge from master
  * Merge pull request [#21](https://github.com/BoomTownROI/boomstrap-react/issues/21) from BoomTownROI/component-builds
    Component builds
  * Craig - remove Button require from Card since we aren't using it
  * Craig - remove Well since it is available via bootstrap react
  * Craig - merge in master and build
  * Craig - code review with Funk
  * Craig - stuff
  * Delaying left calculation of overlay until the user opens the overlay instead of spending expensive time in componentDidUpdate
  * Craig - className prop, cleanup and review
  * Merge pull request [#16](https://github.com/BoomTownROI/boomstrap-react/issues/16) from AlexKVal/uiselect
    Add examples for UISelect component. Remove extraneous code.
  * Add examples for UISelect component. Remove extraneous code.
    Use React.PropTypes.node for children.
    Remove `placeholder={this.props.placeholder}` from `<button ..>`
    Fix `CompnentExample` => `ComponentExample`
    Add margin at the bottom of examples page for usability.
    Add two additional examples:
    `disabled` state and
    `placeholder` usage
    `containerClass: ''` isn't required
    because `classnames` correctly ignores `undefined` and `null` values
    https://github.com/JedWatson/classnames
    > // other falsy values are just ignored
    classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, ''); // => 'bar 1'
  * Cxraig - card build
  * Craig - card carousel
  * incremented version. ran build.
  * Merge pull request [#19](https://github.com/BoomTownROI/boomstrap-react/issues/19) from BoomTownROI/profile-pic-class-name
    added className prop
  * added className prop

0.2.4 / 2015-06-08
==================

  * Merge pull request [#18](https://github.com/BoomTownROI/boomstrap-react/issues/18) from BoomTownROI/profile-pics-restructure-html
    More profile pic
