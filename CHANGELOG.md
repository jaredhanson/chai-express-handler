# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added

- Accept a middleware function as an argument to `Test` constructor, via
`chai.express.use()`.
- Added `render()` assertion method, used to assert that a response rendered a
view.
- Added `locals()` assertion method, used to assert response local variables.
- Prepend `init()` middleware to handler under test, which initializes
`req.params` and `res.locals`.
- Prepend `query()` middleware to handler under test, which initializes
`req.query`.

### Changed

- Helper function to set up test case is now at `chai.express.use` rather than
`chai.express.handler` to more closely mimic the `express` API.
- `Test#dispatch` renamed to `Test#listen` to mimic the `express` and `http`
APIs.
- `Test#req` renamed to `Test#request` and now takes synchronous callbacks with
`function(req, res)` signature and asynchronous callbacks with `function(req, res, cb)`
signature to mimic `http.Server` `connection` event.
- `Test#end` renamed to `Test#finish` to mimic `http.ServerResponse` `finish`
event.  Callback no longer called with `res` as an argument as it is invoked
with `this` context of the response.
- `Test#next` callback invoked with `this` context set to `Test` instance an
passed `req` and `res` in addition to `err`.
- `status()` assertion method asserts that object is an instance of `Response`,
rather than just having a `statusCode` property.
- `Response#setHeader` returns response object to match behavior of
`http.ServerResponse`.
- Changed `Response#redirect` signature from `function(url, status)` to
`function(status, url)`, matching Express 4.x API.
- `Response#status` added to `res` in `init()` middleware rather than being
part of base `Response` prototype.

### Removed

- Removed `Test#res()` function.  Use `Test#request()` and the second `res`
argument instead.
- Removed `Test#render()` function.  Use new `render()` assertion method
instead.

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
