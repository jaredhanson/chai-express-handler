# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added

- Accept a middleware function as an argument to `Test` constructor, via
`chai.express.handler()`.
- Added `render()` assertion method, used to assert that a response rendered a
view.
- Added `locals()` assertion method, used to assert response local variables.
- Added `params` property to `Request`.

### Changed

- Changed `Response#redirect` signature from `function(url, status)` to
`function(status, url)`, matching Express 4.x API.

### Removed

- Removed `Test#render()` function.  Use new `render()` assertion method
instead.

### Fixed

- Error argument passed to `Test#dispatch` is passed into handler middleware
stack.

## [0.0.3] - 2018-03-23
### Added

- Added `Test#render()` function which is used to register a callback to be
invoked when the handler under test renders a view.

### Changed

- Use `make-node@0.3.x`-supplied makefiles for build automation.

### Removed

- Removed makefiles in `support/mk` directory.

## [0.0.2] - 2017-04-14

- Initial release.

[Unreleased]: https://github.com/jaredhanson/chai-express-handler/compare/v0.0.3...HEAD
[0.0.3]: https://github.com/jaredhanson/chai-express-handler/compare/v0.0.2...v0.0.3
[0.0.2]: https://github.com/jaredhanson/chai-express-handler/releases/tag/v0.0.2
