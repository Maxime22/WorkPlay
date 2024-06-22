.PHONY: install
install:
	npm install

.PHONY: start
start: #To open in its own terminal
	npm start

.PHONY: android
android: #In another terminal
	npm run android
