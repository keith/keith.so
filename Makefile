.PHONY: build deploy
BUILD_DIR=build
PAGES_DIR=gh-pages
SRC=$(wildcard *.html CNAME pubkey.asc favicon.* keybase.txt)

build: $(SRC) sass/*.scss
	rm -rf $(BUILD_DIR)
	mkdir -p $(BUILD_DIR)/css
	sass --style compressed sass/main.scss:$(BUILD_DIR)/css/main.css
	cp $(SRC) $(BUILD_DIR)/

deploy: build
	rm -rf $(PAGES_DIR)
	git clone --branch gh-pages https://github.com/keith/keith.so.git $(PAGES_DIR)
	rm -rf $(PAGES_DIR)/*
	mv $(BUILD_DIR)/* $(PAGES_DIR)
	git -C ./$(PAGES_DIR) commit -am "`date`"
	git -C ./$(PAGES_DIR) push
