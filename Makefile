SHELL := /bin/bash
PATH  := node_modules/.bin:${PATH}

version = $(shell node -p "require('./package.json').version")
name    = $(shell node -p "require('./package.json').name")

default: test cov

.PHONY: test
test:
	npm test

cov:
	@browserify -t coverify --bare ./test/*.js | mocaccino -r spec | node | coverify

html:
	@browserify ./test/*.js | mocaccino -b | consolify -r -t "${name} unit tests" > test/all.html

release: test cov
	git tag -a -m "Release ${version}" v${version}
	git push --follow-tags
	npm publish
