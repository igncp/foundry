watch:
	webpack -w

build:
	webpack

server:
	./node_modules/.bin/http-server -p 8082 -s -c-1

test-watch:
	./node_modules/.bin/mocha --require babel-core/register mocha-globals.js "src/**/*-test.js" -w